### Server start instructions:
* `npm install` inside root folder, to install dependencies

### Run in terminal
* `nodemon` - if you install package global
* `npx nodemon` - if you install package local
* `npm run eslint` - from root folder
* `npm run commit` - commit changes via Commitizen CLI tools

### Run DB via Docker
* `docker-compose up` - rename `docker-compose.yml.mongo` to `docker-compose.yml` and run command to build DB instance
* Connect user `mongouser`, password `mongopassword`, port `27017`, DB `onyx-internship`, AUTHENTICATION DATABASE `admin`

### Week 1.5 task

1. Create Migrations for tasks. Need to add status field. Tasks that have estimatedTime more than 10 need to be set in 'done', less than 10 or equal - 'in progress'. Migration "UP" will create this fields, please add "DOWN" that will erase this data. Npm library to use - https://www.npmjs.com/package/migrate-mongo. Also, don't forget to include status field in your Tasks mongoose Schema
   Your schema with status:

```
assignee - userId (MongoId),
title - Title of tasks
description - Small description of task
estimatedTime - Time to complete the task
createdBy - Who creates Task (e.g Project Manager, QA, Teach Lead)
status - Task status (in progress/ done)
```

2. Swagger documentation. I've prepared for you swagger with connected to your app. Please, cover Tasks components with swagger.
   Materials:
- https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
- https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/
- https://www.npmjs.com/package/swagger-ui-express

3.  Testing your application. Need to cover Tasks component with Unit tests. I've prepared small test for you on /v1/demo route.
    Materials:
- https://www.chaijs.com/api/bdd/
- https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai
- https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha
- https://mochajs.org/
  Run tests with:
```
npm run test
```
