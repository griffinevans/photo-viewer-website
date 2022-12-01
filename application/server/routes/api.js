var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => { 
    fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
      .then((response) => response.json())
      .then((data) => res.send(data));
});

module.exports = router;
