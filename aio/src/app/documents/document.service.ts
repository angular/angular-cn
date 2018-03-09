import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocationService } from 'app/shared/location.service';
import { Logger } from 'app/shared/logger.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DocumentContents } from './document-contents';

export { DocumentContents } from './document-contents';

export const FILE_NOT_FOUND_ID = 'file-not-found';
export const FETCHING_ERROR_ID = 'fetching-error';

export const CONTENT_URL_PREFIX = 'generated/';
export const DOC_CONTENT_URL_PREFIX = CONTENT_URL_PREFIX + 'docs/';
const FETCHING_ERROR_CONTENTS = `
  <div class="nf-container l-flex-wrap flex-center">
    <div class="nf-icon material-icons">error_outline</div>
    <div class="nf-response l-flex-wrap">
      <h1 class="no-toc">请求文档失败</h1>
      <p>
      抱歉，这次我们没能取到 "<current-location></current-location>" 页。请检查你的网络连接，稍后再试。
      </p>
    </div>
  </div>
`;

@Injectable()
export class DocumentService {

  private cache = new Map<string, Observable<DocumentContents>>();

  currentDocument: Observable<DocumentContents>;

  constructor(private logger: Logger,
              private http: HttpClient,
              location: LocationService) {
    // Whenever the URL changes we try to get the appropriate doc
    this.currentDocument = location.currentPath.switchMap(path => this.getDocument(path));
  }

  private getDocument(url: string) {
    const id = url || 'index';
    this.logger.log('getting document', id);
    if (!this.cache.has(id)) {
      this.cache.set(id, this.fetchDocument(id));
    }
    return this.cache.get(id)!;
  }

  private fetchDocument(id: string): Observable<DocumentContents> {
    const requestPath = `${DOC_CONTENT_URL_PREFIX}${id}.json`;
    const subject = new AsyncSubject<DocumentContents>();

    this.logger.log('fetching document from', requestPath);
    this.http
      .get<DocumentContents>(requestPath, {responseType: 'json'})
      .do(data => {
        if (!data || typeof data !== 'object') {
          this.logger.log('received invalid data:', data);
          throw Error('Invalid data');
        }
      })
      .catch((error: HttpErrorResponse) => {
        return error.status === 404 ? this.getFileNotFoundDoc(id) : this.getErrorDoc(id, error);
      })
      .subscribe(subject);
    return subject.asObservable();
  }

  private getFileNotFoundDoc(id: string): Observable<DocumentContents> {
    if (id !== FILE_NOT_FOUND_ID) {
      this.logger.error(`Document file not found at '${id}'`);
      // using `getDocument` means that we can fetch the 404 doc contents from the server and cache it
      return this.getDocument(FILE_NOT_FOUND_ID);
    } else {
      return of({
        id: FILE_NOT_FOUND_ID,
        contents: '文档未找到',
      });
    }
  }

  private getErrorDoc(id: string, error: HttpErrorResponse): Observable<DocumentContents> {
    this.logger.error('Error fetching document', error);
    this.cache.delete(id);
    return Observable.of({
      id: FETCHING_ERROR_ID,
      contents: FETCHING_ERROR_CONTENTS,
    });
  }
}
