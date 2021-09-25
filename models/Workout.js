const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutsSchema = new Schema ({
  day: {
    type: Date,
    default: ()=> new Date()

  },
  exercises: [
    {
      type: { type: String, trim: true, required: "Enter and Exercise"},
      name: { type: String, trim: true, required: true },
      duration: { type: Number, required: true },
      weight: { type: Number },
      reps: { type: Number },
      sets: { type: Number },
      distance: { type: Number }
    }
  ]
});

const Workout = mongoose.model('Workout', workoutsSchema);

module.exports = Workout;