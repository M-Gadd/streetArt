const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const User = require("../models/User");
const router = express.Router();

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({_user: req.user._id})
    .populate('_streetArt')
    .then(art => {
      res.json(art)
    })
    .catch(err => next(err))
});

router.post('/visits', isLoggedIn, (req, res, next) => {
  let data = {
    _user : req.user._id,
    _streetArt: req.body._streetArt
  }
  console.log(data)
  Visit.create(data)
    .then(newVisit => {
      res.json({
        success: true,
        newVisit
      })
    })
    // .then(() => {
    //   Visit.find({_user: req.user._id})
    //   .populate('_streetArt')
    //   .then(art => {
    //     console.log(art)
    //     res.json(art)
    //   })
    // })

    .catch(err => next(err))
});


router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  console.log("PARAMMMS",req.params.visitId)
  Visit.findById(req.params.visitId)
  .then(visit => {
    console.log(visit)
    // console.log(req.user.id)
    if (visit._user.equals(req.user.id)) {

        Visit.findByIdAndRemove(req.params.visitId)
          .then( () => {
            res.json({message: `the visit with ID ${req.params.visitId} was successfully deleted`})
          })
          .catch(err => next(err))
      
    } else {
      res.json({message: `Fuck off , you can't delete this visit, you are not the owner`})
    }
  })
  // .then(() => {
  //   Visit.find({_user: req.user._id})
  //   .populate('_streetArt')
  //   .then(art => {
  //     console.log(art)
  //     res.json(art)
  //   })
  // })
  .catch(err => next(err))

} )

module.exports = router;