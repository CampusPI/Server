var mongojs = require('mongojs');
var db = mongojs(require('../db').url);
var schedule = require('node-schedule');

require ('./weather')(db,schedule);


