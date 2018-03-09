import { FirebaseRedirect } from './FirebaseRedirect';

export interface FirebaseRedirectConfig {
  source: string;
  destination: string;
}

export class FirebaseRedirector {
  private redirects: FirebaseRedirect[];
  constructor(redirects: FirebaseRedirectConfig[]) {
    this.redirects = redirects.map(redirect => new FirebaseRedirect(redirect.source, redirect.destination));
  }

  redirect(url: string) {
    let ttl = 50;
    while (ttl > 0) {
      const newUrl = this.doRedirect(url);
      if (newUrl === url) {
        return url;
      } else {
        url = newUrl;
        ttl--;
      }
    }
    throw new Error('infinite redirect loop');
  }
  private doRedirect(url: string) {
    for (let i = 0; i < this.redirects.length; i++) {
      const newUrl = this.redirects[i].replace(url);
      if (newUrl !== undefined) {
        return newUrl;
      }
    }
    return url;
  }
}
