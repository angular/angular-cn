import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ROUTES } from '@angular/router';


import { AnnouncementBarComponent } from 'app/embedded/announcement-bar/announcement-bar.component';
import { AppComponent } from 'app/app.component';
import { EMBEDDED_COMPONENTS, EmbeddedComponentsMap } from 'app/embed-components/embed-components.service';
import { CustomIconRegistry, SVG_ICONS } from 'app/shared/custom-icon-registry';
import { Deployment } from 'app/shared/deployment.service';
import { DocViewerComponent } from 'app/layout/doc-viewer/doc-viewer.component';
import { DtComponent } from 'app/layout/doc-viewer/dt.component';
import { ModeBannerComponent } from 'app/layout/mode-banner/mode-banner.component';
import { GaService } from 'app/shared/ga.service';
import { Logger } from 'app/shared/logger.service';
import { LocationService } from 'app/shared/location.service';
import { NavigationService } from 'app/navigation/navigation.service';
import { DocumentService } from 'app/documents/document.service';
import { SearchService } from 'app/search/search.service';
import { TopMenuComponent } from 'app/layout/top-menu/top-menu.component';
import { FooterComponent } from 'app/layout/footer/footer.component';
import { NavMenuComponent } from 'app/layout/nav-menu/nav-menu.component';
import { NavItemComponent } from 'app/layout/nav-item/nav-item.component';
import { ReportingErrorHandler } from 'app/shared/reporting-error-handler';
import { ScrollService } from 'app/shared/scroll.service';
import { ScrollSpyService } from 'app/shared/scroll-spy.service';
import { SearchBoxComponent } from 'app/search/search-box/search-box.component';
import { NotificationComponent } from 'app/layout/notification/notification.component';
import { TocComponent } from 'app/layout/toc/toc.component';
import { TocService } from 'app/shared/toc.service';
import { CurrentDateToken, currentDateProvider } from 'app/shared/current-date';
import { WindowToken, windowProvider } from 'app/shared/window';

import { EmbedComponentsModule } from 'app/embed-components/embed-components.module';
import { SharedModule } from 'app/shared/shared.module';
import { SwUpdatesModule } from 'app/sw-updates/sw-updates.module';


// The path to the `EmbeddedModule`.
const embeddedModulePath = 'app/embedded/embedded.module#EmbeddedModule';

// These are the hardcoded inline svg sources to be used by the `<mat-icon>` component
export const svgIconProviders = [
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'keyboard_arrow_right',
      svgSource: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" ' +
                 'viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>'
    },
    multi: true
  },
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'menu',
      svgSource: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" ' +
                 'viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>'
    },
    multi: true
  },
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'insert_comment',
      svgSource:
      '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>' +
        '<path d="M0 0h24v24H0z" fill="none"/>' +
      '</svg>'
    },
    multi: true
  },
  {
    provide: SVG_ICONS,
    useValue: {
      name: 'close',
      svgSource:
      '<svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>' +
        '<path d="M0 0h24v24H0z" fill="none"/>' +
      '</svg>'
    },
    multi: true
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EmbedComponentsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    SwUpdatesModule,
    SharedModule
  ],
  declarations: [
    AnnouncementBarComponent,
    AppComponent,
    DocViewerComponent,
    DtComponent,
    FooterComponent,
    ModeBannerComponent,
    NavMenuComponent,
    NavItemComponent,
    SearchBoxComponent,
    NotificationComponent,
    TocComponent,
    TopMenuComponent,
  ],
  providers: [
    Deployment,
    DocumentService,
    { provide: ErrorHandler, useClass: ReportingErrorHandler },
    GaService,
    Logger,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    LocationService,
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    NavigationService,
    ScrollService,
    ScrollSpyService,
    SearchService,
    svgIconProviders,
    TocService,
    { provide: CurrentDateToken, useFactory: currentDateProvider },
    { provide: WindowToken, useFactory: windowProvider },

    {
      provide: EMBEDDED_COMPONENTS,
      useValue: {
        /* tslint:disable: max-line-length */
        'aio-announcement-bar': [AnnouncementBarComponent],
        'aio-toc': [TocComponent],
        'aio-api-list, aio-contributor-list, aio-file-not-found-search, aio-resource-list, code-example, code-tabs, current-location, live-example': embeddedModulePath,
        /* tslint:enable: max-line-length */
      } as EmbeddedComponentsMap,
    },
    {
      // This is currently the only way to get `@angular/cli`
      // to split `EmbeddedModule` into a separate chunk :(
      provide: ROUTES,
      useValue: [{ path: '/embedded', loadChildren: embeddedModulePath }],
      multi: true,
    },
  ],
  entryComponents: [ AnnouncementBarComponent, TocComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
