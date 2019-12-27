const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const app = express()

/* Create new User API Start */
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
/* Create new User API End */

/* Read all User API Start */
router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})
/* Read all User API End */

module.exports = router