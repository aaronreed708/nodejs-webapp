# Credential Handler Repository

This my attempt to implement a web app front end to a Credential Handler Repository along the lines of what Digital Bazaar did in: https://credential-repository.demo.digitalbazaar.com/
This uses the credential-handler-polyfill published by Digital Bazaar, loaded into web pages served using NodeJS's Express.  The credential-handler-polyfill needs to be bundled to work in a browser so I use webpack to achieve that end.

To setup and start the web server:

- cd credentialHandlerRepository
- npm install
- npm run build
- DEBUG=credentialhandler:* npm start


With a browser, navigate to ```http://localhost:3000``` or ```https://localhost:18443```

## HTTPS details

When the server is started with the ```npm start``` instruction above, an https as
well as an http server will be started.  The self-signed SSL cert was setup with
 CN=example.credential-repository.localhost.  The certs are served out of the ./ssl directory.

If you are running this server locally and would like to address it as example.credential-repository.localhost, you need to have:

127.0.0.1       localhost       example.credential-repository.localhost

in your /etc/hosts file.
