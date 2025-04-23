const express = require('express');
const controller = require('../controllers/commrceControllers');

const route =  express.Router();

route.get('/',controller.home);


module.exports = route;