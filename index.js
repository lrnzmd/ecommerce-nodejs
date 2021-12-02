const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/product')

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("mongo connect"))
    .catch((err) => {
        console.log(err)
    })

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/auth', authRouter)

app.use('/api/products', productsRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening on port 5000!`)
})