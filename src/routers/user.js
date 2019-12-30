const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

/* Create new User API Start */
router.post('/createUser', async (req, res) => {
    const user = new User({
        ...req.body
    })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})
/* Create new User API End */

/* Login in User API Start */

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send('Wrong Credentials')
    }
})

/* Login in  User API End */

/* Read all User API Start */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
/* Read all User API End */

/* Update User API Start */

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/* Update all User API End */

module.exports = router