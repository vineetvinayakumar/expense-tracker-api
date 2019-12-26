const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/createUser', async (req, res) => {
    const user = new User({
        ...req.body
    })

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router