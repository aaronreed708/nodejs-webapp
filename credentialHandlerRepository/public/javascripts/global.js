/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/credential-handler-polyfill/CredentialHandler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialHandler.js ***!
  \***********************************************************************/
/*! exports provided: CredentialHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialHandler", function() { return CredentialHandler; });
/* harmony import */ var web_request_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-request-rpc */ "./node_modules/web-request-rpc/index.js");
/* harmony import */ var _CredentialHandlerService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CredentialHandlerService.js */ "./node_modules/credential-handler-polyfill/CredentialHandlerService.js");
/*!
 * The core CredentialHandler class.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global DOMException */






const EVENT_TYPES = ['credentialrequest', 'credentialstore'];

class CredentialHandler extends web_request_rpc__WEBPACK_IMPORTED_MODULE_0__["WebApp"] {
  constructor(mediatorOrigin) {
    if(typeof mediatorOrigin !== 'string') {
      throw new TypeError('"mediatorOrigin" must be a string.');
    }
    super(mediatorOrigin);
    this._emitter = new web_request_rpc__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]({
      async waitUntil(event) {
        // TODO: may need to do `this.hide()` after this promise resolves
        //   to handle case where e.openWindow() was called
        return event._promise || Promise.reject(
          new DOMException(
            'No "credentialrequest" event handler found.', 'NotFoundError'));
      }
    });
  }

  async connect() {
    const injector = await super.connect();

    // define API that CredentialMediator can call on this credential handler
    this.server.define('credentialHandler', new _CredentialHandlerService_js__WEBPACK_IMPORTED_MODULE_1__["CredentialHandlerService"](this));

    // auto-call `ready`
    await this.ready();

    return injector;
  }

  addEventListener(eventType, fn) {
    if(!EVENT_TYPES.includes(eventType)) {
      throw new DOMException(
        `Unsupported event type "${eventType}"`, 'NotSupportedError');
    }
    return this._emitter.addEventListener(eventType, fn);
  }

  removeEventListener(eventType, fn) {
    if(!EVENT_TYPES.includes(eventType)) {
      throw new DOMException(
        `Unsupported event type "${eventType}"`, 'NotSupportedError');
    }
    return this._emitter.removeEventListener(eventType, fn);
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialHandlerRegistration.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialHandlerRegistration.js ***!
  \***********************************************************************************/
/*! exports provided: CredentialHandlerRegistration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialHandlerRegistration", function() { return CredentialHandlerRegistration; });
/* harmony import */ var _CredentialManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CredentialManager.js */ "./node_modules/credential-handler-polyfill/CredentialManager.js");
/*!
 * A CredentialHandlerRegistration provides a CredentialManager to enable Web
 * apps to register Profiles that can be presented to websites.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */




class CredentialHandlerRegistration {
  constructor(url, injector) {
    if(!(url && typeof url === 'string')) {
      throw new TypeError('"url" must be a non-empty string.');
    }
    this.credentialManager = new _CredentialManager_js__WEBPACK_IMPORTED_MODULE_0__["CredentialManager"](url, injector);
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialHandlerService.js":
/*!******************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialHandlerService.js ***!
  \******************************************************************************/
/*! exports provided: CredentialHandlerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialHandlerService", function() { return CredentialHandlerService; });
/* harmony import */ var _CredentialRequestEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CredentialRequestEvent.js */ "./node_modules/credential-handler-polyfill/CredentialRequestEvent.js");
/* harmony import */ var _CredentialStoreEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CredentialStoreEvent.js */ "./node_modules/credential-handler-polyfill/CredentialStoreEvent.js");
/*!
 * A CredentialHandlerService handles remote calls to a CredentialHandler.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */





class CredentialHandlerService {
  constructor(credentialHandler) {
    this._credentialHandler = credentialHandler;
  }

  async request(credentialRequestEvent) {
    // TODO: validate credentialRequestEvent
    return await this._credentialHandler._emitter.emit(
      new _CredentialRequestEvent_js__WEBPACK_IMPORTED_MODULE_0__["CredentialRequestEvent"](Object.assign(
        {credentialHandler: this._credentialHandler}, credentialRequestEvent)));
  }

  async store(credentialStoreEvent) {
    // TODO: validate credentialStoreEvent
    return await this._credentialHandler._emitter.emit(
      new _CredentialStoreEvent_js__WEBPACK_IMPORTED_MODULE_1__["CredentialStoreEvent"](Object.assign(
        {credentialHandler: this._credentialHandler}, credentialStoreEvent)));
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialHandlers.js":
/*!************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialHandlers.js ***!
  \************************************************************************/
/*! exports provided: CredentialHandlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialHandlers", function() { return CredentialHandlers; });
/* harmony import */ var _CredentialHandlerRegistration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CredentialHandlerRegistration.js */ "./node_modules/credential-handler-polyfill/CredentialHandlerRegistration.js");
/*!
 * Provides an API for working with CredentialHandlerRegistrations.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */




class CredentialHandlers {
  constructor(injector) {
    this._injector = injector;
    this._remote = injector.get('credentialHandlers', {
      functions: [
        'register', 'unregister', 'getRegistration', 'hasRegistration']
    });
  }

  /**
   * Creates a credential handler registration.
   *
   * @param url the unique URL for the credential handler.
   *
   * @return a Promise that resolves to the CredentialHandlerRegistration.
   */
  async register(url) {
    // register with credential mediator
    url = await this._remote.register('credential', url);
    return new _CredentialHandlerRegistration_js__WEBPACK_IMPORTED_MODULE_0__["CredentialHandlerRegistration"](url, this._injector);
  }

  /**
   * Unregisters a credential handler, destroying its registration.
   *
   * @param url the unique URL for the credential handler.
   *
   * @return a Promise that resolves to `true` if the handler was registered
   *           and `false` if not.
   */
  async unregister(url) {
    // unregister with credential mediator
    return this._remote.unregister('credential', url);
  }

  /**
   * Gets an existing credential handler registration.
   *
   * @param url the URL for the credential handler.
   *
   * @return a Promise that resolves to the CredentialHandlerRegistration or
   *           `null` if no such registration exists.
   */
  async getRegistration(url) {
    url = await this._remote.getRegistration('credential', url);
    if(!url) {
      return null;
    }
    return new _CredentialHandlerRegistration_js__WEBPACK_IMPORTED_MODULE_0__["CredentialHandlerRegistration"](url, this._injector);
  }

  /**
   * Returns true if the given credential handler has been registered and
   * false if not.
   *
   * @param url the URL for the credential handler.
   *
   * @return a Promise that resolves to `true` if the registration exists and
   *           `false` if not.
   */
  async hasRegistration(url) {
    return await this._remote.hasRegistration('credential', url);
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialHints.js":
/*!*********************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialHints.js ***!
  \*********************************************************************/
/*! exports provided: CredentialHints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialHints", function() { return CredentialHints; });
/*!
 * API for managing CredentialHints.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global Image */


class CredentialHints {
  constructor(url, injector) {
    const remote = injector.get('credentialHints', {
      functions: ['delete', 'get', 'keys', 'has', 'set', 'clear']
    });
    for(let methodName in remote) {
      if(methodName !== 'set') {
        this[methodName] = remote[methodName].bind(this, url);
      }
    }
    this._remoteSet = remote.set.bind(this, url);
  }

  async set(hintKey, credentialHint) {
    // TODO: validate credential hint

    // ensure images are prefetched so that they will not leak information
    // when fetched later
    credentialHint.icons = credentialHint.icons || [];
    const promises = credentialHint.icons.map(icon =>
      imageToDataUrl(icon.src).then(fetchedImage => {
        icon.fetchedImage = fetchedImage;
      }));
    await Promise.all(promises);
    return this._remoteSet(hintKey, credentialHint);
  }
}

function imageToDataUrl(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL();
      resolve(dataUrl);
      canvas = null;
    };
    // TODO: `reject` as an error and fail `.set`?
    img.onerror = () => resolve(null);
    img.src = url;
  });
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialManager.js":
/*!***********************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialManager.js ***!
  \***********************************************************************/
/*! exports provided: CredentialManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialManager", function() { return CredentialManager; });
/* harmony import */ var web_request_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-request-rpc */ "./node_modules/web-request-rpc/index.js");
/* harmony import */ var _CredentialHints_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CredentialHints.js */ "./node_modules/credential-handler-polyfill/CredentialHints.js");
/*!
 * A CredentialManager for a Web Credential Mediator.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */






class CredentialManager {
  constructor(url, injector) {
    if(!(url && typeof url === 'string')) {
      throw new TypeError('"url" must be a non-empty string.');
    }
    this.hints = new _CredentialHints_js__WEBPACK_IMPORTED_MODULE_1__["CredentialHints"](url, injector);
  }

  /**
   * Requests that the user grant 'credentialhandler' permission to the current
   * origin.
   *
   * @return a Promise that resolves to the new PermissionState of the
   *           permission (e.g. 'granted'/'denied').
   */
  static async requestPermission() {
    const status = await navigator.credentialsPolyfill.permissions.request(
      {name: 'credentialhandler'});
    return status.state;
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialRequestEvent.js":
/*!****************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialRequestEvent.js ***!
  \****************************************************************************/
/*! exports provided: CredentialRequestEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialRequestEvent", function() { return CredentialRequestEvent; });
/* harmony import */ var web_request_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-request-rpc */ "./node_modules/web-request-rpc/index.js");
/*!
 * A CredentialRequestEvent is emitted when a request has been made for
 * credentials.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global Event */




// can't use "ExtendableEvent"; only accessible from Workers
// TODO: may not be able to even extend `Event` here; could produce "incorrect"
//   core attributes
class CredentialRequestEvent /*extends Event*/ {
  constructor({
    credentialHandler,
    credentialRequestOrigin,
    credentialRequestOptions,
    hintKey
  }) {
    //super('credentialrequest');
    this.type = 'credentialrequest';
    this._credentialHandler = credentialHandler;
    this.credentialRequestOrigin = credentialRequestOrigin;
    this.credentialRequestOptions = credentialRequestOptions;
    this.hintKey = hintKey;
  }

  async openWindow(url) {
    // TODO: disallow more than one call

    // TODO: ensure `url` is to the same origin
    await this._credentialHandler.show();
    const appWindow = new web_request_rpc__WEBPACK_IMPORTED_MODULE_0__["WebAppWindow"](url, {
      className: 'credential-handler'
    });
    appWindow.ready();
    appWindow.show();
    // TODO: note that `appWindow.handle` is not a ServiceWorker
    //   `WindowClient` polyfill... could be confusing here, should we
    //   implement one to wrap it? -- there is, for example, a
    //   `navigate` call on `WindowClient` that enforces same origin, would
    //   need to attempt to add or approximate that
    return appWindow.handle;
  }

  respondWith(handlerResponse) {
    // TODO: throw exception if `_promise` is already set

    // TODO: validate handlerResponse
    this._promise = handlerResponse;
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialStoreEvent.js":
/*!**************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialStoreEvent.js ***!
  \**************************************************************************/
/*! exports provided: CredentialStoreEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialStoreEvent", function() { return CredentialStoreEvent; });
/* harmony import */ var web_request_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-request-rpc */ "./node_modules/web-request-rpc/index.js");
/*!
 * A CredentialStoreEvent is emitted when a request has been made to
 * store a credential.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global Event */




// can't use "ExtendableEvent"; only accessible from Workers
// TODO: may not be able to even extend `Event` here; could produce "incorrect"
//   core attributes
class CredentialStoreEvent /*extends Event*/ {
  constructor({
    credentialHandler,
    credentialRequestOrigin,
    credential,
    hintKey
  }) {
    //super('credentialstore');
    this.type = 'credentialstore';
    this._credentialHandler = credentialHandler;
    this.credentialRequestOrigin = credentialRequestOrigin;
    this.credential = credential;
    this.hintKey = hintKey;
  }

  async openWindow(url) {
    // TODO: disallow more than one call

    // TODO: ensure `url` is to the same origin
    await this._credentialHandler.show();
    const appWindow = new web_request_rpc__WEBPACK_IMPORTED_MODULE_0__["WebAppWindow"](url);
    appWindow.ready();
    appWindow.show();
    // TODO: note that `appWindow.handle` is not a ServiceWorker
    //   `WindowClient` polyfill... could be confusing here, should we
    //   implement one to wrap it? -- there is, for example, a
    //   `navigate` call on `WindowClient` that enforces same origin, would
    //   need to attempt to add or approximate that
    return appWindow.handle;
  }

  respondWith(handlerResponse) {
    // TODO: throw exception if `_promise` is already set

    // TODO: validate handlerResponse
    this._promise = handlerResponse;
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/CredentialsContainer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/CredentialsContainer.js ***!
  \**************************************************************************/
/*! exports provided: CredentialsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialsContainer", function() { return CredentialsContainer; });
/* harmony import */ var _WebCredential_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebCredential.js */ "./node_modules/credential-handler-polyfill/WebCredential.js");
/*!
 * Wrapper for native CredentialsContainer that uses remote Credential Mediator
 * for WebCredential-related operations.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator, DOMException */




// RPC timeouts, 0 = indefinite
const CREDENTIAL_GET_TIMEOUT = 0;
const CREDENTIAL_STORE_TIMEOUT = 0;

class CredentialsContainer {
  constructor(injector) {
    this._nativeCredentialsContainer = navigator.credentials;
    this._remote = injector.get('credentialsContainer', {
      functions: [
        {name: 'get', options: {timeout: CREDENTIAL_GET_TIMEOUT}},
        {name: 'store', options: {timeout: CREDENTIAL_STORE_TIMEOUT}}
      ]
    });
  }

  async get(/*CredentialRequestOptions*/ options = {}) {
    if(options.web) {
      const credential = await this._remote.get(options);
      if(!credential) {
        // no credential selected
        return null;
      }
      // TODO: validate credential
      return new _WebCredential_js__WEBPACK_IMPORTED_MODULE_0__["WebCredential"](credential.dataType, credential.data);
    }
    if(this._nativeCredentialsContainer) {
      return this._nativeCredentialsContainer.get(options);
    }
    throw new DOMException('Not implemented.', 'NotSupportedError');
  }

  async store(credential) {
    if(credential instanceof _WebCredential_js__WEBPACK_IMPORTED_MODULE_0__["WebCredential"]) {
      const result = await this._remote.store(credential);
      if(!result) {
        // nothing stored
        return null;
      }
      // TODO: validate result
      return new _WebCredential_js__WEBPACK_IMPORTED_MODULE_0__["WebCredential"](result.dataType, result.data);
    }
    if(this._nativeCredentialsContainer) {
      return this._nativeCredentialsContainer.store(credential);
    }
    throw new DOMException('Not implemented.', 'NotSupportedError');
  }

  async create(/*CredentialCreationOptions*/ options = {}) {
    if(this._nativeCredentialsContainer) {
      return this._nativeCredentialsContainer.create(options);
    }
    throw new DOMException('Not implemented.', 'NotSupportedError');
  }

  async preventSilentAccess() {
    if(this._nativeCredentialsContainer) {
      return this._nativeCredentialsContainer.preventSilentAccess();
    }
    throw new DOMException('Not implemented.', 'NotSupportedError');
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/WebCredential.js":
/*!*******************************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/WebCredential.js ***!
  \*******************************************************************/
/*! exports provided: WebCredential */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebCredential", function() { return WebCredential; });
/*!
 * A WebCredential is a Credential that can be retrieved from or stored by a
 * "credential handler" that runs in a third party Web application.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


class WebCredential {
  constructor(dataType, data) {
    if(typeof dataType !== 'string') {
      throw new TypeError('"dataType" must be a string.');
    }
    this.type = 'web';
    this.dataType = dataType;
    this.data = data;
  }
}


/***/ }),

/***/ "./node_modules/credential-handler-polyfill/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/credential-handler-polyfill/index.js ***!
  \***********************************************************/
/*! exports provided: loadOnce, load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOnce", function() { return loadOnce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony import */ var web_request_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-request-rpc */ "./node_modules/web-request-rpc/index.js");
/* harmony import */ var _CredentialHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CredentialHandler.js */ "./node_modules/credential-handler-polyfill/CredentialHandler.js");
/* harmony import */ var _CredentialHandlers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CredentialHandlers.js */ "./node_modules/credential-handler-polyfill/CredentialHandlers.js");
/* harmony import */ var _CredentialManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CredentialManager.js */ "./node_modules/credential-handler-polyfill/CredentialManager.js");
/* harmony import */ var _CredentialsContainer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CredentialsContainer.js */ "./node_modules/credential-handler-polyfill/CredentialsContainer.js");
/* harmony import */ var _WebCredential_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WebCredential.js */ "./node_modules/credential-handler-polyfill/WebCredential.js");
/*!
 * Credential Handler API Polyfill.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */










// RPC timeouts, 0 = indefinite
const PERMISSION_REQUEST_TIMEOUT = 0;

let loaded;
async function loadOnce(mediatorUrl) {
  if(loaded) {
    return loaded;
  }
  return loaded = await load(mediatorUrl);
}

async function load(mediatorUrl) {
  const polyfill = {};

  if(!mediatorUrl) {
    mediatorUrl = 'https://credential.mediator.dev:15443/mediator?origin=' +
      encodeURIComponent(window.location.origin)
  }

  //const url = 'https://bedrock.dev:18443/mediator';
  const appContext = new web_request_rpc__WEBPACK_IMPORTED_MODULE_0__["WebAppContext"]();
  const injector = await appContext.createWindow(mediatorUrl, {
    className: 'credential-mediator'
  });

  polyfill.permissions = injector.get('permissionManager', {
    functions: [
      'query',
      {name: 'request', options: {timeout: PERMISSION_REQUEST_TIMEOUT}},
      'revoke']
  });

  // TODO: only install CredentialHandlers API when appropriate
  polyfill.CredentialHandlers = new _CredentialHandlers_js__WEBPACK_IMPORTED_MODULE_2__["CredentialHandlers"](injector);

  // TODO: only expose CredentialHandler API when appropriate
  polyfill.CredentialHandler = _CredentialHandler_js__WEBPACK_IMPORTED_MODULE_1__["CredentialHandler"];

  // TODO: only expose CredentialManager API when appropriate
  polyfill.CredentialManager = _CredentialManager_js__WEBPACK_IMPORTED_MODULE_3__["CredentialManager"];

  // TODO: only expose CredentialsContainer API when appropriate
  polyfill.credentials = new _CredentialsContainer_js__WEBPACK_IMPORTED_MODULE_4__["CredentialsContainer"](injector);

  // TODO: only expose WebCredential API when appropriate
  polyfill.WebCredential = _WebCredential_js__WEBPACK_IMPORTED_MODULE_5__["WebCredential"];

  // expose polyfill
  navigator.credentialsPolyfill = polyfill;

  // polyfill
  if('credentials' in navigator) {
    navigator.credentials.get = polyfill.credentials.get.bind(
      polyfill.credentials);
    navigator.credentials.store = polyfill.credentials.store.bind(
      polyfill.credentials);
  } else {
    navigator.credentials = polyfill.credentials;
  }
  window.CredentialManager = _CredentialManager_js__WEBPACK_IMPORTED_MODULE_3__["CredentialManager"];
  window.WebCredential = _WebCredential_js__WEBPACK_IMPORTED_MODULE_5__["WebCredential"];

  return polyfill;
};


/***/ }),

/***/ "./node_modules/web-request-rpc/Client.js":
/*!************************************************!*\
  !*** ./node_modules/web-request-rpc/Client.js ***!
  \************************************************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return Client; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web-request-rpc/utils.js");
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */




// 30 second default timeout
const RPC_CLIENT_CALL_TIMEOUT = 30000;

class Client {
  constructor() {
    this.origin = null;
    this._handle = null;
    this._listener = null;
    // all pending requests
    this._pending = new Map();
  }

