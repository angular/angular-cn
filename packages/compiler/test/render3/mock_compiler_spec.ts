/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


import {MockDirectory, setup} from '../aot/test_util';
import {compile, expectEmit} from './mock_compile';

describe('mock_compiler', () => {
  // This produces a MockDirectory of the file needed to compile an Angular application.
  // This setup is performed in a beforeAll which populates the map returned.
  const angularFiles = setup({
    compileAngular: true,
    compileAnimations: false,
    compileCommon: true,
  });

  describe('compiling', () => {
    // To use compile you need to supply the files in a MockDirectory that can be merged
    // with a set of "environment" files such as the angular files.
    it('should be able to compile a simple application', () => {
      const files = {
        app: {
          'hello.component.ts': `
            import {Component, Input} from '@angular/core';

            @Component({template: 'Hello {{name}}!'})
            export class HelloComponent {
              @Input() name: string = 'world';
            }
          `,
          'hello.module.ts': `
            import {NgModule} from '@angular/core';
            import {HelloComponent} from './hello.component';
            
            @NgModule({declarations: [HelloComponent]})
            export class HelloModule {}
          `
        }
      };
      const result = compile(files, angularFiles);

      // result.source contains just the emitted factory declarations regardless of the original
      // module.
      expect(result.source).toContain('Hello');

      // The output context is also returned if the actual output ast is needed.
      expect(result.outputContext.statements.length).toBeGreaterThan(0);
    });
  });

  describe('expecting emitted output', () => {
    it('should be able to find a simple expression in the output', () => {
      const files = {
        app: {
          'hello.component.ts': `
            import {Component, Input} from '@angular/core';

            @Component({template: 'Hello {{name}}! Your name as {{name.length}} characters'})
            export class HelloComponent {
              @Input() name: string = 'world';
            }
          `,
          'hello.module.ts': `
            import {NgModule} from '@angular/core';
            import {HelloComponent} from './hello.component';
            
            @NgModule({declarations: [HelloComponent]})
            export class HelloModule {}
          `
        }
      };

      const result = compile(files, angularFiles);

      // The expression can expected directly.
      expectEmit(result.source, 'name.length', 'name length expression not found');

      // Whitespace is not significant
      expectEmit(
          result.source, 'name   \n\n   .  \n    length',
          'name length expression not found (whitespace)');
    });
  });

  it('should be able to skip untested regions', () => {
    const files = {
      app: {
        'hello.component.ts': `
          import {Component, Input} from '@angular/core';

          @Component({template: 'Hello {{name}}! Your name as {{name.length}} characters'})
          export class HelloComponent {
            @Input() name: string = 'world';
          }
        `,
        'hello.module.ts': `
          import {NgModule} from '@angular/core';
          import {HelloComponent} from './hello.component';
          
          @NgModule({declarations: [HelloComponent]})
          export class HelloModule {}
        `
      }
    };

    const result = compile(files, angularFiles);

    // The special character … means anything can be generated between the two sections allowing
    // skipping sections of the output that are not under test. The ellipsis unicode char (…) is
    // used instead of '...' because '...' is legal JavaScript (the spread operator) and might
    // need to be tested.
    expectEmit(result.source, 'ctx.name … ctx.name.length', 'could not find correct length access');
  });

  it('should be able to enforce consistent identifiers', () => {
    const files = {
      app: {
        'hello.component.ts': `
          import {Component, Input} from '@angular/core';

          @Component({template: 'Hello {{name}}! Your name as {{name.length}} characters'})
          export class HelloComponent {
            @Input() name: string = 'world';
          }
        `,
        'hello.module.ts': `
          import {NgModule} from '@angular/core';
          import {HelloComponent} from './hello.component';
          
          @NgModule({declarations: [HelloComponent]})
          export class HelloModule {}
        `
      }
    };

    const result = compile(files, angularFiles);

    // IDENT can be used a wild card for any identifier
    expectEmit(result.source, 'IDENT.name', 'could not find context access');

    // $<ident>$ can be used as a wild-card but all the content matched by the identifiers must
    // match each other.
    // This is useful if the code generator is free to invent a name but should use the name
    // consistently.
    expectEmit(
        result.source, '$ctx$.$name$ … $ctx$.$name$.length',
        'could not find correct length access');
  });
});