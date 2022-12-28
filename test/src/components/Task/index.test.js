const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const _ = require('lodash');
const server = require('../../../../src/server/server');
const Security = require('../../../../src/config/security');
const { User } = require('../../../../src/components/Users/model');
const { Task } = require('../../../../src/components/Tasks/model');
const TasksService = require('../../../../src/components/Tasks/service');

chai.use(chaiHttp);

const { expect } = chai;
const testUser = new User({
    firstName: 'Name1',
    lastName: 'Last1',
    email: 'test@example.com',
    password: 'testtest',
});

/**
 * Create some tasks into Database for working.
 */
function createTasksDb(user) {
    _.times(20, async () => {
        await TasksService.create(user, {});
    });
}

describe('Test TASK component', () => {
    before('Before all tests', async () => {
        await testUser.save();
    });

    after('After all tests', async () => {
        await mongoose.connection.dropDatabase();
    });

    describe('Check TASKS routes', () => {
        describe('protection by jwt', () => {
            function isReturnUnauthorized(res) {
                expect(res).to.have.status(401);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.be.equal('jwt must be provided');
            }

            it('GET /v1/task should return 401', async () => {
                await chai.request(server)
                    .get('/v1/task')
                    .then((res) => {
                        isReturnUnauthorized(res);
                    });
            });

            it('GET v1/task/all should return 401', async () => {
                await chai.request(server)
                    .get('/v1/task/all')
                    .then((res) => {
                        isReturnUnauthorized(res);
                    });
            });

            it('DELETE v1/task should return 401', async () => {
                await chai.request(server)
                    .delete('/v1/task')
                    .then((res) => {
                        isReturnUnauthorized(res);
                    });
            });

            it('PATCH v1/task should return 401', async () => {
                await chai.request(server)
                    .patch('/v1/task')
                    .then((res) => {
                        isReturnUnauthorized(res);
                    });
            });

            it('POST v1/task should return 401', async () => {
                await chai.request(server)
                    .post('/v1/task')
                    .then((res) => {
                        isReturnUnauthorized(res);
                    });
            });
        });

        describe('main functionality', () => {
            let jwtToken;

            before('', () => {
                jwtToken = `Bearer ${Security.generateJwtToken(testUser)}`;
                createTasksDb(testUser);
            });

            describe('GET v1/task', () => {
                it('should return 5 tasks', async () => {
                    await chai.request(server)
                        .get('/v1/task')
                        .set('authorization', jwtToken)
                        .then((res) => {
                            expect(res).to.have.status(200);
                            expect(res.body.data).to.have.property('tasks');
                            expect(res.body.data.tasks).to.be.an('array');
                            expect(res.body.data.tasks.length).to.equal(5);
                        });
                });

                it("should processing page's number", async () => {
                    await chai.request(server)
                        .get('/v1/task?page=3')
                        .set('authorization', jwtToken)
                        .then((res) => {
                            expect(res).to.have.status(200);
                            expect(res.body.data.tasks.length).to.equal(5);
                            expect(res.body.data).to.have.property('totalTasks');
                            expect(res.body.data.totalTasks).to.equal(20);
                        });
                });
            });

            describe('GET v1/task/all', () => {
                it('should return all tasks of user', async () => {
                    await chai.request(server)
                        .get('/v1/task/all')
                        .set('authorization', jwtToken)
                        .then((res) => {
                            expect(res).to.have.status(200);

                            const data = res.body.data[0];

                            expect(data).to.have.property('tasks');
                            expect(data.tasks).to.be.an('array');
                            expect(data.tasks.length).to.equal(20);
                            expect(data).to.have.property('count');
                            expect(data).to.have.property('totalEstimate');
                            expect(data).to.have.property('_id');
                            expect(data).to.have.property('name');
                        });
                });
            });

            describe('POST v1/task', () => {
                it('should create new task', () => {

                });
            });

            describe('PATCH v1/task', () => {
                it('should path task by id', () => {

                });
            });

            describe('DELETE v1/task', () => {
                it('should delete task by id', () => {

                });
            });
        });
    });
});
