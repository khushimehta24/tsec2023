const User = require("../models/user");
const Questionnaire = require("../models/questionnaire");
const Property = require("../models/property");
const { sendEmail } = require("../utils/email");

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
    question: "Are you a student or a working professional?",
    options: ["Student", "Working Professional"],
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
        console.log(user);
        console.log(req.body);
        let questionnaire = new Questionnaire({
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

const showInterest = async (req, res) => {
    try {
        const user = req.user;
        const property = await Property.findById(req.params.id).populate("owner");
        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }
        // if (Object.values(user.verified).includes(false)) {
        //     return res.status(400).json({
        //         message: "Please verify your account before showing interest",
        //     });
        // }

        
        if (property.owner == user._id) {
            return res.status(400).json({
                message: "You cannot show interest in your own property",
            });
        }
        if (property.interestedUsers.includes(user._id)) {
            return res.status(400).json({
                message: "You have already shown interest in this property",
            });
        }
        property.interestedUsers.push(user._id);
        await property.save();
        user.interestedProperties.push(property._id);
        await user.save();

        const emailRes = await sendEmail({
            subject: `Interested Tenant on Roomble`,
            emailId: property.owner.email,
            filename: "interestedtenant",
            fileOptions: {
                name: property.owner.name,
                link: process.env.CLIENT_URL
            },
        });
        res.status(200).json({
            message: "Interest shown successfully",
            property,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};

const tenantApproval = async (req, res) => {
    try {
        const user = req.user;
        const { approved, tenantId } = req.body;
        const property = await Property.findById(req.params.id).populate("owner");

        const tenant = await User.findById(tenantId);
        console.log(property.owner._id, user._id);
        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }
        if (property.owner._id.toString() != user._id.toString()) {
            return res.status(400).json({
                message: "You are not the owner of this property",
            });
        }
        if (!property.interestedUsers.includes(req.body.tenantId)) {
            return res.status(400).json({
                message: "This user has not shown interest in this property",
            });
        }
        if (approved) {
            property.interestedUsers = property.interestedUsers.filter(
                (id) => id != tenantId
            );
            await property.save();
            property.tenants.push(tenantId);
            await property.save();
            tenant.stayedAt.push(property._id);
            await tenant.save();
            
            res.status(200).json({
                message: "Tenant approved successfully",
                property,
            });
        } else {
            property.interestedUsers = property.interestedUsers.filter(
                (id) => id != tenantId
            );
            await property.save();
            tenant.interestedProperties = tenant.interestedProperties.filter(
                (id) => id != property._id
            );
            await tenant.save();
        
            res.status(200).json({
                message: "Tenant rejected successfully",
                property,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};
module.exports = {
  getQuestions,
  submitResponses,
  showInterest,
  tenantApproval,
  
};
