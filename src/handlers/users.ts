'use strict';

 var repository = require('../lib/usersRepository');

 module.exports = {
     get: function users_get(req, res) {
         res.json(repository.all())
     }
 };