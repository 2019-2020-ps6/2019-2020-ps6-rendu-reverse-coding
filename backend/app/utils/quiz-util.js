const { Quiz, Question, Answer } = require('../models')

function associateAllQuestions() {
  const quizzes = Quiz.get();
  const questions = Question.get();
  const quizzesWithQuestions = quizzes.map((quiz) => {
    return {...quiz, questions: questions.filter((question) =>
        question.quizId === quiz.id
      )}
  });

  quizzesWithQuestions.forEach((quiz) => {
    quiz.questions = quiz.questions.map((question) => {
      return associateAnswers(question.id)
    })
  })

  return quizzesWithQuestions;
}

function associateQuestions(quizId) {
  const quiz = Quiz.getById(quizId)
  const questions = Question.get();
  const quizWithQuestions =  {...quiz, questions: questions.filter((question) =>
        question.quizId === quiz.id
    )};

  quizWithQuestions.questions = quizWithQuestions.questions.map((question) => {
    return associateAnswers(question.id)
  })

  return quizWithQuestions;
}

function associateAllAnswers() {
  const questions = Question.get();
  const answers = Answer.get();
  const questionsWithAnswers = questions.map((question) => {
    return {...question, answers: answers.filter((answer) =>
        answer.questionId === question.id
      )}
  });
  return questionsWithAnswers;
}

function associateAnswers(questionId) {
  const question = Question.getById(questionId)
  const answers = Answer.get()
  return {...question, answers : answers.filter((answer) =>
      answer.questionId === question.id
    )};
}

module.exports = {
  associateAllQuestions,
  associateQuestions,
  associateAllAnswers,
  associateAnswers,
}
