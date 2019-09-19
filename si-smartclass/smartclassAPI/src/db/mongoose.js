// Requiring mongoose
const mongoose = require('mongoose')

// Starting mongoDB
// url mongodb://127.0.0.1:27017/smartclass
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
// Only to avoid an alert: useFindAndModify is deprecated
    useFindAndModify: false
})