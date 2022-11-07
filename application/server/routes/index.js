var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("here");
  //res.render('index.html', { title: 'CSC 317 App', name:"Griffin Evans" });
});

module.exports = router;
