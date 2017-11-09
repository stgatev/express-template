 'use strict';

 var repository = require('../../lib/subscriberRepository');

 module.exports = {
     get: function subscribers_get(req, res) {
         res.json(repository.get(req.params['id']))
     }    
 };