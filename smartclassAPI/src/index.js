// Requiring the app
const app = require('./app')
// This is letting express know that if ther is a PORT variable he will use that, if not, he will use 3001 as the default
const port = process.env.PORT

// Starting the app
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})