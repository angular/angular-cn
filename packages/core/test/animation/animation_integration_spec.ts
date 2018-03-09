/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AUTO_STYLE, AnimationEvent, AnimationOptions, AnimationPlayer, NoopAnimationPlayer, animate, animateChild, group, keyframes, query, state, style, transition, trigger, ɵPRE_STYLE as PRE_STYLE} from '@angular/animations';
import {AnimationDriver, ɵAnimationEngine, ɵNoopAnimationDriver as NoopAnimationDriver} from '@angular/animations/browser';
import {MockAnimationDriver, MockAnimationPlayer} from '@angular/animations/browser/testing';
import {ChangeDetectorRef, Component, HostBinding, HostListener, RendererFactory2, ViewChild} from '@angular/core';
import {ɵDomRendererFactory2} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {TestBed, fakeAsync, flushMicrotasks} from '../../testing';

const DEFAULT_NAMESPACE_ID = 'id';
const DEFAULT_COMPONENT_ID = '1';

(function() {
  // these tests are only mean't to be run within the DOM (for now)
  if (typeof Element == 'undefined') return;

  describe('animation tests', function() {
    function getLog(): MockAnimationPlayer[] {
      return MockAnimationDriver.log as MockAnimationPlayer[];
    }

    function resetLog() { MockAnimationDriver.log = []; }

    beforeEach(() => {
      resetLog();
      TestBed.configureTestingModule({
        providers: [{provide: AnimationDriver, useClass: MockAnimationDriver}],
        imports: [BrowserAnimationsModule]
      });
    });

    describe('fakeAsync testing', () => {
      it('should only require one flushMicrotasks call to kick off animation callbacks',
         fakeAsync(() => {
           @Component({
             selector: 'cmp',
             template: `
            <div [@myAnimation]="exp" (@myAnimation.start)="cb('start')" (@myAnimation.done)="cb('done')"></div>
          `,
             animations: [trigger(
                 'myAnimation',
                 [transition('* => on, * => off', [animate(1000, style({opacity: 1}))])])]
           })
           class Cmp {
             exp: any = false;
             status: string = '';
             cb(status: string) { this.status = status; }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'on';
           fixture.detectChanges();
           expect(cmp.status).toEqual('');

           flushMicrotasks();
           expect(cmp.status).toEqual('start');

           let player = MockAnimationDriver.log.pop() !;
           player.finish();
           expect(cmp.status).toEqual('done');

           cmp.status = '';
           cmp.exp = 'off';
           fixture.detectChanges();
           expect(cmp.status).toEqual('');

           player = MockAnimationDriver.log.pop() !;
           player.finish();
           expect(cmp.status).toEqual('');
           flushMicrotasks();
           expect(cmp.status).toEqual('done');
         }));

      it('should always run .start callbacks before .done callbacks even for noop animations',
         fakeAsync(() => {
           @Component({
             selector: 'cmp',
             template: `
                <div [@myAnimation]="exp" (@myAnimation.start)="cb('start')" (@myAnimation.done)="cb('done')"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     transition('* => go', []),
                   ]),
             ]
           })
           class Cmp {
             exp: any = false;
             log: string[] = [];
             cb(status: string) { this.log.push(status); }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'go';
           fixture.detectChanges();
           expect(cmp.log).toEqual([]);

           flushMicrotasks();
           expect(cmp.log).toEqual(['start', 'done']);
         }));

      it('should emit the correct totalTime value for a noop-animation', fakeAsync(() => {
           @Component({
             selector: 'cmp',
             template: `
                <div [@myAnimation]="exp" (@myAnimation.start)="cb($event)" (@myAnimation.done)="cb($event)"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     transition(
                         '* => go',
                         [
                           animate('1s', style({opacity: 0})),
                         ]),
                   ]),
             ]
           })
           class Cmp {
             exp: any = false;
             log: AnimationEvent[] = [];
             cb(event: AnimationEvent) { this.log.push(event); }
           }

           TestBed.configureTestingModule({
             declarations: [Cmp],
             providers: [
               {provide: AnimationDriver, useClass: NoopAnimationDriver},
             ],
           });

           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'go';
           fixture.detectChanges();
           expect(cmp.log).toEqual([]);

           flushMicrotasks();
           expect(cmp.log.length).toEqual(2);
           const [start, end] = cmp.log;
           expect(start.totalTime).toEqual(1000);
           expect(end.totalTime).toEqual(1000);
         }));
    });

    describe('component fixture integration', () => {
      describe('whenRenderingDone', () => {
        it('should wait until the animations are finished until continuing', fakeAsync(() => {
             @Component({
               selector: 'cmp',
               template: `
              <div [@myAnimation]="exp"></div>
            `,
               animations: [trigger(
                   'myAnimation', [transition('* => on', [animate(1000, style({opacity: 1}))])])]
             })
             class Cmp {
               exp: any = false;
             }

             TestBed.configureTestingModule({declarations: [Cmp]});
             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;

             let isDone = false;
             fixture.whenRenderingDone().then(() => isDone = true);
             expect(isDone).toBe(false);

             cmp.exp = 'on';
             fixture.detectChanges();
             engine.flush();
             expect(isDone).toBe(false);

             const players = engine.players;
             expect(players.length).toEqual(1);
             players[0].finish();
             expect(isDone).toBe(false);

             flushMicrotasks();
             expect(isDone).toBe(true);
           }));

        it('should wait for a noop animation to finish before continuing', fakeAsync(() => {
             @Component({
               selector: 'cmp',
               template: `
              <div [@myAnimation]="exp"></div>
            `,
               animations: [trigger(
                   'myAnimation', [transition('* => on', [animate(1000, style({opacity: 1}))])])]
             })
             class Cmp {
               exp: any = false;
             }

             TestBed.configureTestingModule({
               providers: [{provide: AnimationDriver, useClass: NoopAnimationDriver}],
               declarations: [Cmp]
             });

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;

             let isDone = false;
             fixture.whenRenderingDone().then(() => isDone = true);
             expect(isDone).toBe(false);

             cmp.exp = 'off';
             fixture.detectChanges();
             engine.flush();
             expect(isDone).toBe(false);

             flushMicrotasks();
             expect(isDone).toBe(true);
           }));

        it('should wait for active animations to finish even if they have already started',
           fakeAsync(() => {
             @Component({
               selector: 'cmp',
               template: `
                <div [@myAnimation]="exp"></div>
              `,
               animations: [trigger(
                   'myAnimation', [transition('* => on', [animate(1000, style({opacity: 1}))])])]
             })
             class Cmp {
               exp: any = false;
             }

             TestBed.configureTestingModule({declarations: [Cmp]});
             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;
             cmp.exp = 'on';
             fixture.detectChanges();
             engine.flush();

             const players = engine.players;
             expect(players.length).toEqual(1);

             let isDone = false;
             fixture.whenRenderingDone().then(() => isDone = true);
             flushMicrotasks();
             expect(isDone).toBe(false);

             players[0].finish();
             flushMicrotasks();
             expect(isDone).toBe(true);
           }));
      });
    });

    describe('animation triggers', () => {
      it('should trigger a state change animation from void => state', () => {
        @Component({
          selector: 'if-cmp',
          template: `
          <div *ngIf="exp" [@myAnimation]="exp"></div>
        `,
          animations: [trigger(
              'myAnimation',
              [transition(
                  'void => *', [style({'opacity': '0'}), animate(500, style({'opacity': '1'}))])])],
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = true;
        fixture.detectChanges();
        engine.flush();

        expect(getLog().length).toEqual(1);
        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, opacity: '0'}, {offset: 1, opacity: '1'}
        ]);
      });

      it('should allow a transition to use a function to determine what method to run', () => {
        let valueToMatch = '';
        const transitionFn =
            (fromState: string, toState: string) => { return toState == valueToMatch; };

        @Component({
          selector: 'if-cmp',
          template: '<div [@myAnimation]="exp"></div>',
          animations: [
            trigger('myAnimation', [transition(
                                       transitionFn,
                                       [style({opacity: 0}), animate(1234, style({opacity: 1}))])]),
          ]
        })
        class Cmp {
          exp: any = '';
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        valueToMatch = cmp.exp = 'something';
        fixture.detectChanges();

        let players = getLog();
        expect(players.length).toEqual(1);
        let [p1] = players;
        expect(p1.totalTime).toEqual(1234);
        resetLog();

        valueToMatch = 'something-else';
        cmp.exp = 'this-wont-match';
        fixture.detectChanges();

        players = getLog();
        expect(players.length).toEqual(0);
      });

      it('should allow a state value to be `0`', () => {
        @Component({
          selector: 'if-cmp',
          template: `
            <div [@myAnimation]="exp"></div>
          `,
          animations: [trigger(
              'myAnimation',
              [
                transition(
                    '0 => 1', [style({height: '0px'}), animate(1234, style({height: '100px'}))]),
                transition(
                    '* => 1', [style({width: '0px'}), animate(4567, style({width: '100px'}))])
              ])]
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = 0;
        fixture.detectChanges();
        engine.flush();
        resetLog();

        cmp.exp = 1;
        fixture.detectChanges();
        engine.flush();

        expect(getLog().length).toEqual(1);
        const player = getLog().pop() !;
        expect(player.duration).toEqual(1234);
      });

      it('should always cancel the previous transition if a follow-up transition is not matched',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div [@myAnimation]="exp" (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
        `,
             animations: [trigger(
                 'myAnimation',
                 [transition(
                     'a => b', [style({'opacity': '0'}), animate(500, style({'opacity': '1'}))])])],
           })
           class Cmp {
             exp: any;
             startEvent: any;
             doneEvent: any;

             callback(event: any) {
               if (event.phaseName == 'done') {
                 this.doneEvent = event;
               } else {
                 this.startEvent = event;
               }
             }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'a';
           fixture.detectChanges();
           engine.flush();
           expect(getLog().length).toEqual(0);
           expect(engine.players.length).toEqual(0);

           flushMicrotasks();
           expect(cmp.startEvent.toState).toEqual('a');
           expect(cmp.startEvent.totalTime).toEqual(0);
           expect(cmp.startEvent.toState).toEqual('a');
           expect(cmp.startEvent.totalTime).toEqual(0);
           resetLog();

           cmp.exp = 'b';
           fixture.detectChanges();
           engine.flush();

           const players = getLog();
           expect(players.length).toEqual(1);
           expect(engine.players.length).toEqual(1);

           flushMicrotasks();
           expect(cmp.startEvent.toState).toEqual('b');
           expect(cmp.startEvent.totalTime).toEqual(500);
           expect(cmp.startEvent.toState).toEqual('b');
           expect(cmp.startEvent.totalTime).toEqual(500);
           resetLog();

           let completed = false;
           players[0].onDone(() => completed = true);

           cmp.exp = 'c';
           fixture.detectChanges();
           engine.flush();

           expect(engine.players.length).toEqual(0);
           expect(getLog().length).toEqual(0);

           flushMicrotasks();
           expect(cmp.startEvent.toState).toEqual('c');
           expect(cmp.startEvent.totalTime).toEqual(0);
           expect(cmp.startEvent.toState).toEqual('c');
           expect(cmp.startEvent.totalTime).toEqual(0);

           expect(completed).toBe(true);
         }));

      it('should always fire inner callbacks even if no animation is fired when a view is inserted',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div *ngIf="exp">
            <div @myAnimation (@myAnimation.start)="track($event)" (@myAnimation.done)="track($event)"></div>
          </div>
        `,
             animations: [
               trigger('myAnimation', []),
             ]
           })
           class Cmp {
             exp: any = false;
             log: string[] = [];
             track(event: any) { this.log.push(`${event.triggerName}-${event.phaseName}`); }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.log).toEqual([]);

           cmp.exp = true;
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.log).toEqual(['myAnimation-start', 'myAnimation-done']);
         }));

      it('should only turn a view removal as into `void` state transition', () => {
        @Component({
          selector: 'if-cmp',
          template: `
          <div *ngIf="exp1" [@myAnimation]="exp2"></div>
        `,
          animations: [trigger(
              'myAnimation',
              [
                transition(
                    'void <=> *', [style({width: '0px'}), animate(1000, style({width: '100px'}))]),
                transition(
                    '* => *', [style({height: '0px'}), animate(1000, style({height: '100px'}))]),
              ])]
        })
        class Cmp {
          exp1: any = false;
          exp2: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        function resetState() {
          cmp.exp2 = 'something';
          fixture.detectChanges();
          engine.flush();
          resetLog();
        }

        cmp.exp1 = true;
        cmp.exp2 = null;

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, width: '0px'}, {offset: 1, width: '100px'}
        ]);

        resetState();
        cmp.exp2 = false;

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, height: '0px'}, {offset: 1, height: '100px'}
        ]);

        resetState();
        cmp.exp2 = 0;

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, height: '0px'}, {offset: 1, height: '100px'}
        ]);

        resetState();
        cmp.exp2 = '';

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, height: '0px'}, {offset: 1, height: '100px'}
        ]);

        resetState();
        cmp.exp2 = undefined;

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, height: '0px'}, {offset: 1, height: '100px'}
        ]);

        resetState();
        cmp.exp1 = false;
        cmp.exp2 = 'abc';

        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, width: '0px'}, {offset: 1, width: '100px'}
        ]);
      });

      it('should stringify boolean triggers to `1` and `0`', () => {
        @Component({
          selector: 'if-cmp',
          template: `
          <div [@myAnimation]="exp"></div>
        `,
          animations: [trigger(
              'myAnimation',
              [
                transition('void => 1', [style({opacity: 0}), animate(1000, style({opacity: 1}))]),
                transition('1 => 0', [style({opacity: 1}), animate(1000, style({opacity: 0}))])
              ])]
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.exp = true;
        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, opacity: '0'}, {offset: 1, opacity: '1'}
        ]);

        cmp.exp = false;
        fixture.detectChanges();
        engine.flush();

        expect(getLog().pop() !.keyframes).toEqual([
          {offset: 0, opacity: '1'}, {offset: 1, opacity: '0'}
        ]);
      });

      it('should understand boolean values as `true` and `false` for transition animations', () => {
        @Component({
          selector: 'if-cmp',
          template: `
          <div [@myAnimation]="exp"></div>
        `,
          animations: [
            trigger(
                'myAnimation',
                [
                  transition(
                      'true => false',
                      [
                        style({opacity: 0}),
                        animate(1234, style({opacity: 1})),
                      ]),
                  transition(
                      'false => true',
                      [
                        style({opacity: 1}),
                        animate(4567, style({opacity: 0})),
                      ])
                ]),
          ]
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.exp = true;
        fixture.detectChanges();

        cmp.exp = false;
        fixture.detectChanges();

        let players = getLog();
        expect(players.length).toEqual(1);
        let [player] = players;

        expect(player.duration).toEqual(1234);
      });

      it('should understand boolean values as `true` and `false` for transition animations and apply the corresponding state() value',
         () => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div [@myAnimation]="exp"></div>
        `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     state('true', style({color: 'red'})),
                     state('false', style({color: 'blue'})),
                     transition(
                         'true <=> false',
                         [
                           animate(1000, style({color: 'gold'})),
                           animate(1000),
                         ]),
                   ]),
             ]
           })
           class Cmp {
             exp: any = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = false;
           fixture.detectChanges();

           cmp.exp = true;
           fixture.detectChanges();

           let players = getLog();
           expect(players.length).toEqual(1);
           let [player] = players;

           expect(player.keyframes).toEqual([
             {color: 'blue', offset: 0},
             {color: 'gold', offset: 0.5},
             {color: 'red', offset: 1},
           ]);
         });

      it('should not throw an error if a trigger with the same name exists in separate components',
         () => {
           @Component({selector: 'cmp1', template: '...', animations: [trigger('trig', [])]})
           class Cmp1 {
           }

           @Component({selector: 'cmp2', template: '...', animations: [trigger('trig', [])]})
           class Cmp2 {
           }

           TestBed.configureTestingModule({declarations: [Cmp1, Cmp2]});
           const cmp1 = TestBed.createComponent(Cmp1);
           const cmp2 = TestBed.createComponent(Cmp2);
         });

      describe('host bindings', () => {
        it('should trigger a state change animation from state => state on the component host element',
           fakeAsync(() => {
             @Component({
               selector: 'my-cmp',
               template: '...',
               animations: [trigger(
                   'myAnimation',
                   [transition(
                       'a => b',
                       [style({'opacity': '0'}), animate(500, style({'opacity': '1'}))])])],
             })
             class Cmp {
               @HostBinding('@myAnimation')
               exp = 'a';
             }

             TestBed.configureTestingModule({declarations: [Cmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;
             fixture.detectChanges();
             engine.flush();
             expect(getLog().length).toEqual(0);

             cmp.exp = 'b';
             fixture.detectChanges();
             engine.flush();
             expect(getLog().length).toEqual(1);

             const data = getLog().pop() !;
             expect(data.element).toEqual(fixture.elementRef.nativeElement);
             expect(data.keyframes).toEqual([{offset: 0, opacity: '0'}, {offset: 1, opacity: '1'}]);
           }));

        // nonAnimationRenderer => animationRenderer
        it('should trigger a leave animation when the inner components host binding updates',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               template: `
                <child-cmp *ngIf="exp"></child-cmp>
              `
             })
             class ParentCmp {
               public exp = true;
             }

             @Component({
               selector: 'child-cmp',
               template: '...',
               animations: [trigger(
                   'host',
                   [transition(
                       ':leave', [style({opacity: 1}), animate(1000, style({opacity: 0}))])])]
             })
             class ChildCmp {
               @HostBinding('@host') public hostAnimation = true;
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             fixture.detectChanges();
             engine.flush();
             expect(getLog().length).toEqual(0);

             cmp.exp = false;
             fixture.detectChanges();
             expect(fixture.debugElement.nativeElement.children.length).toBe(1);

             engine.flush();
             expect(getLog().length).toEqual(1);

             const [player] = getLog();
             expect(player.keyframes).toEqual([
               {opacity: '1', offset: 0},
               {opacity: '0', offset: 1},
             ]);

             player.finish();
             expect(fixture.debugElement.nativeElement.children.length).toBe(0);
           }));

        // animationRenderer => nonAnimationRenderer
        it('should trigger a leave animation when the outer components element binding updates on the host component element',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               animations: [trigger(
                   'host',
                   [transition(
                       ':leave', [style({opacity: 1}), animate(1000, style({opacity: 0}))])])],
               template: `
                <child-cmp *ngIf="exp" @host></child-cmp>
              `
             })
             class ParentCmp {
               public exp = true;
             }

             @Component({
               selector: 'child-cmp',
               template: '...',
             })
             class ChildCmp {
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             fixture.detectChanges();
             engine.flush();
             expect(getLog().length).toEqual(0);

             cmp.exp = false;
             fixture.detectChanges();
             expect(fixture.debugElement.nativeElement.children.length).toBe(1);

             engine.flush();
             expect(getLog().length).toEqual(1);

             const [player] = getLog();
             expect(player.keyframes).toEqual([
               {opacity: '1', offset: 0},
               {opacity: '0', offset: 1},
             ]);

             player.finish();
             flushMicrotasks();
             expect(fixture.debugElement.nativeElement.children.length).toBe(0);
           }));

        // animationRenderer => animationRenderer
        it('should trigger a leave animation when both the inner and outer components trigger on the same element',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               animations: [trigger(
                   'host',
                   [transition(
                       ':leave',
                       [style({height: '100px'}), animate(1000, style({height: '0px'}))])])],
               template: `
                <child-cmp *ngIf="exp" @host></child-cmp>
              `
             })
             class ParentCmp {
               public exp = true;
             }

             @Component({
               selector: 'child-cmp',
               template: '...',
               animations: [trigger(
                   'host', [transition(
                               ':leave',
                               [style({width: '100px'}), animate(1000, style({width: '0px'}))])])]
             })
             class ChildCmp {
               @HostBinding('@host') public hostAnimation = true;
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             fixture.detectChanges();
             engine.flush();
             expect(getLog().length).toEqual(0);

             cmp.exp = false;
             fixture.detectChanges();
             expect(fixture.debugElement.nativeElement.children.length).toBe(1);

             engine.flush();
             expect(getLog().length).toEqual(2);

             const [p1, p2] = getLog();
             expect(p1.keyframes).toEqual([
               {width: '100px', offset: 0},
               {width: '0px', offset: 1},
             ]);

             expect(p2.keyframes).toEqual([
               {height: '100px', offset: 0},
               {height: '0px', offset: 1},
             ]);

             p1.finish();
             p2.finish();
             flushMicrotasks();
             expect(fixture.debugElement.nativeElement.children.length).toBe(0);
           }));

        it('should not throw when the host element is removed and no animation triggers',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               template: `
                <child-cmp *ngIf="exp"></child-cmp>
              `
             })
             class ParentCmp {
               public exp = true;
             }

             @Component({
               selector: 'child-cmp',
               template: '...',
               animations: [trigger('host', [transition('a => b', [style({height: '100px'})])])],
             })
             class ChildCmp {
               @HostBinding('@host') public hostAnimation = 'a';
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             fixture.detectChanges();
             expect(fixture.debugElement.nativeElement.children.length).toBe(1);

             engine.flush();
             expect(getLog().length).toEqual(0);

             cmp.exp = false;
             fixture.detectChanges();
             engine.flush();
             flushMicrotasks();
             expect(getLog().length).toEqual(0);
             expect(fixture.debugElement.nativeElement.children.length).toBe(0);

             flushMicrotasks();
             expect(fixture.debugElement.nativeElement.children.length).toBe(0);
           }));

        it('should properly evaluate pre/auto-style values when components are inserted/removed which contain host animations',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               template: `
                <child-cmp *ngFor="let item of items"></child-cmp>
              `
             })
             class ParentCmp {
               items: any[] = [1, 2, 3, 4, 5];
             }

             @Component({
               selector: 'child-cmp',
               template: '... child ...',
               animations:
                   [trigger('host', [transition(':leave', [animate(1000, style({opacity: 0}))])])]
             })
             class ChildCmp {
               @HostBinding('@host') public hostAnimation = 'a';
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             const element = fixture.nativeElement;
             fixture.detectChanges();

             cmp.items = [0, 2, 4, 6];  // 1,3,5 get removed
             fixture.detectChanges();

             const items = element.querySelectorAll('child-cmp');
             for (let i = 0; i < items.length; i++) {
               const item = items[i];
               expect(item.style['display']).toBeFalsy();
             }
           }));
      });

      it('should cancel and merge in mid-animation styles into the follow-up animation, but only for animation keyframes that start right away',
         () => {
           @Component({
          selector: 'ani-cmp',
          template: `
          <div [@myAnimation]="exp"></div>
        `,
          animations: [trigger(
              'myAnimation',
              [
                transition(
                    'a => b',
                    [
                      style({'opacity': '0'}),
                      animate(500, style({'opacity': '1'})),
                    ]),
                transition(
                    'b => c',
                    [
                      group([
                        animate(500, style({'width': '100px'})),
                        animate(500, style({'height': '100px'})),
                      ]),
                      animate(500, keyframes([
                        style({'opacity': '0'}),
                        style({'opacity': '1'})
                      ]))
                    ]),
              ])],
        })
        class Cmp {
             exp: any = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'a';
           fixture.detectChanges();
           engine.flush();
           expect(getLog().length).toEqual(0);
           resetLog();

           cmp.exp = 'b';
           fixture.detectChanges();
           engine.flush();
           expect(getLog().length).toEqual(1);
           resetLog();

           cmp.exp = 'c';
           fixture.detectChanges();
           engine.flush();

           const players = getLog();
           expect(players.length).toEqual(3);
           const [p1, p2, p3] = players;
           expect(p1.previousStyles).toEqual({opacity: AUTO_STYLE});
           expect(p2.previousStyles).toEqual({opacity: AUTO_STYLE});
           expect(p3.previousStyles).toEqual({});
         });

      it('should provide the styling of previous players that are grouped', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
          <div [@myAnimation]="exp"></div>
        `,
          animations: [trigger(
              'myAnimation',
              [
                transition(
                    '1 => 2',
                    [
                      group([
                        animate(500, style({'width': '100px'})),
                        animate(500, style({'height': '100px'})),
                      ]),
                      animate(500, keyframes([
                        style({'opacity': '0'}),
                        style({'opacity': '1'})
                      ]))
                    ]),
                transition(
                    '2 => 3',
                    [
                      style({'opacity': '0'}),
                      animate(500, style({'opacity': '1'})),
                    ]),
              ])],
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        fixture.detectChanges();
        engine.flush();

        cmp.exp = '1';
        fixture.detectChanges();
        engine.flush();
        expect(getLog().length).toEqual(0);
        resetLog();

        cmp.exp = '2';
        fixture.detectChanges();
        engine.flush();
        expect(getLog().length).toEqual(3);
        resetLog();

        cmp.exp = '3';
        fixture.detectChanges();
        engine.flush();

        const players = getLog();
        expect(players.length).toEqual(1);
        const player = players[0] as MockAnimationPlayer;
        const pp = player.previousPlayers as MockAnimationPlayer[];

        expect(pp.length).toEqual(3);
        expect(pp[0].currentSnapshot).toEqual({width: AUTO_STYLE});
        expect(pp[1].currentSnapshot).toEqual({height: AUTO_STYLE});
        expect(pp[2].currentSnapshot).toEqual({opacity: AUTO_STYLE});
      });

      it('should provide the styling of previous players that are grouped and queried and make sure match the players with the correct elements',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
          <div class="container" [@myAnimation]="exp">
            <div class="inner"></div>
          </div>
        `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     transition(
                         '1 => 2',
                         [
                           style({fontSize: '10px'}),
                           query(
                               '.inner',
                               [
                                 style({fontSize: '20px'}),
                               ]),
                           animate('1s', style({fontSize: '100px'})),
                           query(
                               '.inner',
                               [
                                 animate('1s', style({fontSize: '200px'})),
                               ]),
                         ]),
                     transition(
                         '2 => 3',
                         [
                           animate('1s', style({fontSize: '0px'})),
                           query(
                               '.inner',
                               [
                                 animate('1s', style({fontSize: '0px'})),
                               ]),
                         ]),
                   ]),
             ],
           })
           class Cmp {
             exp: any = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           fixture.detectChanges();

           cmp.exp = '1';
           fixture.detectChanges();
           resetLog();

           cmp.exp = '2';
           fixture.detectChanges();
           resetLog();

           cmp.exp = '3';
           fixture.detectChanges();
           const players = getLog();
           expect(players.length).toEqual(2);
           const [p1, p2] = players as MockAnimationPlayer[];

           const pp1 = p1.previousPlayers as MockAnimationPlayer[];
           expect(p1.element.classList.contains('container')).toBeTruthy();
           for (let i = 0; i < pp1.length; i++) {
             expect(pp1[i].element).toEqual(p1.element);
           }

           const pp2 = p2.previousPlayers as MockAnimationPlayer[];
           expect(p2.element.classList.contains('inner')).toBeTruthy();
           for (let i = 0; i < pp2.length; i++) {
             expect(pp2[i].element).toEqual(p2.element);
           }
         });

      it('should properly balance styles between states even if there are no destination state styles',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div @myAnimation *ngIf="exp"></div>
          `,
             animations: [trigger(
                 'myAnimation',
                 [
                   state('void', style({opacity: 0, width: '0px', height: '0px'})),
                   transition(':enter', animate(1000))
                 ])]
           })
           class Cmp {
             exp: boolean = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = true;

           fixture.detectChanges();
           engine.flush();

           const [p1] = getLog();
           expect(p1.keyframes).toEqual([
             {opacity: '0', width: '0px', height: '0px', offset: 0},
             {opacity: AUTO_STYLE, width: AUTO_STYLE, height: AUTO_STYLE, offset: 1}
           ]);
         });

      it('should not apply the destination styles if the final animate step already contains styles',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div @myAnimation *ngIf="exp"></div>
          `,
             animations: [trigger(
                 'myAnimation',
                 [
                   state('void', style({color: 'red'})), state('*', style({color: 'blue'})),
                   transition(
                       ':enter',
                       [style({fontSize: '0px '}), animate(1000, style({fontSize: '100px'}))])
                 ])]
           })
           class Cmp {
             exp: boolean = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = true;

           fixture.detectChanges();
           engine.flush();

           const players = getLog();
           expect(players.length).toEqual(1);

           // notice how the final color is NOT blue
           expect(players[0].keyframes).toEqual([
             {fontSize: '0px', color: 'red', offset: 0},
             {fontSize: '100px', color: 'red', offset: 1}
           ]);
         });

      it('should invoke an animation trigger that is state-less', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div *ngFor="let item of items" @myAnimation></div>
          `,
          animations: [trigger(
              'myAnimation',
              [transition(':enter', [style({opacity: 0}), animate(1000, style({opacity: 1}))])])]
        })
        class Cmp {
          items: number[] = [];
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.items = [1, 2, 3, 4, 5];
        fixture.detectChanges();
        engine.flush();
        expect(getLog().length).toEqual(5);

        for (let i = 0; i < 5; i++) {
          const item = getLog()[i];
          expect(item.duration).toEqual(1000);
          expect(item.keyframes).toEqual([{opacity: '0', offset: 0}, {opacity: '1', offset: 1}]);
        }
      });

      it('should retain styles on the element once the animation is complete', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div #green @green></div>
          `,
          animations: [trigger(
              'green',
              [
                state('*', style({backgroundColor: 'green'})), transition('* => *', animate(500))
              ])]
        })
        class Cmp {
          @ViewChild('green') public element: any;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        engine.flush();

        const player = engine.players.pop();
        player.finish();

        expect(getDOM().hasStyle(cmp.element.nativeElement, 'background-color', 'green'))
            .toBeTruthy();
      });

      it('should animate removals of nodes to the `void` state for each animation trigger, but treat all auto styles as pre styles',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div *ngIf="exp" class="ng-if" [@trig1]="exp2" @trig2></div>
          `,
             animations: [
               trigger(
                   'trig1', [transition('state => void', [animate(1000, style({opacity: 0}))])]),
               trigger('trig2', [transition(':leave', [animate(1000, style({width: '0px'}))])])
             ]
           })
           class Cmp {
             public exp = true;
             public exp2 = 'state';
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = true;
           fixture.detectChanges();
           engine.flush();
           resetLog();

           const element = getDOM().querySelector(fixture.nativeElement, '.ng-if');
           assertHasParent(element, true);

           cmp.exp = false;
           fixture.detectChanges();
           engine.flush();

           assertHasParent(element, true);

           expect(getLog().length).toEqual(2);

           const player2 = getLog().pop() !;
           const player1 = getLog().pop() !;

           expect(player2.keyframes).toEqual([
             {width: PRE_STYLE, offset: 0},
             {width: '0px', offset: 1},
           ]);

           expect(player1.keyframes).toEqual([
             {opacity: PRE_STYLE, offset: 0}, {opacity: '0', offset: 1}
           ]);

           player2.finish();
           player1.finish();
           assertHasParent(element, false);
         });

      it('should properly cancel all existing animations when a removal occurs', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div *ngIf="exp" [@myAnimation]="exp"></div>
          `,
          animations: [
            trigger(
                'myAnimation',
                [
                  transition(
                      '* => go', [style({width: '0px'}), animate(1000, style({width: '100px'}))]),
                ]),
          ]
        })
        class Cmp {
          public exp: string|null;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = 'go';
        fixture.detectChanges();
        engine.flush();
        expect(getLog().length).toEqual(1);
        const [player1] = getLog();
        resetLog();

        let finished = false;
        player1.onDone(() => finished = true);

        let destroyed = false;
        player1.onDestroy(() => destroyed = true);

        cmp.exp = null;
        fixture.detectChanges();
        engine.flush();

        expect(finished).toBeTruthy();
        expect(destroyed).toBeTruthy();
      });

      it('should not run inner child animations when a parent is set to be removed', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div *ngIf="exp" class="parent" >
              <div [@myAnimation]="exp2"></div>
            </div>
          `,
          animations: [trigger(
              'myAnimation', [transition('a => b', [animate(1000, style({width: '0px'}))])])]
        })
        class Cmp {
          public exp = true;
          public exp2 = '0';
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.exp = true;
        cmp.exp2 = 'a';
        fixture.detectChanges();
        engine.flush();
        resetLog();

        cmp.exp = false;
        cmp.exp2 = 'b';
        fixture.detectChanges();
        engine.flush();
        expect(getLog().length).toEqual(0);
      });

      it('should cancel all active inner child animations when a parent removal animation is set to go',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div *ngIf="exp1" @parent>
              <div [@child]="exp2" class="child1"></div>
              <div [@child]="exp2" class="child2"></div>
            </div>
          `,
             animations: [
               trigger('parent', [transition(
                                     ':leave',
                                     [style({opacity: 0}), animate(1000, style({opacity: 1}))])]),
               trigger('child', [transition(
                                    'a => b',
                                    [style({opacity: 0}), animate(1000, style({opacity: 1}))])])
             ]
           })
           class Cmp {
             public exp1: any;
             public exp2: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp1 = true;
           cmp.exp2 = 'a';
           fixture.detectChanges();
           engine.flush();
           resetLog();

           cmp.exp2 = 'b';
           fixture.detectChanges();
           engine.flush();

           let players = getLog();
           expect(players.length).toEqual(2);
           const [p1, p2] = players;

           let count = 0;
           p1.onDone(() => count++);
           p2.onDone(() => count++);

           cmp.exp1 = false;
           fixture.detectChanges();
           engine.flush();

           expect(count).toEqual(2);
         });

      it('should destroy inner animations when a parent node is set for removal', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div #parent class="parent">
              <div [@child]="exp" class="child1"></div>
              <div [@child]="exp" class="child2"></div>
            </div>
          `,
          animations: [trigger(
              'child',
              [transition('a => b', [style({opacity: 0}), animate(1000, style({opacity: 1}))])])]
        })
        class Cmp {
          public exp: any;

          @ViewChild('parent') public parentElement: any;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine) as ɵAnimationEngine;
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        const someTrigger = trigger('someTrigger', []);
        const hostElement = fixture.nativeElement;
        engine.register(DEFAULT_NAMESPACE_ID, hostElement);
        engine.registerTrigger(
            DEFAULT_COMPONENT_ID, DEFAULT_NAMESPACE_ID, hostElement, someTrigger.name, someTrigger);

        cmp.exp = 'a';
        fixture.detectChanges();
        engine.flush();
        resetLog();

        cmp.exp = 'b';
        fixture.detectChanges();
        engine.flush();

        const players = getLog();
        expect(players.length).toEqual(2);
        const [p1, p2] = players;

        let count = 0;
        p1.onDone(() => count++);
        p2.onDone(() => count++);

        engine.onRemove(DEFAULT_NAMESPACE_ID, cmp.parentElement.nativeElement, null);
        expect(count).toEqual(2);
      });

      it('should allow inner removals to happen when a non removal-based parent animation is set to animate',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div #parent [@parent]="exp1" class="parent">
              <div #child *ngIf="exp2" class="child"></div>
            </div>
          `,
             animations: [trigger(
                 'parent',
                 [transition(
                     'a => b', [style({opacity: 0}), animate(1000, style({opacity: 1}))])])]
           })
           class Cmp {
             public exp1: any;
             public exp2: any;

             @ViewChild('parent') public parent: any;

             @ViewChild('child') public child: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp1 = 'a';
           cmp.exp2 = true;
           fixture.detectChanges();
           engine.flush();
           resetLog();

           cmp.exp1 = 'b';
           fixture.detectChanges();
           engine.flush();

           const player = getLog()[0];
           const p = cmp.parent.nativeElement;
           const c = cmp.child.nativeElement;

           expect(p.contains(c)).toBeTruthy();

           cmp.exp2 = false;
           fixture.detectChanges();
           engine.flush();

           expect(p.contains(c)).toBeFalsy();

           player.finish();

           expect(p.contains(c)).toBeFalsy();
         });

      it('should make inner removals wait until a parent based removal animation has finished',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div #parent *ngIf="exp1" @parent class="parent">
              <div #child1 *ngIf="exp2" class="child1"></div>
              <div #child2 *ngIf="exp2" class="child2"></div>
            </div>
          `,
             animations: [trigger(
                 'parent',
                 [transition(
                     ':leave', [style({opacity: 0}), animate(1000, style({opacity: 1}))])])]
           })
           class Cmp {
             public exp1: any;
             public exp2: any;

             @ViewChild('parent') public parent: any;

             @ViewChild('child1') public child1Elm: any;

             @ViewChild('child2') public child2Elm: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp1 = true;
           cmp.exp2 = true;
           fixture.detectChanges();
           engine.flush();
           resetLog();

           const p = cmp.parent.nativeElement;
           const c1 = cmp.child1Elm.nativeElement;
           const c2 = cmp.child2Elm.nativeElement;

           cmp.exp1 = false;
           cmp.exp2 = false;
           fixture.detectChanges();
           engine.flush();

           expect(p.contains(c1)).toBeTruthy();
           expect(p.contains(c2)).toBeTruthy();

           cmp.exp2 = false;
           fixture.detectChanges();
           engine.flush();

           expect(p.contains(c1)).toBeTruthy();
           expect(p.contains(c2)).toBeTruthy();
         });

      it('should detect trigger changes based on object.value properties', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div [@myAnimation]="{value:exp}"></div>
          `,
          animations: [
            trigger(
                'myAnimation',
                [
                  transition('* => 1', [animate(1234, style({opacity: 0}))]),
                  transition('* => 2', [animate(5678, style({opacity: 0}))]),
                ]),
          ]
        })
        class Cmp {
          public exp: any;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.exp = '1';
        fixture.detectChanges();
        engine.flush();
        let players = getLog();
        expect(players.length).toEqual(1);
        expect(players[0].duration).toEqual(1234);
        resetLog();

        cmp.exp = '2';
        fixture.detectChanges();
        engine.flush();
        players = getLog();
        expect(players.length).toEqual(1);
        expect(players[0].duration).toEqual(5678);
      });

      it('should not render animations when the object expression value is the same as it was previously',
         () => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div [@myAnimation]="{value:exp,params:params}"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     transition('* => *', [animate(1234, style({opacity: 0}))]),
                   ]),
             ]
           })
           class Cmp {
             public exp: any;
             public params: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = '1';
           cmp.params = {};
           fixture.detectChanges();
           engine.flush();
           let players = getLog();
           expect(players.length).toEqual(1);
           expect(players[0].duration).toEqual(1234);
           resetLog();

           cmp.exp = '1';
           cmp.params = {};
           fixture.detectChanges();
           engine.flush();
           players = getLog();
           expect(players.length).toEqual(0);
         });

      it('should update the final state styles when params update even if the expression hasn\'t changed',
         fakeAsync(() => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div [@myAnimation]="{value:exp,params:{color:color}}"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     state('*', style({color: '{{ color }}'}), {params: {color: 'black'}}),
                     transition('* => 1', animate(500))
                   ]),
             ]
           })
           class Cmp {
             public exp: any;
             public color: string|null;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = '1';
           cmp.color = 'red';
           fixture.detectChanges();
           const player = getLog()[0] !;
           const element = player.element;
           player.finish();

           flushMicrotasks();
           expect(getDOM().hasStyle(element, 'color', 'red')).toBeTruthy();

           cmp.exp = '1';
           cmp.color = 'blue';
           fixture.detectChanges();
           resetLog();

           flushMicrotasks();
           expect(getDOM().hasStyle(element, 'color', 'blue')).toBeTruthy();

           cmp.exp = '1';
           cmp.color = null;
           fixture.detectChanges();
           resetLog();

           flushMicrotasks();
           expect(getDOM().hasStyle(element, 'color', 'black')).toBeTruthy();
         }));

      it('should substitute in values if the provided state match is an object with values', () => {
        @Component({
          selector: 'ani-cmp',
          template: `
            <div [@myAnimation]="exp"></div>
          `,
          animations: [trigger(
              'myAnimation',
              [transition(
                  'a => b',
                  [style({opacity: '{{ start }}'}), animate(1000, style({opacity: '{{ end }}'}))],
                  buildParams({start: '0', end: '1'}))])]
        })
        class Cmp {
          public exp: any;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;

        cmp.exp = {value: 'a'};
        fixture.detectChanges();
        engine.flush();
        resetLog();

        cmp.exp = {value: 'b', params: {start: .3, end: .6}};
        fixture.detectChanges();
        engine.flush();
        const player = getLog().pop() !;
        expect(player.keyframes).toEqual([
          {opacity: '0.3', offset: 0}, {opacity: '0.6', offset: 1}
        ]);
      });

      it('should retain substituted styles on the element once the animation is complete if referenced in the final state',
         fakeAsync(() => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div [@myAnimation]="{value:exp, params: { color: color }}"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     state(
                         'start', style({
                           color: '{{ color }}',
                           fontSize: '{{ fontSize }}px',
                           width: '{{ width }}'
                         }),
                         {params: {color: 'red', fontSize: '200', width: '10px'}}),

                     state(
                         'final',
                         style(
                             {color: '{{ color }}', fontSize: '{{ fontSize }}px', width: '888px'}),
                         {params: {color: 'green', fontSize: '50', width: '100px'}}),

                     transition('start => final', animate(500)),
                   ]),
             ]
           })
           class Cmp {
             public exp: any;
             public color: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'start';
           cmp.color = 'red';
           fixture.detectChanges();
           resetLog();

           cmp.exp = 'final';
           cmp.color = 'blue';
           fixture.detectChanges();

           const players = getLog();
           expect(players.length).toEqual(1);
           const [p1] = players;

           expect(p1.keyframes).toEqual([
             {color: 'red', fontSize: '200px', width: '10px', offset: 0},
             {color: 'blue', fontSize: '50px', width: '888px', offset: 1}
           ]);

           const element = p1.element;
           p1.finish();
           flushMicrotasks();

           expect(getDOM().hasStyle(element, 'color', 'blue')).toBeTruthy();
           expect(getDOM().hasStyle(element, 'fontSize', '50px')).toBeTruthy();
           expect(getDOM().hasStyle(element, 'width', '888px')).toBeTruthy();
         }));

      it('should only evaluate final state param substitutions from the expression and state values and not from the transition options ',
         fakeAsync(() => {
           @Component({
             selector: 'ani-cmp',
             template: `
            <div [@myAnimation]="exp"></div>
          `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     state(
                         'start', style({
                           width: '{{ width }}',
                           height: '{{ height }}',
                         }),
                         {params: {width: '0px', height: '0px'}}),

                     state(
                         'final', style({
                           width: '{{ width }}',
                           height: '{{ height }}',
                         }),
                         {params: {width: '100px', height: '100px'}}),

                     transition(
                         'start => final', [animate(500)],
                         {params: {width: '333px', height: '666px'}}),
                   ]),
             ]
           })
           class Cmp {
             public exp: any;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'start';
           fixture.detectChanges();
           resetLog();

           cmp.exp = 'final';
           fixture.detectChanges();

           const players = getLog();
           expect(players.length).toEqual(1);
           const [p1] = players;

           expect(p1.keyframes).toEqual([
             {width: '0px', height: '0px', offset: 0},
             {width: '100px', height: '100px', offset: 1},
           ]);

           const element = p1.element;
           p1.finish();
           flushMicrotasks();

           expect(getDOM().hasStyle(element, 'width', '100px')).toBeTruthy();
           expect(getDOM().hasStyle(element, 'height', '100px')).toBeTruthy();
         }));

      it('should not flush animations twice when an inner component runs change detection', () => {
        @Component({
          selector: 'outer-cmp',
          template: `
            <div *ngIf="exp" @outer></div>
            <inner-cmp #inner></inner-cmp>
          `,
          animations: [trigger(
              'outer',
              [transition(':enter', [style({opacity: 0}), animate('1s', style({opacity: 1}))])])]
        })
        class OuterCmp {
          @ViewChild('inner') public inner: any;
          public exp: any = null;

          update() { this.exp = 'go'; }

          ngDoCheck() {
            if (this.exp == 'go') {
              this.inner.update();
            }
          }
        }

        @Component({
          selector: 'inner-cmp',
          template: `
            <div *ngIf="exp" @inner></div>
          `,
          animations: [trigger('inner', [transition(
                                            ':enter',
                                            [
                                              style({opacity: 0}),
                                              animate('1s', style({opacity: 1})),
                                            ])])]
        })
        class InnerCmp {
          public exp: any;
          constructor(private _ref: ChangeDetectorRef) {}
          update() {
            this.exp = 'go';
            this._ref.detectChanges();
          }
        }

        TestBed.configureTestingModule({declarations: [OuterCmp, InnerCmp]});

        const engine = TestBed.get(ɵAnimationEngine);
        const fixture = TestBed.createComponent(OuterCmp);
        const cmp = fixture.componentInstance;
        fixture.detectChanges();
        expect(getLog()).toEqual([]);

        cmp.update();
        fixture.detectChanges();

        const players = getLog();
        expect(players.length).toEqual(2);
      });

      describe('transition aliases', () => {
        describe(':increment', () => {
          it('should detect when a value has incremented', () => {
            @Component({
              selector: 'if-cmp',
              template: `
          <div [@myAnimation]="exp"></div>
        `,
              animations: [
                trigger(
                    'myAnimation',
                    [
                      transition(
                          ':increment',
                          [
                            animate(1234, style({background: 'red'})),
                          ]),
                    ]),
              ]
            })
            class Cmp {
              exp: number = 0;
            }

            TestBed.configureTestingModule({declarations: [Cmp]});
            const fixture = TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            fixture.detectChanges();
            let players = getLog();
            expect(players.length).toEqual(0);

            cmp.exp++;
            fixture.detectChanges();
            players = getLog();
            expect(players.length).toEqual(1);
            expect(players[0].duration).toEqual(1234);
            resetLog();

            cmp.exp = 5;
            fixture.detectChanges();
            players = getLog();
            expect(players.length).toEqual(1);
            expect(players[0].duration).toEqual(1234);
          });
        });

        describe(':decrement', () => {
          it('should detect when a value has decremented', () => {
            @Component({
              selector: 'if-cmp',
              template: `
          <div [@myAnimation]="exp"></div>
        `,
              animations: [
                trigger(
                    'myAnimation',
                    [
                      transition(
                          ':decrement',
                          [
                            animate(1234, style({background: 'red'})),
                          ]),
                    ]),
              ]
            })
            class Cmp {
              exp: number = 5;
            }

            TestBed.configureTestingModule({declarations: [Cmp]});
            const fixture = TestBed.createComponent(Cmp);
            const cmp = fixture.componentInstance;
            fixture.detectChanges();
            let players = getLog();
            expect(players.length).toEqual(0);

            cmp.exp--;
            fixture.detectChanges();
            players = getLog();
            expect(players.length).toEqual(1);
            expect(players[0].duration).toEqual(1234);
            resetLog();

            cmp.exp = 0;
            fixture.detectChanges();
            players = getLog();
            expect(players.length).toEqual(1);
            expect(players[0].duration).toEqual(1234);
          });
        });
      });
    });

    describe('animation listeners', () => {
      it('should trigger a `start` state change listener for when the animation changes state from void => state',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div *ngIf="exp" [@myAnimation]="exp" (@myAnimation.start)="callback($event)"></div>
        `,
             animations: [trigger(
                 'myAnimation',
                 [transition(
                     'void => *',
                     [style({'opacity': '0'}), animate(500, style({'opacity': '1'}))])])],
           })
           class Cmp {
             exp: any = false;
             event: AnimationEvent;

             callback = (event: any) => { this.event = event; };
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'true';
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.event.triggerName).toEqual('myAnimation');
           expect(cmp.event.phaseName).toEqual('start');
           expect(cmp.event.totalTime).toEqual(500);
           expect(cmp.event.fromState).toEqual('void');
           expect(cmp.event.toState).toEqual('true');
         }));

      it('should trigger a `done` state change listener for when the animation changes state from a => b',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div *ngIf="exp" [@myAnimation123]="exp" (@myAnimation123.done)="callback($event)"></div>
        `,
             animations: [trigger(
                 'myAnimation123',
                 [transition(
                     '* => b', [style({'opacity': '0'}), animate(999, style({'opacity': '1'}))])])],
           })
           class Cmp {
             exp: any = false;
             event: AnimationEvent;

             callback = (event: any) => { this.event = event; };
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'b';
           fixture.detectChanges();
           engine.flush();

           expect(cmp.event).toBeFalsy();

           const player = engine.players.pop();
           player.finish();
           flushMicrotasks();

           expect(cmp.event.triggerName).toEqual('myAnimation123');
           expect(cmp.event.phaseName).toEqual('done');
           expect(cmp.event.totalTime).toEqual(999);
           expect(cmp.event.fromState).toEqual('void');
           expect(cmp.event.toState).toEqual('b');
         }));

      it('should handle callbacks for multiple triggers running simultaneously', fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div [@ani1]="exp1" (@ani1.done)="callback1($event)"></div>
          <div [@ani2]="exp2" (@ani2.done)="callback2($event)"></div>
        `,
             animations: [
               trigger(
                   'ani1',
                   [
                     transition(
                         '* => a',
                         [style({'opacity': '0'}), animate(999, style({'opacity': '1'}))]),
                   ]),
               trigger(
                   'ani2',
                   [
                     transition(
                         '* => b',
                         [style({'width': '0px'}), animate(999, style({'width': '100px'}))]),
                   ])
             ],
           })
           class Cmp {
             exp1: any = false;
             exp2: any = false;
             event1: AnimationEvent;
             event2: AnimationEvent;
             // tslint:disable:semicolon
             callback1 = (event: any) => { this.event1 = event; };
             // tslint:disable:semicolon
             callback2 = (event: any) => { this.event2 = event; };
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp1 = 'a';
           cmp.exp2 = 'b';
           fixture.detectChanges();
           engine.flush();

           expect(cmp.event1).toBeFalsy();
           expect(cmp.event2).toBeFalsy();

           const player1 = engine.players[0];
           const player2 = engine.players[1];

           player1.finish();
           player2.finish();
           expect(cmp.event1).toBeFalsy();
           expect(cmp.event2).toBeFalsy();

           flushMicrotasks();
           expect(cmp.event1.triggerName).toBeTruthy('ani1');
           expect(cmp.event2.triggerName).toBeTruthy('ani2');
         }));

      it('should handle callbacks for multiple triggers running simultaneously on the same element',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
          <div [@ani1]="exp1" (@ani1.done)="callback1($event)" [@ani2]="exp2" (@ani2.done)="callback2($event)"></div>
        `,
             animations: [
               trigger(
                   'ani1',
                   [
                     transition(
                         '* => a',
                         [style({'opacity': '0'}), animate(999, style({'opacity': '1'}))]),
                   ]),
               trigger(
                   'ani2',
                   [
                     transition(
                         '* => b',
                         [style({'width': '0px'}), animate(999, style({'width': '100px'}))]),
                   ])
             ],
           })
           class Cmp {
             exp1: any = false;
             exp2: any = false;
             event1: AnimationEvent;
             event2: AnimationEvent;
             callback1 = (event: any) => { this.event1 = event; };
             callback2 = (event: any) => { this.event2 = event; };
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp1 = 'a';
           cmp.exp2 = 'b';
           fixture.detectChanges();
           engine.flush();

           expect(cmp.event1).toBeFalsy();
           expect(cmp.event2).toBeFalsy();

           const player1 = engine.players[0];
           const player2 = engine.players[1];

           player1.finish();
           player2.finish();
           expect(cmp.event1).toBeFalsy();
           expect(cmp.event2).toBeFalsy();

           flushMicrotasks();
           expect(cmp.event1.triggerName).toBeTruthy('ani1');
           expect(cmp.event2.triggerName).toBeTruthy('ani2');
         }));

      it('should handle a leave animation for multiple triggers even if not all triggers have their own leave transition specified',
         fakeAsync(() => {
           @Component({
             selector: 'if-cmp',
             template: `
               <div *ngIf="exp" @foo @bar>123</div>
             `,
             animations: [
               trigger(
                   'foo',
                   [
                     transition(
                         ':enter',
                         [
                           style({opacity: 0}),
                           animate(1000, style({opacity: 1})),
                         ]),
                   ]),
               trigger(
                   'bar',
                   [
                     transition(
                         ':leave',
                         [
                           animate(1000, style({opacity: 0})),
                         ]),
                   ])
             ],
           })
           class Cmp {
             exp: boolean = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});
           const fixture = TestBed.createComponent(Cmp);
           const elm = fixture.elementRef.nativeElement;
           const cmp = fixture.componentInstance;

           cmp.exp = true;
           fixture.detectChanges();

           let players = getLog();
           expect(players.length).toEqual(1);
           let [p1] = players;
           p1.finish();
           flushMicrotasks();
           expect(elm.innerText.trim()).toEqual('123');

           resetLog();
           cmp.exp = false;
           fixture.detectChanges();

           players = getLog();
           expect(players.length).toEqual(1);
           [p1] = players;
           p1.finish();
           flushMicrotasks();
           expect(elm.innerText.trim()).toEqual('');
         }));

      it('should trigger a state change listener for when the animation changes state from void => state on the host element',
         fakeAsync(() => {
           @Component({
             selector: 'my-cmp',
             template: `...`,
             animations: [trigger(
                 'myAnimation2',
                 [transition(
                     'void => *',
                     [style({'opacity': '0'}), animate(1000, style({'opacity': '1'}))])])],
           })
           class Cmp {
             event: AnimationEvent;

             @HostBinding('@myAnimation2')
             exp: any = false;

             @HostListener('@myAnimation2.start', ['$event'])
             callback = (event: any) => { this.event = event; }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'TRUE';
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.event.triggerName).toEqual('myAnimation2');
           expect(cmp.event.phaseName).toEqual('start');
           expect(cmp.event.totalTime).toEqual(1000);
           expect(cmp.event.fromState).toEqual('void');
           expect(cmp.event.toState).toEqual('TRUE');
         }));

      it('should always fire callbacks even when a transition is not detected', fakeAsync(() => {
           @Component({
             selector: 'my-cmp',
             template: `
              <div [@myAnimation]="exp" (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
            `,
             animations: [trigger('myAnimation', [])]
           })
           class Cmp {
             exp: string;
             log: any[] = [];
             callback = (event: any) => this.log.push(`${event.phaseName} => ${event.toState}`);
           }

           TestBed.configureTestingModule({
             providers: [{provide: AnimationDriver, useClass: NoopAnimationDriver}],
             declarations: [Cmp]
           });

           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = 'a';
           fixture.detectChanges();
           flushMicrotasks();
           expect(cmp.log).toEqual(['start => a', 'done => a']);

           cmp.log = [];
           cmp.exp = 'b';
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.log).toEqual(['start => b', 'done => b']);
         }));

      it('should fire callback events for leave animations even if there is no leave transition',
         fakeAsync(() => {
           @Component({
             selector: 'my-cmp',
             template: `
              <div *ngIf="exp" @myAnimation (@myAnimation.start)="callback($event)" (@myAnimation.done)="callback($event)"></div>
            `,
             animations: [trigger('myAnimation', [])]
           })
           class Cmp {
             exp: boolean = false;
             log: any[] = [];
             callback = (event: any) => {
               const state = event.toState || '_default_';
               this.log.push(`${event.phaseName} => ${state}`);
             }
           }

           TestBed.configureTestingModule({
             providers: [{provide: AnimationDriver, useClass: NoopAnimationDriver}],
             declarations: [Cmp]
           });

           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;

           cmp.exp = true;
           fixture.detectChanges();
           flushMicrotasks();
           expect(cmp.log).toEqual(['start => _default_', 'done => _default_']);

           cmp.log = [];

           cmp.exp = false;
           fixture.detectChanges();
           flushMicrotasks();

           expect(cmp.log).toEqual(['start => void', 'done => void']);
         }));

      it('should fire callbacks on a sub animation once it starts and finishes', fakeAsync(() => {
           @Component({
             selector: 'my-cmp',
             template: `
              <div class="parent"
                  [@parent]="exp1"
                  (@parent.start)="cb('parent-start',$event)"
                  (@parent.done)="cb('parent-done', $event)">
                <div class="child"
                  [@child]="exp2"
                  (@child.start)="cb('child-start',$event)"
                  (@child.done)="cb('child-done', $event)"></div>
              </div>
            `,
             animations: [
               trigger(
                   'parent',
                   [
                     transition(
                         '* => go',
                         [
                           style({width: '0px'}),
                           animate(1000, style({width: '100px'})),
                           query(
                               '.child',
                               [
                                 animateChild({duration: '1s'}),
                               ]),
                           animate(1000, style({width: '0px'})),
                         ]),
                   ]),
               trigger(
                   'child',
                   [
                     transition(
                         '* => go',
                         [
                           style({height: '0px'}),
                           animate(1000, style({height: '100px'})),
                         ]),
                   ])
             ]
           })
           class Cmp {
             log: string[] = [];
             exp1: string;
             exp2: string;

             cb(name: string, event: AnimationEvent) { this.log.push(name); }
           }

           TestBed.configureTestingModule({declarations: [Cmp]});

           const engine = TestBed.get(ɵAnimationEngine);
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp1 = 'go';
           cmp.exp2 = 'go';
           fixture.detectChanges();
           engine.flush();
           flushMicrotasks();

           expect(cmp.log).toEqual(['parent-start', 'child-start']);
           cmp.log = [];

           const players = getLog();
           expect(players.length).toEqual(3);
           const [p1, p2, p3] = players;

           p1.finish();
           flushMicrotasks();
           expect(cmp.log).toEqual([]);

           p2.finish();
           flushMicrotasks();
           expect(cmp.log).toEqual([]);

           p3.finish();
           flushMicrotasks();
           expect(cmp.log).toEqual(['parent-done', 'child-done']);
         }));

      it('should fire callbacks and collect the correct the totalTime and element details for any queried sub animations',
         fakeAsync(
             () => {
               @Component({
          selector: 'my-cmp',
          template: `
              <div class="parent" [@parent]="exp" (@parent.done)="cb('all','done', $event)">
                <div *ngFor="let item of items"
                     class="item item-{{ item }}"
                     @child
                     (@child.start)="cb('c-' + item, 'start', $event)"
                     (@child.done)="cb('c-' + item, 'done', $event)">
                  {{ item }}
                </div>
              </div>
            `,
          animations: [
            trigger('parent', [
              transition('* => go', [
                style({ opacity: 0 }),
                animate('1s', style({ opacity: 1 })),
                query('.item', [
                  style({ opacity: 0 }),
                  animate(1000, style({ opacity: 1 }))
                ]),
                query('.item', [
                  animateChild({ duration: '1.8s', delay: '300ms' })
                ])
              ])
            ]),
            trigger('child', [
              transition(':enter', [
                style({ opacity: 0 }),
                animate(1500, style({ opacity: 1 }))
              ])
            ])
          ]
        })
        class Cmp {
                 log: string[] = [];
                 events: {[name: string]: any} = {};
                 exp: string;
                 items: any = [0, 1, 2, 3];

                 cb(name: string, phase: string, event: AnimationEvent) {
                   this.log.push(name + '-' + phase);
                   this.events[name] = event;
                 }
               }

               TestBed.configureTestingModule({declarations: [Cmp]});

               const engine = TestBed.get(ɵAnimationEngine);
               const fixture = TestBed.createComponent(Cmp);
               const cmp = fixture.componentInstance;
               cmp.exp = 'go';
               fixture.detectChanges();
               engine.flush();
               flushMicrotasks();

               expect(cmp.log).toEqual(['c-0-start', 'c-1-start', 'c-2-start', 'c-3-start']);
               cmp.log = [];

               const players = getLog();
               // 1 + 4 + 4 = 9 players
               expect(players.length).toEqual(9);

               const [pA, pq1a, pq1b, pq1c, pq1d, pq2a, pq2b, pq2c, pq2d] = getLog();
               pA.finish();
               pq1a.finish();
               pq1b.finish();
               pq1c.finish();
               pq1d.finish();
               flushMicrotasks();

               expect(cmp.log).toEqual([]);
               pq2a.finish();
               pq2b.finish();
               pq2c.finish();
               pq2d.finish();
               flushMicrotasks();

               expect(cmp.log).toEqual(
                   ['all-done', 'c-0-done', 'c-1-done', 'c-2-done', 'c-3-done']);

               expect(cmp.events['c-0'].totalTime).toEqual(4100);  // 1000 + 1000 + 1800 + 300
               expect(cmp.events['c-0'].element.innerText.trim()).toEqual('0');
               expect(cmp.events['c-1'].totalTime).toEqual(4100);
               expect(cmp.events['c-1'].element.innerText.trim()).toEqual('1');
               expect(cmp.events['c-2'].totalTime).toEqual(4100);
               expect(cmp.events['c-2'].element.innerText.trim()).toEqual('2');
               expect(cmp.events['c-3'].totalTime).toEqual(4100);
               expect(cmp.events['c-3'].element.innerText.trim()).toEqual('3');
             }));
    });

    describe('animation control flags', () => {
      describe('[@.disabled]', () => {
        it('should disable child animations when set to true', () => {
          @Component({
            selector: 'if-cmp',
            template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp"></div>
              </div>
            `,
            animations: [
              trigger(
                  'myAnimation',
                  [
                    transition(
                        '* => 1, * => 2',
                        [
                          animate(1234, style({width: '100px'})),
                        ]),
                  ]),
            ]
          })
          class Cmp {
            exp: any = false;
            disableExp = false;
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const cmp = fixture.componentInstance;
          fixture.detectChanges();
          resetLog();

          cmp.disableExp = true;
          cmp.exp = '1';
          fixture.detectChanges();

          let players = getLog();
          expect(players.length).toEqual(0);

          cmp.disableExp = false;
          cmp.exp = '2';
          fixture.detectChanges();

          players = getLog();
          expect(players.length).toEqual(1);
          expect(players[0].totalTime).toEqual(1234);
        });

        it('should ensure state() values are applied when an animation is disabled', () => {
          @Component({
            selector: 'if-cmp',
            template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp" #elm></div>
              </div>
            `,
            animations: [
              trigger(
                  'myAnimation',
                  [
                    state('1', style({height: '100px'})), state('2', style({height: '200px'})),
                    state('3', style({height: '300px'})), transition('* => *', animate(500))
                  ]),
            ]
          })
          class Cmp {
            exp: any = false;
            disableExp = false;

            @ViewChild('elm') public element: any;
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const engine = TestBed.get(ɵAnimationEngine);

          function assertHeight(element: any, height: string) {
            expect(element.style['height']).toEqual(height);
          }

          const cmp = fixture.componentInstance;
          const element = cmp.element.nativeElement;
          fixture.detectChanges();

          cmp.disableExp = true;
          cmp.exp = '1';
          fixture.detectChanges();
          assertHeight(element, '100px');

          cmp.exp = '2';
          fixture.detectChanges();
          assertHeight(element, '200px');

          cmp.exp = '3';
          fixture.detectChanges();
          assertHeight(element, '300px');
        });

        it('should disable animations for the element that they are disabled on', () => {
          @Component({
            selector: 'if-cmp',
            template: `
              <div [@.disabled]="disableExp" [@myAnimation]="exp"></div>
            `,
            animations: [
              trigger(
                  'myAnimation',
                  [
                    transition(
                        '* => 1, * => 2',
                        [
                          animate(1234, style({width: '100px'})),
                        ]),
                  ]),
            ]
          })
          class Cmp {
            exp: any = false;
            disableExp = false;
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const cmp = fixture.componentInstance;
          fixture.detectChanges();
          resetLog();

          cmp.disableExp = true;
          cmp.exp = '1';
          fixture.detectChanges();

          let players = getLog();
          expect(players.length).toEqual(0);
          resetLog();

          cmp.disableExp = false;
          cmp.exp = '2';
          fixture.detectChanges();

          players = getLog();
          expect(players.length).toEqual(1);
          expect(players[0].totalTime).toEqual(1234);
        });

        it('should respect inner disabled nodes once a parent becomes enabled', () => {
          @Component({
            selector: 'if-cmp',
            template: `
              <div [@.disabled]="disableParentExp">
                <div [@.disabled]="disableChildExp">
                  <div [@myAnimation]="exp"></div>
                </div>
              </div>
            `,
            animations: [trigger(
                'myAnimation',
                [transition('* => 1, * => 2, * => 3', [animate(1234, style({width: '100px'}))])])]
          })
          class Cmp {
            disableParentExp = false;
            disableChildExp = false;
            exp = '';
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const cmp = fixture.componentInstance;
          fixture.detectChanges();
          resetLog();

          cmp.disableParentExp = true;
          cmp.disableChildExp = true;
          cmp.exp = '1';
          fixture.detectChanges();

          let players = getLog();
          expect(players.length).toEqual(0);

          cmp.disableParentExp = false;
          cmp.exp = '2';
          fixture.detectChanges();

          players = getLog();
          expect(players.length).toEqual(0);

          cmp.disableChildExp = false;
          cmp.exp = '3';
          fixture.detectChanges();

          players = getLog();
          expect(players.length).toEqual(1);
        });

        it('should properly handle dom operations when disabled', () => {
          @Component({
            selector: 'if-cmp',
            template: `
              <div [@.disabled]="disableExp" #parent>
                <div *ngIf="exp" @myAnimation></div>
              </div>
            `,
            animations: [
              trigger(
                  'myAnimation',
                  [
                    transition(
                        ':enter',
                        [
                          style({opacity: 0}),
                          animate(1234, style({opacity: 1})),
                        ]),
                    transition(
                        ':leave',
                        [
                          animate(1234, style({opacity: 0})),
                        ]),
                  ]),
            ]
          })
          class Cmp {
            @ViewChild('parent') public parentElm: any;
            disableExp = false;
            exp = false;
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const cmp = fixture.componentInstance;
          cmp.disableExp = true;
          fixture.detectChanges();
          resetLog();

          const parent = cmp.parentElm !.nativeElement;

          cmp.exp = true;
          fixture.detectChanges();
          expect(getLog().length).toEqual(0);
          expect(parent.childElementCount).toEqual(1);

          cmp.exp = false;
          fixture.detectChanges();
          expect(getLog().length).toEqual(0);
          expect(parent.childElementCount).toEqual(0);
        });

        it('should properly resolve animation event listeners when disabled', fakeAsync(() => {
             @Component({
               selector: 'if-cmp',
               template: `
              <div [@.disabled]="disableExp">
                <div [@myAnimation]="exp" (@myAnimation.start)="startEvent=$event" (@myAnimation.done)="doneEvent=$event"></div>
              </div>
            `,
               animations: [
                 trigger(
                     'myAnimation',
                     [
                       transition(
                           '* => 1, * => 2',
                           [style({opacity: 0}), animate(9876, style({opacity: 1}))]),
                     ]),
               ]
             })
             class Cmp {
               disableExp = false;
               exp = '';
               startEvent: AnimationEvent;
               doneEvent: AnimationEvent;
             }

             TestBed.configureTestingModule({declarations: [Cmp]});

             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;
             cmp.disableExp = true;
             fixture.detectChanges();
             resetLog();
             expect(cmp.startEvent).toBeFalsy();
             expect(cmp.doneEvent).toBeFalsy();

             cmp.exp = '1';
             fixture.detectChanges();
             flushMicrotasks();
             expect(cmp.startEvent.totalTime).toEqual(9876);
             expect(cmp.startEvent.disabled).toBeTruthy();
             expect(cmp.doneEvent.totalTime).toEqual(9876);
             expect(cmp.doneEvent.disabled).toBeTruthy();

             cmp.exp = '2';
             cmp.disableExp = false;
             fixture.detectChanges();
             flushMicrotasks();
             expect(cmp.startEvent.totalTime).toEqual(9876);
             expect(cmp.startEvent.disabled).toBeFalsy();
             // the done event isn't fired because it's an actual animation
           }));

        it('should work when there are no animations on the component handling the disable/enable flag',
           () => {
             @Component({
               selector: 'parent-cmp',
               template: `
              <div [@.disabled]="disableExp">
                <child-cmp #child></child-cmp>
              </div>
                `
             })
             class ParentCmp {
               @ViewChild('child') public child: ChildCmp|null = null;
               disableExp = false;
             }

             @Component({
               selector: 'child-cmp',
               template: `
                <div [@myAnimation]="exp"></div>
                `,
               animations: [trigger(
                   'myAnimation',
                   [transition(
                       '* => go, * => goAgain',
                       [style({opacity: 0}), animate('1s', style({opacity: 1}))])])]
             })
             class ChildCmp {
               public exp = '';
             }

             TestBed.configureTestingModule({declarations: [ParentCmp, ChildCmp]});

             const fixture = TestBed.createComponent(ParentCmp);
             const cmp = fixture.componentInstance;
             cmp.disableExp = true;
             fixture.detectChanges();
             resetLog();

             const child = cmp.child !;
             child.exp = 'go';
             fixture.detectChanges();

             expect(getLog().length).toEqual(0);
             resetLog();

             cmp.disableExp = false;
             child.exp = 'goAgain';
             fixture.detectChanges();
             expect(getLog().length).toEqual(1);
           });

        it('should treat the property as true when the expression is missing', () => {
          @Component({
            selector: 'parent-cmp',
            animations: [
              trigger(
                  'myAnimation',
                  [
                    transition(
                        '* => go',
                        [
                          style({opacity: 0}),
                          animate(500, style({opacity: 1})),
                        ]),
                  ]),
            ],
            template: `
              <div @.disabled>
                <div [@myAnimation]="exp"></div>
              </div>
                `
          })
          class Cmp {
            exp = '';
          }

          TestBed.configureTestingModule({declarations: [Cmp]});

          const fixture = TestBed.createComponent(Cmp);
          const cmp = fixture.componentInstance;
          fixture.detectChanges();
          resetLog();

          cmp.exp = 'go';
          fixture.detectChanges();
          expect(getLog().length).toEqual(0);
        });

        it('should respect parent/sub animations when the respective area in the DOM is disabled',
           fakeAsync(() => {
             @Component({
               selector: 'parent-cmp',
               animations: [
                 trigger(
                     'parent',
                     [
                       transition(
                           '* => empty',
                           [
                             style({opacity: 0}),
                             query(
                                 '@child',
                                 [
                                   animateChild(),
                                 ]),
                             animate('1s', style({opacity: 1})),
                           ]),
                     ]),
                 trigger(
                     'child',
                     [
                       transition(
                           ':leave',
                           [
                             animate('1s', style({opacity: 0})),
                           ]),
                     ]),
               ],
               template: `
              <div [@.disabled]="disableExp" #container>
                <div [@parent]="exp" (@parent.done)="onDone($event)">
                  <div class="item" *ngFor="let item of items" @child (@child.done)="onDone($event)"></div>
                </div>
              </div>
                `
             })
             class Cmp {
               @ViewChild('container') public container: any;

               disableExp = false;
               exp = '';
               items: any[] = [];
               doneLog: any[] = [];

               onDone(event: any) { this.doneLog.push(event); }
             }

             TestBed.configureTestingModule({declarations: [Cmp]});
             const engine = TestBed.get(ɵAnimationEngine);
             const fixture = TestBed.createComponent(Cmp);
             const cmp = fixture.componentInstance;
             cmp.disableExp = true;
             cmp.items = [0, 1, 2, 3, 4];
             fixture.detectChanges();
             flushMicrotasks();

             cmp.exp = 'empty';
             cmp.items = [];
             cmp.doneLog = [];
             fixture.detectChanges();
             flushMicrotasks();

             const elms = cmp.container.nativeElement.querySelectorAll('.item');
             expect(elms.length).toEqual(0);

             expect(cmp.doneLog.length).toEqual(6);
           }));
      });
    });

    describe('animation normalization', () => {
      it('should convert hyphenated properties to camelcase by default', () => {
        @Component({
          selector: 'cmp',
          template: `
               <div [@myAnimation]="exp"></div>
             `,
          animations: [
            trigger(
                'myAnimation',
                [
                  transition(
                      '* => go',
                      [
                        style({'background-color': 'red', height: '100px', fontSize: '100px'}),
                        animate(
                            '1s',
                            style(
                                {'background-color': 'blue', height: '200px', fontSize: '200px'})),
                      ]),
                ]),
          ]
        })
        class Cmp {
          exp: any = false;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});
        const fixture = TestBed.createComponent(Cmp);
        const cmp = fixture.componentInstance;
        cmp.exp = 'go';
        fixture.detectChanges();

        const players = getLog();
        expect(players.length).toEqual(1);
        expect(players[0].keyframes).toEqual([
          {backgroundColor: 'red', height: '100px', fontSize: '100px', offset: 0},
          {backgroundColor: 'blue', height: '200px', fontSize: '200px', offset: 1},
        ]);
      });

      it('should convert hyphenated properties to camelcase by default that are auto/pre style properties',
         () => {
           @Component({
             selector: 'cmp',
             template: `
               <div [@myAnimation]="exp"></div>
             `,
             animations: [
               trigger(
                   'myAnimation',
                   [
                     transition(
                         '* => go',
                         [
                           style({'background-color': AUTO_STYLE, 'font-size': '100px'}),
                           animate(
                               '1s', style({'background-color': 'blue', 'font-size': PRE_STYLE})),
                         ]),
                   ]),
             ]
           })
           class Cmp {
             exp: any = false;
           }

           TestBed.configureTestingModule({declarations: [Cmp]});
           const fixture = TestBed.createComponent(Cmp);
           const cmp = fixture.componentInstance;
           cmp.exp = 'go';
           fixture.detectChanges();

           const players = getLog();
           expect(players.length).toEqual(1);
           expect(players[0].keyframes).toEqual([
             {backgroundColor: AUTO_STYLE, fontSize: '100px', offset: 0},
             {backgroundColor: 'blue', fontSize: PRE_STYLE, offset: 1},
           ]);
         });
    });

    it('should throw neither state() or transition() are used inside of trigger()', () => {
      @Component({
        selector: 'if-cmp',
        template: `
          <div [@myAnimation]="exp"></div>
        `,
        animations: [trigger('myAnimation', [animate(1000, style({width: '100px'}))])]
      })
      class Cmp {
        exp: any = false;
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      expect(() => { TestBed.createComponent(Cmp); })
          .toThrowError(
              /only state\(\) and transition\(\) definitions can sit inside of a trigger\(\)/);
    });

    it('should combine multiple errors together into one exception when an animation fails to be built',
       () => {
         @Component({
           selector: 'if-cmp',
           template: `
          <div [@foo]="fooExp" [@bar]="barExp"></div>
        `,
           animations: [
             trigger(
                 'foo',
                 [
                   transition(':enter', []),
                   transition(
                       '* => *',
                       [
                         query('foo', animate(1000, style({background: 'red'}))),
                       ]),
                 ]),
             trigger(
                 'bar',
                 [
                   transition(':enter', []),
                   transition(
                       '* => *',
                       [
                         query('bar', animate(1000, style({background: 'blue'}))),
                       ]),
                 ]),
           ]
         })
         class Cmp {
           fooExp: any = false;
           barExp: any = false;
         }

         TestBed.configureTestingModule({declarations: [Cmp]});

         const engine = TestBed.get(ɵAnimationEngine);
         const fixture = TestBed.createComponent(Cmp);
         const cmp = fixture.componentInstance;
         fixture.detectChanges();

         cmp.fooExp = 'go';
         cmp.barExp = 'go';

         let errorMsg: string = '';
         try {
           fixture.detectChanges();
         } catch (e) {
           errorMsg = e.message;
         }

         expect(errorMsg).toMatch(/@foo has failed due to:/);
         expect(errorMsg).toMatch(/`query\("foo"\)` returned zero elements/);
         expect(errorMsg).toMatch(/@bar has failed due to:/);
         expect(errorMsg).toMatch(/`query\("bar"\)` returned zero elements/);
       });

    it('should not throw an error if styles overlap in separate transitions', () => {
      @Component({
        selector: 'if-cmp',
        template: `
          <div [@myAnimation]="exp"></div>
        `,
        animations: [
          trigger(
              'myAnimation',
              [
                transition(
                    'void => *',
                    [
                      style({opacity: 0}),
                      animate('0.5s 1s', style({opacity: 1})),
                    ]),
                transition(
                    '* => void',
                    [animate(1000, style({height: 0})), animate(1000, style({opacity: 0}))]),
              ]),
        ]
      })
      class Cmp {
        exp: any = false;
      }

      TestBed.configureTestingModule({declarations: [Cmp]});

      expect(() => { TestBed.createComponent(Cmp); }).not.toThrowError();
    });

    it('should continue to clean up DOM-related animation artificats even if a compiler-level error is thrown midway',
       () => {
         @Component({
           selector: 'if-cmp',
           animations: [
             trigger(
                 'foo',
                 [
                   transition('* => something', []),
                 ]),
           ],
           template: `
          value = {{ foo[bar] }}
          <div #contents>
            <div *ngIf="exp">1</div>
            <div *ngIf="exp" @foo>2</div>
            <div *ngIf="exp" [@foo]="'123'">3</div>
          </div>
        `,
         })
         class Cmp {
           exp: any = false;

           @ViewChild('contents') public contents: any;
         }

         TestBed.configureTestingModule({declarations: [Cmp]});

         const engine = TestBed.get(ɵAnimationEngine);
         const fixture = TestBed.createComponent(Cmp);

         const runCD = () => fixture.detectChanges();
         const cmp = fixture.componentInstance;

         cmp.exp = true;
         expect(runCD).toThrow();

         const contents = cmp.contents.nativeElement;
         expect(contents.innerText.replace(/\s+/gm, '')).toEqual('123');

         cmp.exp = false;
         expect(runCD).toThrow();

         expect(contents.innerText.trim()).toEqual('');
       });

    describe('errors for not using the animation module', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [{provide: RendererFactory2, useExisting: ɵDomRendererFactory2}],
        });
      });

      it('should throw when using an @prop binding without the animation module', () => {
        @Component({template: `<div [@myAnimation]="true"></div>`})
        class Cmp {
        }

        TestBed.configureTestingModule({declarations: [Cmp]});
        const comp = TestBed.createComponent(Cmp);
        expect(() => comp.detectChanges())
            .toThrowError(
                'Found the synthetic property @myAnimation. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.');
      });

      it('should throw when using an @prop listener without the animation module', () => {
        @Component({template: `<div (@myAnimation.start)="a = true"></div>`})
        class Cmp {
          a: any;
        }

        TestBed.configureTestingModule({declarations: [Cmp]});

        expect(() => TestBed.createComponent(Cmp))
            .toThrowError(
                'Found the synthetic listener @myAnimation.start. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.');

      });
    });
  });
})();

function assertHasParent(element: any, yes: boolean) {
  const parent = getDOM().parentElement(element);
  if (yes) {
    expect(parent).toBeTruthy();
  } else {
    expect(parent).toBeFalsy();
  }
}

function buildParams(params: {[name: string]: any}): AnimationOptions {
  return {params};
}
