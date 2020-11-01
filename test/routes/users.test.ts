import express from 'express';
import request from 'supertest';
import { userRouter } from '../../src/routes';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../src/services';
import Mock = jest.Mock;

jest.mock('../../src/services');


const app = express()
  .use(express.json())
  .use(userRouter);

describe('userRouter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('GET all should call getUsers', done => {
    (getUsers as Mock).mockResolvedValue([
      { id: '123', login: 'login1', password: 'TestPassword123', age: 54 }
    ]);
    request(app)
      .get('/users?loginSubstring=login&limit=10')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([{ id: '123', login: 'login1', password: 'TestPassword123', age: 54 }])
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(getUsers).toHaveBeenCalledWith('login', 10);
        done();
      });
  });

  test('GET by id should call getUser', done => {
    (getUser as Mock).mockResolvedValue({ id: '123', login: 'login1', password: 'TestPassword123', age: 54 });
    request(app)
      .get('/users/123')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ id: '123', login: 'login1', password: 'TestPassword123', age: 54 })
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(getUser).toHaveBeenCalledWith('123');
        done();
      });
  });

  test('DELETE by id should call deleteUser', done => {
    (deleteUser as Mock).mockResolvedValue({ id: '123', login: 'login1', password: 'TestPassword123', age: 54 });
    request(app)
      .delete('/users/123')
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(deleteUser).toHaveBeenCalledWith('123');
        done();
      });
  });

  test('POST by id should call createUser', done => {
    (createUser as Mock).mockResolvedValue({ id: '123', login: 'login1', password: 'TestPassword123', age: 54 });
    request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({ login: 'login1', password: 'TestPassword123', age: 54 })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({ id: '123', login: 'login1', password: 'TestPassword123', age: 54 })
      .end(err => {
        if (err) {
          done(err);
        }
        expect(createUser).toHaveBeenCalledWith({ login: 'login1', password: 'TestPassword123', age: 54 });
        done();
      });
  });

  test('PUT by id should call updateUser', done => {
    (updateUser as Mock).mockResolvedValue({ id: '123', login: 'login2', password: 'TestPassword123', age: 54 });
    request(app)
      .put('/users/123')
      .send({ login: 'login2', password: 'TestPassword123', age: 54 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ id: '123', login: 'login2', password: 'TestPassword123', age: 54 })
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(updateUser).toHaveBeenCalledWith('123', { login: 'login2', password: 'TestPassword123', age: 54 });
        done();
      });
  });

});
