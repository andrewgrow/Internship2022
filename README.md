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

### Week 1.3 task

1. Install mongodb locally on your machine. https://www.mongodb.com/home
2. Install GUI (MongoDB Compass or Robo3T, or any another. Based on your preferences)
3. In your express application create connection to mongo. Connection need to be inside
 config/mongoConnection.js. All operations with database need to be with Mongoose https://mongoosejs.com/.
4. Add events when mongo connected: 'connected', 'error', 'open'. And add logger on this events.
5. Create Schema for User inside your component in model.js. User need to have fields: email, firstName,
 lastName, password. Email need to have unique index. Password need to be hashed with bcrypt. You can use
 Mongoose middleware pre('save').
6. On your route /create (or another when you have created operation for user) you need to pass body
 params with email, password, firstName, lastName. All this params need to be validated in controller.
 User creation (Mongoose operation) need to be in Service.
