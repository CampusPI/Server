var mongojs = require('mongojs');
var db = mongojs(require('../db').url);
var schedule = require('node-schedule');

require ('./weather')(db,schedule);
require ('./broadcast')(db,schedule);
require ('./news')(db,schedule);
require ('./videos')(db,schedule);

