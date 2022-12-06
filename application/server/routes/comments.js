const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get('/:id', (req, res, next) => {
  db.query(`SELECT * FROM csc317db.comments WHERE id = ${req.params.id};`)
    .then( ([results, fields]) => {
      if(results && results.length) {
        res.locals.results = results[0];
        res.send(results[0]);
      }
    })
    .catch(err => next(err));
});

router.post('/:id', (req, res, next) => {
  const baseSql = `INSERT INTO comments (text, fk_authorId, fk_postId) VALUE (?,?,?)`
  const userId = req.session.userId;
  const text = req.body;
  const postId = req.params.id;
  console.log(req.body);

  db.query(baseSql,[text,userId,postId])
    .then( ([results,fields]) =>  {
      if (results && results.affectedRows == 1) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    }
    )
    .catch(err => next(err));
});


module.exports = router;
