'use strict';

var subscribers = require('../../data/subscribers.json');
var jp = require('jsonpath')

module.exports = {
    get: function (id) {
        return jp.query(subscribers, '$..[?(@.id=='+id+')]')[0];
    },
    all: function () {
        return subscribers;
    }
};
