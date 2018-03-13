const express = require('express');
const bearKeeper = require('./bearKeeperModel');

const bearKeeperRouter = express.Router();

bearKeeperRouter.post('/', function(req, res) {
  const bearInfo = req.body;
  const newBear = new bearKeeper(bearInfo);
  if (!newBear.species || !newBear.latinName) {
    res.status(400).json({error: 'Please, provide both species and latin name for the bear.'});
  }
  newBear
    .save()
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(500).json({error: 'There was an error while saving the bear to the database'});
    });
});

bearKeeperRouter.get('/', function(req, res) {
  bearKeeper
    .find({})
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({error: 'The information could not be retrieved'});
    });
});

bearKeeperRouter.get('/:id', function(req, res) {
  bearKeeper
    .findById(req.params.id)
    .then(bear => {
      if (!bear) {
        res.status(404).json({message: "The Bear with the specified ID does not exist."});
      } else{
        res.status(200).json(bear);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The information could not be retrieved.'});
    });
});

bearKeeperRouter.delete('/:id', function(req, res) {
  bearKeeper
    .findByIdAndRemove(req.params.id)
    .then(bear => {
      if(!bear) {
        res.status(404).json({message: "The Bear with the specified ID does not exist."});
      } else {
        res.status(200).json(bear);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The Bear could not be removed.'});
    })
});

bearKeeperRouter.put('/:id', function(req, res) {
  bearKeeper
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(bear => {
      if (!bear) {
       res.status(404).json({message: "The Bear with the specified ID does not exist."});
      } else
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json({error: 'The Bear information could not be modified.'});
    })
});

module.exports = bearKeeperRouter;
