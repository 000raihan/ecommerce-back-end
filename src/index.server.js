const express = require('express');
const env = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


const app = express();

//environment variable or you can say constants
env.config();

//mongoDB connection
// mongodb+srv://000raihan:<password>@mearn-e-commerce.b73si.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@mearn-e-commerce.b73si.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(res => {
        console.log("Database connected");
    })


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', adminRoutes);




app.get('/', (req, res, next) => {
    res.status(400).json({
        message: "This is get Api"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})