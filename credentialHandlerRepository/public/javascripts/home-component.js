$(document).on('credential-handler-polyfill-loaded', init);


// DOM Ready =============================================================
$(document).ready(function() {

  // Install button click
  $('button#btnInstall').click(async function(){

    try {
      this.installed = this.uninstalled = false;
      registration = await install();
      this.installed = true;
      $('button#btnInstall').prop('disabled', this.installed);
      $('button#btnUninstall').prop('disabled', !this.installed);
    } catch(e) {
      console("home-component.install failed, error: "+e);
    }

  });

  // Uninstall button click
  $('button#btnUninstall').click(async function(){

    try {
      this.installed = this.uninstalled = false;
      await uninstall();
      this.uninstalled = true;
      $('button#btnInstall').prop('disabled', this.installed);
      $('button#btnUninstall').prop('disabled', !this.installed);
      registration = null;
    } catch(e) {
      console("home-component.uninstall failed, error: "+e);
    }

  });

});

async function init() {

  try {
    registration = await getRegistration();
    await registration.credentialManager.hints.keys();
    this.installed = true;
  } catch (e) {
    // it is ok for this to fail until user grants permission to show keys
    this.installed = false;
  }

  $('button#btnInstall').prop('disabled', this.installed);
  $('button#btnUninstall').prop('disabled', !this.installed);
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
      'did:sov:1234567890', {
        name: 'My ti-agent identity',
        enabledTypes: ['VerifiableProfile'],
      })
    ]);
}
