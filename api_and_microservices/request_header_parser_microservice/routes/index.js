var express = require('express');
var router = express.Router();

const requestIp = require('request-ip');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  //console.log(req.headers);
  //console.log(req.ip);
  //const clientIp = requestIp.getClientIp(req); 
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const software = req.headers['user-agent'];
  const language = req.headers['accept-language'];
  res.render('index', { title: 'Express', ip: ip, lang: language, software: software });
});

module.exports = router;
