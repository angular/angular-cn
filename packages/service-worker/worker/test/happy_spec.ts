/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CacheDatabase} from '../src/db-cache';
import {Driver, DriverReadyState} from '../src/driver';
import {Manifest} from '../src/manifest';
import {sha1} from '../src/sha1';
import {MockRequest} from '../testing/fetch';
import {MockFileSystemBuilder, MockServerStateBuilder, tmpHashTableForFs} from '../testing/mock';
import {SwTestHarness, SwTestHarnessBuilder} from '../testing/scope';

import {async_beforeEach, async_fit, async_it} from './async';

const dist =
    new MockFileSystemBuilder()
        .addFile('/foo.txt', 'this is foo')
        .addFile('/bar.txt', 'this is bar')
        .addFile('/baz.txt', 'this is baz')
        .addFile('/qux.txt', 'this is qux')
        .addFile('/quux.txt', 'this is quux')
        .addUnhashedFile('/unhashed/a.txt', 'this is unhashed', {'Cache-Control': 'max-age=10'})
        .build();

const distUpdate =
    new MockFileSystemBuilder()
        .addFile('/foo.txt', 'this is foo v2')
        .addFile('/bar.txt', 'this is bar')
        .addFile('/baz.txt', 'this is baz v2')
        .addFile('/qux.txt', 'this is qux v2')
        .addFile('/quux.txt', 'this is quux v2')
        .addUnhashedFile('/unhashed/a.txt', 'this is unhashed v2', {'Cache-Control': 'max-age=10'})
        .build();

const brokenFs = new MockFileSystemBuilder().addFile('/foo.txt', 'this is foo').build();

const brokenManifest: Manifest = {
  configVersion: 1,
  index: '/foo.txt',
  assetGroups: [{
    name: 'assets',
    installMode: 'prefetch',
    updateMode: 'prefetch',
    urls: [
      '/foo.txt',
    ],
    patterns: [],
  }],
  dataGroups: [],
  hashTable: tmpHashTableForFs(brokenFs, {'/foo.txt': true}),
};

const manifest: Manifest = {
  configVersion: 1,
  appData: {
    version: 'original',
  },
  index: '/foo.txt',
  assetGroups: [
    {
      name: 'assets',
      installMode: 'prefetch',
      updateMode: 'prefetch',
      urls: [
        '/foo.txt',
        '/bar.txt',
        '/redirected.txt',
      ],
      patterns: [
        '/unhashed/.*',
      ],
    },
    {
      name: 'other',
      installMode: 'lazy',
      updateMode: 'lazy',
      urls: [
        '/baz.txt',
        '/qux.txt',
      ],
      patterns: [],
    },
    {
      name: 'lazy_prefetch',
      installMode: 'lazy',
      updateMode: 'prefetch',
      urls: ['/quux.txt'],
      patterns: [],
    }
  ],
  hashTable: tmpHashTableForFs(dist),
};

const manifestUpdate: Manifest = {
  configVersion: 1,
  appData: {
    version: 'update',
  },
  index: '/foo.txt',
  assetGroups: [
    {
      name: 'assets',
      installMode: 'prefetch',
      updateMode: 'prefetch',
      urls: [
        '/foo.txt',
        '/bar.txt',
        '/redirected.txt',
      ],
      patterns: [
        '/unhashed/.*',
      ],
    },
    {
      name: 'other',
      installMode: 'lazy',
      updateMode: 'lazy',
      urls: [
        '/baz.txt',
        '/qux.txt',
      ],
      patterns: [],
    },
    {
      name: 'lazy_prefetch',
      installMode: 'lazy',
      updateMode: 'prefetch',
      urls: ['/quux.txt'],
      patterns: [],
    }
  ],
  hashTable: tmpHashTableForFs(distUpdate),
};

const server = new MockServerStateBuilder()
                   .withStaticFiles(dist)
                   .withManifest(manifest)
                   .withRedirect('/redirected.txt', '/redirect-target.txt', 'this was a redirect')
                   .withError('/error.txt')
                   .build();

