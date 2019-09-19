// This File is used only for the tests
// Requiring packages
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Student = require('../../src/models/student')

// Variable declarations, with explicit declaration for the users ID
const studentOneID = new mongoose.Types.ObjectId()
const studentOne = {
    _id: studentOneID,
    name: 'Jose Maria',
    email: 'jose@jose.com',
    password: '123jose123',
    enrollment: '10/0131043',
    tokens:[{
        token: jwt.sign({ _id: studentOneID }, process.env.JWT_SECRET )
    }]
}

const studentTwoID = new mongoose.Types.ObjectId()
const studentTwo = {
    _id: studentTwoID,
    name: 'Maria Jose',
    email: 'maria@jose.com',
    password: '123maria123',
    enrollment: '11/0131043',
    tokens: [{
        token: jwt.sign({ _id: studentTwoID }, process.env.JWT_SECRET )
    }]
}

const studentThreeID = new mongoose.Types.ObjectId()
const studentThree = {
    _id: studentThreeID,
    name: 'Marlon Brandon',
    email: 'marlon@jose.com',
    password: '123marlon123',
    enrollment: '12/0131043',
    tokens: [{
        token: jwt.sign({ _id: studentThreeID }, process.env.JWT_SECRET )
    }]
}

// Setting up the function to populate the database
const setupDatabase = async () => {
    await Student.deleteMany()
    await new Student(studentOne).save()
    await new Student(studentTwo).save()
    await new Student(studentThree).save()
}

module.exports = {
    studentOne,
    studentOneID,
    studentTwo,
    studentTwoID,
    studentThree,
    studentThreeID,
    setupDatabase
}