var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Index Page");
  res.render('index', { title: 'File Metadata Microservice' });
});

module.exports = router;
