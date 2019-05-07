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

// Clean and populate database
beforeEach(setupDatabase)

// Create new student
test('Should signup a new student', async () => {
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

// Login Student
test('Should login existing student', async () => {
    const response = await request(app).post('/students/login').send({
        enrollment: studentOne.enrollment,
        password: studentOne.password
    }).expect(200)

    const student = await Student.findById(studentOneID)
    expect(response.body.token).toBe(student.tokens[1].token)
})

// Not login Student
test('Should not login non existin user', async () => {
    await request(app).post('/students/login').send({
        enrollment: '12/1231234',
        password: 'blablabla123'
    }).expect(400)
})

// Get student profile
test('Should get profile for user', async () => {
    await request(app)
        .get('/students/me')
        .set('Authorization', `Bearer ${studentOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// Reject student profile for unauthenticated user
test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/students/me')
        .send()
        .expect(401)
})

// Edit student
test('Should update valid student fields', async () => {
    await request(app)
        .patch('/students/me')
        .set('Authorization', `Bearer ${studentOne.tokens[0].token}`)
        .send({ name: 'Jose M' })
        .expect(200)

    const student = await Student.findById(studentOneID)
    expect(student.name).toBe('Jose M')
})

// Not Edit student
test('Should not update invalid user Fields', async () => {
    await request(app)
        .patch('/students/me')
        .set('Authorization', `Bearer ${studentOne.tokens[0].token}`)
        .send({ enrollment: 'Jose M' })
        .expect(400)
})

// Delete student
test('Should delete account for student', async () => {
    await request(app)
        .delete('/students/me')
        .set('Authorization', `Bearer ${studentOne.tokens[0].token}`)
        .send()
        .expect(200)

        const student = await Student.findById(studentOneID)
        expect(student).toBeNull()
})

// Not delete student
test ('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/students/me')
        .send()
        .expect(401)
})

// Upload Profile pic
test('Should upload profile pic', async () => {
    await request(app)
        .post('/students/me/profilePic')
        .set('Authorization', `Bearer ${studentOne.tokens[0].token}`)
        .attach('profilePic', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const student = await Student.findById(studentOneID)
    expect(student.profilePic).toEqual(expect.any(Buffer))
})

