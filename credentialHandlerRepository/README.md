# Credential Handler Repository

This my attempt to implement a web app front end to a Credential Handler Repository along the lines of what Digital Bazaar did in: https://credential-repository.demo.digitalbazaar.com/
This uses the credential-handler-polyfill published by Digital Bazaar, loaded into web pages served using NodeJS's Express.  The credential-handler-polyfill needs to be bundled to work in a browser so I use webpack to achieve that end.

To setup and start the web server:

- cd credentialHandlerRepository
- npm install
- npm run build
- npm start


With a browser, navigate to ```http://localhost:3000```
