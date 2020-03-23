const { Router } = require('express')

const { User } = require('../../models')
const PlayerRouter = require('./players')

const util = require('../../utils/user-util')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const usersWithPlayers = util.associateAllPlayers()
    res.status(200).json({"users" : usersWithPlayers })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    const userWithPlayers = util.associatePlayers(req.params.userId)
    res.status(200).json(userWithPlayers)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    res.status(200).json(User.delete(req.params.userId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:userId/players', PlayerRouter)

module.exports = router
