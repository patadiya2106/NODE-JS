const express = require('express');
const route = express.Router();
const { addextracategorypage, insertcategory, viewextracategorypage, deleteExtracategory, editExtraCategory, updateExtracategorypage } = require('../controllers/exrtacategoryControllers');
const upload = require('../middelware/adminMulter');

route.get('/addextracategorypage', addextracategorypage);
route.post('/insertextracategory', insertcategory);
route.get('/viewextracategorypage', viewextracategorypage);
route.get('/deleteextracategory/:id', deleteExtracategory);
route.get('/updateExtracategorypage/:id', updateExtracategorypage);
route.post('/editExtraCategory/:id', editExtraCategory);
module.exports = route;