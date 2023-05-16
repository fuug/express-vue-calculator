const mongodb = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

const conn_str = process.env.MONGO_DB ||
    'mongodb+srv://root:toor@cluster0.jmukfk0.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true}));

app.use('/api/', router)

const start = async () => {
    try {
        await mongoose.connect(conn_str)
        app.listen(PORT, () => {
            console.clear();
            console.log(`Server listening on http://localhost:${PORT}/`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();