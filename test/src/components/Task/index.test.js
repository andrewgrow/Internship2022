const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../../../../src/server/server');
const Security = require('../../../../src/config/security');
const { User } = require('../../../../src/components/Users/model');

chai.use(chaiHttp);

const { expect } = chai;
const testUser = new User({
    firstName: 'Name1',
    lastName: 'Last1',
    email: 'test@example.com',
    password: 'testtest',
});

describe('Test TASK component', () => {
    before('Before all tests', async () => {
        await testUser.save();
    });

    after('After all tests', async () => {
        await mongoose.connection.dropDatabase();
    });

    describe('Check index.js methods', () => {
        describe('all routes must be protected by jwt', () => {
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

        describe('check routes functionality', () => {
            let jwtToken;

            before('', async () => {
                jwtToken = `Bearer ${Security.generateJwtToken(testUser)}`;
            });

            describe('GET v1/task', () => {
                it('should return 5 task', async () => {
                    await chai.request(server)
                        .get('/v1/task')
                        .set('authorization', jwtToken)
                        .then((res) => {
                            expect(res).to.have.status(200);
                        });
                });
            });
        });
    });
});
