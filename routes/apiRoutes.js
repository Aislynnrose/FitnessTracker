const express = require('express');
const router = express.Router();
const Workouts = require('../models/Workout');

// Get duration for workout range
router.get('/api/workouts', async (req, res) => {
  try {
      const workoutDuration = await Workouts.aggregate([
          {
              $addFields: {
                  workoutDuration: {$sum: "$exercises.duration"}
              }
          },
      ]).then((data) => res.json(data));
      console.log(workoutDuration);
      res.status(200).json(workoutDuration);
  } catch (e) {
      res.status(400).json(e);
  }
});

//.sort({ date: -1 }).limit(7);

//Create new workout
router.post('/api/workouts',  (req, res) => {
 Workouts.create({}).then((data)=>console.log(data)).catch(err=>res.json(err))
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