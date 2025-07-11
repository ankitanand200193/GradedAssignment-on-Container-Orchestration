const Questions = require("../models/questionUpload.model");

const addQuestion = async (req, res) => {
  const question_title = req.body.question_title;

  const user = await Questions.findOne({ question_title });

  if (user) {
    return res.status(400).json({ message: "Question already exists" });
  }

  if (
    !req.body.question ||
    !req.body.question_title ||
    !req.body.total_marks ||
    !req.body.skill_tag ||
    !req.body.sub_tag ||
    !req.body.tag_level
  ) {
    return res.status(400).json({ message: "Please fill all the details", data: req.body });
  }

  try {
    const newQuestion = new Questions({ ...req.body });
    await newQuestion.save();
    res.status(200).json({ message: "Question uploaded successfully", status: "done" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllQuestions = (req, res) => {
  Questions.find({}, (err, result) => {
    console.log(result);
    res.send(result);
  });
};

module.exports = { addQuestion, getAllQuestions };
