import { Component, ComponentRef, NgModule, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { DocumentContents } from 'app/documents/document.service';
import { EmbedComponentsService } from 'app/embed-components/embed-components.service';
import { DocViewerComponent } from 'app/layout/doc-viewer/doc-viewer.component';
import { Logger } from 'app/shared/logger.service';
import { TocService } from 'app/shared/toc.service';
import { MockLogger } from 'testing/logger.service';


////////////////////////////////////////////////////////////////////////////////////////////////////
/// `TestDocViewerComponent` (for exposing internal `DocViewerComponent` methods as public).     ///
/// Only used for type-casting; the actual implementation is irrelevant.                         ///
////////////////////////////////////////////////////////////////////////////////////////////////////

export class TestDocViewerComponent extends DocViewerComponent {
  embeddedComponentRefs: ComponentRef<any>[];
  currViewContainer: HTMLElement;
  nextViewContainer: HTMLElement;

  destroyEmbeddedComponents(): void { return null as any; }
  prepareTitleAndToc(targetElem: HTMLElement, docId: string): () => void { return null as any; }
  render(doc: DocumentContents): Observable<void> { return null as any; }
  swapViews(onInsertedCb?: () => void): Observable<void> { return null as any; }
}


////////////////////////////////////////////////////////////////////////////////////////////////////
/// `TestModule` and `TestParentComponent`.                                                      ///
////////////////////////////////////////////////////////////////////////////////////////////////////

// Test parent component.
@Component({
  selector: 'aio-test',
  template: '<aio-doc-viewer [doc]="currentDoc">Test Component</aio-doc-viewer>',
})
export class TestParentComponent {
  currentDoc?: DocumentContents|null;
  @ViewChild(DocViewerComponent) docViewer: DocViewerComponent;
}

// Mock services.
export class MockEmbedComponentsService {
  embedInto = jasmine.createSpy('EmbedComponentsService#embedInto');
}

export class MockTitle {
  setTitle = jasmine.createSpy('Title#reset');
}

export class MockMeta {
  addTag = jasmine.createSpy('Meta#addTag');
  removeTag = jasmine.createSpy('Meta#removeTag');
}

export class MockTocService {
  genToc = jasmine.createSpy('TocService#genToc');
  reset = jasmine.createSpy('TocService#reset');
}

@NgModule({
  declarations: [
    DocViewerComponent,
    TestParentComponent,
  ],
  providers: [
    { provide: Logger, useClass: MockLogger },
    { provide: EmbedComponentsService, useClass: MockEmbedComponentsService },
    { provide: Title, useClass: MockTitle },
    { provide: Meta, useClass: MockMeta },
    { provide: TocService, useClass: MockTocService },
  ],
})
export class TestModule { }


////////////////////////////////////////////////////////////////////////////////////////////////////
/// An observable with spies to test subscribing/unsubscribing.                                  ///
////////////////////////////////////////////////////////////////////////////////////////////////////

export class ObservableWithSubscriptionSpies<T = void> extends Observable<T> {
  unsubscribeSpies: jasmine.Spy[] = [];
  subscribeSpy = spyOn(this, 'subscribe').and.callFake((...args: any[]) => {
    const subscription = super.subscribe(...args);
    const unsubscribeSpy = spyOn(subscription, 'unsubscribe').and.callThrough();
    this.unsubscribeSpies.push(unsubscribeSpy);
    return subscription;
  });

  constructor(subscriber = () => undefined) { super(subscriber); }
}
