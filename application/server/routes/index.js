var express = require('express');
var router = express.Router();


router.get('/api', (req, res, next) => { 
    fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
      .then((response) => response.json())
      .then((data) => res.send(data));
});

router.post("/register", (req,res,next) => {
  const {username, email, password} = req.body;
  db.query('select id from users where username=?',[username])
  .then( ([results,fields]) =>  res.json(results))
  .catch( (err) => next(err));
  console.log(req.body);
  res.send();
});

module.exports = router;
