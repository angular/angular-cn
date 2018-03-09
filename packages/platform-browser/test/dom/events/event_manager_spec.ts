/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgZone} from '@angular/core/src/zone/ng_zone';
import {beforeEach, describe, expect, it} from '@angular/core/testing/src/testing_internal';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {DomEventsPlugin} from '@angular/platform-browser/src/dom/events/dom_events';
import {EventManager, EventManagerPlugin} from '@angular/platform-browser/src/dom/events/event_manager';
import {el} from '../../../testing/src/browser_util';

(function() {
  if (isNode) return;
  let domEventPlugin: DomEventsPlugin;
  let doc: any;
  let zone: NgZone;

  describe('EventManager', () => {

    beforeEach(() => {
      doc = getDOM().supportsDOMEvents() ? document : getDOM().createHtmlDocument();
      zone = new NgZone({});
      domEventPlugin = new DomEventsPlugin(doc, zone);
    });

    it('should delegate event bindings to plugins that are passed in from the most generic one to the most specific one',
       () => {
         const element = el('<div></div>');
         const handler = (e: any /** TODO #9100 */) => e;
         const plugin = new FakeEventManagerPlugin(doc, ['click']);
         const manager = new EventManager([domEventPlugin, plugin], new FakeNgZone());
         manager.addEventListener(element, 'click', handler);
         expect(plugin.eventHandler['click']).toBe(handler);
       });

    it('should delegate event bindings to the first plugin supporting the event', () => {
      const element = el('<div></div>');
      const clickHandler = (e: any /** TODO #9100 */) => e;
      const dblClickHandler = (e: any /** TODO #9100 */) => e;
      const plugin1 = new FakeEventManagerPlugin(doc, ['dblclick']);
      const plugin2 = new FakeEventManagerPlugin(doc, ['click', 'dblclick']);
      const manager = new EventManager([plugin2, plugin1], new FakeNgZone());
      manager.addEventListener(element, 'click', clickHandler);
      manager.addEventListener(element, 'dblclick', dblClickHandler);
      expect(plugin2.eventHandler['click']).toBe(clickHandler);
      expect(plugin1.eventHandler['dblclick']).toBe(dblClickHandler);
    });

    it('should throw when no plugin can handle the event', () => {
      const element = el('<div></div>');
      const plugin = new FakeEventManagerPlugin(doc, ['dblclick']);
      const manager = new EventManager([plugin], new FakeNgZone());
      expect(() => manager.addEventListener(element, 'click', null !))
          .toThrowError('No event manager plugin found for event click');
    });

    it('events are caught when fired from a child', () => {
      const element = el('<div><div></div></div>');
      // Workaround for https://bugs.webkit.org/show_bug.cgi?id=122755
      getDOM().appendChild(doc.body, element);

      const child = getDOM().firstChild(element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvent: any /** TODO #9100 */ = null;
      const handler = (e: any /** TODO #9100 */) => { receivedEvent = e; };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());
      manager.addEventListener(element, 'click', handler);
      getDOM().dispatchEvent(child, dispatchedEvent);

      expect(receivedEvent).toBe(dispatchedEvent);
    });

    it('should add and remove global event listeners', () => {
      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvent: any /** TODO #9100 */ = null;
      const handler = (e: any /** TODO #9100 */) => { receivedEvent = e; };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      const remover = manager.addGlobalEventListener('document', 'click', handler);
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(dispatchedEvent);

      receivedEvent = null;
      remover();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(null);
    });

    it('should keep zone when addEventListener', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvent: any /** TODO #9100 */ = null;
      let receivedZone: any = null;
      const handler = (e: any /** TODO #9100 */) => {
        receivedEvent = e;
        receivedZone = Zone.current;
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover = null;
      Zone.root.run(() => { remover = manager.addEventListener(element, 'click', handler); });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(dispatchedEvent);
      expect(receivedZone.name).toBe(Zone.root.name);

      receivedEvent = null;
      remover && remover();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(null);
    });

    it('should keep zone when addEventListener multiple times', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvents: any[] /** TODO #9100 */ = [];
      let receivedZones: any[] = [];
      const handler1 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const handler2 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover1 = null;
      let remover2 = null;
      Zone.root.run(() => { remover1 = manager.addEventListener(element, 'click', handler1); });
      Zone.root.fork({name: 'test'}).run(() => {
        remover2 = manager.addEventListener(element, 'click', handler2);
      });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
      expect(receivedZones).toEqual([Zone.root.name, 'test']);

      receivedEvents = [];
      remover1 && remover1();
      remover2 && remover2();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([]);
    });

    it('should support event.stopImmediatePropagation', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvents: any[] /** TODO #9100 */ = [];
      let receivedZones: any[] = [];
      const handler1 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
        e.stopImmediatePropagation();
      };
      const handler2 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover1 = null;
      let remover2 = null;
      Zone.root.run(() => { remover1 = manager.addEventListener(element, 'click', handler1); });
      Zone.root.fork({name: 'test'}).run(() => {
        remover2 = manager.addEventListener(element, 'click', handler2);
      });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([dispatchedEvent]);
      expect(receivedZones).toEqual([Zone.root.name]);

      receivedEvents = [];
      remover1 && remover1();
      remover2 && remover2();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([]);
    });

    it('should handle event correctly when one handler remove itself ', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvents: any[] /** TODO #9100 */ = [];
      let receivedZones: any[] = [];
      let remover1: any = null;
      let remover2: any = null;
      const handler1 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
        remover1 && remover1();
      };
      const handler2 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      Zone.root.run(() => { remover1 = manager.addEventListener(element, 'click', handler1); });
      Zone.root.fork({name: 'test'}).run(() => {
        remover2 = manager.addEventListener(element, 'click', handler2);
      });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
      expect(receivedZones).toEqual([Zone.root.name, 'test']);

      receivedEvents = [];
      remover1 && remover1();
      remover2 && remover2();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([]);
    });

    it('should only add same callback once when addEventListener', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvents: any[] /** TODO #9100 */ = [];
      let receivedZones: any[] = [];
      const handler = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover1 = null;
      let remover2 = null;
      Zone.root.run(() => { remover1 = manager.addEventListener(element, 'click', handler); });
      Zone.root.fork({name: 'test'}).run(() => {
        remover2 = manager.addEventListener(element, 'click', handler);
      });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([dispatchedEvent]);
      expect(receivedZones).toEqual([Zone.root.name]);

      receivedEvents = [];
      remover1 && remover1();
      remover2 && remover2();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([]);
    });

    it('should be able to remove event listener which was added inside of ngZone', () => {
      const Zone = (window as any)['Zone'];

      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('click');
      let receivedEvents: any[] /** TODO #9100 */ = [];
      let receivedZones: any[] = [];
      const handler1 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const handler2 = (e: any /** TODO #9100 */) => {
        receivedEvents.push(e);
        receivedZones.push(Zone.current.name);
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover1 = null;
      let remover2 = null;
      // handler1 is added in root zone
      Zone.root.run(() => { remover1 = manager.addEventListener(element, 'click', handler1); });
      // handler2 is added in 'angular' zone
      Zone.root.fork({name: 'fakeAngularZone', properties: {isAngularZone: true}}).run(() => {
        remover2 = manager.addEventListener(element, 'click', handler2);
      });
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvents).toEqual([dispatchedEvent, dispatchedEvent]);
      expect(receivedZones).toEqual([Zone.root.name, 'fakeAngularZone']);

      receivedEvents = [];
      remover1 && remover1();
      remover2 && remover2();
      getDOM().dispatchEvent(element, dispatchedEvent);
      // handler1 and handler2 are added in different zone
      // one is angular zone, the other is not
      // should still be able to remove them correctly
      expect(receivedEvents).toEqual([]);
    });

    it('should run blackListedEvents handler outside of ngZone', () => {
      const Zone = (window as any)['Zone'];
      const element = el('<div><div></div></div>');
      getDOM().appendChild(doc.body, element);
      const dispatchedEvent = getDOM().createMouseEvent('scroll');
      let receivedEvent: any /** TODO #9100 */ = null;
      let receivedZone: any = null;
      const handler = (e: any /** TODO #9100 */) => {
        receivedEvent = e;
        receivedZone = Zone.current;
      };
      const manager = new EventManager([domEventPlugin], new FakeNgZone());

      let remover = manager.addEventListener(element, 'scroll', handler);
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(dispatchedEvent);
      expect(receivedZone.name).toBe(Zone.root.name);

      receivedEvent = null;
      remover && remover();
      getDOM().dispatchEvent(element, dispatchedEvent);
      expect(receivedEvent).toBe(null);
    });
  });
})();

/** @internal */
class FakeEventManagerPlugin extends EventManagerPlugin {
  eventHandler: {[event: string]: Function} = {};

  constructor(doc: any, public supportedEvents: string[]) { super(doc); }

  supports(eventName: string): boolean { return this.supportedEvents.indexOf(eventName) > -1; }

  addEventListener(element: any, eventName: string, handler: Function) {
    this.eventHandler[eventName] = handler;
    return () => { delete (this.eventHandler[eventName]); };
  }
}

class FakeNgZone extends NgZone {
  constructor() { super({enableLongStackTrace: false}); }
  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T { return fn(); }
  runOutsideAngular(fn: Function) { return fn(); }
}
