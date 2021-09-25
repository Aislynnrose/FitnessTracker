const express = require("express");
const router = express.Router();
const { Workouts } = require("../models");

// Get all workouts
router.get("/api/workouts", async (req, res) => {
    try {
    const workoutDuration = await Workouts.aggregate([
        {
        $addFields: {
            duration: { $sum: "$exercises.duration" },
        }}
    ]);
    res.json(workoutDuration);
    } catch (err) {
    res.json(err);
    }
});

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workoutDuration = await Workouts.aggregate([
            {
                $addFields: {
                    workoutDuration: { $sum: "$exercises.duration" }
                }}
        ]).sort({ _id: -1}).limit(7).sort({ _id: 1 });
        res.json(workoutDuration);
        console.log(workoutDuration);
    } catch (err) {
        res.json(err);
    }
});

//.sort({ date: -1 }).limit(7);

//Create new workout
router.post("/api/workouts", async (req, res) => {
    try {
        const createWorkout = await Workouts.create(req.body);
        res.json(createWorkout);
    } catch (err) {
        res.json(err);
    }
});
// other method
// Workouts.create({})
// .then((data) => console.log(data))
// .catch((err) => res.json(err));

//Update workout by id
router.put("/api/workouts/:id", async (req, res) => {
    try {
        const newExercise = await Workouts.findByIdAndUpdate(req.params.id,
        { $push: { exercises: req.body } },
        { new: true }
    )
    res.json(newExercise);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
