// Requiring the test packages
const request = require('supertest')
const app = require('../src/app')
const Student = require('../src/models/student')
const {
    studentOne,
    studentOneID,
    studentTwo,
    studentTwoID,
    studentThree,
    studentThreeID,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/students').send({
        name: 'Arthur',
        email: 'arthur@arthurpieri.com',
        password: 'MyPass123',
        enrollment: '14/0131043'
    }).expect(201)

    const student = await Student.findById(response.body.student._id)
    expect(student).not.toBeNull()

    expect(response.body).toMatchObject({
        student: {
            name: 'Arthur',
            email: 'arthur@arthurpieri.com'
        },
        token: student.tokens[0].token
    })

    expect(student.password).not.toBe('MyPas123')
})