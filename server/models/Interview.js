const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { _id: false }
)

const interviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        experience:{
            type:Number,
            required:true,
        },
        difficulty:{
            type:String,
            required:true,
        },
        interviewType: {
            type: String,
            required: true,
        },
        numberOfQuestions: {
            type: Number,
            required: true,
        },
        questions: {
            type: [questionSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Interview",
    interviewSchema
)