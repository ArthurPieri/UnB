// Setting up express and mongoose
const express = require('express')
require('./db/mongoose')

// Setting up the Routers
const alunosRouter = require('./routers/alunosRouters')
const ProfessorRouter = require('./routers/professorRouter')
const MateriaRouter = require('./routers/materiaRouter')

// Setting up express
const app = express()
// This is letting express know that if ther is a PORT variable he will use that, if not, he will use 3000 as the default
const port = process.env.PORT || 3001

// Starting to use the routers
app.use(express.json())
app.use(alunosRouter)
app.use(ProfessorRouter)
app.use(MateriaRouter)

// Starting the app
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//Cookie MW
//response=03AOLTBLQ4Kk1fVAzsNeBgV58Q-869NI81cXkw4zpRiO19GkhjqHcl5ScVUYEPuosvGsbMhbR9MsB0hpL_g2p6XSNoLjRrX93sszFieg03HuKqk_VijYgveabymhjHHx0uItoCDO1LMHDgnzJ10bse5ok8L4NrUXnWlxeaVCxU2natqx-a4rqHsLq0-A8oJp9FCA6T3-pLvhEdvBUEY5RmQaOPpwfhtAcakGNAijJZcvc2-UBfcZAPH0I_6PNiYqNsJheC--07pf7xnGjSNXpt-y2saW_ci-wQy7qxL044cyL3Z9FL6u-VtZr9lniNLyig80ywoudscGQU
