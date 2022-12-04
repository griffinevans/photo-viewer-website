const express = require('express');
const router = express.Router();
const db = require('../database.js');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, 'public/images/uploads')
  },
  filename: function(req, file, cb) {
    const fileExt = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`);
  }
}); 

const upload = multer({ storage: storage });

router.post("/create", upload.single("uploadImage"), (req, res, next) => {
  const uploadedFile = req.file.path;
  const thumbnailName = `thumbnail-${req.file.filename}`;
  const thumbnailDestination = `${req.file.destination}/${thumbnailName}`;
  const {title, description} = req.body;
  const userId = req.session.userId;

  sharp(uploadedFile)
    .resize(200)
    .toFile(thumbnailDestination)
    .then( () => {
      let baseSql = `INSERT INTO posts (title, description, image, thumbnail, fk_authorId)`
      + ` VALUE (?,?,?,?,?)`
      return db.query(baseSql,[title,description,uploadedFile,thumbnailDestination,userId]);
    })
    .then( ([results,fields]) => {
      console.log(results);
      if(results && results.affectetdRows) {
        req.session.save( (saveErr) => {
          res.redirect('/');
        })
      }
    })
    .catch( (err) => next(err));
});

module.exports = router;
