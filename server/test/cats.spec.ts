import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import School from '../models/school';

chai.use(chaiHttp).should();

describe('Schools', () => {

  beforeEach(done => {
    School.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for schools', () => {

    it('should get all the schools', done => {
      chai.request(app)
        .get('/api/schools')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get schools count', done => {
      chai.request(app)
        .get('/api/schools/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new school', done => {
      const school = new School({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/school')
        .send(school)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a school by its id', done => {
      const school = new School({ name: 'School', weight: 2, age: 4 });
      school.save((error, newSchool) => {
        chai.request(app)
          .get(`/api/school/${newSchool.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newSchool.id);
            done();
          });
      });
    });

    it('should update a school by its id', done => {
      const school = new School({ name: 'School', weight: 2, age: 4 });
      school.save((error, newSchool) => {
        chai.request(app)
          .put(`/api/school/${newSchool.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a school by its id', done => {
      const school = new School({ name: 'School', weight: 2, age: 4 });
      school.save((error, newSchool) => {
        chai.request(app)
          .del(`/api/school/${newSchool.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