  /**
   * Connects to a Web Request RPC server.
   *
   * The Promise will resolve to an RPC injector that can be used to get or
   * define APIs to enable communication with the server.
   *
   * @param origin the origin to send messages to.
   * @param options the options to use:
   *          [handle] a handle to the window (or a Promise that resolves to
   *            a handle) to send messages to
   *            (defaults to `window.parent || window.opener`).
   *
   * @return a Promise that resolves to an RPC injector once connected.
   */
  async connect(origin, options) {
    if(this._listener) {
      throw new Error('Already connected.');
    }

    options = options || {};

    // TODO: validate `origin` and `options.handle`
    const self = this;
    self.origin = _utils_js__WEBPACK_IMPORTED_MODULE_0__["parseUrl"](origin).origin;
    self._handle = options.handle || window.parent || window.opener;

    const pending = self._pending;
    self._listener = _utils_js__WEBPACK_IMPORTED_MODULE_0__["createMessageListener"]({
      origin: self.origin,
      handle: self._handle,
      expectRequest: false,
      listener: message => {
        // ignore messages that have no matching, pending request
        if(!(message.id in pending)) {
          return;
        }

        // resolve or reject Promise associated with message
        const {resolve, reject, cancelTimeout} = pending[message.id];
        cancelTimeout();
        if('result' in message) {
          return resolve(message.result);
        }
        reject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["deserializeError"](message.error));
      }
    });
    window.addEventListener('message', self._listener);

    return new Injector(self);
  }

  /**
   * Performs a RPC by sending a message to the Web Request RPC server and
   * awaiting a response.
   *
   * @param qualifiedMethodName the fully-qualified name of the method to call.
   * @param parameters the parameters for the method.
   * @param options the options to use:
   *          [timeout] a timeout, in milliseconds, for awaiting a response;
   *            a non-positive timeout (<= 0) will cause an indefinite wait.
   *
   * @return a Promise that resolves to the result (or error) of the call.
   */
  async send(qualifiedMethodName, parameters, {
    timeout = RPC_CLIENT_CALL_TIMEOUT
  }) {
    if(!this._listener) {
      throw new Error('RPC client not connected.');
    }

    const self = this;

    const message = {
      jsonrpc: '2.0',
      id: _utils_js__WEBPACK_IMPORTED_MODULE_0__["uuidv4"](),
      method: qualifiedMethodName,
      params: parameters
    };

    // HACK: we can't just `Promise.resolve(handle)` because Chrome has
    // a bug that throws an exception if the handle is cross domain
    if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["isHandlePromise"](self._handle)) {
      const handle = await self._handle;
      handle.postMessage(message, self.origin);
    } else {
      self._handle.postMessage(message, self.origin);
    }

    // return Promise that will resolve once a response message has been
    // received or once a timeout occurs
    return new Promise((resolve, reject) => {
      const pending = self._pending;
      let cancelTimeout;
      if(timeout > 0) {
        const timeoutId = setTimeout(() => {
          delete pending[message.id];
          reject(new Error('RPC call timed out.'));
        }, timeout);
        cancelTimeout = () => clearTimeout(timeoutId);
      } else {
        cancelTimeout = () => {};
      }
      pending[message.id] = {resolve, reject, cancelTimeout};
    });
  }

  /**
   * Disconnects from the remote Web Request RPC server and closes down this
   * client.
   */
  close() {
    if(this._listener) {
      window.removeEventListener('message', this._listener);
      this._handle = this.origin = this._listener = null;
      this._pending = new Map();
    }
  }
}

class Injector {
  constructor(client) {
    this.client = client;
    this._apis = new Map();
  }

  /**
   * Defines a named API that will use an RPC client to implement its
   * functions. Each of these functions will be asynchronous and return a
   * Promise with the result from the RPC server.
   *
   * This function will return an interface with functions defined according
   * to those provided in the given `definition`. The `name` parameter can be
   * used to obtain this cached interface via `.get(name)`.
   *
   * @param name the name of the API.
   * @param definition the definition for the API, including:
   *          functions: an array of function names (as strings) or objects
   *            containing: {name: <functionName>, options: <rpcClientOptions>}.
   *
   * @return an interface with the functions provided via `definition` that
   *           will make RPC calls to an RPC server to provide their
   *           implementation.
   */
  define(name, definition) {
    if(!(name && typeof name === 'string')) {
      throw new TypeError('`name` must be a non-empty string.');
    }
    // TODO: support Web IDL as a definition format?
    if(!(definition && typeof definition === 'object' &&
      Array.isArray(definition.functions))) {
      throw new TypeError(
        '`definition.function` must be an array of function names or ' +
        'function definition objects to be defined.');
    }

    const self = this;
    const api = {};

    definition.functions.forEach(fn => {
      if(typeof fn === 'string') {
        fn = {name: fn, options: {}};
      }
      api[fn.name] = async function() {
        return self.client.send(
          name + '.' + fn.name, [...arguments], fn.options);
      };
    });

    self._apis[name] = api;
    return api;
  }

  /**
   * Get a named API, defining it if necessary when a definition is provided.
   *
   * @param name the name of the API.
   * @param [definition] the definition for the API; if the API is already
   *          defined, this definition is ignored.
   *
   * @return the interface.
   */
  get(name, definition) {
    const api = this._apis[name];
    if(!api) {
      if(definition) {
        return this.define(name, definition);
      }
      throw new Error(`API "${name}" has not been defined.`);
    }
    return this._apis[name];
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/EventEmitter.js":
/*!******************************************************!*\
  !*** ./node_modules/web-request-rpc/EventEmitter.js ***!
  \******************************************************/
/*! exports provided: EventEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return EventEmitter; });
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


class EventEmitter {
  constructor({deserialize = e => e, waitUntil = async () => {}} = {}) {
    this._listeners = [];
    this._deserialize = deserialize;
    this._waitUntil = waitUntil;
  }

  async emit(event) {
    event = this._deserialize(event);
    (this._listeners[event.type] || []).forEach(l => l(event));
    return this._waitUntil(event);
  }

  addEventListener(eventType, fn) {
    if(!this._listeners[eventType]) {
      this._listeners[eventType] = [fn];
    } else {
      this._listeners[eventType].push(fn);
    }
  }

  removeEventListener(eventType, fn) {
    const listeners = this._listeners[eventType];
    if(!listeners) {
      return;
    }
    const idx = listeners.indexOf(fn);
    if(idx !== -1) {
      listeners.splice(idx, 1);
    }
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/Server.js":
/*!************************************************!*\
  !*** ./node_modules/web-request-rpc/Server.js ***!
  \************************************************/
/*! exports provided: Server */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Server", function() { return Server; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web-request-rpc/utils.js");
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */




class Server {
  constructor() {
    this.origin = null;
    this._handle = null;
    this._apis = new Map();
  }

  /**
   * Provides an implementation for a named API. All functions in the given
   * API will be made callable via RPC clients connected to this server.
   *
   * @param name the name of the API.
   * @param api the API to add.
   */
  define(name, api) {
    if(!(name && typeof name === 'string')) {
      throw new TypeError('`name` must be a non-empty string.');
    }
    if(!(api && api !== 'object')) {
      throw new TypeError('`api` must be an object.');
    }
    if(name in this._apis) {
      throw new Error(`The "${name}" API is already defined.`);
    }

    this._apis[name] = api;
  }

  /**
   * Listens for RPC messages from clients from a particular origin and
   * window handle and uses them to execute API calls based on predefined
   * APIs.
   *
   * If messages are not from the given origin or window handle, they are
   * ignored. If the messages refer to named APIs that have not been defined
   * then an error message is sent in response. These error messages can
   * be suppressed by using the `ignoreUnknownApi` option.
   *
   * If a message refers to an unknown method on a known named API, then an
   * error message is sent in response.
   *
   * @param origin the origin to listen for.
   * @param options the options to use:
   *          [handle] a handle to the window (or a Promise that resolves to
   *            a handle) to listen for messages from
   *            (defaults to `window.parent || window.opener`).
   *          [ignoreUnknownApi] `true` to ignore unknown API messages.
   */
  async listen(origin, options) {
    if(this._listener) {
      throw new Error('Already listening.');
    }

    options = options || {};

    // TODO: validate `origin` and `options.handle`
    const self = this;
    self.origin = _utils_js__WEBPACK_IMPORTED_MODULE_0__["parseUrl"](origin).origin;
    self._handle = options.handle || window.parent || window.opener;

    const ignoreUnknownApi = (options.ignoreUnknownApi === 'true') || false;

    self._listener = _utils_js__WEBPACK_IMPORTED_MODULE_0__["createMessageListener"]({
      origin: self.origin,
      handle: self._handle,
      expectRequest: true,
      listener: message => {
        const {name, method} = _utils_js__WEBPACK_IMPORTED_MODULE_0__["destructureMethodName"](message.method);
        const api = self._apis[name];

        // do not allow calling "private" methods (starts with `_`)
        if(method && method.startsWith('_')) {
          return sendMethodNotFound(self._handle, self.origin, message);
        }

        // API not found but ignore flag is on
        if(!api && ignoreUnknownApi) {
          // API not registered, ignore the message rather than raise error
          return;
        }

        // no ignore flag and unknown API or unknown specific method
        if(!api || typeof api[method] !== 'function') {
          return sendMethodNotFound(self._handle, self.origin, message);
        }

        // API and specific function found
        const fn = api[method];
        (async () => {
          const response = {
            jsonrpc: '2.0',
            id: message.id
          };
          try {
            response.result = await fn.apply(api, message.params);
          } catch(e) {
            response.error = _utils_js__WEBPACK_IMPORTED_MODULE_0__["serializeError"](e);
          }
          // if server did not `close` while we waited for a response
          if(self._handle) {
            // HACK: we can't just `Promise.resolve(handle)` because Chrome has
            // a bug that throws an exception if the handle is cross domain
            if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["isHandlePromise"](self._handle)) {
              self._handle.then(h => h.postMessage(response, self.origin));
            } else {
              self._handle.postMessage(response, self.origin);
            }
          }
        })();
      }
    });
    window.addEventListener('message', self._listener);
  }

  close() {
    if(this._listener) {
      window.removeEventListener('message', this._listener);
      this._handle = this.origin = this._listener = null;
    }
  }
}

function sendMethodNotFound(handle, origin, message) {
  const response = {
    jsonrpc: '2.0',
    id: message.id,
    error: Object.assign({}, _utils_js__WEBPACK_IMPORTED_MODULE_0__["RPC_ERRORS"].MethodNotFound)
  };
  // HACK: we can't just `Promise.resolve(handle)` because Chrome has
  // a bug that throws an exception if the handle is cross domain
  if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["isHandlePromise"](handle)) {
    return handle.then(h => h.postMessage(response, origin));
  } else {
    return handle.postMessage(response, origin);
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/WebApp.js":
/*!************************************************!*\
  !*** ./node_modules/web-request-rpc/WebApp.js ***!
  \************************************************/
/*! exports provided: WebApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebApp", function() { return WebApp; });
/* harmony import */ var _Client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Client.js */ "./node_modules/web-request-rpc/Client.js");
/* harmony import */ var _Server_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Server.js */ "./node_modules/web-request-rpc/Server.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web-request-rpc/utils.js");
/*!
 * A WebApp is a remote application that runs in a WebAppContext.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */






class WebApp {
  constructor(relyingOrigin) {
    // this is the origin that created the WebAppContext to run it in
    // TODO: better name? `contextOrigin`?
    this.relyingOrigin = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["parseUrl"])(relyingOrigin).origin;
    this.client = null;
    this.injector = null;
    this.client = new _Client_js__WEBPACK_IMPORTED_MODULE_0__["Client"]();
    this.server = new _Server_js__WEBPACK_IMPORTED_MODULE_1__["Server"]();

    this._control = null;
    this._connected = false;
  }

  /**
   * Connects this WebApp to the relying origin that instantiated it. Once
   * connected, the WebApp can start servicing calls from that origin.
   *
   * @return a Promise that resolves to an injector for creating custom client
   *           APIs once the connection is ready.
   */
  async connect() {
    this.injector = await this.client.connect(this.relyingOrigin);
    this._connected = true;
    this._control = this.injector.define('core.control', {
      functions: ['ready', 'show', 'hide']
    });
    this.server.listen(this.relyingOrigin);
    return this.injector;
  }

  /**
   * Must be called after `connect` when this WebApp is ready to start
   * receiving calls from the remote end.
   */
  async ready() {
    if(!this._connected) {
      throw new Error('WebApp not connected. Did you call ".connect()"?');
    }
    await this._control.ready();
    return this;
  }

  /**
   * Closes this WebApp's connection to the relying origin.
   */
  close() {
    if(this._connected) {
      this.server.close();
      this.client.close();
      this._connected = false;
    }
  }

  /**
   * Shows the UI for this WebApp on the relying origin.
   */
  async show() {
    if(!this._connected) {
      throw new Error(
        'Cannot "show" yet; not connected. Did you call ".connect()"?');
    }
    return this._control.show();
  }

  /**
   * Hides the UI for this WebApp on the relying origin.
   */
  async hide() {
    if(!this._connected) {
      throw new Error(
        'Cannot "hide" yet; not connected. Did you call ".connect()?"');
    }
    return this._control.hide();
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/WebAppContext.js":
/*!*******************************************************!*\
  !*** ./node_modules/web-request-rpc/WebAppContext.js ***!
  \*******************************************************/
/*! exports provided: WebAppContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAppContext", function() { return WebAppContext; });
/* harmony import */ var _Client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Client.js */ "./node_modules/web-request-rpc/Client.js");
/* harmony import */ var _Server_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Server.js */ "./node_modules/web-request-rpc/Server.js");
/* harmony import */ var _WebAppWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebAppWindow.js */ "./node_modules/web-request-rpc/WebAppWindow.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web-request-rpc/utils.js");
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */







// 10 seconds
const WEB_APP_CONTEXT_LOAD_TIMEOUT = 10000;

class WebAppContext {
  constructor() {
    this.client = new _Client_js__WEBPACK_IMPORTED_MODULE_0__["Client"]();
    this.server = new _Server_js__WEBPACK_IMPORTED_MODULE_1__["Server"]();
    this.injector = null;
    this.control = null;
    this.loaded = false;
  }

  /**
   * Creates a window (or attaches to an existing one) that loads a page that
   * is expected to understand the web request RPC protocol. This method
   * returns a Promise that will resolve once the page uses RPC to indicate
   * that it is ready to be communicated with or once a timeout occurs.
   *
   * The Promise will resolve to an RPC injector that can be used to get or
   * define APIs to enable communication with the WebApp running in the
   * WebAppContext.
   *
   * @param url the URL to the page to connect to.
   * @param options the options to use:
   *          [timeout] the timeout for waiting for the client to be ready.
   *          [handle] a window handle to connect to; may be a Promise that
   *            that resolves to a handle.
   *          [iframe] an iframe element to connect to.
   *          [windowControl] a window control interface to connect to.
   *          [className] a className to assign to the window for CSS purposes.
   *          [customize(options)] a function to customize the dialog that
   *            loads the window after its construction.
   *
   * @return a Promise that resolves to an RPC injector once the window is
   *           ready.
   */
  async createWindow(
    url, {
      timeout = WEB_APP_CONTEXT_LOAD_TIMEOUT,
      iframe,
      handle,
      windowControl,
      className,
      customize
    } = {}) {
    // disallow loading the same WebAppContext more than once
    if(this.loaded) {
      throw new Error('AppContext already loaded.');
    }
    this.loaded = true;

    // create control API for WebApp to call via its own RPC client
    this.control = new _WebAppWindow_js__WEBPACK_IMPORTED_MODULE_2__["WebAppWindow"](url, {
      timeout,
      iframe,
      handle,
      windowControl,
      className,
      customize
    });

    // define control class; this enables the WebApp that is running in the
    // WebAppContext to control its UI or close itself down
    this.server.define('core.control', this.control);

    // listen for calls from the window, ignoring calls to unknown APIs
    // to allow those to be handled by other servers
    const origin = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["parseUrl"])(url).origin;
    this.server.listen(origin, {
      handle: this.control.handle,
      ignoreUnknownApi: true
    });

    // wait for control to be ready
    await this.control._private.isReady();

    // connect to the WebAppContext and return the injector
    this.injector = await this.client.connect(origin, {
      handle: this.control.handle
    });
    return this.injector;
  }

  close() {
    this.control._private.destroy();
    this.server.close();
    this.client.close();
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/WebAppWindow.js":
/*!******************************************************!*\
  !*** ./node_modules/web-request-rpc/WebAppWindow.js ***!
  \******************************************************/
/*! exports provided: WebAppWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebAppWindow", function() { return WebAppWindow; });
/*!
 * Copyright (c) 2017-2018 Digital Bazaar, Inc. All rights reserved.
 */


// default time out is 10 seconds
const LOAD_WINDOW_TIMEOUT = 10000;

/**
 * Provides a window and API for remote Web applications. This API is typically
 * used by RPC WebApps that run in a WebAppContext to indicate when they are
 * ready and to show/hide their UI.
 */
class WebAppWindow {
  constructor(
    url, {
      timeout = LOAD_WINDOW_TIMEOUT,
      handle,
      iframe,
      windowControl,
      className = null,
      customize = null
    } = {}) {
    const self = this;

    self.visible = false;
    self.dialog = null;
    self.iframe = null;
    self.handle = null;
    self.windowControl = null;
    self._ready = false;
    self._private = {};

    // private to allow caller to track readiness
    self._private._readyPromise = new Promise((resolve, reject) => {
      // reject if timeout reached
      const timeoutId = setTimeout(
        () => reject(new Error('Loading Web application window timed out.')),
        timeout);
      self._private._resolveReady = value => {
        clearTimeout(timeoutId);
        resolve(value);
      };
    });
    self._private.isReady = async () => {
      return self._private._readyPromise;
    };

    // private to disallow destruction via client
    self._private.destroy = () => {
      if(self.dialog) {
        self.dialog.parentNode.removeChild(self.dialog);
        self.dialog = null;
      }
    };

    if(iframe) {
      // TODO: validate `iframe` option as much as possible
      if(!(typeof iframe === 'object' && iframe.contentWindow)) {
        throw new TypeError('`options.iframe` must be an iframe element.');
      }
      self.windowControl = {
        handle: iframe.contentWindow,
        show() {
          iframe.style.visibility = 'visible';
        },
        hide() {
          iframe.style.visibility = 'hidden';
        }
      };
      self.iframe = iframe;
      self.handle = self.iframe.contentWindow;
      return;
    }

    if(windowControl) {
      // TODO: validate `windowControl`
      self.windowControl = windowControl;
      self.handle = self.windowControl.handle;
      return;
    }

    if(handle) {
      // TODO: validate `handle`
      self.handle = handle;
      return;
    }

    if(customize) {
      if(!typeof customize === 'function') {
        throw new TypeError('`options.customize` must be a function.');
      }
    }

    // create a top-level dialog overlay
    self.dialog = document.createElement('dialog');
    applyStyle(self.dialog, {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 'auto',
      height: 'auto',
      display: 'none',
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      color: 'black',
      'box-sizing': 'border-box',
      overflow: 'hidden',
      'z-index': 1000000
    });
    self.dialog.className = 'web-app-window';
    if(typeof className === 'string') {
      self.dialog.className = self.dialog.className + ' ' + className;
    }

    // ensure backdrop is transparent by default
    const style = document.createElement('style');
    style.appendChild(
      document.createTextNode(`dialog.web-app-window::backdrop {
        background-color: transparent;
      }`));

    // create flex container for iframe
    self.container = document.createElement('div');
    applyStyle(self.container, {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      'flex-direction': 'column'
    });

    // create iframe
    self.iframe = document.createElement('iframe');
    self.iframe.src = url;
    self.iframe.scrolling = 'no';
    applyStyle(self.iframe, {
      position: 'relative',
      border: 'none',
      background: 'transparent',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      'flex-grow': 1,
      width: '100%',
      height: '100%'
    });

    // assemble dialog
    self.dialog.appendChild(style);
    self.container.appendChild(self.iframe);
    self.dialog.appendChild(self.container);

    // handle cancel (user pressed escape)
    self.dialog.addEventListener('cancel', e => {
      e.preventDefault();
      self.hide();
    });

    // attach to DOM
    document.body.appendChild(self.dialog);
    self.handle = self.iframe.contentWindow;

    if(customize) {
      try {
        customize({
          dialog: self.dialog,
          container: self.container,
          iframe: self.iframe,
          webAppWindow: self
        });
      } catch(e) {
        console.error(e);
      }
    }
  }

  /**
   * Called by the client when it is ready to receive messages.
   */
  ready() {
    this._ready = true;
    this._private._resolveReady(true);
  }

  /**
   * Called by the client when it wants to show UI.
   */
  show() {
    if(!this.visible) {
      this.visible = true;
      if(this.dialog) {
        this.dialog.style.display = 'block';
        if(this.dialog.showModal) {
          this.dialog.showModal();
        }
      } else if(this.windowControl.show) {
        this.windowControl.show();
      }
    }
  }

  /**
   * Called by the client when it wants to hide UI.
   */
  hide() {
    if(this.visible) {
      this.visible = false;
      if(this.dialog) {
        this.dialog.style.display = 'none';
        if(this.dialog.close) {
          try {
            this.dialog.close();
          } catch(e) {
            console.error(e);
          }
        }
      } else if(this.windowControl.hide) {
        this.windowControl.hide();
      }
    }
  }
}

function applyStyle(element, style) {
  for(let name in style) {
    element.style[name] = style[name];
  }
}


/***/ }),

