 'use strict';

 var repository = require('../../lib/usersRepository');

 module.exports = {
     get: function users_getById(req, res) {
         res.json(repository.get(req.params['id']))
     }    
 };