const serverUpdate =
    new MockServerStateBuilder()
        .withStaticFiles(distUpdate)
        .withManifest(manifestUpdate)
        .withRedirect('/redirected.txt', '/redirect-target.txt', 'this was a redirect')
        .build();

const brokenServer =
    new MockServerStateBuilder().withStaticFiles(brokenFs).withManifest(brokenManifest).build();

const server404 = new MockServerStateBuilder().withStaticFiles(dist).build();

const scope = new SwTestHarnessBuilder().withServerState(server).build();

const manifestHash = sha1(JSON.stringify(manifest));
const manifestUpdateHash = sha1(JSON.stringify(manifestUpdate));

(function() {
  // Skip environments that don't support the minimum APIs needed to run the SW tests.
  if (!SwTestHarness.envIsSupported()) {
    return;
  }
  describe('Driver', () => {
    let scope: SwTestHarness;
    let driver: Driver;

    beforeEach(() => {
      server.clearRequests();
      scope = new SwTestHarnessBuilder().withServerState(server).build();
      driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
    });

    async_it('initializes prefetched content correctly, after activation', async() => {
      expect(await scope.startup(true)).toEqual(true);
      await scope.resolveSelfMessages();
      await driver.initialized;
      server.assertSawRequestFor('ngsw.json');
      server.assertSawRequestFor('/foo.txt');
      server.assertSawRequestFor('/bar.txt');
      server.assertSawRequestFor('/redirected.txt');
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      expect(await makeRequest(scope, '/bar.txt')).toEqual('this is bar');
      server.assertNoOtherRequests();
    });

    async_it('initializes prefetched content correctly, after a request kicks it off', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.assertSawRequestFor('ngsw.json');
      server.assertSawRequestFor('/foo.txt');
      server.assertSawRequestFor('/bar.txt');
      server.assertSawRequestFor('/redirected.txt');
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      expect(await makeRequest(scope, '/bar.txt')).toEqual('this is bar');
      server.assertNoOtherRequests();
    });

    async_it('handles non-relative URLs', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();
      expect(await makeRequest(scope, 'http://localhost/foo.txt')).toEqual('this is foo');
      server.assertNoOtherRequests();
    });

    async_it('handles actual errors from the browser', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();

      const [resPromise, done] = scope.handleFetch(new MockRequest('/error.txt'), 'default');
      await done;
      const res = (await resPromise) !;
      expect(res.status).toEqual(504);
      expect(res.statusText).toEqual('Gateway Timeout');
    });

    async_it('handles redirected responses', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();
      expect(await makeRequest(scope, '/redirected.txt')).toEqual('this was a redirect');
      server.assertNoOtherRequests();
    });

    async_it('caches lazy content on-request', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();
      expect(await makeRequest(scope, '/baz.txt')).toEqual('this is baz');
      server.assertSawRequestFor('/baz.txt');
      server.assertNoOtherRequests();
      expect(await makeRequest(scope, '/baz.txt')).toEqual('this is baz');
      server.assertNoOtherRequests();
      expect(await makeRequest(scope, '/qux.txt')).toEqual('this is qux');
      server.assertSawRequestFor('/qux.txt');
      server.assertNoOtherRequests();
    });

    async_it('updates to new content when requested', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      const client = scope.clients.getMock('default') !;
      expect(client.messages).toEqual([]);

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.assertSawRequestFor('ngsw.json');
      serverUpdate.assertSawRequestFor('/foo.txt');
      serverUpdate.assertSawRequestFor('/redirected.txt');
      serverUpdate.assertNoOtherRequests();

      expect(client.messages).toEqual([{
        type: 'UPDATE_AVAILABLE',
        current: {hash: manifestHash, appData: {version: 'original'}},
        available: {hash: manifestUpdateHash, appData: {version: 'update'}},
      }]);

      // Default client is still on the old version of the app.
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');

      // Sending a new client id should result in the updated version being returned.
      expect(await makeRequest(scope, '/foo.txt', 'new')).toEqual('this is foo v2');

      // Of course, the old version should still work.
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');

      expect(await makeRequest(scope, '/bar.txt')).toEqual('this is bar');
      serverUpdate.assertNoOtherRequests();
    });

    async_it('updates to new content when requested', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      const client = scope.clients.getMock('default') !;
      expect(client.messages).toEqual([]);

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.assertSawRequestFor('ngsw.json');
      serverUpdate.assertSawRequestFor('/foo.txt');
      serverUpdate.assertSawRequestFor('/redirected.txt');
      serverUpdate.assertNoOtherRequests();

      expect(client.messages).toEqual([{
        type: 'UPDATE_AVAILABLE',
        current: {hash: manifestHash, appData: {version: 'original'}},
        available: {hash: manifestUpdateHash, appData: {version: 'update'}},
      }]);

      // Default client is still on the old version of the app.
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');

      // Sending a new client id should result in the updated version being returned.
      expect(await makeRequest(scope, '/foo.txt', 'new')).toEqual('this is foo v2');

      // Of course, the old version should still work.
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');

      expect(await makeRequest(scope, '/bar.txt')).toEqual('this is bar');
      serverUpdate.assertNoOtherRequests();
    });

    async_it('updates a specific client to new content on request', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      const client = scope.clients.getMock('default') !;
      expect(client.messages).toEqual([]);

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.clearRequests();
      await driver.updateClient(client as any as Client);

      expect(client.messages).toEqual([
        {
          type: 'UPDATE_AVAILABLE',
          current: {hash: manifestHash, appData: {version: 'original'}},
          available: {hash: manifestUpdateHash, appData: {version: 'update'}},
        },
        {
          type: 'UPDATE_ACTIVATED',
          previous: {hash: manifestHash, appData: {version: 'original'}},
          current: {hash: manifestUpdateHash, appData: {version: 'update'}},
        }
      ]);

      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo v2');
    });

    async_it('checks for updates on restart', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      scope = new SwTestHarnessBuilder()
                  .withCacheState(scope.caches.dehydrate())
                  .withServerState(serverUpdate)
                  .build();
      driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      serverUpdate.assertNoOtherRequests();

      scope.advance(12000);
      await driver.idle.empty;

      serverUpdate.assertSawRequestFor('ngsw.json');
      serverUpdate.assertSawRequestFor('/foo.txt');
      serverUpdate.assertSawRequestFor('/redirected.txt');
      serverUpdate.assertNoOtherRequests();
    });

    async_it('checks for updates on navigation', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();

      expect(await makeRequest(scope, '/foo.txt', 'default', {
        mode: 'navigate',
      })).toEqual('this is foo');

      scope.advance(12000);
      await driver.idle.empty;

      server.assertSawRequestFor('ngsw.json');
    });

    async_it('does not make concurrent checks for updates on navigation', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      server.clearRequests();

      expect(await makeRequest(scope, '/foo.txt', 'default', {
        mode: 'navigate',
      })).toEqual('this is foo');

      expect(await makeRequest(scope, '/foo.txt', 'default', {
        mode: 'navigate',
      })).toEqual('this is foo');

      scope.advance(12000);
      await driver.idle.empty;

      server.assertSawRequestFor('ngsw.json');
      server.assertNoOtherRequests();
    });

    async_it('preserves multiple client assignments across restarts', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      expect(await makeRequest(scope, '/foo.txt', 'new')).toEqual('this is foo v2');
      serverUpdate.clearRequests();

      scope = new SwTestHarnessBuilder()
                  .withServerState(serverUpdate)
                  .withCacheState(scope.caches.dehydrate())
                  .build();
      driver = new Driver(scope, scope, new CacheDatabase(scope, scope));

      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      expect(await makeRequest(scope, '/foo.txt', 'new')).toEqual('this is foo v2');
      serverUpdate.assertNoOtherRequests();
    });

    async_it('updates when refreshed', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      const client = scope.clients.getMock('default') !;

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.clearRequests();

      expect(await makeRequest(scope, '/baz', 'default', {
        headers: {
          'Accept': 'text/plain, text/html, text/css',
        },
        mode: 'navigate',
      })).toEqual('this is foo v2');

      expect(client.messages).toEqual([
        {
          type: 'UPDATE_AVAILABLE',
          current: {hash: manifestHash, appData: {version: 'original'}},
          available: {hash: manifestUpdateHash, appData: {version: 'update'}},
        },
        {
          type: 'UPDATE_ACTIVATED',
          previous: {hash: manifestHash, appData: {version: 'original'}},
          current: {hash: manifestUpdateHash, appData: {version: 'update'}},
        }
      ]);
      serverUpdate.assertNoOtherRequests();
    });

    async_it('cleans up properly when manually requested', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.clearRequests();

      expect(await makeRequest(scope, '/foo.txt', 'new')).toEqual('this is foo v2');

      // Delete the default client.
      scope.clients.remove('default');

      // After this, the old version should no longer be cached.
      await driver.cleanupCaches();
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo v2');

      serverUpdate.assertNoOtherRequests();
    });

    async_it('cleans up properly on restart', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      scope = new SwTestHarnessBuilder()
                  .withCacheState(scope.caches.dehydrate())
                  .withServerState(serverUpdate)
                  .build();
      driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      serverUpdate.assertNoOtherRequests();

      scope.clients.remove('default');

      scope.advance(12000);
      await driver.idle.empty;
      serverUpdate.clearRequests();

      driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo v2');

      const oldManifestHash = sha1(JSON.stringify(manifest));
      const keys = await scope.caches.keys();
      const hasOldCaches = keys.some(name => name.startsWith(oldManifestHash + ':'));
      expect(hasOldCaches).toEqual(false);
    });

    async_it('shows notifications for push notifications', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      scope.clients.add('default');
      await scope.handlePush({
        notification: {
          title: 'This is a test',
          body: 'Test body',
        }
      });
      expect(scope.notifications).toEqual([{
        title: 'This is a test',
        options: {body: 'Test body'},
      }]);
      expect(scope.clients.getMock('default') !.messages).toEqual([{
        type: 'PUSH',
        data: {
          notification: {
            title: 'This is a test',
            body: 'Test body',
          },
        },
      }]);
    });

    async_it('prefetches updates to lazy cache when set', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;
      expect(await makeRequest(scope, '/quux.txt')).toEqual('this is quux');

      scope.updateServerState(serverUpdate);
      expect(await driver.checkForUpdate()).toEqual(true);
      serverUpdate.assertSawRequestFor('/quux.txt');
      serverUpdate.clearRequests();
      driver.updateClient(await scope.clients.get('default'));
      expect(await makeRequest(scope, '/quux.txt')).toEqual('this is quux v2');
      serverUpdate.assertNoOtherRequests();
    });

    async_it('unregisters when manifest 404s', async() => {
      expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      await driver.initialized;

      scope.updateServerState(server404);
      expect(await driver.checkForUpdate()).toEqual(false);
      expect(scope.unregistered).toEqual(true);
      expect(await scope.caches.keys()).toEqual([]);
    });

    describe('unhashed requests', () => {
      async_beforeEach(async() => {
        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
        await driver.initialized;
        server.clearRequests();
      });

      async_it('are cached appropriately', async() => {
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.assertSawRequestFor('/unhashed/a.txt');
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.assertNoOtherRequests();
      });

      async_it('avoid opaque responses', async() => {
        expect(await makeRequest(scope, '/unhashed/a.txt', 'default', {
          credentials: 'include'
        })).toEqual('this is unhashed');
        server.assertSawRequestFor('/unhashed/a.txt');
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.assertNoOtherRequests();
      });

      async_it('expire according to Cache-Control headers', async() => {
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.clearRequests();

        // Update the resource on the server.
        scope.updateServerState(serverUpdate);

        // Move ahead by 15 seconds.
        scope.advance(15000);

        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        serverUpdate.assertNoOtherRequests();

        // Another 6 seconds.
        scope.advance(6000);
        await driver.idle.empty;
        serverUpdate.assertSawRequestFor('/unhashed/a.txt');

        // Now the new version of the resource should be served.
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed v2');
        server.assertNoOtherRequests();
      });

      async_it('survive serialization', async() => {
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.clearRequests();

        const state = scope.caches.dehydrate();
        scope = new SwTestHarnessBuilder().withCacheState(state).withServerState(server).build();
        driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
        await driver.initialized;
        server.assertNoRequestFor('/unhashed/a.txt');
        server.clearRequests();

        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.assertNoOtherRequests();

        // Advance the clock by 6 seconds, triggering the idle tasks. If an idle task
        // was scheduled from the request above, it means that the metadata was not
        // properly saved.
        scope.advance(6000);
        await driver.idle.empty;
        server.assertNoRequestFor('/unhashed/a.txt');
      });

      async_it('get carried over during updates', async() => {
        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        server.clearRequests();

        scope = new SwTestHarnessBuilder()
                    .withCacheState(scope.caches.dehydrate())
                    .withServerState(serverUpdate)
                    .build();
        driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
        await driver.initialized;

        scope.advance(15000);
        await driver.idle.empty;
        serverUpdate.assertNoRequestFor('/unhashed/a.txt');
        serverUpdate.clearRequests();

        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed');
        serverUpdate.assertNoOtherRequests();

        scope.advance(15000);
        await driver.idle.empty;
        serverUpdate.assertSawRequestFor('/unhashed/a.txt');

        expect(await makeRequest(scope, '/unhashed/a.txt')).toEqual('this is unhashed v2');
        serverUpdate.assertNoOtherRequests();
      });
    });
    describe('routing', () => {
      async_beforeEach(async() => {
        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
        await driver.initialized;
        server.clearRequests();
      });

      async_it('redirects to index on a route-like request', async() => {
        expect(await makeRequest(scope, '/baz', 'default', {
          headers: {
            'Accept': 'text/plain, text/html, text/css',
          },
          mode: 'navigate',
        })).toEqual('this is foo');
        server.assertNoOtherRequests();
      });

      async_it('redirects to index on a request to the origin URL request', async() => {
        expect(await makeRequest(scope, 'http://example.com', 'default', {
          headers: {
            'Accept': 'text/plain, text/html, text/css',
          },
          mode: 'navigate',
        })).toEqual('this is foo');
        server.assertNoOtherRequests();
      });

      async_it('does not redirect to index on a non-navigation request', async() => {
        expect(await makeRequest(scope, '/baz', 'default', {
          headers: {
            'Accept': 'text/plain, text/html, text/css',
          },
        })).toBeNull();
        server.assertSawRequestFor('/baz');
      });

      async_it('does not redirect to index on a request with an extension', async() => {
        expect(await makeRequest(scope, '/baz.html', 'default', {
          headers: {
            'Accept': 'text/plain, text/html, text/css',
          },
        })).toBeNull();
        server.assertSawRequestFor('/baz.html');
      });

      async_it('does not redirect to index on a request that does not expect HTML', async() => {
        expect(await makeRequest(scope, '/baz', 'default', {
          headers: {
            'Accept': 'text/plain, text/css',
          },
          mode: 'navigate',
        })).toBeNull();
        server.assertSawRequestFor('/baz');
      });
    });

    describe('bugs', () => {
      async_it('does not crash with bad index hash', async() => {
        scope = new SwTestHarnessBuilder().withServerState(brokenServer).build();
        (scope.registration as any).scope = 'http://site.com';
        driver = new Driver(scope, scope, new CacheDatabase(scope, scope));

        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
      });

      async_it('enters degraded mode when update has a bad index', async() => {
        expect(await makeRequest(scope, '/foo.txt')).toEqual('this is foo');
        await driver.initialized;
        server.clearRequests();

        scope = new SwTestHarnessBuilder()
                    .withCacheState(scope.caches.dehydrate())
                    .withServerState(brokenServer)
                    .build();
        driver = new Driver(scope, scope, new CacheDatabase(scope, scope));
        await driver.checkForUpdate();

        scope.advance(12000);
        await driver.idle.empty;

        expect(driver.state).toEqual(DriverReadyState.EXISTING_CLIENTS_ONLY);
      });
    });
  });
})();

async function makeRequest(
    scope: SwTestHarness, url: string, clientId?: string, init?: Object): Promise<string|null> {
  const [resPromise, done] = scope.handleFetch(new MockRequest(url, init), clientId || 'default');
  await done;
  const res = await resPromise;
  scope.clients.add(clientId || 'default');
  if (res !== undefined && res.ok) {
    return res.text();
  }
  return null;
}