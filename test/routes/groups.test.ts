import express from 'express';
import request from 'supertest';
import { groupRouter } from '../../src/routes';
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../../src/services/group';
import Mock = jest.Mock;

jest.mock('../../src/services/group');


const app = express()
  .use(express.json())
  .use(groupRouter);

describe('groupRouter', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('GET all should call getGroups', done => {
    (getGroups as Mock).mockResolvedValue([
      { id: '123', name: 'group1', permissions: ['READ', 'WRITE'] }
    ]);
    request(app)
      .get('/groups')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([
        { id: '123', name: 'group1', permissions: ['READ', 'WRITE'] }
      ])
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(getGroups).toHaveBeenCalled();
        done();
      });
  });

  test('GET by id should call getGroup', done => {
    (getGroup as Mock).mockResolvedValue({ id: '123', name: 'group1', permissions: ['READ', 'WRITE'] });
    request(app)
      .get('/groups/123')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ id: '123', name: 'group1', permissions: ['READ', 'WRITE'] })
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(getGroup).toHaveBeenCalledWith('123');
        done();
      });
  });

  test('DELETE by id should call deleteGroup', done => {
    (deleteGroup as Mock).mockResolvedValue({ id: '123', name: 'group1', permissions: ['READ', 'WRITE'] });
    request(app)
      .delete('/groups/123')
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(deleteGroup).toHaveBeenCalledWith('123');
        done();
      });
  });

  test('POST by id should call createGroup', done => {
    (createGroup as Mock).mockResolvedValue({ id: '123', name: 'group1', permissions: ['READ', 'WRITE'] });
    request(app)
      .post('/groups')
      .set('Accept', 'application/json')
      .send({ name: 'group1', permissions: ['READ', 'WRITE'] })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({ id: '123', name: 'group1', permissions: ['READ', 'WRITE'] })
      .end((err, res) => {
        if (err) {
          console.error(res.body);
          done(err);
        }
        expect(createGroup).toHaveBeenCalledWith({ name: 'group1', permissions: ['READ', 'WRITE'] });
        done();
      });
  });

  test('PUT by id should call updateUser', done => {
    (updateGroup as Mock).mockResolvedValue({ id: '123', name: 'group2', permissions: ['READ', 'WRITE'] });
    request(app)
      .put('/groups/123')
      .send({ name: 'group2', permissions: ['READ', 'WRITE'] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ id: '123', name: 'group2', permissions: ['READ', 'WRITE'] })
      .end((err) => {
        if (err) {
          done(err);
        }
        expect(updateGroup).toHaveBeenCalledWith('123', { name: 'group2', permissions: ['READ', 'WRITE'] });
        done();
      });
  });

});
