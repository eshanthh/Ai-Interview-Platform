let express = require('express')
let router = express.Router()
let auth = require('../authCheck/auth')
let Interview = require('../models/Interview')
router.post('/interview', auth, async (req, res) => {

    let { experience, role, difficulty, interviewType, numberOfQuestions, questions } = req.body
    try {
        if (experience === undefined || !role || !difficulty || !interviewType || !numberOfQuestions || !questions) {
            return res.status(400).json({ message: "Fill all the details" })
        }
        const interview = await Interview.create({
            userId: req.user.userId,
            experience, role, difficulty, interviewType, numberOfQuestions, questions
        })
        return res.status(201).json({
            message: "Interview created successfully",
            interview,
        })
    }
    catch (err) {
        console.error("Interview creation error:", err)
        return res.status(500).json({ message: "Failed to create interview" })
    }
})

module.exports = router