var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let time = new Date()
  let time2 = time.toLocaleTimeString()
  res.render('index', { time: time2 });
});

module.exports = router;
