const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt')
const uploader = require('../configs/cloudinary')

router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(arts => {
      res.json(arts)
    })
});

router.get('/:streetArtId', (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
    .then(art => {
      res.json(art)
    })
});

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url

  let data = {
    pictureUrl,
    location : {
      coordinates : [lng, lat]
    }
  }

  StreetArt.create(data)
    .then(newArt => {
      res.json({
        success: true,
        newArt
      })
    })
    .catch(err => next(err))
});


module.exports = router;