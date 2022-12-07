const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get('/:id', (req, res, next) => {
  db.query(`SELECT text, comments.id, fk_authorId, comments.createdAt, username FROM csc317db.comments`
    + ` JOIN csc317db.users ON comments.fk_authorId = users.id WHERE fk_postId = ${req.params.id};`)
    .then( ([results, fields]) => {
      console.log(results);
      if(results && results.length) {
        res.locals.results = results;
        res.send(results);
      }
    })
    .catch(err => next(err));
});

router.post('/:id', (req, res, next) => {
  const baseSql = `INSERT INTO comments (text, fk_authorId, fk_postId) VALUE (?,?,?)`
  const {commentInput} = req.body;
  const userId = req.session.userId;
  const postId = req.params.id;
  console.log(commentInput);

  db.query(baseSql,[commentInput,userId,postId])
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
