var express = require('express');
var router = express.Router();

// Handler
router.post('/timestamp', function(req, res, next) {

  //console.log(req.body);
  //console.log(typeof req.body.year);
  //console.log(typeof Number(req.body.year));
  //console.log(Number(req.body.year));
  //console.log(typeof req.body.hh);

  let specified_date = new Date(
        req.body.year,
        req.body.month,
        req.body.day,
        req.body.hh,
        req.body.mm,
        req.body.ss
      );

  //console.log(specified_date);

  let unix = specified_date.getTime();

  //console.log(unix);

  res.render('index', { 
          title: 'Express', 
          unix: unix,
          utc: specified_date
        });   


});

module.exports = router;
