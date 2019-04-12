// Requiring mongoose
const mongoose = require('mongoose')

// Starting mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/smartclass', {
    useNewUrlParser: true,
    useCreateIndex: true,
// Only to avoid an alert: useFindAndModify is deprecated
    useFindAndModify: false
})