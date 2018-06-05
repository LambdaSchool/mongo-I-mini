const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find() 
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json({ error: 'Error fetching bears' }));
  })
  .post((req, res) => {
   const {species, latinName} = req.body;
   const newBear = new Bear({species, latinName});
    newBear.save().then(savedBear => {
      res.status(201).json(savedBear)
    })
    .catch(err => {
      res.status(422).json({error: err})
   })
  });

router
  .route('/:id')
  .get((req, res) => {
   const {id} = req.params;
   Bear.findById(id).then(foundBear => {
     res.status(200).json(foundBear)
   })
   .catch(err => {
     res.staus(404).json({error: "No bear with that ID in DB"})
   });
  })
  .delete((req, res) => {
    const {id} = req.params;
    Bear.findOneAndRemove(id).then(removeBear => {
      res.status(200).json(removeBear)
    })
  })
  .put((req, res) => {
    const {id} = req.params;
    const {species, latinName} = req.body;
   Bear.findByIdAndUpdate(id, {
     $set: {
       species: species,
       latinName: latinName
     }
   }).then((result) => {
    res.status(200).json(result)
   })
  });

module.exports = router;
