const router = require("express").Router();
const Workout = require("../models");
const path = require("path");



router.get("/", (req, res) => {
    res.send(index.html);
});
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/api/workouts/", async (req, res) => {
    try {
        const data = await Workout.find({})
        const returnData = [];

        data.forEach(item => {
            const workout = new Workout(item)
            workout.exercises = item.exercises
            workout.lastDuration();
            returnData.push(workout);
        })

        res.json(returnData);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post("/api/workouts/", async (req, res) => {
    try {
        const data = await Workout.create({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        const data = await Workout.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $push: {
                    exercises: req.body
                }
            },
        );
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.get("/api/workouts/range", async (req, res) => {
    try {
        const data = await Workout.find({})
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
module.exports = router
