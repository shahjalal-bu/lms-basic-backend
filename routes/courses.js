const router = require("express").Router();
const Course = require("../modals/Course");
const User = require("../modals/User");
//create a post
router.post("/", async (req, res) => {
  const newCourse = new Course(req.body);
  try {
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a course
router.put("/:id", async (req, res) => {
  try {
    const course= await Course.findById(req.params.id);
    if (course.userId === req.body.userId) {
      await course.updateOne({ $set: req.body });
      res.status(200).json("Course has been updated");
    } else {
      res.status(403).json("You can update only your own course");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a course
router.delete("/:id", async (req, res) => {
    try {
      const course= await Course.findById(req.params.id);
      if (course.userId === req.body.userId) {
        await course.deleteOne();
        res.status(200).json("Course has been deleted");
      } else {
        res.status(403).json("You can update delete your own course");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//get  courses
router.get("/", async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
