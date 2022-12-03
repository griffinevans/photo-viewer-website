const express = require('express');
const router = express.Router();
const session = require("express-session");


router.get('/externalPosts', (req, res, next) => { 
    fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
      .then((response) => response.json())
      .then((data) => res.send(data));
});

module.exports = router;
