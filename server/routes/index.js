/* ===============================================
File Name: COMP308-W2017-MidTerm-300776816
Author's Name:Mekhal Ganesh
Student ID:300776816
Web App Name: https://comp308-w2017-midterm300776816.herokuapp.com/

===================================================  */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;


