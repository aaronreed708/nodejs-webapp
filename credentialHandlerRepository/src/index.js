/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import * as polyfill from 'credential-handler-polyfill';
import {activate as activateHandler} from './credential-handler';

'use strict';

console.log('credential repository loading at ', window.location.href);

if (!window.data) {
  window.data = {
    "authorization-io": {
      "baseUri": "https:\/\/demo.authorization.io"
    }
  };
}

const MEDIATOR_ORIGIN = window.data['authorization-io'].baseUri;

const loadPolyfillPromise = polyfill.loadOnce(
  MEDIATOR_ORIGIN + '/mediator?origin=' +
  encodeURIComponent(window.location.origin)).then(function() {
    $(document).trigger('credential-handler-polyfill-loaded');
});

if(window.location.pathname === '/credential-handler') {
  (async () => {
    await loadPolyfillPromise;
    activateHandler(MEDIATOR_ORIGIN);
  })();
//  bedrock.setRootModule(false);
} else {
  // only bootstrap AngularJS app when not using credential handler
//  bedrock.setRootModule(module);
}
