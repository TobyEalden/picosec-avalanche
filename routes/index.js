var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('av', { title: 'picosec avalanche warning' });
});

module.exports = router;
