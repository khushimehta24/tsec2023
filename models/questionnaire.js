const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema({
  responses: [
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
      expectedAnswers: [{
        type: String,
        required: true,
        trim: true,
      }],
    },
  ],
  byUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;


