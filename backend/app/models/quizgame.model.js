const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
    quiz: Joi.object().required(),
    player: Joi.object().required(),
    correctAnswer: Joi.array(),
    questionsFailed: Joi.array(),
})


