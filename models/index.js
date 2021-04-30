const { Schema, model } = require('mongoose');
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
            },
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ],
    totalDuration: Number,
    versionKey: false
});
WorkoutSchema.methods.lastDuration = function () {
    this.totalDuration = this.exercises.reduce((total, exercise) => { return total + exercise.duration; }, 0)
    console.log(this.totalDuration)
    return this.totalDuration
}
const Workout = model("Workout", WorkoutSchema);
module.exports = Workout;
