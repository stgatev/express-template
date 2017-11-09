'use strict';
import * as mocha from 'mocha';
import * as chai from 'chai';
import { usersRepository as users } from '../../src/lib/usersRepository';

const expect = chai.expect;

describe('usersRepository test', () => {
    it('gets all should return a json array, length is 30 for current data ', () => {
        let allUsers = users.all();
        expect(Object.keys(allUsers)).to.have.length(30);
    });

    //valid inputs in different types of upper/lower cases
    it('gets insurance term information with valid input', () => {
        let claim = users.get('claim');
        expect(claim).to.be.a('string', 
        'A claim is a request for payment that you or your health care provider submits to your health insurer when you get items or services you think are covered.');
    });

    it('gets health insurance term information using various testing inputs', () => {
        let claim1 = users.get('Claim');
        expect(claim1).to.be.a('string', 
        'A claim is a request for payment that you or your health care provider submits to your health insurer when you get items or services you think are covered.');

        let claim2 = users.get('cLAIM');
        expect(claim2).to.be.a('string', 
        'A claim is a request for payment that you or your health care provider submits to your health insurer when you get items or services you think are covered.');

        let claim3 = users.get('CLaiM');
        expect(claim3).to.be.a('string', 
        'A claim is a request for payment that you or your health care provider submits to your health insurer when you get items or services you think are covered.');

        let claim4 = users.get('ClAim');
        expect(claim4).to.be.a('string', 
        'A claim is a request for payment that you or your health care provider submits to your health insurer when you get items or services you think are covered.');
    });

    it('gets insurance term information with invalid input', () => {
        let claim = users.get('claimddddd');
        expect(claim).to.be.an('undefined');
    });
});