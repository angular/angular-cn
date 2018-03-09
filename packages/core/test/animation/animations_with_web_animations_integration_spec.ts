/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {animate, group, query, state, style, transition, trigger} from '@angular/animations';
import {AnimationDriver, ɵAnimationEngine, ɵWebAnimationsDriver, ɵWebAnimationsPlayer, ɵsupportsWebAnimations} from '@angular/animations/browser';
import {TransitionAnimationPlayer} from '@angular/animations/browser/src/render/transition_animation_engine';
import {AnimationGroupPlayer} from '@angular/animations/src/players/animation_group_player';
import {Component} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {browserDetection} from '@angular/platform-browser/testing/src/browser_util';

import {TestBed} from '../../testing';

(function() {
  // these tests are only mean't to be run within the DOM (for now)
  // Buggy in Chromium 39, see https://github.com/angular/angular/issues/15793
  if (typeof Element == 'undefined' || !ɵsupportsWebAnimations()) return;

  describe('animation integration tests using web animations', function() {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{provide: AnimationDriver, useClass: ɵWebAnimationsDriver}],
        imports: [BrowserAnimationsModule]
      });
    });

    it('should compute (*) animation styles for a container that is being removed', () => {
      @Component({
        selector: 'ani-cmp',
        template: `
          <div @auto *ngIf="exp">
            <div style="line-height:20px;">1</div>
            <div style="line-height:20px;">2</div>
            <div style="line-height:20px;">3</div>
            <div style="line-height:20px;">4</div>
            <div style="line-height:20px;">5</div>
          </div>
        `,
        animations: [trigger(
            'auto',
            [
              state('void', style({height: '0px'})), state('*', style({height: '*'})),
              transition('* => *', animate(1000))
            ])]
      })
      class Cmp {
        public exp: boolean = false;
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      cmp.exp = true;
      fixture.detectChanges();

      expect(engine.players.length).toEqual(1);
      let webPlayer = engine.players[0].getRealPlayer() as ɵWebAnimationsPlayer;

      expect(webPlayer.keyframes).toEqual([
        {height: '0px', offset: 0}, {height: '100px', offset: 1}
      ]);

      webPlayer.finish();

      if (!browserDetection.isOldChrome) {
        cmp.exp = false;
        fixture.detectChanges();
        engine.flush();

        expect(engine.players.length).toEqual(1);
        webPlayer = engine.players[0].getRealPlayer() as ɵWebAnimationsPlayer;

        expect(webPlayer.keyframes).toEqual([
          {height: '100px', offset: 0}, {height: '0px', offset: 1}
        ]);
      }
    });

    it('should compute (!) animation styles for a container that is being inserted', () => {
      @Component({
        selector: 'ani-cmp',
        template: `
          <div @auto *ngIf="exp">
            <div style="line-height:20px;">1</div>
            <div style="line-height:20px;">2</div>
            <div style="line-height:20px;">3</div>
            <div style="line-height:20px;">4</div>
            <div style="line-height:20px;">5</div>
          </div>
        `,
        animations: [trigger(
            'auto',
            [transition(
                ':enter', [style({height: '!'}), animate(1000, style({height: '120px'}))])])]
      })
      class Cmp {
        public exp: boolean = false;
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      cmp.exp = true;
      fixture.detectChanges();
      engine.flush();

      expect(engine.players.length).toEqual(1);
      let webPlayer = engine.players[0].getRealPlayer() as ɵWebAnimationsPlayer;

      expect(webPlayer.keyframes).toEqual([
        {height: '100px', offset: 0}, {height: '120px', offset: 1}
      ]);
    });

    it('should compute pre (!) and post (*) animation styles with different dom states', () => {
      @Component({
        selector: 'ani-cmp',
        template: `
            <div [@myAnimation]="exp" #parent>
              <div *ngFor="let item of items" class="child" style="line-height:20px">
                - {{ item }}
              </div>
            </div>
          `,
        animations: [trigger(
            'myAnimation',
            [transition('* => *', [style({height: '!'}), animate(1000, style({height: '*'}))])])]
      })
      class Cmp {
        public exp: number;
        public items = [0, 1, 2, 3, 4];
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      cmp.exp = 1;
      fixture.detectChanges();
      engine.flush();

      expect(engine.players.length).toEqual(1);
      let player = engine.players[0];
      let webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;

      expect(webPlayer.keyframes).toEqual([
        {height: '0px', offset: 0}, {height: '100px', offset: 1}
      ]);

      // we destroy the player because since it has started and is
      // at 0ms duration a height value of `0px` will be extracted
      // from the element and passed into the follow-up animation.
      player.destroy();

      cmp.exp = 2;
      cmp.items = [0, 1, 2, 6];
      fixture.detectChanges();
      engine.flush();

      expect(engine.players.length).toEqual(1);
      player = engine.players[0];
      webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;

      expect(webPlayer.keyframes).toEqual([
        {height: '100px', offset: 0}, {height: '80px', offset: 1}
      ]);
    });

    it('should treat * styles as ! when a removal animation is being rendered', () => {
      @Component({
        selector: 'ani-cmp',
        styles: [`
            .box {
              width: 500px;
              overflow:hidden;
              background:orange;
              line-height:300px;
              font-size:100px;
              text-align:center;
            }
          `],
        template: `
            <button (click)="toggle()">Open / Close</button>
            <hr />
            <div *ngIf="exp" @slide class="box">
            ...
            </div>
          `,
        animations: [trigger(
            'slide',
            [
              state('void', style({height: '0px'})),
              state('*', style({height: '*'})),
              transition('* => *', animate('500ms')),
            ])]
      })
      class Cmp {
        exp = false;

        toggle() { this.exp = !this.exp; }
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      cmp.exp = true;
      fixture.detectChanges();

      let player = engine.players[0] !;
      let webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;
      expect(webPlayer.keyframes).toEqual([
        {height: '0px', offset: 0},
        {height: '300px', offset: 1},
      ]);
      player.finish();

      cmp.exp = false;
      fixture.detectChanges();

      player = engine.players[0] !;
      webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;
      expect(webPlayer.keyframes).toEqual([
        {height: '300px', offset: 0},
        {height: '0px', offset: 1},
      ]);
    });

    it('should treat * styles as ! for queried items that are collected in a container that is being removed',
       () => {
         @Component({
            selector: 'my-app',
            styles: [`
              .list .outer {
                overflow:hidden;
              }
              .list .inner {
                line-height:50px;
              }
            `],
            template: `
              <button (click)="empty()">Empty</button>
              <button (click)="middle()">Middle</button>
              <button (click)="full()">Full</button>
              <hr />
              <div [@list]="exp" class="list">
                <div *ngFor="let item of items" class="outer">
                  <div class="inner">
                    {{ item }}
                  </div>
                </div>
              </div>
            `,
            animations: [
              trigger('list', [
                transition(':enter', []),
                transition('* => empty', [
                  query(':leave', [
                    animate(500, style({ height: '0px' }))
                  ])
                ]),
                transition('* => full', [
                  query(':enter', [
                    style({ height: '0px' }),
                    animate(500, style({ height: '*' }))
                  ])
                ]),
              ])
            ]
        })
        class Cmp {
           items: any[] = [];

           get exp() { return this.items.length ? 'full' : 'empty'; }

           empty() { this.items = []; }

           full() { this.items = [0, 1, 2, 3, 4]; }
         }

         TestBed.configureTestingModule({declarations: [Cmp]});

         const engine = TestBed.get(ɵAnimationEngine);
         const fixture = TestBed.createComponent(Cmp);
         const cmp = fixture.componentInstance;

         cmp.empty();
         fixture.detectChanges();
         let player = engine.players[0] !as TransitionAnimationPlayer;
         player.finish();

         cmp.full();
         fixture.detectChanges();

         player = engine.players[0] !as TransitionAnimationPlayer;
         let queriedPlayers = (player.getRealPlayer() as AnimationGroupPlayer).players;
         expect(queriedPlayers.length).toEqual(5);

         let i = 0;
         for (i = 0; i < queriedPlayers.length; i++) {
           let player = queriedPlayers[i] as ɵWebAnimationsPlayer;
           expect(player.keyframes).toEqual([
             {height: '0px', offset: 0},
             {height: '50px', offset: 1},
           ]);
           player.finish();
         }

         cmp.empty();
         fixture.detectChanges();

         player = engine.players[0] !as TransitionAnimationPlayer;
         queriedPlayers = (player.getRealPlayer() as AnimationGroupPlayer).players;
         expect(queriedPlayers.length).toEqual(5);

         for (i = 0; i < queriedPlayers.length; i++) {
           let player = queriedPlayers[i] as ɵWebAnimationsPlayer;
           expect(player.keyframes).toEqual([
             {height: '50px', offset: 0},
             {height: '0px', offset: 1},
           ]);
         }
       });

    it('should compute intermediate styles properly when an animation is cancelled', () => {
      @Component({
        selector: 'ani-cmp',
        template: `
          <div [@myAnimation]="exp">...</div>
        `,
        animations: [
          trigger(
              'myAnimation',
              [
                transition(
                    '* => a',
                    [
                      style({width: 0, height: 0}),
                      animate('1s', style({width: '300px', height: '600px'})),
                    ]),
                transition('* => b', [animate('1s', style({opacity: 0}))]),
              ]),
        ]
      })
      class Cmp {
        public exp: string;
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      const engine = TestBed.get(ɵAnimationEngine);
      const fixture = TestBed.createComponent(Cmp);
      const cmp = fixture.componentInstance;

      cmp.exp = 'a';
      fixture.detectChanges();

      let player = engine.players[0] !;
      let webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;
      webPlayer.setPosition(0.5);

      cmp.exp = 'b';
      fixture.detectChanges();

      player = engine.players[0] !;
      webPlayer = player.getRealPlayer() as ɵWebAnimationsPlayer;
      expect(approximate(parseFloat(webPlayer.keyframes[0]['width'] as string), 150))
          .toBeLessThan(0.05);
      expect(approximate(parseFloat(webPlayer.keyframes[0]['height'] as string), 300))
          .toBeLessThan(0.05);
    });

    it('should compute intermediate styles properly for multiple queried elements when an animation is cancelled',
       () => {
         @Component({
           selector: 'ani-cmp',
           template: `
          <div [@myAnimation]="exp">
            <div *ngFor="let item of items" class="target"></div>
          </div>
        `,
           animations: [
             trigger(
                 'myAnimation',
                 [
                   transition(
                       '* => full', [query(
                                        '.target',
                                        [
                                          style({width: 0, height: 0}),
                                          animate('1s', style({width: '500px', height: '1000px'})),
                                        ])]),
                   transition(
                       '* => empty', [query('.target', [animate('1s', style({opacity: 0}))])]),
                 ]),
           ]
         })
         class Cmp {
           public exp: string;
           public items: any[] = [];
         }

         TestBed.configureTestingModule({declarations: [Cmp]});

         const engine = TestBed.get(ɵAnimationEngine);
         const fixture = TestBed.createComponent(Cmp);
         const cmp = fixture.componentInstance;

         cmp.exp = 'full';
         cmp.items = [0, 1, 2, 3, 4];
         fixture.detectChanges();

         let player = engine.players[0] !;
         let groupPlayer = player.getRealPlayer() as AnimationGroupPlayer;
         let players = groupPlayer.players;
         expect(players.length).toEqual(5);

         for (let i = 0; i < players.length; i++) {
           const p = players[i] as ɵWebAnimationsPlayer;
           p.setPosition(0.5);
         }

         cmp.exp = 'empty';
         cmp.items = [];
         fixture.detectChanges();

         player = engine.players[0];
         groupPlayer = player.getRealPlayer() as AnimationGroupPlayer;
         players = groupPlayer.players;

         expect(players.length).toEqual(5);
         for (let i = 0; i < players.length; i++) {
           const p = players[i] as ɵWebAnimationsPlayer;
           expect(approximate(parseFloat(p.keyframes[0]['width'] as string), 250))
               .toBeLessThan(0.05);
           expect(approximate(parseFloat(p.keyframes[0]['height'] as string), 500))
               .toBeLessThan(0.05);
         }
       });
  });
})();

function approximate(value: number, target: number) {
  return Math.abs(target - value) / value;
}
