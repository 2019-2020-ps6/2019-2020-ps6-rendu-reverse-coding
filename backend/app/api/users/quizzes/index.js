const { Router } = require('express')

const { Quiz } = require('../../../models')

const QuestionRouter = require('./questions')
const util = require('../../../utils/user-util')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const quizzesWithQuestions = util.associateAllQuestions();
    res.status(200).json(quizzesWithQuestions)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizWithQuestions = util.associateQuestions(req.params.quizId);
    res.status(200).json(quizWithQuestions)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:quizId/questions', QuestionRouter)

module.exports = router