/***/ "./node_modules/web-request-rpc/index.js":
/*!***********************************************!*\
  !*** ./node_modules/web-request-rpc/index.js ***!
  \***********************************************/
/*! exports provided: Client, EventEmitter, Server, WebApp, WebAppContext, WebAppWindow, utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Client.js */ "./node_modules/web-request-rpc/Client.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return _Client_js__WEBPACK_IMPORTED_MODULE_0__["Client"]; });

/* harmony import */ var _EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventEmitter.js */ "./node_modules/web-request-rpc/EventEmitter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]; });

/* harmony import */ var _Server_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Server.js */ "./node_modules/web-request-rpc/Server.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Server", function() { return _Server_js__WEBPACK_IMPORTED_MODULE_2__["Server"]; });

/* harmony import */ var _WebApp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebApp.js */ "./node_modules/web-request-rpc/WebApp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebApp", function() { return _WebApp_js__WEBPACK_IMPORTED_MODULE_3__["WebApp"]; });

/* harmony import */ var _WebAppContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebAppContext.js */ "./node_modules/web-request-rpc/WebAppContext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAppContext", function() { return _WebAppContext_js__WEBPACK_IMPORTED_MODULE_4__["WebAppContext"]; });

/* harmony import */ var _WebAppWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WebAppWindow.js */ "./node_modules/web-request-rpc/WebAppWindow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebAppWindow", function() { return _WebAppWindow_js__WEBPACK_IMPORTED_MODULE_5__["WebAppWindow"]; });

/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./node_modules/web-request-rpc/utils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _utils_js__WEBPACK_IMPORTED_MODULE_6__; });
/*!
 * JSON-RPC for Web Request Polyfills.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */













/***/ }),

/***/ "./node_modules/web-request-rpc/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/web-request-rpc/utils.js ***!
  \***********************************************/
/*! exports provided: RPC_ERRORS, parseUrl, originMatches, uuidv4, isValidOrigin, isValidMessage, isValidRequest, isValidResponse, isValidError, serializeError, deserializeError, createMessageListener, destructureMethodName, isHandlePromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RPC_ERRORS", function() { return RPC_ERRORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUrl", function() { return parseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "originMatches", function() { return originMatches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuidv4", function() { return uuidv4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidOrigin", function() { return isValidOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMessage", function() { return isValidMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidRequest", function() { return isValidRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidResponse", function() { return isValidResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidError", function() { return isValidError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeError", function() { return serializeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserializeError", function() { return deserializeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessageListener", function() { return createMessageListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destructureMethodName", function() { return destructureMethodName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHandlePromise", function() { return isHandlePromise; });
/*!
 * Utilities for Web Request RPC.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global URL */


const RPC_ERRORS = {
  ParseError: {
    message: 'Parse error',
    code: -32700
  },
  InvalidRequest: {
    message: 'Invalid Request',
    code: -32600
  },
  MethodNotFound: {
    message: 'Method not found',
    code: -32601
  },
  InvalidParams: {
    message: 'Invalid params',
    code: -32602
  },
  InternalError: {
    message: 'Internal Error',
    code: -32603
  },
  ServerError: {
    message: 'Server error',
    code: -32000
  }
};

function parseUrl(url, base) {
  if(base === undefined) {
    base = window.location.href;
  }

  if(typeof URL !== 'undefined') {
    return new URL(url, base);
  }

  if(typeof url !== 'string') {
    throw new TypeError('"url" must be a string.');
  }

  // FIXME: rudimentary relative URL resolution
  if(!url.includes(':')) {
    if(base.startsWith('http') && !url.startsWith('/')) {
      url = base + '/' + url;
    } else {
      url = base + url;
    }
  }

  // `URL` API not supported, use DOM to parse URL
  const parser = document.createElement('a');
  parser.href = url;
  let origin = (parser.protocol || window.location.protocol) + '//';
  if(parser.host) {
    // use hostname when using default ports
    // (IE adds always adds port to `parser.host`)
    if((parser.protocol === 'http:' && parser.port === '80') ||
      (parser.protocol === 'https:' && parser.port === '443')) {
      origin += parser.hostname;
    } else {
      origin += parser.host;
    }
  } else {
    origin += window.location.host;
  }

  return {
    // TODO: is this safe for general use on every browser that doesn't
    //   support WHATWG URL?
    host: parser.host || window.location.host,
    hostname: parser.hostname,
    origin: origin,
    protocol: parser.protocol,
    pathname: parser.pathname
  };
}

function originMatches(url, origin) {
  return parseUrl(url, origin).origin === origin;
}

// https://gist.github.com/LeverOne/1308368
function uuidv4(a,b) {
  for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b;
}

function isValidOrigin(url, origin) {
  if(!originMatches(url, origin)) {
    throw new Error(
      `Origin mismatch. Url "${url}" does not have an origin of "${origin}".`);
  }
}

function isValidMessage(message) {
  return (
    message && typeof message === 'object' &&
    message.jsonrpc === '2.0' &&
    message.id && typeof message.id === 'string');
}

function isValidRequest(message) {
  return isValidMessage(message) && Array.isArray(message.params);
}

function isValidResponse(message) {
  return (
    isValidMessage(message) &&
    !!('result' in message ^ 'error' in message) &&
    (!('error' in message) || isValidError(message.error)));
}

function isValidError(error) {
  return (
    error && typeof error === 'object' &&
    typeof error.code === 'number' &&
    typeof error.message === 'string');
}

function serializeError(error) {
  const err = {
    message: error.message
  };
  if(error.constructor.name !== 'Error') {
    err.constructor = error.constructor.name;
  }
  if('name' in error) {
    err.name = error.name;
  }
  if('code' in error) {
    err.code = error.code;
  } else {
    err.code = RPC_ERRORS.ServerError.code;
  }
  if('details' in error) {
    err.details = error.details;
  }
  return err;
}

function deserializeError(error) {
  let err;
  // special case known types, otherwise use generic Error
  if(error.constructor === 'DOMException') {
    err = new DOMException(error.message, error.name)
    // ignore code, name will set it
  } else {
    err = new Error(error.message);
    if('code' in error) {
      err.code = error.code;
    }
  }
  if(error.details) {
    err.details = error.details;
  }
  return err;
}

function createMessageListener(
  {listener, origin, handle, expectRequest}) {
  // HACK: we can't just `Promise.resolve(handle)` because Chrome has
  // a bug that throws an exception if the handle is cross domain
  if(isHandlePromise(handle)) {
    const promise = handle;
    handle = false;
    promise.then(h => handle = h);
  }
  return e => {
    // ignore messages from a non-matching handle or origin
    // or that don't follow the protocol
    if(!(e.source === handle && e.origin === origin &&
      ((expectRequest && isValidRequest(e.data)) ||
        (!expectRequest && isValidResponse(e.data))))) {
      return;
    }
    listener(e.data, e);
  };
}

function destructureMethodName(fqMethodName) {
  // fully-qualified method name is: `<api-name>.<method-name>`
  // where `<api-name>` is all but the last dot-delimited segment and
  // `<method-name>` is the last dot-delimited segment
  let [name, ...rest] = fqMethodName.split('.');
  const method = rest.pop();
  name = [name, ...rest].join('.');
  return {name, method};
}

function isHandlePromise(handle) {
  try {
    // HACK: we can't just `Promise.resolve(handle)` because Chrome has
    // a bug that throws an exception if the handle is cross domain
    return typeof handle.then === 'function';
  } catch(e) {}
  return false;
}


/***/ }),

/***/ "./src/credential-handler.js":
/*!***********************************!*\
  !*** ./src/credential-handler.js ***!
  \***********************************/
/*! exports provided: activate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activate", function() { return activate; });
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */


async function activate(mediatorOrigin) {
  console.log('credential handler activating!');
  const CredentialHandler = navigator.credentialsPolyfill.CredentialHandler;
  const self = new CredentialHandler(mediatorOrigin);

  self.addEventListener('credentialrequest', handleCredentialEvent)
  self.addEventListener('credentialstore', handleCredentialEvent);

  await self.connect();
  console.log('credential handler connected');
}

function handleCredentialEvent(event) {
  event.respondWith(new Promise(async (resolve, reject) => {
    // handle request for ID and public key (typical login)
    if(event.type === 'credentialrequest') {
      let query = event.credentialRequestOptions.web.VerifiableProfile;
      query = Object.assign({}, query);
      delete query['@context'];
      if('id' in query && 'publicKey' in query &&
        Object.keys(query).length === 2) {
        // cryptokey request, return verifiable profile immediately
        return resolve({
          dataType: 'VerifiableProfile',
          data: {
            '@context': 'https://w3id.org/identity/v1',
            id: event.hintKey,
            // TODO: add public key credential
            // credential: ...
          }
        });
      }
    }

    // handle other requests that require a UI
    let windowClient;
    let listener;
    window.addEventListener('message', listener = e => {
      if(!(e.source === windowClient &&
        e.origin === window.location.origin)) {
        return;
      }

      if(e.data.type === 'request') {
        console.log('sending credential event data to UI window...');
        // send event data to UI window
        return windowClient.postMessage({
          type: event.type,
          credentialRequestOrigin: event.credentialRequestOrigin,
          credentialRequestOptions: event.credentialRequestOptions,
          credential: event.credential,
          hintKey: event.hintKey
        }, window.location.origin);
      }

      // this message is final (an error or a response)
      window.removeEventListener('message', listener);

      if(e.data.type === 'response') {
        return resolve(e.data.credential);
      }

      // assume e.data is an error
      // TODO: clean this up
      reject(e.data);
    });

    try {
      console.log('opening app window...');
      windowClient = await event.openWindow('/' + event.type);
      console.log('app window open, waiting for it to request event data...');
    } catch(err) {
      window.removeEventListener('message', listener);
      reject(err);
    }
  }));
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var credential_handler_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! credential-handler-polyfill */ "./node_modules/credential-handler-polyfill/index.js");
/* harmony import */ var _credential_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./credential-handler */ "./src/credential-handler.js");
/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */



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

const loadPolyfillPromise = credential_handler_polyfill__WEBPACK_IMPORTED_MODULE_0__["loadOnce"](
  MEDIATOR_ORIGIN + '/mediator?origin=' +
  encodeURIComponent(window.location.origin)).then(function() {
    $(document).trigger('credential-handler-polyfill-loaded');
});

