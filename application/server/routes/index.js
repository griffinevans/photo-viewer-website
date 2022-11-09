var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("API is working properly");
});

router.get('/api', function(req, res, next) { 
    fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
      .then((response) => response.json())
      .then((data) => res.send(data));
});

module.exports = router;
