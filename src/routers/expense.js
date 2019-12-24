const express = require('express')
const Expense = require('../models/expense')
const router = new express.Router()

router.post('/addExpense', async (req, res) => {
    const expense = new Expense({
        ...req.body
    })

    try {
        await expense.save()
        res.status(201).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router