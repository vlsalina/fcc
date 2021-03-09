var express = require('express');
var router = express.Router();
var URL = require('../models/urlSchema');

/* GET home page. */
router.get('/:shorturl', function(req, res, next) {
  const sh = req.params.shorturl;
  
  URL.findOne({ short: sh })
    .then((result) => {
      console.log(result.original);
      res.redirect(result.original);
    })
    .catch((err) => {
      console.log(err);
    });

  


});

module.exports = router;
