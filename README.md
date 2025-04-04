# Github protector

Github protector is a simple web service made with Node that can be installed
in firebase functions and can be used as a webhook for Github organizations.

This service does the following:
- Listens for Github organization events (create repository)
- Once a repository is created, it protects the master branch
- Generates an issue in the tracker with the changes made in the repository.

## Disclaimer
All the instructions below are meant for a **Mac OS environment**, the commands might change
for Linux or Windows installations of the service.

## Pre-installed requirements

To run this scripts you will need to have installed:
- npm
- node 8+ (tested on v12.2.0)

## Running instructions

### Setup
- Create a `.env` file
- Add the following content to the file:
```
PORT=3000
GITHUB_WEBHOOK_SECRET=changeme
GITHUB_PERSONAL_TOKEN=changeme
LOCAL_ENV=true
```
- Change the `GITHUB_WEBHOOK_SECRET` ([Github reference](https://developer.github.com/webhooks/securing/)), this will be a key for the
webhook deployment.
- Generate a personal access token as explained [here](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) and
add the key on `GITHUB_PERSONAL_TOKEN`

> Never commit your env variables to the repository with the ones that will be used in a 
production environment. The ones currently present are just mocks to be changed

### Running locally

To execute the service locally, in the root folder:

```bash
npm install
# Normal
npm run start
# or with hot reload
npm run debug
```

The service will be accessible on ``localhost:3000``. You can configure the ``PORT``
env variable in the ``.env`` file.

### Running tests

Execute the tests with the following commands:

```bash
npm install
npm run test
```

## Service deployment

### Setup firebase

To deploy this hook to firebase:
- Ensure you have installed `firebase-tools`
```
npm install -g firebase-tools
```
- Execute `firebase login` and enter your credentials
- Execute `firebase init`, select your firebase project and remove the 
functions folder that appears

### Run function locally
- Create the environment variables in `.env_firebase`:
```
GITHUB_WEBHOOK_SECRET=changeme
GITHUB_PERSONAL_TOKEN=changeme
```
- Execute the deployment
```
npm run functions:start
```

###  Run function on firebase

- Add the secret and personal token from setup steps:
```
firebase functions:config:set github.secret="changeme" github.token="changeme"
```
- Execute the deployment
```
npm run functions:predeploy
npm run functions:deploy
```
With this you will obtain a url that you can use in the next step to add the 
webhook on your organization.

> Ensure your account is a paid one, otherwise it will be limited
in use and the function will not work. 

### Add hook to your Github organization
- Go to your organization's Github and access *Organization > Settings > Webhooks*
- Add the url
- Set content type as application/json
- As secret set your favorite key
- On the event selection select 'Let me select individual events'
- In the list select 'Repositories' (rest of the events are ignored)

From now on, the service will be working always you create a repository
within your organization.

## Library dependencies

- ES6 support for node: [babel](https://babeljs.io/docs/en/babel-node)
- Networking: [axios](https://github.com/axios/axios)
- Node server handling: [Koa](https://koajs.com/)
- Github security header validation: [x-hub-signature](https://github.com/compwright/x-hub-signature)
- Deployment: [Firebase functions](https://firebase.google.com/docs/functions)
- Template parsing: [string-template](https://github.com/Matt-Esch/string-template)

## Sources

- [Security recommendations](https://developer.github.com/webhooks/securing/)
- [Some boilerplate config for ES6](https://medium.com/@onlykiosk/complete-babel-7-guide-for-beginners-in-2019-7dd78214c464)
- [Env variable setup](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)
- [Github webhook documentation](https://developer.github.com/webhooks/)
- [Koa router documentation](https://github.com/ZijianHe/koa-router) and [Koa documentation](https://koajs.com/)
- [Axios docs](https://github.com/axios/axios)
- [Error handling with koa](http://travisjeffery.com/b/2015/10/error-responses-on-node-js-with-koa/)
- [Github documentation for web services](https://developer.github.com/v3/)
- [Babel with firebase functions](https://codeburst.io/cloud-functions-for-firebase-with-babel-flow-typescript-796606628d37)