if(window.location.pathname === '/credential-handler') {
  (async () => {
    await loadPolyfillPromise;
    Object(_credential_handler__WEBPACK_IMPORTED_MODULE_1__["activate"])(MEDIATOR_ORIGIN);
  })();
//  bedrock.setRootModule(false);
} else {
  // only bootstrap AngularJS app when not using credential handler
//  bedrock.setRootModule(module);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRlbnRpYWwtaGFuZGxlci1wb2x5ZmlsbC9DcmVkZW50aWFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGVudGlhbC1oYW5kbGVyLXBvbHlmaWxsL0NyZWRlbnRpYWxIYW5kbGVyUmVnaXN0cmF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkZW50aWFsLWhhbmRsZXItcG9seWZpbGwvQ3JlZGVudGlhbEhhbmRsZXJTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkZW50aWFsLWhhbmRsZXItcG9seWZpbGwvQ3JlZGVudGlhbEhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkZW50aWFsLWhhbmRsZXItcG9seWZpbGwvQ3JlZGVudGlhbEhpbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkZW50aWFsLWhhbmRsZXItcG9seWZpbGwvQ3JlZGVudGlhbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRlbnRpYWwtaGFuZGxlci1wb2x5ZmlsbC9DcmVkZW50aWFsUmVxdWVzdEV2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcmVkZW50aWFsLWhhbmRsZXItcG9seWZpbGwvQ3JlZGVudGlhbFN0b3JlRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRlbnRpYWwtaGFuZGxlci1wb2x5ZmlsbC9DcmVkZW50aWFsc0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlZGVudGlhbC1oYW5kbGVyLXBvbHlmaWxsL1dlYkNyZWRlbnRpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NyZWRlbnRpYWwtaGFuZGxlci1wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL1NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL1dlYkFwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL1dlYkFwcENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1yZXF1ZXN0LXJwYy9XZWJBcHBXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1yZXF1ZXN0LXJwYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViLXJlcXVlc3QtcnBjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jcmVkZW50aWFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFaUM7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFK0I7QUFDRjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJDQUEyQztBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMkNBQTJDO0FBQ3BEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ3REQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVjOztBQUVVOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDBCQUEwQjtBQUNqQztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsK0JBQStCO0FBQy9CLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLCtCQUErQjtBQUMvQixxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0I7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx1QkFBdUIsaUNBQWlDO0FBQ2pFLFNBQVMseUJBQXlCO0FBQ2xDO0FBQ0EsS0FBSztBQUNMOztBQUVBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUUwQjtBQUNDO0FBQ0Q7QUFDRztBQUNQOztBQUV0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLE9BQU8sMkJBQTJCLHFDQUFxQztBQUN2RTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLCtCQUErQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0RBQWtEO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsaURBQWlELEtBQUs7QUFDckU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSztBQUNuQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ0E7QUFDRTs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ0E7QUFDTTtBQUNKOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssS0FBSztBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMU9BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ007QUFDTjtBQUNBO0FBQ087QUFDRDs7QUFFckI7QUFDUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZlI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE9BQU8sa0VBQWtFO0FBQ3RGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixJQUFJLGdDQUFnQyxPQUFPO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLHdDQUF3QztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNNQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDb0M7O0FBRXBDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9qYXZhc2NyaXB0cy9nbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qIVxuICogVGhlIGNvcmUgQ3JlZGVudGlhbEhhbmRsZXIgY2xhc3MuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbi8qIGdsb2JhbCBET01FeGNlcHRpb24gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgcnBjIGZyb20gJ3dlYi1yZXF1ZXN0LXJwYyc7XG5cbmltcG9ydCB7Q3JlZGVudGlhbEhhbmRsZXJTZXJ2aWNlfSBmcm9tICcuL0NyZWRlbnRpYWxIYW5kbGVyU2VydmljZS5qcyc7XG5cbmNvbnN0IEVWRU5UX1RZUEVTID0gWydjcmVkZW50aWFscmVxdWVzdCcsICdjcmVkZW50aWFsc3RvcmUnXTtcblxuZXhwb3J0IGNsYXNzIENyZWRlbnRpYWxIYW5kbGVyIGV4dGVuZHMgcnBjLldlYkFwcCB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yT3JpZ2luKSB7XG4gICAgaWYodHlwZW9mIG1lZGlhdG9yT3JpZ2luICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJtZWRpYXRvck9yaWdpblwiIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gICAgfVxuICAgIHN1cGVyKG1lZGlhdG9yT3JpZ2luKTtcbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IHJwYy5FdmVudEVtaXR0ZXIoe1xuICAgICAgYXN5bmMgd2FpdFVudGlsKGV2ZW50KSB7XG4gICAgICAgIC8vIFRPRE86IG1heSBuZWVkIHRvIGRvIGB0aGlzLmhpZGUoKWAgYWZ0ZXIgdGhpcyBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgIC8vICAgdG8gaGFuZGxlIGNhc2Ugd2hlcmUgZS5vcGVuV2luZG93KCkgd2FzIGNhbGxlZFxuICAgICAgICByZXR1cm4gZXZlbnQuX3Byb21pc2UgfHwgUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAgICdObyBcImNyZWRlbnRpYWxyZXF1ZXN0XCIgZXZlbnQgaGFuZGxlciBmb3VuZC4nLCAnTm90Rm91bmRFcnJvcicpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBhd2FpdCBzdXBlci5jb25uZWN0KCk7XG5cbiAgICAvLyBkZWZpbmUgQVBJIHRoYXQgQ3JlZGVudGlhbE1lZGlhdG9yIGNhbiBjYWxsIG9uIHRoaXMgY3JlZGVudGlhbCBoYW5kbGVyXG4gICAgdGhpcy5zZXJ2ZXIuZGVmaW5lKCdjcmVkZW50aWFsSGFuZGxlcicsIG5ldyBDcmVkZW50aWFsSGFuZGxlclNlcnZpY2UodGhpcykpO1xuXG4gICAgLy8gYXV0by1jYWxsIGByZWFkeWBcbiAgICBhd2FpdCB0aGlzLnJlYWR5KCk7XG5cbiAgICByZXR1cm4gaW5qZWN0b3I7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pIHtcbiAgICBpZighRVZFTlRfVFlQRVMuaW5jbHVkZXMoZXZlbnRUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgYFVuc3VwcG9ydGVkIGV2ZW50IHR5cGUgXCIke2V2ZW50VHlwZX1cImAsICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZuKSB7XG4gICAgaWYoIUVWRU5UX1RZUEVTLmluY2x1ZGVzKGV2ZW50VHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgIGBVbnN1cHBvcnRlZCBldmVudCB0eXBlIFwiJHtldmVudFR5cGV9XCJgLCAnTm90U3VwcG9ydGVkRXJyb3InKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2VtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZuKTtcbiAgfVxufVxuIiwiLyohXG4gKiBBIENyZWRlbnRpYWxIYW5kbGVyUmVnaXN0cmF0aW9uIHByb3ZpZGVzIGEgQ3JlZGVudGlhbE1hbmFnZXIgdG8gZW5hYmxlIFdlYlxuICogYXBwcyB0byByZWdpc3RlciBQcm9maWxlcyB0aGF0IGNhbiBiZSBwcmVzZW50ZWQgdG8gd2Vic2l0ZXMuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtDcmVkZW50aWFsTWFuYWdlcn0gZnJvbSAnLi9DcmVkZW50aWFsTWFuYWdlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVkZW50aWFsSGFuZGxlclJlZ2lzdHJhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHVybCwgaW5qZWN0b3IpIHtcbiAgICBpZighKHVybCAmJiB0eXBlb2YgdXJsID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widXJsXCIgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgfVxuICAgIHRoaXMuY3JlZGVudGlhbE1hbmFnZXIgPSBuZXcgQ3JlZGVudGlhbE1hbmFnZXIodXJsLCBpbmplY3Rvcik7XG4gIH1cbn1cbiIsIi8qIVxuICogQSBDcmVkZW50aWFsSGFuZGxlclNlcnZpY2UgaGFuZGxlcyByZW1vdGUgY2FsbHMgdG8gYSBDcmVkZW50aWFsSGFuZGxlci5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0NyZWRlbnRpYWxSZXF1ZXN0RXZlbnR9IGZyb20gJy4vQ3JlZGVudGlhbFJlcXVlc3RFdmVudC5qcyc7XG5pbXBvcnQge0NyZWRlbnRpYWxTdG9yZUV2ZW50fSBmcm9tICcuL0NyZWRlbnRpYWxTdG9yZUV2ZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENyZWRlbnRpYWxIYW5kbGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxIYW5kbGVyKSB7XG4gICAgdGhpcy5fY3JlZGVudGlhbEhhbmRsZXIgPSBjcmVkZW50aWFsSGFuZGxlcjtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoY3JlZGVudGlhbFJlcXVlc3RFdmVudCkge1xuICAgIC8vIFRPRE86IHZhbGlkYXRlIGNyZWRlbnRpYWxSZXF1ZXN0RXZlbnRcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fY3JlZGVudGlhbEhhbmRsZXIuX2VtaXR0ZXIuZW1pdChcbiAgICAgIG5ldyBDcmVkZW50aWFsUmVxdWVzdEV2ZW50KE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtjcmVkZW50aWFsSGFuZGxlcjogdGhpcy5fY3JlZGVudGlhbEhhbmRsZXJ9LCBjcmVkZW50aWFsUmVxdWVzdEV2ZW50KSkpO1xuICB9XG5cbiAgYXN5bmMgc3RvcmUoY3JlZGVudGlhbFN0b3JlRXZlbnQpIHtcbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSBjcmVkZW50aWFsU3RvcmVFdmVudFxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9jcmVkZW50aWFsSGFuZGxlci5fZW1pdHRlci5lbWl0KFxuICAgICAgbmV3IENyZWRlbnRpYWxTdG9yZUV2ZW50KE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHtjcmVkZW50aWFsSGFuZGxlcjogdGhpcy5fY3JlZGVudGlhbEhhbmRsZXJ9LCBjcmVkZW50aWFsU3RvcmVFdmVudCkpKTtcbiAgfVxufVxuIiwiLyohXG4gKiBQcm92aWRlcyBhbiBBUEkgZm9yIHdvcmtpbmcgd2l0aCBDcmVkZW50aWFsSGFuZGxlclJlZ2lzdHJhdGlvbnMuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtDcmVkZW50aWFsSGFuZGxlclJlZ2lzdHJhdGlvbn1cbiAgZnJvbSAnLi9DcmVkZW50aWFsSGFuZGxlclJlZ2lzdHJhdGlvbi5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDcmVkZW50aWFsSGFuZGxlcnMge1xuICBjb25zdHJ1Y3RvcihpbmplY3Rvcikge1xuICAgIHRoaXMuX2luamVjdG9yID0gaW5qZWN0b3I7XG4gICAgdGhpcy5fcmVtb3RlID0gaW5qZWN0b3IuZ2V0KCdjcmVkZW50aWFsSGFuZGxlcnMnLCB7XG4gICAgICBmdW5jdGlvbnM6IFtcbiAgICAgICAgJ3JlZ2lzdGVyJywgJ3VucmVnaXN0ZXInLCAnZ2V0UmVnaXN0cmF0aW9uJywgJ2hhc1JlZ2lzdHJhdGlvbiddXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgaGFuZGxlciByZWdpc3RyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgdGhlIHVuaXF1ZSBVUkwgZm9yIHRoZSBjcmVkZW50aWFsIGhhbmRsZXIuXG4gICAqXG4gICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIENyZWRlbnRpYWxIYW5kbGVyUmVnaXN0cmF0aW9uLlxuICAgKi9cbiAgYXN5bmMgcmVnaXN0ZXIodXJsKSB7XG4gICAgLy8gcmVnaXN0ZXIgd2l0aCBjcmVkZW50aWFsIG1lZGlhdG9yXG4gICAgdXJsID0gYXdhaXQgdGhpcy5fcmVtb3RlLnJlZ2lzdGVyKCdjcmVkZW50aWFsJywgdXJsKTtcbiAgICByZXR1cm4gbmV3IENyZWRlbnRpYWxIYW5kbGVyUmVnaXN0cmF0aW9uKHVybCwgdGhpcy5faW5qZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXJzIGEgY3JlZGVudGlhbCBoYW5kbGVyLCBkZXN0cm95aW5nIGl0cyByZWdpc3RyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgdGhlIHVuaXF1ZSBVUkwgZm9yIHRoZSBjcmVkZW50aWFsIGhhbmRsZXIuXG4gICAqXG4gICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZSBoYW5kbGVyIHdhcyByZWdpc3RlcmVkXG4gICAqICAgICAgICAgICBhbmQgYGZhbHNlYCBpZiBub3QuXG4gICAqL1xuICBhc3luYyB1bnJlZ2lzdGVyKHVybCkge1xuICAgIC8vIHVucmVnaXN0ZXIgd2l0aCBjcmVkZW50aWFsIG1lZGlhdG9yXG4gICAgcmV0dXJuIHRoaXMuX3JlbW90ZS51bnJlZ2lzdGVyKCdjcmVkZW50aWFsJywgdXJsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGV4aXN0aW5nIGNyZWRlbnRpYWwgaGFuZGxlciByZWdpc3RyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgdGhlIFVSTCBmb3IgdGhlIGNyZWRlbnRpYWwgaGFuZGxlci5cbiAgICpcbiAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgQ3JlZGVudGlhbEhhbmRsZXJSZWdpc3RyYXRpb24gb3JcbiAgICogICAgICAgICAgIGBudWxsYCBpZiBubyBzdWNoIHJlZ2lzdHJhdGlvbiBleGlzdHMuXG4gICAqL1xuICBhc3luYyBnZXRSZWdpc3RyYXRpb24odXJsKSB7XG4gICAgdXJsID0gYXdhaXQgdGhpcy5fcmVtb3RlLmdldFJlZ2lzdHJhdGlvbignY3JlZGVudGlhbCcsIHVybCk7XG4gICAgaWYoIXVybCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ3JlZGVudGlhbEhhbmRsZXJSZWdpc3RyYXRpb24odXJsLCB0aGlzLl9pbmplY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBjcmVkZW50aWFsIGhhbmRsZXIgaGFzIGJlZW4gcmVnaXN0ZXJlZCBhbmRcbiAgICogZmFsc2UgaWYgbm90LlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIHRoZSBVUkwgZm9yIHRoZSBjcmVkZW50aWFsIGhhbmRsZXIuXG4gICAqXG4gICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZSByZWdpc3RyYXRpb24gZXhpc3RzIGFuZFxuICAgKiAgICAgICAgICAgYGZhbHNlYCBpZiBub3QuXG4gICAqL1xuICBhc3luYyBoYXNSZWdpc3RyYXRpb24odXJsKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlbW90ZS5oYXNSZWdpc3RyYXRpb24oJ2NyZWRlbnRpYWwnLCB1cmwpO1xuICB9XG59XG4iLCIvKiFcbiAqIEFQSSBmb3IgbWFuYWdpbmcgQ3JlZGVudGlhbEhpbnRzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4vKiBnbG9iYWwgSW1hZ2UgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIENyZWRlbnRpYWxIaW50cyB7XG4gIGNvbnN0cnVjdG9yKHVybCwgaW5qZWN0b3IpIHtcbiAgICBjb25zdCByZW1vdGUgPSBpbmplY3Rvci5nZXQoJ2NyZWRlbnRpYWxIaW50cycsIHtcbiAgICAgIGZ1bmN0aW9uczogWydkZWxldGUnLCAnZ2V0JywgJ2tleXMnLCAnaGFzJywgJ3NldCcsICdjbGVhciddXG4gICAgfSk7XG4gICAgZm9yKGxldCBtZXRob2ROYW1lIGluIHJlbW90ZSkge1xuICAgICAgaWYobWV0aG9kTmFtZSAhPT0gJ3NldCcpIHtcbiAgICAgICAgdGhpc1ttZXRob2ROYW1lXSA9IHJlbW90ZVttZXRob2ROYW1lXS5iaW5kKHRoaXMsIHVybCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3JlbW90ZVNldCA9IHJlbW90ZS5zZXQuYmluZCh0aGlzLCB1cmwpO1xuICB9XG5cbiAgYXN5bmMgc2V0KGhpbnRLZXksIGNyZWRlbnRpYWxIaW50KSB7XG4gICAgLy8gVE9ETzogdmFsaWRhdGUgY3JlZGVudGlhbCBoaW50XG5cbiAgICAvLyBlbnN1cmUgaW1hZ2VzIGFyZSBwcmVmZXRjaGVkIHNvIHRoYXQgdGhleSB3aWxsIG5vdCBsZWFrIGluZm9ybWF0aW9uXG4gICAgLy8gd2hlbiBmZXRjaGVkIGxhdGVyXG4gICAgY3JlZGVudGlhbEhpbnQuaWNvbnMgPSBjcmVkZW50aWFsSGludC5pY29ucyB8fCBbXTtcbiAgICBjb25zdCBwcm9taXNlcyA9IGNyZWRlbnRpYWxIaW50Lmljb25zLm1hcChpY29uID0+XG4gICAgICBpbWFnZVRvRGF0YVVybChpY29uLnNyYykudGhlbihmZXRjaGVkSW1hZ2UgPT4ge1xuICAgICAgICBpY29uLmZldGNoZWRJbWFnZSA9IGZldGNoZWRJbWFnZTtcbiAgICAgIH0pKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW90ZVNldChoaW50S2V5LCBjcmVkZW50aWFsSGludCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW1hZ2VUb0RhdGFVcmwodXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgIGNvbnN0IGRhdGFVcmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICByZXNvbHZlKGRhdGFVcmwpO1xuICAgICAgY2FudmFzID0gbnVsbDtcbiAgICB9O1xuICAgIC8vIFRPRE86IGByZWplY3RgIGFzIGFuIGVycm9yIGFuZCBmYWlsIGAuc2V0YD9cbiAgICBpbWcub25lcnJvciA9ICgpID0+IHJlc29sdmUobnVsbCk7XG4gICAgaW1nLnNyYyA9IHVybDtcbiAgfSk7XG59XG4iLCIvKiFcbiAqIEEgQ3JlZGVudGlhbE1hbmFnZXIgZm9yIGEgV2ViIENyZWRlbnRpYWwgTWVkaWF0b3IuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbi8qIGdsb2JhbCBuYXZpZ2F0b3IgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHt1dGlsc30gZnJvbSAnd2ViLXJlcXVlc3QtcnBjJztcblxuaW1wb3J0IHtDcmVkZW50aWFsSGludHN9IGZyb20gJy4vQ3JlZGVudGlhbEhpbnRzLmpzJztcblxuZXhwb3J0IGNsYXNzIENyZWRlbnRpYWxNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IodXJsLCBpbmplY3Rvcikge1xuICAgIGlmKCEodXJsICYmIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ1cmxcIiBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKTtcbiAgICB9XG4gICAgdGhpcy5oaW50cyA9IG5ldyBDcmVkZW50aWFsSGludHModXJsLCBpbmplY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdHMgdGhhdCB0aGUgdXNlciBncmFudCAnY3JlZGVudGlhbGhhbmRsZXInIHBlcm1pc3Npb24gdG8gdGhlIGN1cnJlbnRcbiAgICogb3JpZ2luLlxuICAgKlxuICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBuZXcgUGVybWlzc2lvblN0YXRlIG9mIHRoZVxuICAgKiAgICAgICAgICAgcGVybWlzc2lvbiAoZS5nLiAnZ3JhbnRlZCcvJ2RlbmllZCcpLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlcXVlc3RQZXJtaXNzaW9uKCkge1xuICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IG5hdmlnYXRvci5jcmVkZW50aWFsc1BvbHlmaWxsLnBlcm1pc3Npb25zLnJlcXVlc3QoXG4gICAgICB7bmFtZTogJ2NyZWRlbnRpYWxoYW5kbGVyJ30pO1xuICAgIHJldHVybiBzdGF0dXMuc3RhdGU7XG4gIH1cbn1cbiIsIi8qIVxuICogQSBDcmVkZW50aWFsUmVxdWVzdEV2ZW50IGlzIGVtaXR0ZWQgd2hlbiBhIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSBmb3JcbiAqIGNyZWRlbnRpYWxzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4vKiBnbG9iYWwgRXZlbnQgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgcnBjIGZyb20gJ3dlYi1yZXF1ZXN0LXJwYyc7XG5cbi8vIGNhbid0IHVzZSBcIkV4dGVuZGFibGVFdmVudFwiOyBvbmx5IGFjY2Vzc2libGUgZnJvbSBXb3JrZXJzXG4vLyBUT0RPOiBtYXkgbm90IGJlIGFibGUgdG8gZXZlbiBleHRlbmQgYEV2ZW50YCBoZXJlOyBjb3VsZCBwcm9kdWNlIFwiaW5jb3JyZWN0XCJcbi8vICAgY29yZSBhdHRyaWJ1dGVzXG5leHBvcnQgY2xhc3MgQ3JlZGVudGlhbFJlcXVlc3RFdmVudCAvKmV4dGVuZHMgRXZlbnQqLyB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjcmVkZW50aWFsSGFuZGxlcixcbiAgICBjcmVkZW50aWFsUmVxdWVzdE9yaWdpbixcbiAgICBjcmVkZW50aWFsUmVxdWVzdE9wdGlvbnMsXG4gICAgaGludEtleVxuICB9KSB7XG4gICAgLy9zdXBlcignY3JlZGVudGlhbHJlcXVlc3QnKTtcbiAgICB0aGlzLnR5cGUgPSAnY3JlZGVudGlhbHJlcXVlc3QnO1xuICAgIHRoaXMuX2NyZWRlbnRpYWxIYW5kbGVyID0gY3JlZGVudGlhbEhhbmRsZXI7XG4gICAgdGhpcy5jcmVkZW50aWFsUmVxdWVzdE9yaWdpbiA9IGNyZWRlbnRpYWxSZXF1ZXN0T3JpZ2luO1xuICAgIHRoaXMuY3JlZGVudGlhbFJlcXVlc3RPcHRpb25zID0gY3JlZGVudGlhbFJlcXVlc3RPcHRpb25zO1xuICAgIHRoaXMuaGludEtleSA9IGhpbnRLZXk7XG4gIH1cblxuICBhc3luYyBvcGVuV2luZG93KHVybCkge1xuICAgIC8vIFRPRE86IGRpc2FsbG93IG1vcmUgdGhhbiBvbmUgY2FsbFxuXG4gICAgLy8gVE9ETzogZW5zdXJlIGB1cmxgIGlzIHRvIHRoZSBzYW1lIG9yaWdpblxuICAgIGF3YWl0IHRoaXMuX2NyZWRlbnRpYWxIYW5kbGVyLnNob3coKTtcbiAgICBjb25zdCBhcHBXaW5kb3cgPSBuZXcgcnBjLldlYkFwcFdpbmRvdyh1cmwsIHtcbiAgICAgIGNsYXNzTmFtZTogJ2NyZWRlbnRpYWwtaGFuZGxlcidcbiAgICB9KTtcbiAgICBhcHBXaW5kb3cucmVhZHkoKTtcbiAgICBhcHBXaW5kb3cuc2hvdygpO1xuICAgIC8vIFRPRE86IG5vdGUgdGhhdCBgYXBwV2luZG93LmhhbmRsZWAgaXMgbm90IGEgU2VydmljZVdvcmtlclxuICAgIC8vICAgYFdpbmRvd0NsaWVudGAgcG9seWZpbGwuLi4gY291bGQgYmUgY29uZnVzaW5nIGhlcmUsIHNob3VsZCB3ZVxuICAgIC8vICAgaW1wbGVtZW50IG9uZSB0byB3cmFwIGl0PyAtLSB0aGVyZSBpcywgZm9yIGV4YW1wbGUsIGFcbiAgICAvLyAgIGBuYXZpZ2F0ZWAgY2FsbCBvbiBgV2luZG93Q2xpZW50YCB0aGF0IGVuZm9yY2VzIHNhbWUgb3JpZ2luLCB3b3VsZFxuICAgIC8vICAgbmVlZCB0byBhdHRlbXB0IHRvIGFkZCBvciBhcHByb3hpbWF0ZSB0aGF0XG4gICAgcmV0dXJuIGFwcFdpbmRvdy5oYW5kbGU7XG4gIH1cblxuICByZXNwb25kV2l0aChoYW5kbGVyUmVzcG9uc2UpIHtcbiAgICAvLyBUT0RPOiB0aHJvdyBleGNlcHRpb24gaWYgYF9wcm9taXNlYCBpcyBhbHJlYWR5IHNldFxuXG4gICAgLy8gVE9ETzogdmFsaWRhdGUgaGFuZGxlclJlc3BvbnNlXG4gICAgdGhpcy5fcHJvbWlzZSA9IGhhbmRsZXJSZXNwb25zZTtcbiAgfVxufVxuIiwiLyohXG4gKiBBIENyZWRlbnRpYWxTdG9yZUV2ZW50IGlzIGVtaXR0ZWQgd2hlbiBhIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB0b1xuICogc3RvcmUgYSBjcmVkZW50aWFsLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4vKiBnbG9iYWwgRXZlbnQgKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgcnBjIGZyb20gJ3dlYi1yZXF1ZXN0LXJwYyc7XG5cbi8vIGNhbid0IHVzZSBcIkV4dGVuZGFibGVFdmVudFwiOyBvbmx5IGFjY2Vzc2libGUgZnJvbSBXb3JrZXJzXG4vLyBUT0RPOiBtYXkgbm90IGJlIGFibGUgdG8gZXZlbiBleHRlbmQgYEV2ZW50YCBoZXJlOyBjb3VsZCBwcm9kdWNlIFwiaW5jb3JyZWN0XCJcbi8vICAgY29yZSBhdHRyaWJ1dGVzXG5leHBvcnQgY2xhc3MgQ3JlZGVudGlhbFN0b3JlRXZlbnQgLypleHRlbmRzIEV2ZW50Ki8ge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgY3JlZGVudGlhbEhhbmRsZXIsXG4gICAgY3JlZGVudGlhbFJlcXVlc3RPcmlnaW4sXG4gICAgY3JlZGVudGlhbCxcbiAgICBoaW50S2V5XG4gIH0pIHtcbiAgICAvL3N1cGVyKCdjcmVkZW50aWFsc3RvcmUnKTtcbiAgICB0aGlzLnR5cGUgPSAnY3JlZGVudGlhbHN0b3JlJztcbiAgICB0aGlzLl9jcmVkZW50aWFsSGFuZGxlciA9IGNyZWRlbnRpYWxIYW5kbGVyO1xuICAgIHRoaXMuY3JlZGVudGlhbFJlcXVlc3RPcmlnaW4gPSBjcmVkZW50aWFsUmVxdWVzdE9yaWdpbjtcbiAgICB0aGlzLmNyZWRlbnRpYWwgPSBjcmVkZW50aWFsO1xuICAgIHRoaXMuaGludEtleSA9IGhpbnRLZXk7XG4gIH1cblxuICBhc3luYyBvcGVuV2luZG93KHVybCkge1xuICAgIC8vIFRPRE86IGRpc2FsbG93IG1vcmUgdGhhbiBvbmUgY2FsbFxuXG4gICAgLy8gVE9ETzogZW5zdXJlIGB1cmxgIGlzIHRvIHRoZSBzYW1lIG9yaWdpblxuICAgIGF3YWl0IHRoaXMuX2NyZWRlbnRpYWxIYW5kbGVyLnNob3coKTtcbiAgICBjb25zdCBhcHBXaW5kb3cgPSBuZXcgcnBjLldlYkFwcFdpbmRvdyh1cmwpO1xuICAgIGFwcFdpbmRvdy5yZWFkeSgpO1xuICAgIGFwcFdpbmRvdy5zaG93KCk7XG4gICAgLy8gVE9ETzogbm90ZSB0aGF0IGBhcHBXaW5kb3cuaGFuZGxlYCBpcyBub3QgYSBTZXJ2aWNlV29ya2VyXG4gICAgLy8gICBgV2luZG93Q2xpZW50YCBwb2x5ZmlsbC4uLiBjb3VsZCBiZSBjb25mdXNpbmcgaGVyZSwgc2hvdWxkIHdlXG4gICAgLy8gICBpbXBsZW1lbnQgb25lIHRvIHdyYXAgaXQ/IC0tIHRoZXJlIGlzLCBmb3IgZXhhbXBsZSwgYVxuICAgIC8vICAgYG5hdmlnYXRlYCBjYWxsIG9uIGBXaW5kb3dDbGllbnRgIHRoYXQgZW5mb3JjZXMgc2FtZSBvcmlnaW4sIHdvdWxkXG4gICAgLy8gICBuZWVkIHRvIGF0dGVtcHQgdG8gYWRkIG9yIGFwcHJveGltYXRlIHRoYXRcbiAgICByZXR1cm4gYXBwV2luZG93LmhhbmRsZTtcbiAgfVxuXG4gIHJlc3BvbmRXaXRoKGhhbmRsZXJSZXNwb25zZSkge1xuICAgIC8vIFRPRE86IHRocm93IGV4Y2VwdGlvbiBpZiBgX3Byb21pc2VgIGlzIGFscmVhZHkgc2V0XG5cbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSBoYW5kbGVyUmVzcG9uc2VcbiAgICB0aGlzLl9wcm9taXNlID0gaGFuZGxlclJlc3BvbnNlO1xuICB9XG59XG4iLCIvKiFcbiAqIFdyYXBwZXIgZm9yIG5hdGl2ZSBDcmVkZW50aWFsc0NvbnRhaW5lciB0aGF0IHVzZXMgcmVtb3RlIENyZWRlbnRpYWwgTWVkaWF0b3JcbiAqIGZvciBXZWJDcmVkZW50aWFsLXJlbGF0ZWQgb3BlcmF0aW9ucy5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuLyogZ2xvYmFsIG5hdmlnYXRvciwgRE9NRXhjZXB0aW9uICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7V2ViQ3JlZGVudGlhbH0gZnJvbSAnLi9XZWJDcmVkZW50aWFsLmpzJztcblxuLy8gUlBDIHRpbWVvdXRzLCAwID0gaW5kZWZpbml0ZVxuY29uc3QgQ1JFREVOVElBTF9HRVRfVElNRU9VVCA9IDA7XG5jb25zdCBDUkVERU5USUFMX1NUT1JFX1RJTUVPVVQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ3JlZGVudGlhbHNDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcihpbmplY3Rvcikge1xuICAgIHRoaXMuX25hdGl2ZUNyZWRlbnRpYWxzQ29udGFpbmVyID0gbmF2aWdhdG9yLmNyZWRlbnRpYWxzO1xuICAgIHRoaXMuX3JlbW90ZSA9IGluamVjdG9yLmdldCgnY3JlZGVudGlhbHNDb250YWluZXInLCB7XG4gICAgICBmdW5jdGlvbnM6IFtcbiAgICAgICAge25hbWU6ICdnZXQnLCBvcHRpb25zOiB7dGltZW91dDogQ1JFREVOVElBTF9HRVRfVElNRU9VVH19LFxuICAgICAgICB7bmFtZTogJ3N0b3JlJywgb3B0aW9uczoge3RpbWVvdXQ6IENSRURFTlRJQUxfU1RPUkVfVElNRU9VVH19XG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXQoLypDcmVkZW50aWFsUmVxdWVzdE9wdGlvbnMqLyBvcHRpb25zID0ge30pIHtcbiAgICBpZihvcHRpb25zLndlYikge1xuICAgICAgY29uc3QgY3JlZGVudGlhbCA9IGF3YWl0IHRoaXMuX3JlbW90ZS5nZXQob3B0aW9ucyk7XG4gICAgICBpZighY3JlZGVudGlhbCkge1xuICAgICAgICAvLyBubyBjcmVkZW50aWFsIHNlbGVjdGVkXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogdmFsaWRhdGUgY3JlZGVudGlhbFxuICAgICAgcmV0dXJuIG5ldyBXZWJDcmVkZW50aWFsKGNyZWRlbnRpYWwuZGF0YVR5cGUsIGNyZWRlbnRpYWwuZGF0YSk7XG4gICAgfVxuICAgIGlmKHRoaXMuX25hdGl2ZUNyZWRlbnRpYWxzQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQ3JlZGVudGlhbHNDb250YWluZXIuZ2V0KG9wdGlvbnMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdOb3QgaW1wbGVtZW50ZWQuJywgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gIH1cblxuICBhc3luYyBzdG9yZShjcmVkZW50aWFsKSB7XG4gICAgaWYoY3JlZGVudGlhbCBpbnN0YW5jZW9mIFdlYkNyZWRlbnRpYWwpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX3JlbW90ZS5zdG9yZShjcmVkZW50aWFsKTtcbiAgICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgLy8gbm90aGluZyBzdG9yZWRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiB2YWxpZGF0ZSByZXN1bHRcbiAgICAgIHJldHVybiBuZXcgV2ViQ3JlZGVudGlhbChyZXN1bHQuZGF0YVR5cGUsIHJlc3VsdC5kYXRhKTtcbiAgICB9XG4gICAgaWYodGhpcy5fbmF0aXZlQ3JlZGVudGlhbHNDb250YWluZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVDcmVkZW50aWFsc0NvbnRhaW5lci5zdG9yZShjcmVkZW50aWFsKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignTm90IGltcGxlbWVudGVkLicsICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKC8qQ3JlZGVudGlhbENyZWF0aW9uT3B0aW9ucyovIG9wdGlvbnMgPSB7fSkge1xuICAgIGlmKHRoaXMuX25hdGl2ZUNyZWRlbnRpYWxzQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQ3JlZGVudGlhbHNDb250YWluZXIuY3JlYXRlKG9wdGlvbnMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdOb3QgaW1wbGVtZW50ZWQuJywgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gIH1cblxuICBhc3luYyBwcmV2ZW50U2lsZW50QWNjZXNzKCkge1xuICAgIGlmKHRoaXMuX25hdGl2ZUNyZWRlbnRpYWxzQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmF0aXZlQ3JlZGVudGlhbHNDb250YWluZXIucHJldmVudFNpbGVudEFjY2VzcygpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdOb3QgaW1wbGVtZW50ZWQuJywgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gIH1cbn1cbiIsIi8qIVxuICogQSBXZWJDcmVkZW50aWFsIGlzIGEgQ3JlZGVudGlhbCB0aGF0IGNhbiBiZSByZXRyaWV2ZWQgZnJvbSBvciBzdG9yZWQgYnkgYVxuICogXCJjcmVkZW50aWFsIGhhbmRsZXJcIiB0aGF0IHJ1bnMgaW4gYSB0aGlyZCBwYXJ0eSBXZWIgYXBwbGljYXRpb24uXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNsYXNzIFdlYkNyZWRlbnRpYWwge1xuICBjb25zdHJ1Y3RvcihkYXRhVHlwZSwgZGF0YSkge1xuICAgIGlmKHR5cGVvZiBkYXRhVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZGF0YVR5cGVcIiBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbiAgICB0aGlzLnR5cGUgPSAnd2ViJztcbiAgICB0aGlzLmRhdGFUeXBlID0gZGF0YVR5cGU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxufVxuIiwiLyohXG4gKiBDcmVkZW50aWFsIEhhbmRsZXIgQVBJIFBvbHlmaWxsLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHJwYyBmcm9tICd3ZWItcmVxdWVzdC1ycGMnO1xuXG5pbXBvcnQge0NyZWRlbnRpYWxIYW5kbGVyfSBmcm9tICcuL0NyZWRlbnRpYWxIYW5kbGVyLmpzJztcbmltcG9ydCB7Q3JlZGVudGlhbEhhbmRsZXJzfSBmcm9tICcuL0NyZWRlbnRpYWxIYW5kbGVycy5qcyc7XG5pbXBvcnQge0NyZWRlbnRpYWxNYW5hZ2VyfSBmcm9tICcuL0NyZWRlbnRpYWxNYW5hZ2VyLmpzJztcbmltcG9ydCB7Q3JlZGVudGlhbHNDb250YWluZXJ9IGZyb20gJy4vQ3JlZGVudGlhbHNDb250YWluZXIuanMnO1xuaW1wb3J0IHtXZWJDcmVkZW50aWFsfSBmcm9tICcuL1dlYkNyZWRlbnRpYWwuanMnO1xuXG4vLyBSUEMgdGltZW91dHMsIDAgPSBpbmRlZmluaXRlXG5jb25zdCBQRVJNSVNTSU9OX1JFUVVFU1RfVElNRU9VVCA9IDA7XG5cbmxldCBsb2FkZWQ7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZE9uY2UobWVkaWF0b3JVcmwpIHtcbiAgaWYobG9hZGVkKSB7XG4gICAgcmV0dXJuIGxvYWRlZDtcbiAgfVxuICByZXR1cm4gbG9hZGVkID0gYXdhaXQgbG9hZChtZWRpYXRvclVybCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkKG1lZGlhdG9yVXJsKSB7XG4gIGNvbnN0IHBvbHlmaWxsID0ge307XG5cbiAgaWYoIW1lZGlhdG9yVXJsKSB7XG4gICAgbWVkaWF0b3JVcmwgPSAnaHR0cHM6Ly9jcmVkZW50aWFsLm1lZGlhdG9yLmRldjoxNTQ0My9tZWRpYXRvcj9vcmlnaW49JyArXG4gICAgICBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLm9yaWdpbilcbiAgfVxuXG4gIC8vY29uc3QgdXJsID0gJ2h0dHBzOi8vYmVkcm9jay5kZXY6MTg0NDMvbWVkaWF0b3InO1xuICBjb25zdCBhcHBDb250ZXh0ID0gbmV3IHJwYy5XZWJBcHBDb250ZXh0KCk7XG4gIGNvbnN0IGluamVjdG9yID0gYXdhaXQgYXBwQ29udGV4dC5jcmVhdGVXaW5kb3cobWVkaWF0b3JVcmwsIHtcbiAgICBjbGFzc05hbWU6ICdjcmVkZW50aWFsLW1lZGlhdG9yJ1xuICB9KTtcblxuICBwb2x5ZmlsbC5wZXJtaXNzaW9ucyA9IGluamVjdG9yLmdldCgncGVybWlzc2lvbk1hbmFnZXInLCB7XG4gICAgZnVuY3Rpb25zOiBbXG4gICAgICAncXVlcnknLFxuICAgICAge25hbWU6ICdyZXF1ZXN0Jywgb3B0aW9uczoge3RpbWVvdXQ6IFBFUk1JU1NJT05fUkVRVUVTVF9USU1FT1VUfX0sXG4gICAgICAncmV2b2tlJ11cbiAgfSk7XG5cbiAgLy8gVE9ETzogb25seSBpbnN0YWxsIENyZWRlbnRpYWxIYW5kbGVycyBBUEkgd2hlbiBhcHByb3ByaWF0ZVxuICBwb2x5ZmlsbC5DcmVkZW50aWFsSGFuZGxlcnMgPSBuZXcgQ3JlZGVudGlhbEhhbmRsZXJzKGluamVjdG9yKTtcblxuICAvLyBUT0RPOiBvbmx5IGV4cG9zZSBDcmVkZW50aWFsSGFuZGxlciBBUEkgd2hlbiBhcHByb3ByaWF0ZVxuICBwb2x5ZmlsbC5DcmVkZW50aWFsSGFuZGxlciA9IENyZWRlbnRpYWxIYW5kbGVyO1xuXG4gIC8vIFRPRE86IG9ubHkgZXhwb3NlIENyZWRlbnRpYWxNYW5hZ2VyIEFQSSB3aGVuIGFwcHJvcHJpYXRlXG4gIHBvbHlmaWxsLkNyZWRlbnRpYWxNYW5hZ2VyID0gQ3JlZGVudGlhbE1hbmFnZXI7XG5cbiAgLy8gVE9ETzogb25seSBleHBvc2UgQ3JlZGVudGlhbHNDb250YWluZXIgQVBJIHdoZW4gYXBwcm9wcmlhdGVcbiAgcG9seWZpbGwuY3JlZGVudGlhbHMgPSBuZXcgQ3JlZGVudGlhbHNDb250YWluZXIoaW5qZWN0b3IpO1xuXG4gIC8vIFRPRE86IG9ubHkgZXhwb3NlIFdlYkNyZWRlbnRpYWwgQVBJIHdoZW4gYXBwcm9wcmlhdGVcbiAgcG9seWZpbGwuV2ViQ3JlZGVudGlhbCA9IFdlYkNyZWRlbnRpYWw7XG5cbiAgLy8gZXhwb3NlIHBvbHlmaWxsXG4gIG5hdmlnYXRvci5jcmVkZW50aWFsc1BvbHlmaWxsID0gcG9seWZpbGw7XG5cbiAgLy8gcG9seWZpbGxcbiAgaWYoJ2NyZWRlbnRpYWxzJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICBuYXZpZ2F0b3IuY3JlZGVudGlhbHMuZ2V0ID0gcG9seWZpbGwuY3JlZGVudGlhbHMuZ2V0LmJpbmQoXG4gICAgICBwb2x5ZmlsbC5jcmVkZW50aWFscyk7XG4gICAgbmF2aWdhdG9yLmNyZWRlbnRpYWxzLnN0b3JlID0gcG9seWZpbGwuY3JlZGVudGlhbHMuc3RvcmUuYmluZChcbiAgICAgIHBvbHlmaWxsLmNyZWRlbnRpYWxzKTtcbiAgfSBlbHNlIHtcbiAgICBuYXZpZ2F0b3IuY3JlZGVudGlhbHMgPSBwb2x5ZmlsbC5jcmVkZW50aWFscztcbiAgfVxuICB3aW5kb3cuQ3JlZGVudGlhbE1hbmFnZXIgPSBDcmVkZW50aWFsTWFuYWdlcjtcbiAgd2luZG93LldlYkNyZWRlbnRpYWwgPSBXZWJDcmVkZW50aWFsO1xuXG4gIHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAzMCBzZWNvbmQgZGVmYXVsdCB0aW1lb3V0XG5jb25zdCBSUENfQ0xJRU5UX0NBTExfVElNRU9VVCA9IDMwMDAwO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vcmlnaW4gPSBudWxsO1xuICAgIHRoaXMuX2hhbmRsZSA9IG51bGw7XG4gICAgdGhpcy5fbGlzdGVuZXIgPSBudWxsO1xuICAgIC8vIGFsbCBwZW5kaW5nIHJlcXVlc3RzXG4gICAgdGhpcy5fcGVuZGluZyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byBhIFdlYiBSZXF1ZXN0IFJQQyBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBQcm9taXNlIHdpbGwgcmVzb2x2ZSB0byBhbiBSUEMgaW5qZWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgb3JcbiAgICogZGVmaW5lIEFQSXMgdG8gZW5hYmxlIGNvbW11bmljYXRpb24gd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIHRoZSBvcmlnaW4gdG8gc2VuZCBtZXNzYWdlcyB0by5cbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgdG8gdXNlOlxuICAgKiAgICAgICAgICBbaGFuZGxlXSBhIGhhbmRsZSB0byB0aGUgd2luZG93IChvciBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0b1xuICAgKiAgICAgICAgICAgIGEgaGFuZGxlKSB0byBzZW5kIG1lc3NhZ2VzIHRvXG4gICAqICAgICAgICAgICAgKGRlZmF1bHRzIHRvIGB3aW5kb3cucGFyZW50IHx8IHdpbmRvdy5vcGVuZXJgKS5cbiAgICpcbiAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBSUEMgaW5qZWN0b3Igb25jZSBjb25uZWN0ZWQuXG4gICAqL1xuICBhc3luYyBjb25uZWN0KG9yaWdpbiwgb3B0aW9ucykge1xuICAgIGlmKHRoaXMuX2xpc3RlbmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgY29ubmVjdGVkLicpO1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gVE9ETzogdmFsaWRhdGUgYG9yaWdpbmAgYW5kIGBvcHRpb25zLmhhbmRsZWBcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZWxmLm9yaWdpbiA9IHV0aWxzLnBhcnNlVXJsKG9yaWdpbikub3JpZ2luO1xuICAgIHNlbGYuX2hhbmRsZSA9IG9wdGlvbnMuaGFuZGxlIHx8IHdpbmRvdy5wYXJlbnQgfHwgd2luZG93Lm9wZW5lcjtcblxuICAgIGNvbnN0IHBlbmRpbmcgPSBzZWxmLl9wZW5kaW5nO1xuICAgIHNlbGYuX2xpc3RlbmVyID0gdXRpbHMuY3JlYXRlTWVzc2FnZUxpc3RlbmVyKHtcbiAgICAgIG9yaWdpbjogc2VsZi5vcmlnaW4sXG4gICAgICBoYW5kbGU6IHNlbGYuX2hhbmRsZSxcbiAgICAgIGV4cGVjdFJlcXVlc3Q6IGZhbHNlLFxuICAgICAgbGlzdGVuZXI6IG1lc3NhZ2UgPT4ge1xuICAgICAgICAvLyBpZ25vcmUgbWVzc2FnZXMgdGhhdCBoYXZlIG5vIG1hdGNoaW5nLCBwZW5kaW5nIHJlcXVlc3RcbiAgICAgICAgaWYoIShtZXNzYWdlLmlkIGluIHBlbmRpbmcpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzb2x2ZSBvciByZWplY3QgUHJvbWlzZSBhc3NvY2lhdGVkIHdpdGggbWVzc2FnZVxuICAgICAgICBjb25zdCB7cmVzb2x2ZSwgcmVqZWN0LCBjYW5jZWxUaW1lb3V0fSA9IHBlbmRpbmdbbWVzc2FnZS5pZF07XG4gICAgICAgIGNhbmNlbFRpbWVvdXQoKTtcbiAgICAgICAgaWYoJ3Jlc3VsdCcgaW4gbWVzc2FnZSkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKG1lc3NhZ2UucmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QodXRpbHMuZGVzZXJpYWxpemVFcnJvcihtZXNzYWdlLmVycm9yKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBzZWxmLl9saXN0ZW5lcik7XG5cbiAgICByZXR1cm4gbmV3IEluamVjdG9yKHNlbGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgUlBDIGJ5IHNlbmRpbmcgYSBtZXNzYWdlIHRvIHRoZSBXZWIgUmVxdWVzdCBSUEMgc2VydmVyIGFuZFxuICAgKiBhd2FpdGluZyBhIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0gcXVhbGlmaWVkTWV0aG9kTmFtZSB0aGUgZnVsbHktcXVhbGlmaWVkIG5hbWUgb2YgdGhlIG1ldGhvZCB0byBjYWxsLlxuICAgKiBAcGFyYW0gcGFyYW1ldGVycyB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgdG8gdXNlOlxuICAgKiAgICAgICAgICBbdGltZW91dF0gYSB0aW1lb3V0LCBpbiBtaWxsaXNlY29uZHMsIGZvciBhd2FpdGluZyBhIHJlc3BvbnNlO1xuICAgKiAgICAgICAgICAgIGEgbm9uLXBvc2l0aXZlIHRpbWVvdXQgKDw9IDApIHdpbGwgY2F1c2UgYW4gaW5kZWZpbml0ZSB3YWl0LlxuICAgKlxuICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQgKG9yIGVycm9yKSBvZiB0aGUgY2FsbC5cbiAgICovXG4gIGFzeW5jIHNlbmQocXVhbGlmaWVkTWV0aG9kTmFtZSwgcGFyYW1ldGVycywge1xuICAgIHRpbWVvdXQgPSBSUENfQ0xJRU5UX0NBTExfVElNRU9VVFxuICB9KSB7XG4gICAgaWYoIXRoaXMuX2xpc3RlbmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JQQyBjbGllbnQgbm90IGNvbm5lY3RlZC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICBqc29ucnBjOiAnMi4wJyxcbiAgICAgIGlkOiB1dGlscy51dWlkdjQoKSxcbiAgICAgIG1ldGhvZDogcXVhbGlmaWVkTWV0aG9kTmFtZSxcbiAgICAgIHBhcmFtczogcGFyYW1ldGVyc1xuICAgIH07XG5cbiAgICAvLyBIQUNLOiB3ZSBjYW4ndCBqdXN0IGBQcm9taXNlLnJlc29sdmUoaGFuZGxlKWAgYmVjYXVzZSBDaHJvbWUgaGFzXG4gICAgLy8gYSBidWcgdGhhdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBoYW5kbGUgaXMgY3Jvc3MgZG9tYWluXG4gICAgaWYodXRpbHMuaXNIYW5kbGVQcm9taXNlKHNlbGYuX2hhbmRsZSkpIHtcbiAgICAgIGNvbnN0IGhhbmRsZSA9IGF3YWl0IHNlbGYuX2hhbmRsZTtcbiAgICAgIGhhbmRsZS5wb3N0TWVzc2FnZShtZXNzYWdlLCBzZWxmLm9yaWdpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuX2hhbmRsZS5wb3N0TWVzc2FnZShtZXNzYWdlLCBzZWxmLm9yaWdpbik7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgb25jZSBhIHJlc3BvbnNlIG1lc3NhZ2UgaGFzIGJlZW5cbiAgICAvLyByZWNlaXZlZCBvciBvbmNlIGEgdGltZW91dCBvY2N1cnNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcGVuZGluZyA9IHNlbGYuX3BlbmRpbmc7XG4gICAgICBsZXQgY2FuY2VsVGltZW91dDtcbiAgICAgIGlmKHRpbWVvdXQgPiAwKSB7XG4gICAgICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBwZW5kaW5nW21lc3NhZ2UuaWRdO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1JQQyBjYWxsIHRpbWVkIG91dC4nKSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICBjYW5jZWxUaW1lb3V0ID0gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5jZWxUaW1lb3V0ID0gKCkgPT4ge307XG4gICAgICB9XG4gICAgICBwZW5kaW5nW21lc3NhZ2UuaWRdID0ge3Jlc29sdmUsIHJlamVjdCwgY2FuY2VsVGltZW91dH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgZnJvbSB0aGUgcmVtb3RlIFdlYiBSZXF1ZXN0IFJQQyBzZXJ2ZXIgYW5kIGNsb3NlcyBkb3duIHRoaXNcbiAgICogY2xpZW50LlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYodGhpcy5fbGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5fbGlzdGVuZXIpO1xuICAgICAgdGhpcy5faGFuZGxlID0gdGhpcy5vcmlnaW4gPSB0aGlzLl9saXN0ZW5lciA9IG51bGw7XG4gICAgICB0aGlzLl9wZW5kaW5nID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCkge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuX2FwaXMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBhIG5hbWVkIEFQSSB0aGF0IHdpbGwgdXNlIGFuIFJQQyBjbGllbnQgdG8gaW1wbGVtZW50IGl0c1xuICAgKiBmdW5jdGlvbnMuIEVhY2ggb2YgdGhlc2UgZnVuY3Rpb25zIHdpbGwgYmUgYXN5bmNocm9ub3VzIGFuZCByZXR1cm4gYVxuICAgKiBQcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIHRoZSBSUEMgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGFuIGludGVyZmFjZSB3aXRoIGZ1bmN0aW9ucyBkZWZpbmVkIGFjY29yZGluZ1xuICAgKiB0byB0aG9zZSBwcm92aWRlZCBpbiB0aGUgZ2l2ZW4gYGRlZmluaXRpb25gLiBUaGUgYG5hbWVgIHBhcmFtZXRlciBjYW4gYmVcbiAgICogdXNlZCB0byBvYnRhaW4gdGhpcyBjYWNoZWQgaW50ZXJmYWNlIHZpYSBgLmdldChuYW1lKWAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBBUEkuXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIHRoZSBkZWZpbml0aW9uIGZvciB0aGUgQVBJLCBpbmNsdWRpbmc6XG4gICAqICAgICAgICAgIGZ1bmN0aW9uczogYW4gYXJyYXkgb2YgZnVuY3Rpb24gbmFtZXMgKGFzIHN0cmluZ3MpIG9yIG9iamVjdHNcbiAgICogICAgICAgICAgICBjb250YWluaW5nOiB7bmFtZTogPGZ1bmN0aW9uTmFtZT4sIG9wdGlvbnM6IDxycGNDbGllbnRPcHRpb25zPn0uXG4gICAqXG4gICAqIEByZXR1cm4gYW4gaW50ZXJmYWNlIHdpdGggdGhlIGZ1bmN0aW9ucyBwcm92aWRlZCB2aWEgYGRlZmluaXRpb25gIHRoYXRcbiAgICogICAgICAgICAgIHdpbGwgbWFrZSBSUEMgY2FsbHMgdG8gYW4gUlBDIHNlcnZlciB0byBwcm92aWRlIHRoZWlyXG4gICAqICAgICAgICAgICBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGRlZmluZShuYW1lLCBkZWZpbml0aW9uKSB7XG4gICAgaWYoIShuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BuYW1lYCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKTtcbiAgICB9XG4gICAgLy8gVE9ETzogc3VwcG9ydCBXZWIgSURMIGFzIGEgZGVmaW5pdGlvbiBmb3JtYXQ/XG4gICAgaWYoIShkZWZpbml0aW9uICYmIHR5cGVvZiBkZWZpbml0aW9uID09PSAnb2JqZWN0JyAmJlxuICAgICAgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmZ1bmN0aW9ucykpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnYGRlZmluaXRpb24uZnVuY3Rpb25gIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb24gbmFtZXMgb3IgJyArXG4gICAgICAgICdmdW5jdGlvbiBkZWZpbml0aW9uIG9iamVjdHMgdG8gYmUgZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBhcGkgPSB7fTtcblxuICAgIGRlZmluaXRpb24uZnVuY3Rpb25zLmZvckVhY2goZm4gPT4ge1xuICAgICAgaWYodHlwZW9mIGZuID09PSAnc3RyaW5nJykge1xuICAgICAgICBmbiA9IHtuYW1lOiBmbiwgb3B0aW9uczoge319O1xuICAgICAgfVxuICAgICAgYXBpW2ZuLm5hbWVdID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmNsaWVudC5zZW5kKFxuICAgICAgICAgIG5hbWUgKyAnLicgKyBmbi5uYW1lLCBbLi4uYXJndW1lbnRzXSwgZm4ub3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgc2VsZi5fYXBpc1tuYW1lXSA9IGFwaTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIG5hbWVkIEFQSSwgZGVmaW5pbmcgaXQgaWYgbmVjZXNzYXJ5IHdoZW4gYSBkZWZpbml0aW9uIGlzIHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgQVBJLlxuICAgKiBAcGFyYW0gW2RlZmluaXRpb25dIHRoZSBkZWZpbml0aW9uIGZvciB0aGUgQVBJOyBpZiB0aGUgQVBJIGlzIGFscmVhZHlcbiAgICogICAgICAgICAgZGVmaW5lZCwgdGhpcyBkZWZpbml0aW9uIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIEByZXR1cm4gdGhlIGludGVyZmFjZS5cbiAgICovXG4gIGdldChuYW1lLCBkZWZpbml0aW9uKSB7XG4gICAgY29uc3QgYXBpID0gdGhpcy5fYXBpc1tuYW1lXTtcbiAgICBpZighYXBpKSB7XG4gICAgICBpZihkZWZpbml0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmluZShuYW1lLCBkZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJIFwiJHtuYW1lfVwiIGhhcyBub3QgYmVlbiBkZWZpbmVkLmApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXBpc1tuYW1lXTtcbiAgfVxufVxuIiwiLyohXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3Ioe2Rlc2VyaWFsaXplID0gZSA9PiBlLCB3YWl0VW50aWwgPSBhc3luYyAoKSA9PiB7fX0gPSB7fSkge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuX2Rlc2VyaWFsaXplID0gZGVzZXJpYWxpemU7XG4gICAgdGhpcy5fd2FpdFVudGlsID0gd2FpdFVudGlsO1xuICB9XG5cbiAgYXN5bmMgZW1pdChldmVudCkge1xuICAgIGV2ZW50ID0gdGhpcy5fZGVzZXJpYWxpemUoZXZlbnQpO1xuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV0gfHwgW10pLmZvckVhY2gobCA9PiBsKGV2ZW50KSk7XG4gICAgcmV0dXJuIHRoaXMuX3dhaXRVbnRpbChldmVudCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pIHtcbiAgICBpZighdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudFR5cGVdID0gW2ZuXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV0ucHVzaChmbik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZuKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgaWYoIWxpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihmbik7XG4gICAgaWYoaWR4ICE9PSAtMSkge1xuICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxufVxuIiwiLyohXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcblxuZXhwb3J0IGNsYXNzIFNlcnZlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub3JpZ2luID0gbnVsbDtcbiAgICB0aGlzLl9oYW5kbGUgPSBudWxsO1xuICAgIHRoaXMuX2FwaXMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvdmlkZXMgYW4gaW1wbGVtZW50YXRpb24gZm9yIGEgbmFtZWQgQVBJLiBBbGwgZnVuY3Rpb25zIGluIHRoZSBnaXZlblxuICAgKiBBUEkgd2lsbCBiZSBtYWRlIGNhbGxhYmxlIHZpYSBSUEMgY2xpZW50cyBjb25uZWN0ZWQgdG8gdGhpcyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBBUEkuXG4gICAqIEBwYXJhbSBhcGkgdGhlIEFQSSB0byBhZGQuXG4gICAqL1xuICBkZWZpbmUobmFtZSwgYXBpKSB7XG4gICAgaWYoIShuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BuYW1lYCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKTtcbiAgICB9XG4gICAgaWYoIShhcGkgJiYgYXBpICE9PSAnb2JqZWN0JykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BhcGlgIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgIH1cbiAgICBpZihuYW1lIGluIHRoaXMuX2FwaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHtuYW1lfVwiIEFQSSBpcyBhbHJlYWR5IGRlZmluZWQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXBpc1tuYW1lXSA9IGFwaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBSUEMgbWVzc2FnZXMgZnJvbSBjbGllbnRzIGZyb20gYSBwYXJ0aWN1bGFyIG9yaWdpbiBhbmRcbiAgICogd2luZG93IGhhbmRsZSBhbmQgdXNlcyB0aGVtIHRvIGV4ZWN1dGUgQVBJIGNhbGxzIGJhc2VkIG9uIHByZWRlZmluZWRcbiAgICogQVBJcy5cbiAgICpcbiAgICogSWYgbWVzc2FnZXMgYXJlIG5vdCBmcm9tIHRoZSBnaXZlbiBvcmlnaW4gb3Igd2luZG93IGhhbmRsZSwgdGhleSBhcmVcbiAgICogaWdub3JlZC4gSWYgdGhlIG1lc3NhZ2VzIHJlZmVyIHRvIG5hbWVkIEFQSXMgdGhhdCBoYXZlIG5vdCBiZWVuIGRlZmluZWRcbiAgICogdGhlbiBhbiBlcnJvciBtZXNzYWdlIGlzIHNlbnQgaW4gcmVzcG9uc2UuIFRoZXNlIGVycm9yIG1lc3NhZ2VzIGNhblxuICAgKiBiZSBzdXBwcmVzc2VkIGJ5IHVzaW5nIHRoZSBgaWdub3JlVW5rbm93bkFwaWAgb3B0aW9uLlxuICAgKlxuICAgKiBJZiBhIG1lc3NhZ2UgcmVmZXJzIHRvIGFuIHVua25vd24gbWV0aG9kIG9uIGEga25vd24gbmFtZWQgQVBJLCB0aGVuIGFuXG4gICAqIGVycm9yIG1lc3NhZ2UgaXMgc2VudCBpbiByZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbiB0aGUgb3JpZ2luIHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIHRvIHVzZTpcbiAgICogICAgICAgICAgW2hhbmRsZV0gYSBoYW5kbGUgdG8gdGhlIHdpbmRvdyAob3IgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG9cbiAgICogICAgICAgICAgICBhIGhhbmRsZSkgdG8gbGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tXG4gICAqICAgICAgICAgICAgKGRlZmF1bHRzIHRvIGB3aW5kb3cucGFyZW50IHx8IHdpbmRvdy5vcGVuZXJgKS5cbiAgICogICAgICAgICAgW2lnbm9yZVVua25vd25BcGldIGB0cnVlYCB0byBpZ25vcmUgdW5rbm93biBBUEkgbWVzc2FnZXMuXG4gICAqL1xuICBhc3luYyBsaXN0ZW4ob3JpZ2luLCBvcHRpb25zKSB7XG4gICAgaWYodGhpcy5fbGlzdGVuZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSBsaXN0ZW5pbmcuJyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSBgb3JpZ2luYCBhbmQgYG9wdGlvbnMuaGFuZGxlYFxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYub3JpZ2luID0gdXRpbHMucGFyc2VVcmwob3JpZ2luKS5vcmlnaW47XG4gICAgc2VsZi5faGFuZGxlID0gb3B0aW9ucy5oYW5kbGUgfHwgd2luZG93LnBhcmVudCB8fCB3aW5kb3cub3BlbmVyO1xuXG4gICAgY29uc3QgaWdub3JlVW5rbm93bkFwaSA9IChvcHRpb25zLmlnbm9yZVVua25vd25BcGkgPT09ICd0cnVlJykgfHwgZmFsc2U7XG5cbiAgICBzZWxmLl9saXN0ZW5lciA9IHV0aWxzLmNyZWF0ZU1lc3NhZ2VMaXN0ZW5lcih7XG4gICAgICBvcmlnaW46IHNlbGYub3JpZ2luLFxuICAgICAgaGFuZGxlOiBzZWxmLl9oYW5kbGUsXG4gICAgICBleHBlY3RSZXF1ZXN0OiB0cnVlLFxuICAgICAgbGlzdGVuZXI6IG1lc3NhZ2UgPT4ge1xuICAgICAgICBjb25zdCB7bmFtZSwgbWV0aG9kfSA9IHV0aWxzLmRlc3RydWN0dXJlTWV0aG9kTmFtZShtZXNzYWdlLm1ldGhvZCk7XG4gICAgICAgIGNvbnN0IGFwaSA9IHNlbGYuX2FwaXNbbmFtZV07XG5cbiAgICAgICAgLy8gZG8gbm90IGFsbG93IGNhbGxpbmcgXCJwcml2YXRlXCIgbWV0aG9kcyAoc3RhcnRzIHdpdGggYF9gKVxuICAgICAgICBpZihtZXRob2QgJiYgbWV0aG9kLnN0YXJ0c1dpdGgoJ18nKSkge1xuICAgICAgICAgIHJldHVybiBzZW5kTWV0aG9kTm90Rm91bmQoc2VsZi5faGFuZGxlLCBzZWxmLm9yaWdpbiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBUEkgbm90IGZvdW5kIGJ1dCBpZ25vcmUgZmxhZyBpcyBvblxuICAgICAgICBpZighYXBpICYmIGlnbm9yZVVua25vd25BcGkpIHtcbiAgICAgICAgICAvLyBBUEkgbm90IHJlZ2lzdGVyZWQsIGlnbm9yZSB0aGUgbWVzc2FnZSByYXRoZXIgdGhhbiByYWlzZSBlcnJvclxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIGlnbm9yZSBmbGFnIGFuZCB1bmtub3duIEFQSSBvciB1bmtub3duIHNwZWNpZmljIG1ldGhvZFxuICAgICAgICBpZighYXBpIHx8IHR5cGVvZiBhcGlbbWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBzZW5kTWV0aG9kTm90Rm91bmQoc2VsZi5faGFuZGxlLCBzZWxmLm9yaWdpbiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBUEkgYW5kIHNwZWNpZmljIGZ1bmN0aW9uIGZvdW5kXG4gICAgICAgIGNvbnN0IGZuID0gYXBpW21ldGhvZF07XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBqc29ucnBjOiAnMi4wJyxcbiAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UucmVzdWx0ID0gYXdhaXQgZm4uYXBwbHkoYXBpLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXNwb25zZS5lcnJvciA9IHV0aWxzLnNlcmlhbGl6ZUVycm9yKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiBzZXJ2ZXIgZGlkIG5vdCBgY2xvc2VgIHdoaWxlIHdlIHdhaXRlZCBmb3IgYSByZXNwb25zZVxuICAgICAgICAgIGlmKHNlbGYuX2hhbmRsZSkge1xuICAgICAgICAgICAgLy8gSEFDSzogd2UgY2FuJ3QganVzdCBgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZSlgIGJlY2F1c2UgQ2hyb21lIGhhc1xuICAgICAgICAgICAgLy8gYSBidWcgdGhhdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBoYW5kbGUgaXMgY3Jvc3MgZG9tYWluXG4gICAgICAgICAgICBpZih1dGlscy5pc0hhbmRsZVByb21pc2Uoc2VsZi5faGFuZGxlKSkge1xuICAgICAgICAgICAgICBzZWxmLl9oYW5kbGUudGhlbihoID0+IGgucG9zdE1lc3NhZ2UocmVzcG9uc2UsIHNlbGYub3JpZ2luKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLl9oYW5kbGUucG9zdE1lc3NhZ2UocmVzcG9uc2UsIHNlbGYub3JpZ2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBzZWxmLl9saXN0ZW5lcik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZih0aGlzLl9saXN0ZW5lcikge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLl9saXN0ZW5lcik7XG4gICAgICB0aGlzLl9oYW5kbGUgPSB0aGlzLm9yaWdpbiA9IHRoaXMuX2xpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VuZE1ldGhvZE5vdEZvdW5kKGhhbmRsZSwgb3JpZ2luLCBtZXNzYWdlKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgIGpzb25ycGM6ICcyLjAnLFxuICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCB1dGlscy5SUENfRVJST1JTLk1ldGhvZE5vdEZvdW5kKVxuICB9O1xuICAvLyBIQUNLOiB3ZSBjYW4ndCBqdXN0IGBQcm9taXNlLnJlc29sdmUoaGFuZGxlKWAgYmVjYXVzZSBDaHJvbWUgaGFzXG4gIC8vIGEgYnVnIHRoYXQgdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgaGFuZGxlIGlzIGNyb3NzIGRvbWFpblxuICBpZih1dGlscy5pc0hhbmRsZVByb21pc2UoaGFuZGxlKSkge1xuICAgIHJldHVybiBoYW5kbGUudGhlbihoID0+IGgucG9zdE1lc3NhZ2UocmVzcG9uc2UsIG9yaWdpbikpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoYW5kbGUucG9zdE1lc3NhZ2UocmVzcG9uc2UsIG9yaWdpbik7XG4gIH1cbn1cbiIsIi8qIVxuICogQSBXZWJBcHAgaXMgYSByZW1vdGUgYXBwbGljYXRpb24gdGhhdCBydW5zIGluIGEgV2ViQXBwQ29udGV4dC5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0NsaWVudH0gZnJvbSAnLi9DbGllbnQuanMnO1xuaW1wb3J0IHtTZXJ2ZXJ9IGZyb20gJy4vU2VydmVyLmpzJztcbmltcG9ydCB7cGFyc2VVcmx9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgY2xhc3MgV2ViQXBwIHtcbiAgY29uc3RydWN0b3IocmVseWluZ09yaWdpbikge1xuICAgIC8vIHRoaXMgaXMgdGhlIG9yaWdpbiB0aGF0IGNyZWF0ZWQgdGhlIFdlYkFwcENvbnRleHQgdG8gcnVuIGl0IGluXG4gICAgLy8gVE9ETzogYmV0dGVyIG5hbWU/IGBjb250ZXh0T3JpZ2luYD9cbiAgICB0aGlzLnJlbHlpbmdPcmlnaW4gPSBwYXJzZVVybChyZWx5aW5nT3JpZ2luKS5vcmlnaW47XG4gICAgdGhpcy5jbGllbnQgPSBudWxsO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuXG4gICAgdGhpcy5fY29udHJvbCA9IG51bGw7XG4gICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdHMgdGhpcyBXZWJBcHAgdG8gdGhlIHJlbHlpbmcgb3JpZ2luIHRoYXQgaW5zdGFudGlhdGVkIGl0LiBPbmNlXG4gICAqIGNvbm5lY3RlZCwgdGhlIFdlYkFwcCBjYW4gc3RhcnQgc2VydmljaW5nIGNhbGxzIGZyb20gdGhhdCBvcmlnaW4uXG4gICAqXG4gICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gaW5qZWN0b3IgZm9yIGNyZWF0aW5nIGN1c3RvbSBjbGllbnRcbiAgICogICAgICAgICAgIEFQSXMgb25jZSB0aGUgY29ubmVjdGlvbiBpcyByZWFkeS5cbiAgICovXG4gIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5pbmplY3RvciA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QodGhpcy5yZWx5aW5nT3JpZ2luKTtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2NvbnRyb2wgPSB0aGlzLmluamVjdG9yLmRlZmluZSgnY29yZS5jb250cm9sJywge1xuICAgICAgZnVuY3Rpb25zOiBbJ3JlYWR5JywgJ3Nob3cnLCAnaGlkZSddXG4gICAgfSk7XG4gICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHRoaXMucmVseWluZ09yaWdpbik7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogTXVzdCBiZSBjYWxsZWQgYWZ0ZXIgYGNvbm5lY3RgIHdoZW4gdGhpcyBXZWJBcHAgaXMgcmVhZHkgdG8gc3RhcnRcbiAgICogcmVjZWl2aW5nIGNhbGxzIGZyb20gdGhlIHJlbW90ZSBlbmQuXG4gICAqL1xuICBhc3luYyByZWFkeSgpIHtcbiAgICBpZighdGhpcy5fY29ubmVjdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFwcCBub3QgY29ubmVjdGVkLiBEaWQgeW91IGNhbGwgXCIuY29ubmVjdCgpXCI/Jyk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuX2NvbnRyb2wucmVhZHkoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhpcyBXZWJBcHAncyBjb25uZWN0aW9uIHRvIHRoZSByZWx5aW5nIG9yaWdpbi5cbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmKHRoaXMuX2Nvbm5lY3RlZCkge1xuICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICAgIHRoaXMuY2xpZW50LmNsb3NlKCk7XG4gICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIFVJIGZvciB0aGlzIFdlYkFwcCBvbiB0aGUgcmVseWluZyBvcmlnaW4uXG4gICAqL1xuICBhc3luYyBzaG93KCkge1xuICAgIGlmKCF0aGlzLl9jb25uZWN0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCBcInNob3dcIiB5ZXQ7IG5vdCBjb25uZWN0ZWQuIERpZCB5b3UgY2FsbCBcIi5jb25uZWN0KClcIj8nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2wuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBVSSBmb3IgdGhpcyBXZWJBcHAgb24gdGhlIHJlbHlpbmcgb3JpZ2luLlxuICAgKi9cbiAgYXN5bmMgaGlkZSgpIHtcbiAgICBpZighdGhpcy5fY29ubmVjdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgXCJoaWRlXCIgeWV0OyBub3QgY29ubmVjdGVkLiBEaWQgeW91IGNhbGwgXCIuY29ubmVjdCgpP1wiJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb250cm9sLmhpZGUoKTtcbiAgfVxufVxuIiwiLyohXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0NsaWVudH0gZnJvbSAnLi9DbGllbnQuanMnO1xuaW1wb3J0IHtTZXJ2ZXJ9IGZyb20gJy4vU2VydmVyLmpzJztcbmltcG9ydCB7V2ViQXBwV2luZG93fSBmcm9tICcuL1dlYkFwcFdpbmRvdy5qcyc7XG5pbXBvcnQge3BhcnNlVXJsfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gMTAgc2Vjb25kc1xuY29uc3QgV0VCX0FQUF9DT05URVhUX0xPQURfVElNRU9VVCA9IDEwMDAwO1xuXG5leHBvcnQgY2xhc3MgV2ViQXBwQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xuICAgIHRoaXMuc2VydmVyID0gbmV3IFNlcnZlcigpO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBudWxsO1xuICAgIHRoaXMuY29udHJvbCA9IG51bGw7XG4gICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgd2luZG93IChvciBhdHRhY2hlcyB0byBhbiBleGlzdGluZyBvbmUpIHRoYXQgbG9hZHMgYSBwYWdlIHRoYXRcbiAgICogaXMgZXhwZWN0ZWQgdG8gdW5kZXJzdGFuZCB0aGUgd2ViIHJlcXVlc3QgUlBDIHByb3RvY29sLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSBvbmNlIHRoZSBwYWdlIHVzZXMgUlBDIHRvIGluZGljYXRlXG4gICAqIHRoYXQgaXQgaXMgcmVhZHkgdG8gYmUgY29tbXVuaWNhdGVkIHdpdGggb3Igb25jZSBhIHRpbWVvdXQgb2NjdXJzLlxuICAgKlxuICAgKiBUaGUgUHJvbWlzZSB3aWxsIHJlc29sdmUgdG8gYW4gUlBDIGluamVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IG9yXG4gICAqIGRlZmluZSBBUElzIHRvIGVuYWJsZSBjb21tdW5pY2F0aW9uIHdpdGggdGhlIFdlYkFwcCBydW5uaW5nIGluIHRoZVxuICAgKiBXZWJBcHBDb250ZXh0LlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIHRoZSBVUkwgdG8gdGhlIHBhZ2UgdG8gY29ubmVjdCB0by5cbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgdG8gdXNlOlxuICAgKiAgICAgICAgICBbdGltZW91dF0gdGhlIHRpbWVvdXQgZm9yIHdhaXRpbmcgZm9yIHRoZSBjbGllbnQgdG8gYmUgcmVhZHkuXG4gICAqICAgICAgICAgIFtoYW5kbGVdIGEgd2luZG93IGhhbmRsZSB0byBjb25uZWN0IHRvOyBtYXkgYmUgYSBQcm9taXNlIHRoYXRcbiAgICogICAgICAgICAgICB0aGF0IHJlc29sdmVzIHRvIGEgaGFuZGxlLlxuICAgKiAgICAgICAgICBbaWZyYW1lXSBhbiBpZnJhbWUgZWxlbWVudCB0byBjb25uZWN0IHRvLlxuICAgKiAgICAgICAgICBbd2luZG93Q29udHJvbF0gYSB3aW5kb3cgY29udHJvbCBpbnRlcmZhY2UgdG8gY29ubmVjdCB0by5cbiAgICogICAgICAgICAgW2NsYXNzTmFtZV0gYSBjbGFzc05hbWUgdG8gYXNzaWduIHRvIHRoZSB3aW5kb3cgZm9yIENTUyBwdXJwb3Nlcy5cbiAgICogICAgICAgICAgW2N1c3RvbWl6ZShvcHRpb25zKV0gYSBmdW5jdGlvbiB0byBjdXN0b21pemUgdGhlIGRpYWxvZyB0aGF0XG4gICAqICAgICAgICAgICAgbG9hZHMgdGhlIHdpbmRvdyBhZnRlciBpdHMgY29uc3RydWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIFJQQyBpbmplY3RvciBvbmNlIHRoZSB3aW5kb3cgaXNcbiAgICogICAgICAgICAgIHJlYWR5LlxuICAgKi9cbiAgYXN5bmMgY3JlYXRlV2luZG93KFxuICAgIHVybCwge1xuICAgICAgdGltZW91dCA9IFdFQl9BUFBfQ09OVEVYVF9MT0FEX1RJTUVPVVQsXG4gICAgICBpZnJhbWUsXG4gICAgICBoYW5kbGUsXG4gICAgICB3aW5kb3dDb250cm9sLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgY3VzdG9taXplXG4gICAgfSA9IHt9KSB7XG4gICAgLy8gZGlzYWxsb3cgbG9hZGluZyB0aGUgc2FtZSBXZWJBcHBDb250ZXh0IG1vcmUgdGhhbiBvbmNlXG4gICAgaWYodGhpcy5sb2FkZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXBwQ29udGV4dCBhbHJlYWR5IGxvYWRlZC4nKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gICAgLy8gY3JlYXRlIGNvbnRyb2wgQVBJIGZvciBXZWJBcHAgdG8gY2FsbCB2aWEgaXRzIG93biBSUEMgY2xpZW50XG4gICAgdGhpcy5jb250cm9sID0gbmV3IFdlYkFwcFdpbmRvdyh1cmwsIHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICBpZnJhbWUsXG4gICAgICBoYW5kbGUsXG4gICAgICB3aW5kb3dDb250cm9sLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgY3VzdG9taXplXG4gICAgfSk7XG5cbiAgICAvLyBkZWZpbmUgY29udHJvbCBjbGFzczsgdGhpcyBlbmFibGVzIHRoZSBXZWJBcHAgdGhhdCBpcyBydW5uaW5nIGluIHRoZVxuICAgIC8vIFdlYkFwcENvbnRleHQgdG8gY29udHJvbCBpdHMgVUkgb3IgY2xvc2UgaXRzZWxmIGRvd25cbiAgICB0aGlzLnNlcnZlci5kZWZpbmUoJ2NvcmUuY29udHJvbCcsIHRoaXMuY29udHJvbCk7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIGNhbGxzIGZyb20gdGhlIHdpbmRvdywgaWdub3JpbmcgY2FsbHMgdG8gdW5rbm93biBBUElzXG4gICAgLy8gdG8gYWxsb3cgdGhvc2UgdG8gYmUgaGFuZGxlZCBieSBvdGhlciBzZXJ2ZXJzXG4gICAgY29uc3Qgb3JpZ2luID0gcGFyc2VVcmwodXJsKS5vcmlnaW47XG4gICAgdGhpcy5zZXJ2ZXIubGlzdGVuKG9yaWdpbiwge1xuICAgICAgaGFuZGxlOiB0aGlzLmNvbnRyb2wuaGFuZGxlLFxuICAgICAgaWdub3JlVW5rbm93bkFwaTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gd2FpdCBmb3IgY29udHJvbCB0byBiZSByZWFkeVxuICAgIGF3YWl0IHRoaXMuY29udHJvbC5fcHJpdmF0ZS5pc1JlYWR5KCk7XG5cbiAgICAvLyBjb25uZWN0IHRvIHRoZSBXZWJBcHBDb250ZXh0IGFuZCByZXR1cm4gdGhlIGluamVjdG9yXG4gICAgdGhpcy5pbmplY3RvciA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3Qob3JpZ2luLCB7XG4gICAgICBoYW5kbGU6IHRoaXMuY29udHJvbC5oYW5kbGVcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5pbmplY3RvcjtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuY29udHJvbC5fcHJpdmF0ZS5kZXN0cm95KCk7XG4gICAgdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB0aGlzLmNsaWVudC5jbG9zZSgpO1xuICB9XG59XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gZGVmYXVsdCB0aW1lIG91dCBpcyAxMCBzZWNvbmRzXG5jb25zdCBMT0FEX1dJTkRPV19USU1FT1VUID0gMTAwMDA7XG5cbi8qKlxuICogUHJvdmlkZXMgYSB3aW5kb3cgYW5kIEFQSSBmb3IgcmVtb3RlIFdlYiBhcHBsaWNhdGlvbnMuIFRoaXMgQVBJIGlzIHR5cGljYWxseVxuICogdXNlZCBieSBSUEMgV2ViQXBwcyB0aGF0IHJ1biBpbiBhIFdlYkFwcENvbnRleHQgdG8gaW5kaWNhdGUgd2hlbiB0aGV5IGFyZVxuICogcmVhZHkgYW5kIHRvIHNob3cvaGlkZSB0aGVpciBVSS5cbiAqL1xuZXhwb3J0IGNsYXNzIFdlYkFwcFdpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHVybCwge1xuICAgICAgdGltZW91dCA9IExPQURfV0lORE9XX1RJTUVPVVQsXG4gICAgICBoYW5kbGUsXG4gICAgICBpZnJhbWUsXG4gICAgICB3aW5kb3dDb250cm9sLFxuICAgICAgY2xhc3NOYW1lID0gbnVsbCxcbiAgICAgIGN1c3RvbWl6ZSA9IG51bGxcbiAgICB9ID0ge30pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHNlbGYudmlzaWJsZSA9IGZhbHNlO1xuICAgIHNlbGYuZGlhbG9nID0gbnVsbDtcbiAgICBzZWxmLmlmcmFtZSA9IG51bGw7XG4gICAgc2VsZi5oYW5kbGUgPSBudWxsO1xuICAgIHNlbGYud2luZG93Q29udHJvbCA9IG51bGw7XG4gICAgc2VsZi5fcmVhZHkgPSBmYWxzZTtcbiAgICBzZWxmLl9wcml2YXRlID0ge307XG5cbiAgICAvLyBwcml2YXRlIHRvIGFsbG93IGNhbGxlciB0byB0cmFjayByZWFkaW5lc3NcbiAgICBzZWxmLl9wcml2YXRlLl9yZWFkeVByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyByZWplY3QgaWYgdGltZW91dCByZWFjaGVkXG4gICAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAoKSA9PiByZWplY3QobmV3IEVycm9yKCdMb2FkaW5nIFdlYiBhcHBsaWNhdGlvbiB3aW5kb3cgdGltZWQgb3V0LicpKSxcbiAgICAgICAgdGltZW91dCk7XG4gICAgICBzZWxmLl9wcml2YXRlLl9yZXNvbHZlUmVhZHkgPSB2YWx1ZSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgc2VsZi5fcHJpdmF0ZS5pc1JlYWR5ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHNlbGYuX3ByaXZhdGUuX3JlYWR5UHJvbWlzZTtcbiAgICB9O1xuXG4gICAgLy8gcHJpdmF0ZSB0byBkaXNhbGxvdyBkZXN0cnVjdGlvbiB2aWEgY2xpZW50XG4gICAgc2VsZi5fcHJpdmF0ZS5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgaWYoc2VsZi5kaWFsb2cpIHtcbiAgICAgICAgc2VsZi5kaWFsb2cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmLmRpYWxvZyk7XG4gICAgICAgIHNlbGYuZGlhbG9nID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYoaWZyYW1lKSB7XG4gICAgICAvLyBUT0RPOiB2YWxpZGF0ZSBgaWZyYW1lYCBvcHRpb24gYXMgbXVjaCBhcyBwb3NzaWJsZVxuICAgICAgaWYoISh0eXBlb2YgaWZyYW1lID09PSAnb2JqZWN0JyAmJiBpZnJhbWUuY29udGVudFdpbmRvdykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYG9wdGlvbnMuaWZyYW1lYCBtdXN0IGJlIGFuIGlmcmFtZSBlbGVtZW50LicpO1xuICAgICAgfVxuICAgICAgc2VsZi53aW5kb3dDb250cm9sID0ge1xuICAgICAgICBoYW5kbGU6IGlmcmFtZS5jb250ZW50V2luZG93LFxuICAgICAgICBzaG93KCkge1xuICAgICAgICAgIGlmcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlKCkge1xuICAgICAgICAgIGlmcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgICAgIHNlbGYuaGFuZGxlID0gc2VsZi5pZnJhbWUuY29udGVudFdpbmRvdztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZih3aW5kb3dDb250cm9sKSB7XG4gICAgICAvLyBUT0RPOiB2YWxpZGF0ZSBgd2luZG93Q29udHJvbGBcbiAgICAgIHNlbGYud2luZG93Q29udHJvbCA9IHdpbmRvd0NvbnRyb2w7XG4gICAgICBzZWxmLmhhbmRsZSA9IHNlbGYud2luZG93Q29udHJvbC5oYW5kbGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoaGFuZGxlKSB7XG4gICAgICAvLyBUT0RPOiB2YWxpZGF0ZSBgaGFuZGxlYFxuICAgICAgc2VsZi5oYW5kbGUgPSBoYW5kbGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoY3VzdG9taXplKSB7XG4gICAgICBpZighdHlwZW9mIGN1c3RvbWl6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgb3B0aW9ucy5jdXN0b21pemVgIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSB0b3AtbGV2ZWwgZGlhbG9nIG92ZXJsYXlcbiAgICBzZWxmLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpO1xuICAgIGFwcGx5U3R5bGUoc2VsZi5kaWFsb2csIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgJ2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCcsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAnei1pbmRleCc6IDEwMDAwMDBcbiAgICB9KTtcbiAgICBzZWxmLmRpYWxvZy5jbGFzc05hbWUgPSAnd2ViLWFwcC13aW5kb3cnO1xuICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzZWxmLmRpYWxvZy5jbGFzc05hbWUgPSBzZWxmLmRpYWxvZy5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGJhY2tkcm9wIGlzIHRyYW5zcGFyZW50IGJ5IGRlZmF1bHRcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoXG4gICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgZGlhbG9nLndlYi1hcHAtd2luZG93OjpiYWNrZHJvcCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfWApKTtcblxuICAgIC8vIGNyZWF0ZSBmbGV4IGNvbnRhaW5lciBmb3IgaWZyYW1lXG4gICAgc2VsZi5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhcHBseVN0eWxlKHNlbGYuY29udGFpbmVyLCB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nXG4gICAgfSk7XG5cbiAgICAvLyBjcmVhdGUgaWZyYW1lXG4gICAgc2VsZi5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICBzZWxmLmlmcmFtZS5zcmMgPSB1cmw7XG4gICAgc2VsZi5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcbiAgICBhcHBseVN0eWxlKHNlbGYuaWZyYW1lLCB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAnZmxleC1ncm93JzogMSxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgIH0pO1xuXG4gICAgLy8gYXNzZW1ibGUgZGlhbG9nXG4gICAgc2VsZi5kaWFsb2cuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHNlbGYuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICBzZWxmLmRpYWxvZy5hcHBlbmRDaGlsZChzZWxmLmNvbnRhaW5lcik7XG5cbiAgICAvLyBoYW5kbGUgY2FuY2VsICh1c2VyIHByZXNzZWQgZXNjYXBlKVxuICAgIHNlbGYuZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5oaWRlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBhdHRhY2ggdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxmLmRpYWxvZyk7XG4gICAgc2VsZi5oYW5kbGUgPSBzZWxmLmlmcmFtZS5jb250ZW50V2luZG93O1xuXG4gICAgaWYoY3VzdG9taXplKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXN0b21pemUoe1xuICAgICAgICAgIGRpYWxvZzogc2VsZi5kaWFsb2csXG4gICAgICAgICAgY29udGFpbmVyOiBzZWxmLmNvbnRhaW5lcixcbiAgICAgICAgICBpZnJhbWU6IHNlbGYuaWZyYW1lLFxuICAgICAgICAgIHdlYkFwcFdpbmRvdzogc2VsZlxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgdGhlIGNsaWVudCB3aGVuIGl0IGlzIHJlYWR5IHRvIHJlY2VpdmUgbWVzc2FnZXMuXG4gICAqL1xuICByZWFkeSgpIHtcbiAgICB0aGlzLl9yZWFkeSA9IHRydWU7XG4gICAgdGhpcy5fcHJpdmF0ZS5fcmVzb2x2ZVJlYWR5KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSB0aGUgY2xpZW50IHdoZW4gaXQgd2FudHMgdG8gc2hvdyBVSS5cbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYoIXRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgIGlmKHRoaXMuZGlhbG9nKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBpZih0aGlzLmRpYWxvZy5zaG93TW9kYWwpIHtcbiAgICAgICAgICB0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKHRoaXMud2luZG93Q29udHJvbC5zaG93KSB7XG4gICAgICAgIHRoaXMud2luZG93Q29udHJvbC5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSB0aGUgY2xpZW50IHdoZW4gaXQgd2FudHMgdG8gaGlkZSBVSS5cbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaWYodGhpcy52aXNpYmxlKSB7XG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIGlmKHRoaXMuZGlhbG9nKSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmKHRoaXMuZGlhbG9nLmNsb3NlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKHRoaXMud2luZG93Q29udHJvbC5oaWRlKSB7XG4gICAgICAgIHRoaXMud2luZG93Q29udHJvbC5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgZm9yKGxldCBuYW1lIGluIHN0eWxlKSB7XG4gICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICB9XG59XG4iLCIvKiFcbiAqIEpTT04tUlBDIGZvciBXZWIgUmVxdWVzdCBQb2x5ZmlsbHMuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IERpZ2l0YWwgQmF6YWFyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IHtDbGllbnR9IGZyb20gJy4vQ2xpZW50LmpzJztcbmV4cG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICcuL0V2ZW50RW1pdHRlci5qcyc7XG5leHBvcnQge1NlcnZlcn0gZnJvbSAnLi9TZXJ2ZXIuanMnO1xuZXhwb3J0IHtXZWJBcHB9IGZyb20gJy4vV2ViQXBwLmpzJztcbmV4cG9ydCB7V2ViQXBwQ29udGV4dH0gZnJvbSAnLi9XZWJBcHBDb250ZXh0LmpzJztcbmV4cG9ydCB7V2ViQXBwV2luZG93fSBmcm9tICcuL1dlYkFwcFdpbmRvdy5qcyc7XG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuZXhwb3J0IHt1dGlsc307XG4iLCIvKiFcbiAqIFV0aWxpdGllcyBmb3IgV2ViIFJlcXVlc3QgUlBDLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4vKiBnbG9iYWwgVVJMICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBSUENfRVJST1JTID0ge1xuICBQYXJzZUVycm9yOiB7XG4gICAgbWVzc2FnZTogJ1BhcnNlIGVycm9yJyxcbiAgICBjb2RlOiAtMzI3MDBcbiAgfSxcbiAgSW52YWxpZFJlcXVlc3Q6IHtcbiAgICBtZXNzYWdlOiAnSW52YWxpZCBSZXF1ZXN0JyxcbiAgICBjb2RlOiAtMzI2MDBcbiAgfSxcbiAgTWV0aG9kTm90Rm91bmQ6IHtcbiAgICBtZXNzYWdlOiAnTWV0aG9kIG5vdCBmb3VuZCcsXG4gICAgY29kZTogLTMyNjAxXG4gIH0sXG4gIEludmFsaWRQYXJhbXM6IHtcbiAgICBtZXNzYWdlOiAnSW52YWxpZCBwYXJhbXMnLFxuICAgIGNvZGU6IC0zMjYwMlxuICB9LFxuICBJbnRlcm5hbEVycm9yOiB7XG4gICAgbWVzc2FnZTogJ0ludGVybmFsIEVycm9yJyxcbiAgICBjb2RlOiAtMzI2MDNcbiAgfSxcbiAgU2VydmVyRXJyb3I6IHtcbiAgICBtZXNzYWdlOiAnU2VydmVyIGVycm9yJyxcbiAgICBjb2RlOiAtMzIwMDBcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXJsKHVybCwgYmFzZSkge1xuICBpZihiYXNlID09PSB1bmRlZmluZWQpIHtcbiAgICBiYXNlID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIH1cblxuICBpZih0eXBlb2YgVVJMICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXcgVVJMKHVybCwgYmFzZSk7XG4gIH1cblxuICBpZih0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widXJsXCIgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIC8vIEZJWE1FOiBydWRpbWVudGFyeSByZWxhdGl2ZSBVUkwgcmVzb2x1dGlvblxuICBpZighdXJsLmluY2x1ZGVzKCc6JykpIHtcbiAgICBpZihiYXNlLnN0YXJ0c1dpdGgoJ2h0dHAnKSAmJiAhdXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdXJsID0gYmFzZSArICcvJyArIHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYmFzZSArIHVybDtcbiAgICB9XG4gIH1cblxuICAvLyBgVVJMYCBBUEkgbm90IHN1cHBvcnRlZCwgdXNlIERPTSB0byBwYXJzZSBVUkxcbiAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBwYXJzZXIuaHJlZiA9IHVybDtcbiAgbGV0IG9yaWdpbiA9IChwYXJzZXIucHJvdG9jb2wgfHwgd2luZG93LmxvY2F0aW9uLnByb3RvY29sKSArICcvLyc7XG4gIGlmKHBhcnNlci5ob3N0KSB7XG4gICAgLy8gdXNlIGhvc3RuYW1lIHdoZW4gdXNpbmcgZGVmYXVsdCBwb3J0c1xuICAgIC8vIChJRSBhZGRzIGFsd2F5cyBhZGRzIHBvcnQgdG8gYHBhcnNlci5ob3N0YClcbiAgICBpZigocGFyc2VyLnByb3RvY29sID09PSAnaHR0cDonICYmIHBhcnNlci5wb3J0ID09PSAnODAnKSB8fFxuICAgICAgKHBhcnNlci5wcm90b2NvbCA9PT0gJ2h0dHBzOicgJiYgcGFyc2VyLnBvcnQgPT09ICc0NDMnKSkge1xuICAgICAgb3JpZ2luICs9IHBhcnNlci5ob3N0bmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZ2luICs9IHBhcnNlci5ob3N0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvcmlnaW4gKz0gd2luZG93LmxvY2F0aW9uLmhvc3Q7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vIFRPRE86IGlzIHRoaXMgc2FmZSBmb3IgZ2VuZXJhbCB1c2Ugb24gZXZlcnkgYnJvd3NlciB0aGF0IGRvZXNuJ3RcbiAgICAvLyAgIHN1cHBvcnQgV0hBVFdHIFVSTD9cbiAgICBob3N0OiBwYXJzZXIuaG9zdCB8fCB3aW5kb3cubG9jYXRpb24uaG9zdCxcbiAgICBob3N0bmFtZTogcGFyc2VyLmhvc3RuYW1lLFxuICAgIG9yaWdpbjogb3JpZ2luLFxuICAgIHByb3RvY29sOiBwYXJzZXIucHJvdG9jb2wsXG4gICAgcGF0aG5hbWU6IHBhcnNlci5wYXRobmFtZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JpZ2luTWF0Y2hlcyh1cmwsIG9yaWdpbikge1xuICByZXR1cm4gcGFyc2VVcmwodXJsLCBvcmlnaW4pLm9yaWdpbiA9PT0gb3JpZ2luO1xufVxuXG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9MZXZlck9uZS8xMzA4MzY4XG5leHBvcnQgZnVuY3Rpb24gdXVpZHY0KGEsYikge1xuICBmb3IoYj1hPScnO2ErKzwzNjtiKz1hKjUxJjUyPyhhXjE1PzheTWF0aC5yYW5kb20oKSooYV4yMD8xNjo0KTo0KS50b1N0cmluZygxNik6Jy0nKTtyZXR1cm4gYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRPcmlnaW4odXJsLCBvcmlnaW4pIHtcbiAgaWYoIW9yaWdpbk1hdGNoZXModXJsLCBvcmlnaW4pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYE9yaWdpbiBtaXNtYXRjaC4gVXJsIFwiJHt1cmx9XCIgZG9lcyBub3QgaGF2ZSBhbiBvcmlnaW4gb2YgXCIke29yaWdpbn1cIi5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZE1lc3NhZ2UobWVzc2FnZSkge1xuICByZXR1cm4gKFxuICAgIG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnICYmXG4gICAgbWVzc2FnZS5qc29ucnBjID09PSAnMi4wJyAmJlxuICAgIG1lc3NhZ2UuaWQgJiYgdHlwZW9mIG1lc3NhZ2UuaWQgPT09ICdzdHJpbmcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRSZXF1ZXN0KG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGlzVmFsaWRNZXNzYWdlKG1lc3NhZ2UpICYmIEFycmF5LmlzQXJyYXkobWVzc2FnZS5wYXJhbXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFJlc3BvbnNlKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIChcbiAgICBpc1ZhbGlkTWVzc2FnZShtZXNzYWdlKSAmJlxuICAgICEhKCdyZXN1bHQnIGluIG1lc3NhZ2UgXiAnZXJyb3InIGluIG1lc3NhZ2UpICYmXG4gICAgKCEoJ2Vycm9yJyBpbiBtZXNzYWdlKSB8fCBpc1ZhbGlkRXJyb3IobWVzc2FnZS5lcnJvcikpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRFcnJvcihlcnJvcikge1xuICByZXR1cm4gKFxuICAgIGVycm9yICYmIHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2YgZXJyb3IuY29kZSA9PT0gJ251bWJlcicgJiZcbiAgICB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRXJyb3IoZXJyb3IpIHtcbiAgY29uc3QgZXJyID0ge1xuICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgfTtcbiAgaWYoZXJyb3IuY29uc3RydWN0b3IubmFtZSAhPT0gJ0Vycm9yJykge1xuICAgIGVyci5jb25zdHJ1Y3RvciA9IGVycm9yLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgaWYoJ25hbWUnIGluIGVycm9yKSB7XG4gICAgZXJyLm5hbWUgPSBlcnJvci5uYW1lO1xuICB9XG4gIGlmKCdjb2RlJyBpbiBlcnJvcikge1xuICAgIGVyci5jb2RlID0gZXJyb3IuY29kZTtcbiAgfSBlbHNlIHtcbiAgICBlcnIuY29kZSA9IFJQQ19FUlJPUlMuU2VydmVyRXJyb3IuY29kZTtcbiAgfVxuICBpZignZGV0YWlscycgaW4gZXJyb3IpIHtcbiAgICBlcnIuZGV0YWlscyA9IGVycm9yLmRldGFpbHM7XG4gIH1cbiAgcmV0dXJuIGVycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRXJyb3IoZXJyb3IpIHtcbiAgbGV0IGVycjtcbiAgLy8gc3BlY2lhbCBjYXNlIGtub3duIHR5cGVzLCBvdGhlcndpc2UgdXNlIGdlbmVyaWMgRXJyb3JcbiAgaWYoZXJyb3IuY29uc3RydWN0b3IgPT09ICdET01FeGNlcHRpb24nKSB7XG4gICAgZXJyID0gbmV3IERPTUV4Y2VwdGlvbihlcnJvci5tZXNzYWdlLCBlcnJvci5uYW1lKVxuICAgIC8vIGlnbm9yZSBjb2RlLCBuYW1lIHdpbGwgc2V0IGl0XG4gIH0gZWxzZSB7XG4gICAgZXJyID0gbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIGlmKCdjb2RlJyBpbiBlcnJvcikge1xuICAgICAgZXJyLmNvZGUgPSBlcnJvci5jb2RlO1xuICAgIH1cbiAgfVxuICBpZihlcnJvci5kZXRhaWxzKSB7XG4gICAgZXJyLmRldGFpbHMgPSBlcnJvci5kZXRhaWxzO1xuICB9XG4gIHJldHVybiBlcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlTGlzdGVuZXIoXG4gIHtsaXN0ZW5lciwgb3JpZ2luLCBoYW5kbGUsIGV4cGVjdFJlcXVlc3R9KSB7XG4gIC8vIEhBQ0s6IHdlIGNhbid0IGp1c3QgYFByb21pc2UucmVzb2x2ZShoYW5kbGUpYCBiZWNhdXNlIENocm9tZSBoYXNcbiAgLy8gYSBidWcgdGhhdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBoYW5kbGUgaXMgY3Jvc3MgZG9tYWluXG4gIGlmKGlzSGFuZGxlUHJvbWlzZShoYW5kbGUpKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IGhhbmRsZTtcbiAgICBoYW5kbGUgPSBmYWxzZTtcbiAgICBwcm9taXNlLnRoZW4oaCA9PiBoYW5kbGUgPSBoKTtcbiAgfVxuICByZXR1cm4gZSA9PiB7XG4gICAgLy8gaWdub3JlIG1lc3NhZ2VzIGZyb20gYSBub24tbWF0Y2hpbmcgaGFuZGxlIG9yIG9yaWdpblxuICAgIC8vIG9yIHRoYXQgZG9uJ3QgZm9sbG93IHRoZSBwcm90b2NvbFxuICAgIGlmKCEoZS5zb3VyY2UgPT09IGhhbmRsZSAmJiBlLm9yaWdpbiA9PT0gb3JpZ2luICYmXG4gICAgICAoKGV4cGVjdFJlcXVlc3QgJiYgaXNWYWxpZFJlcXVlc3QoZS5kYXRhKSkgfHxcbiAgICAgICAgKCFleHBlY3RSZXF1ZXN0ICYmIGlzVmFsaWRSZXNwb25zZShlLmRhdGEpKSkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxpc3RlbmVyKGUuZGF0YSwgZSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cnVjdHVyZU1ldGhvZE5hbWUoZnFNZXRob2ROYW1lKSB7XG4gIC8vIGZ1bGx5LXF1YWxpZmllZCBtZXRob2QgbmFtZSBpczogYDxhcGktbmFtZT4uPG1ldGhvZC1uYW1lPmBcbiAgLy8gd2hlcmUgYDxhcGktbmFtZT5gIGlzIGFsbCBidXQgdGhlIGxhc3QgZG90LWRlbGltaXRlZCBzZWdtZW50IGFuZFxuICAvLyBgPG1ldGhvZC1uYW1lPmAgaXMgdGhlIGxhc3QgZG90LWRlbGltaXRlZCBzZWdtZW50XG4gIGxldCBbbmFtZSwgLi4ucmVzdF0gPSBmcU1ldGhvZE5hbWUuc3BsaXQoJy4nKTtcbiAgY29uc3QgbWV0aG9kID0gcmVzdC5wb3AoKTtcbiAgbmFtZSA9IFtuYW1lLCAuLi5yZXN0XS5qb2luKCcuJyk7XG4gIHJldHVybiB7bmFtZSwgbWV0aG9kfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGFuZGxlUHJvbWlzZShoYW5kbGUpIHtcbiAgdHJ5IHtcbiAgICAvLyBIQUNLOiB3ZSBjYW4ndCBqdXN0IGBQcm9taXNlLnJlc29sdmUoaGFuZGxlKWAgYmVjYXVzZSBDaHJvbWUgaGFzXG4gICAgLy8gYSBidWcgdGhhdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBoYW5kbGUgaXMgY3Jvc3MgZG9tYWluXG4gICAgcmV0dXJuIHR5cGVvZiBoYW5kbGUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgfSBjYXRjaChlKSB7fVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCIvKiFcbiAqIENvcHlyaWdodCAoYykgMjAxNyBEaWdpdGFsIEJhemFhciwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG4vKiBnbG9iYWwgbmF2aWdhdG9yICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3RpdmF0ZShtZWRpYXRvck9yaWdpbikge1xuICBjb25zb2xlLmxvZygnY3JlZGVudGlhbCBoYW5kbGVyIGFjdGl2YXRpbmchJyk7XG4gIGNvbnN0IENyZWRlbnRpYWxIYW5kbGVyID0gbmF2aWdhdG9yLmNyZWRlbnRpYWxzUG9seWZpbGwuQ3JlZGVudGlhbEhhbmRsZXI7XG4gIGNvbnN0IHNlbGYgPSBuZXcgQ3JlZGVudGlhbEhhbmRsZXIobWVkaWF0b3JPcmlnaW4pO1xuXG4gIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignY3JlZGVudGlhbHJlcXVlc3QnLCBoYW5kbGVDcmVkZW50aWFsRXZlbnQpXG4gIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignY3JlZGVudGlhbHN0b3JlJywgaGFuZGxlQ3JlZGVudGlhbEV2ZW50KTtcblxuICBhd2FpdCBzZWxmLmNvbm5lY3QoKTtcbiAgY29uc29sZS5sb2coJ2NyZWRlbnRpYWwgaGFuZGxlciBjb25uZWN0ZWQnKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQ3JlZGVudGlhbEV2ZW50KGV2ZW50KSB7XG4gIGV2ZW50LnJlc3BvbmRXaXRoKG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdCBmb3IgSUQgYW5kIHB1YmxpYyBrZXkgKHR5cGljYWwgbG9naW4pXG4gICAgaWYoZXZlbnQudHlwZSA9PT0gJ2NyZWRlbnRpYWxyZXF1ZXN0Jykge1xuICAgICAgbGV0IHF1ZXJ5ID0gZXZlbnQuY3JlZGVudGlhbFJlcXVlc3RPcHRpb25zLndlYi5WZXJpZmlhYmxlUHJvZmlsZTtcbiAgICAgIHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnkpO1xuICAgICAgZGVsZXRlIHF1ZXJ5WydAY29udGV4dCddO1xuICAgICAgaWYoJ2lkJyBpbiBxdWVyeSAmJiAncHVibGljS2V5JyBpbiBxdWVyeSAmJlxuICAgICAgICBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vIGNyeXB0b2tleSByZXF1ZXN0LCByZXR1cm4gdmVyaWZpYWJsZSBwcm9maWxlIGltbWVkaWF0ZWx5XG4gICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICBkYXRhVHlwZTogJ1ZlcmlmaWFibGVQcm9maWxlJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnQGNvbnRleHQnOiAnaHR0cHM6Ly93M2lkLm9yZy9pZGVudGl0eS92MScsXG4gICAgICAgICAgICBpZDogZXZlbnQuaGludEtleSxcbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBwdWJsaWMga2V5IGNyZWRlbnRpYWxcbiAgICAgICAgICAgIC8vIGNyZWRlbnRpYWw6IC4uLlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIG90aGVyIHJlcXVlc3RzIHRoYXQgcmVxdWlyZSBhIFVJXG4gICAgbGV0IHdpbmRvd0NsaWVudDtcbiAgICBsZXQgbGlzdGVuZXI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciA9IGUgPT4ge1xuICAgICAgaWYoIShlLnNvdXJjZSA9PT0gd2luZG93Q2xpZW50ICYmXG4gICAgICAgIGUub3JpZ2luID09PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKGUuZGF0YS50eXBlID09PSAncmVxdWVzdCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgY3JlZGVudGlhbCBldmVudCBkYXRhIHRvIFVJIHdpbmRvdy4uLicpO1xuICAgICAgICAvLyBzZW5kIGV2ZW50IGRhdGEgdG8gVUkgd2luZG93XG4gICAgICAgIHJldHVybiB3aW5kb3dDbGllbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgICAgY3JlZGVudGlhbFJlcXVlc3RPcmlnaW46IGV2ZW50LmNyZWRlbnRpYWxSZXF1ZXN0T3JpZ2luLFxuICAgICAgICAgIGNyZWRlbnRpYWxSZXF1ZXN0T3B0aW9uczogZXZlbnQuY3JlZGVudGlhbFJlcXVlc3RPcHRpb25zLFxuICAgICAgICAgIGNyZWRlbnRpYWw6IGV2ZW50LmNyZWRlbnRpYWwsXG4gICAgICAgICAgaGludEtleTogZXZlbnQuaGludEtleVxuICAgICAgICB9LCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBtZXNzYWdlIGlzIGZpbmFsIChhbiBlcnJvciBvciBhIHJlc3BvbnNlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lcik7XG5cbiAgICAgIGlmKGUuZGF0YS50eXBlID09PSAncmVzcG9uc2UnKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKGUuZGF0YS5jcmVkZW50aWFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXNzdW1lIGUuZGF0YSBpcyBhbiBlcnJvclxuICAgICAgLy8gVE9ETzogY2xlYW4gdGhpcyB1cFxuICAgICAgcmVqZWN0KGUuZGF0YSk7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ29wZW5pbmcgYXBwIHdpbmRvdy4uLicpO1xuICAgICAgd2luZG93Q2xpZW50ID0gYXdhaXQgZXZlbnQub3BlbldpbmRvdygnLycgKyBldmVudC50eXBlKTtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHAgd2luZG93IG9wZW4sIHdhaXRpbmcgZm9yIGl0IHRvIHJlcXVlc3QgZXZlbnQgZGF0YS4uLicpO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSkpO1xufVxuIiwiLyohXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgRGlnaXRhbCBCYXphYXIsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICogYXMgcG9seWZpbGwgZnJvbSAnY3JlZGVudGlhbC1oYW5kbGVyLXBvbHlmaWxsJztcbmltcG9ydCB7YWN0aXZhdGUgYXMgYWN0aXZhdGVIYW5kbGVyfSBmcm9tICcuL2NyZWRlbnRpYWwtaGFuZGxlcic7XG5cbid1c2Ugc3RyaWN0JztcblxuY29uc29sZS5sb2coJ2NyZWRlbnRpYWwgcmVwb3NpdG9yeSBsb2FkaW5nIGF0ICcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuaWYgKCF3aW5kb3cuZGF0YSkge1xuICB3aW5kb3cuZGF0YSA9IHtcbiAgICBcImF1dGhvcml6YXRpb24taW9cIjoge1xuICAgICAgXCJiYXNlVXJpXCI6IFwiaHR0cHM6XFwvXFwvZGVtby5hdXRob3JpemF0aW9uLmlvXCJcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IE1FRElBVE9SX09SSUdJTiA9IHdpbmRvdy5kYXRhWydhdXRob3JpemF0aW9uLWlvJ10uYmFzZVVyaTtcblxuY29uc3QgbG9hZFBvbHlmaWxsUHJvbWlzZSA9IHBvbHlmaWxsLmxvYWRPbmNlKFxuICBNRURJQVRPUl9PUklHSU4gKyAnL21lZGlhdG9yP29yaWdpbj0nICtcbiAgZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2NyZWRlbnRpYWwtaGFuZGxlci1wb2x5ZmlsbC1sb2FkZWQnKTtcbn0pO1xuXG5pZih3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvY3JlZGVudGlhbC1oYW5kbGVyJykge1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGxvYWRQb2x5ZmlsbFByb21pc2U7XG4gICAgYWN0aXZhdGVIYW5kbGVyKE1FRElBVE9SX09SSUdJTik7XG4gIH0pKCk7XG4vLyAgYmVkcm9jay5zZXRSb290TW9kdWxlKGZhbHNlKTtcbn0gZWxzZSB7XG4gIC8vIG9ubHkgYm9vdHN0cmFwIEFuZ3VsYXJKUyBhcHAgd2hlbiBub3QgdXNpbmcgY3JlZGVudGlhbCBoYW5kbGVyXG4vLyAgYmVkcm9jay5zZXRSb290TW9kdWxlKG1vZHVsZSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9