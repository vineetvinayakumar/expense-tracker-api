const express = require('express')
const userRouter = require('./routers/user')
const expenseRouter = require('./routers/expense')
const dotenv = require('dotenv');
dotenv.config({
    path: 'config/dev.env'
});
require('./db/mongoose')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// }) 

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down')
// })

app.use(express.json())
app.use(userRouter)
app.use(expenseRouter)

module.exports = app