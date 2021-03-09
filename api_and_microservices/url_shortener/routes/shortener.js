var express = require('express');
var router = express.Router();
var URL = require('../models/urlSchema');

/* GET home page. */
router.post('/', function(req, res, next) {
  const data = new URL(req.body);

  data.save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err); 
    });

});

module.exports = router;
