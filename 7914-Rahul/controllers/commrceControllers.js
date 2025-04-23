const commerce = require('../models/e-commerceModel');
const fs = require('fs');


const home = (req,res) => {
    res.render('homepage');
}
const editPage = (req , res ) => {
    res.render('editPage')
}
module.exports = {
    home,
    editPage,
}