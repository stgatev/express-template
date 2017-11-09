'use strict';

var users = require('../../data/users.json');
var jp = require('jsonpath')

module.exports = {
    get: function (id) {
        return jp.query(users, '$..[?(@.id=='+id+')]')[0];
    },
    all: function () {
        return users;
    }
};
