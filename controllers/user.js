const User = require("../models/user");
const Questionnaire = require("../models/questionnaire");
const Property = require("../models/property");

const questions = [
  {
    question: "What is your gender?",
    options: ["Male", "Female", "Other"],
  },

  {
    question: "Do you have any pets?",
    options: ["Yes, I have a pet", "No, I don't have a pet"],
  },

  {
    question: "How do you feel about visitors in the home?",
    options: [
      "I don't mind visitors",
      "I would like to be informed in prior about who the visitors are",
      "I don't want any visitors",
    ],
  },

  {
    question: "What is your preferred cleaning schedule?",
    options: [
      "I like to clean daily",
      "I prefer to clean once a week",
      "I don't mind a rotating cleaning schedule",
    ],
  },

  {
    question: "What is your preferred method of communication?",
    options: ["Phone calls", "Text messages", "Email", "In person"],
  },

  {
    question: "What is your preferred language of communication?",
    options: ["English", "Hindi", "Regional language"],
  },

  {
    question: "Are you comfortable with sharing household items?",
    options: [
      "Yes, I am comfortable with sharing household items",
      "No, I prefer to have my own items",
    ],
  },

  {
    question: "What is your ideal budget for rent and utilities?",
    options: [
      "Less than 10,000 INR",
      "Between 10,000 to 20,000 INR",
      "Between 20,000 to 30,000 INR",
      "Between 30,000 to 40,000 INR",
      "More than 40,000 INR",
    ],
  },

  {
    question: "What are your work hours like?",
    options: [
      "I have a 9-5 job",
      "I have flexible work hours",
      "I work in shifts",
      "I don't work",
    ],
  },

  {
    question: "Will you be working from home or going to an office?",
    options: [
      "I will be working from home",
      "I will be going to an office",
      "I don't work",
    ],
  },

  {
    question: "Have you had any issues with previous roommates?",
    options: [
      "Yes, I have had issues with previous roommates",
      "No, I have not had any issues with previous roommates",
    ],
  },

  {
    question: "Do you smoke or drink?",
    options: [
      "Yes, I smoke",
      "Yes, I drink",
      "Yes, I smoke as well as drink",
      "No, I don't smoke or drink",
    ],
  },

  {
    question:
      "Do you have any late night or odd habits that may impact your roommates?",
    options: [
      "Yes, I have late night or odd habits",
      "No, I don't have any late night or odd habits",
    ],
  },

  {
    question: "Are you a vegetarian or a non-vegetarian?",
    options: [
      "Vegetarian",
      "Non-vegetarian",
      "I eat non-vegetarian food only on some days",
    ],
  },
];

const getQuestions = (req, res) => {
  res.status(200).json(questions);
};

const submitResponses = async (req, res) => {
    try {
        const user = req.user;
        const questionnaire = new Questionnaire({
            ...req.body,
            byUser: user._id,
        });
        questionnaire = await questionnaire.save();
        user.questionnaire = questionnaire._id;
        await user.save();
        res.status(201).json({
            message: "Questionnaire submitted successfully",
            questionnaire
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};


module.exports = {
  getQuestions,
  submitResponses,
};
