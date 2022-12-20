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

### Week 1.4 task

1. Create Component Tasks
2. Tasks will be protected by JWT Header Authorization (that you retrieve on sign-in action)
3. Tasks model fields:

```
assignee - userId (MongoId),
title - Title of tasks
description - Small description of task
estimatedTime - Time to complete the task
createdBy - Who creates Task (e.g Project Manager, QA, Teach Lead)
```
4. **POST** action /v1/task create Task for user. Please, create/generate minimum 10-20 tasks for your
5. **PATCH** v1/task/:id update Task field. For now let's change only estimated time field
6. **GET** v1/task?page=0 Return first 5 tasks for user. Here you can use default find, and skip/limit.
No need to write aggregation here. https://mongoosejs.com/docs/api/query.html#query_Query-skip .
Response also need to have totalTasks field. Also, pagination should work for all "page" params.
   Response:
```
{
    code: 200,
    data: {
        tasks: [your 5 tasks],
        totalTasks: your total tasks for user
    }
```
7. **GET** v1/tasks/all Returns all tasks for user. Here you need to write aggregation. All modifications of result
need to be done in aggregation. Don't modify result in JavaScript. Result for this operation:
```
{
    "tasks" : [
        {
            "_id" : ObjectId("63a052a863131dbdbbd67480"),
            "assignee" : ObjectId("6390f1f319c435e8b55f98f7"),
            "title" : "Upload files 3",
            "description" : "Upload images to S3. Previously need to compress them, and create small thumbnail with size 24x24px.",
            "estimatedTime" : 22,
            "createdBy" : "Project Manager"
        },
        {
            "_id" : ObjectId("63a0529a63131dbdbbd6747b"),
            "assignee" : ObjectId("6390f1f319c435e8b55f98f7"),
            "title" : "Upload files 2",
            "description" : "Upload images to S3. Previously need to compress them, and create small thumbnail with size 24x24px.",
            "estimatedTime" : 12,
            "createdBy" : "Project Manager"
        },
        {
            "_id" : ObjectId("63a04be263131dbdbbd672ec"),
            "assignee" : ObjectId("6390f1f319c435e8b55f98f7"),
            "title" : "Upload files",
            "description" : "Upload images to S3. Previously need to compress them, and create small thumbnail with size 24x24px.",
            "estimatedTime" : 8,
            "createdBy" : "Project Manager"
        }
    ],
    "name" : "John Doe",
    "totalTasks" : 3,
    "totalEstimation" : 42
}
```

**Please, note that array of tasks sorted by estimatedTime from bigger to lower.**


Useful links:
- https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/
- https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/

