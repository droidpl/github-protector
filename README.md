# Github protector

Github protector is a simple web service made with Node that can be installed
in your prefered environment and can be used as a webhook for organizations.

This service does the following:
- Listens for Github organization events (create repository)
- Once a repository is created, it protects the master branch
- Generates an issue in the tracker with the changes made in the repository.

> If the repository is created without a README, the master branch will not exist.
This service creates a dummy README file and commits it in that case.

## Disclaimer
All the instructions below are meant for a **Mac OS environment**, the commands might change
for Linux or Windows installations of the service.

## Pre-installed requirements

To run this scripts you will need to have installed:
- npm
- node 9+ (tested on v12.2.0)
- yarn

## Running instructions

To configure the environment:
- Select the secret ([Github reference](https://developer.github.com/webhooks/securing/)) you want to use as verification for the webhook
- Add this on the .env file in the GITHUB_SECRET variable
- Deploy the service and obtain a publicly accessible url
> Note you can deploy it using ngrok for testing purposes. On a production environment
You should use an infrastructure such as lambdas.

> Never commit your env variables to the repository with the ones that will be used in a 
production environment. The ones currently present are just mocks to be changed

Now with the url you obtained:
- Go to your organization's Github and access *Organization > Settings > Webhooks*
- Add the url
- Set content type as application/json
- As secret set your favorite key
- On the event selection select 'Let me select individual events'
- In the list select 'Repositories' (rest of the events are ignored)



### Run locally

To execute the service locally, in the root folder:

```bash
yarn install
npm run start 
```

The service will be accessible on ``localhost:3000``. You can configure the ``PORT``
env variable in the ``.env`` file.

## Running the tests

Execute the tests with the following commands:

```bash
yarn install
npm run test
```

## Sources

- [Sha1 calculation](http://osxdaily.com/2012/06/06/check-sha1-hash-of-string/)
- [Env variable setup](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)
- [Some boilerplate config for ES6](https://medium.com/@onlykiosk/complete-babel-7-guide-for-beginners-in-2019-7dd78214c464)
- [Github webhook documentation](https://developer.github.com/webhooks/)
- [Koa router documentation](https://github.com/ZijianHe/koa-router) and [Koa documentation](https://koajs.com/)
