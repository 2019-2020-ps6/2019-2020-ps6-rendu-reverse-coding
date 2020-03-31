const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Player', {
  name: Joi.string().required(),
  surname: Joi.string().required(),
  age: Joi.number().required(),
  nbAnswer: Joi.number(),
  correctAnswer: Joi.number(),
  userId: Joi.number(),
})
