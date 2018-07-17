$(document).on('credential-handler-polyfill-loaded', init);


// DOM Ready =============================================================
$(document).ready(function() {

  // Install button click
  $('#btnInstall').on('click', function() {

    async() => {
      try {
        this.installed = this.uninstalled = false;
        registration = await install();
        this.installed = true;
      } catch(e) {
        console("home-component.install failed, error: "+e);
      }
    }
  });

  // Uninstall button click
  $('#btnUninstall').on('click', function() {

    async() => {
      try {
        this.installed = this.uninstalled = false;
        await uninstall();
        this.uninstalled = true;
        registration = null;
      } catch(e) {
        console("home-component.uninstall failed, error: "+e);
      }
    }
  });

});

async function init() {

  try {
    registration = await getRegistration();
    await registration.credentialManager.hints.keys();
    this.installed = true;
  } catch (e) {
    console.error("home-component.init failed, error: "+e);
    this.installed = false;
  }

}

async function getRegistration() {
  const CredentialHandlers = navigator.credentialsPolyfill.CredentialHandlers;

  let registration;
  try {
    // get credential handler registration
    registration = await CredentialHandlers.register('/credential-handler');
  } catch(e) {
    console.log("credential handler registration failed, error: "+e);
  }
  return registration;
}


async function install() {
  console.log('installing...');

  // ensure permission has been granted to add a credential hint
  const result = await CredentialManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
  }

  // get credential handler registration
  const registration = await getRegistration();
  if(!registration) {
    throw new Error('Credential handler not registered');
  }

  console.log('adding hints');
  await addHints(registration);
  console.log('credential hints added');

  console.log('installation complete.');
  return registration;
}

async function uninstall() {
  console.log('uninstalling...');

  const CredentialHandlers = navigator.credentialsPolyfill.CredentialHandlers;

  // ensure permission has been granted to add a credential hint
  const result = await CredentialManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
  }

  // unregister credential handler registration
  await CredentialHandlers.unregister('/credential-handler');
  console.log('credential handler unregistered');

  // revoke permission (useful for demonstration purposes)
  await navigator.credentialsPolyfill.permissions.revoke(
    {name: 'credentialhandler'});

  console.log('uninstallation complete.');
}

async function addHints(registration) {
  return Promise.all([
    registration.credentialManager.hints.set(
      'did:method1:1234-1234-1234-1234', {
        name: 'My business identity',
        enabledTypes: ['VerifiableProfile'],
      })
    ]);
}
