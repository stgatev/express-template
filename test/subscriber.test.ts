import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET subscribers', () => {
    it('responds with JSON array', () => {
        return chai.request(app).get('/subscribers').then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(3);
        });
    });

    it('should include Trevor Plantagenet', () => {
        return chai.request(app).get('/subscribers/1').then(res => {
            let subscriber = res.body;
            expect(subscriber).to.exist;
            expect(subscriber).to.have.all.keys([
                'id',
                'name'
            ]);
            expect(subscriber.name).to.equal("Trevor Plantagenet");
        });
    });
});

describe('GET subscribers/:id', () => {
    it('responds with single JSON object', () => {
        return chai.request(app).get('/subscribers/1').then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        });
    });

    it('should return Trevor Plantagenet', () => {
        return chai.request(app).get('/subscribers/1').then(res => {
            expect(res.body.name).to.equal('Trevor Plantagenet');
        });
    });
});