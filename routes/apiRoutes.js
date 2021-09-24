const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout.js');

// Get duration for workout range
router.get('/api/workouts/range', async (req, res) => {
  try {
      const workoutDuration = await Workout.aggregate([
          {
              $addFields: {
                  workoutDuration: {$sum: "$exercises.duration"}
              }
          },
      ]).sort({ date: -1 }).limit(7);
      console.log(workoutDuration);
      res.status(200).json(workoutDuration);
  } catch (e) {
      res.status(400).json(e);
  }
});


//Create new workout
router.post('/api/workouts', async (req, res) => {
  try {
      const newWorkout = await Workout.create(req.body);
      newWorkout.save();

      res.status(200).json(newWorkout);
  } catch (e) {
      res.status(400).json(e);
  }
});

//Update workout by id
router.put('/api/workouts/:id', async (req, res) => {
  try {
      const newExercise = await Workout.findByIdAndUpdate(req.params.id, {
          $push: {
              exercises: req.body
          },
      }, {
          new: true,
      },
      );
      res.status(200).json(newExercise);
  } catch (e) {
      res.status(400).json(e);
  }
});


//Delete workout
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
      .then(() => {
          res.json(true);
      })
      .catch((err) => {
          res.status(400).json(err);
      });
});

module.exports = router;