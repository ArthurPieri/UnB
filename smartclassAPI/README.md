## Setup

1. [Instale o MongoDB](https://docs.mongodb.com/manual/installation/)

2. Rode o Mongo seguindo o tutorial acima

3. Environment Variables:
- PORT -> Qual porta a aplicação está rodando
- SENDGRID_API_KEY -> API KEY do sendgrid para mandar emails
- MONGODB_URL -> URL de onde está rodando o banco
- JWT_SECRET -> Segredo utilizado para hashear os passwords

4. Rode o backend com o comando `npm i && npm run dev (para ambiente de desenvolvimento) npm start (para ambiente de produção  `. Isso irá atualizar os pacotes e rodar o serviço do backend


## Documentação da API

### Crud Estudante 

#### Create Student 
Tipo de request: POST 
Uri: /students
Header: none
Body: {
    name: required,
    enrollment: required ("matricula"),
    email: required,
    password: required
}
Status code: 201, 400

#### Login Student 
Tipo de request: POST
Uri: /students/login
Header: none
Body: {
    enrollment: required,
    password: required
}
Status code: 200, 400

#### Logout Student 
Tipo de request: POST
Uri: /students/logout
Header: authToken
Body: none
Status code: 200, 500

#### Logout all sessions Student 
Tipo de request: POST
Uri: /students/logoutAll
Header: authToken
Body: none
Status code: 200, 500

#### Get Student profile
Tipo de request: GET
Uri: /students/me
Header: authToken
Body: none
Status code: 200, 400

#### Edit Student 
Tipo de request: PATCH
Uri: /students/me
Header: authToken
Body: {
     name,
     email,
     password
}
Status code: 200, 400


#### Delete Student 
Tipo de request: DELETE
Uri: /students/me
Header: authToken
Body: none
Status code: 204, 400

### Student profile pic

#### Upload SP 
Tipo de request: POST
Uri: /students/me/profilePic
Header: authToken
Body: {
    buffer: ("image")
}
Status code:

#### Delete SP
Tipo de request: DELETE
Uri: /students/me/profilePic
Header: authToken
Body: none
Status code: 204, 500

#### Get SP
Tipo de request: GET
Uri: /students/:id/profilePic
Header: none
Body: none
Status code: 200, 404

### Student Subjects

#### Add new subject to Student 
Tipo de request: POST
Uri: /students/me/subject/:id
Obs: :id from the subject
Header: authToken
Body: {
    _id: required
}
Status code: 204, 400, 500

#### Get all Student's subjects
Tipo de request: GET
Uri: /students/me/subjects
Header: authToken
Body: none
Status code: 200, 500

#### Post Subject attendance 
Tipo de request: POST
Uri: /students/me/subjects/:id
Obs: id from the subject
Header: authToken
Body: {
    code: required,
    lat: required (latitude)
    lng: required (longitude)
}
Status code: 200, 401, 500

#### Read student class skips (Qntd de faltas)
Tipo de request: GET 
Uri: /students/me/subjects/:id/attendance
Header: authToken
Body: none
Status code: 200, 400, 404, 500

### CRUD Subjects

#### Create Subject
Tipo de request: POST
Uri: /subjects/
Header: authToken (professor)
Body: {
    name: required,
    registrationCode: required, 
    class: required,
    address: [
        address: String,
        latitude: String,
        longitude: String
    ],
    professors: [
        professor: _id
    ],
    semester: required,
    enrollmentKey: String 
}
Status code: 201, 400

#### Read all Subjects  
Tipo de request: GET
Uri: /subjects/all 
Header: authToken (Prof and student)
Body: none
Status code: 200, 500

#### Read one Subject  
Tipo de request: GET 
Uri: /subjects/:id
Obs: Id from the subject
Header: authToken (Prof and student)
Body: none
Status code: 200, 500

#### Update one Subject  
Tipo de request: PATCH
Uri: /subjects/:id
Header: authToken (Professor)
Body: {
    address: [
        address: String,
        latitude: String,
        longitude: String
    ],
    professors: [
        professor: _id
    ],
    enrollmentKey: String 
}
Status code: 200, 400, 404

#### Get Subject code  
Tipo de request: GET 
Uri: /subjects/:id/code
Header: authToken (Professor)
Body: none
Status code: 200, 400, 500

#### Add new Professor to subject  
Tipo de request: POST 
Uri: /subjects/:id/professor
Header: authToken (Professor)
Body: {
    professor: _id
}
Status code: 200, 400, 404, 500

### Crud Professor 

#### Create professor 
Tipo de request: POST 
Uri: /professor
Header: none
Body: {
    name: required,
    enrollment: required ("matricula"),
    email: required,
    password: required,
    registrationCode: required
}
Status code: 201, 400

#### Login professor 
Tipo de request: POST
Uri: /professor/login
Header: none
Body: {
    enrollment: required,
    password: required
}
Status code: 200, 400

#### Logout professor 
Tipo de request: POST
Uri: /professor/logout
Header: authToken
Body: none
Status code: 200, 500

#### Logout all sessions professor 
Tipo de request: POST
Uri: /professor/logoutAll
Header: authToken
Body: none
Status code: 200, 500

#### Get professor profile
Tipo de request: GET
Uri: /professor/me
Header: authToken
Body: none
Status code: 200, 400

#### Edit professor 
Tipo de request: PATCH
Uri: /professor/me
Header: authToken
Body: {
     name,
     email,
     password
}
Status code: 200, 400

### Professor profile pic

#### Upload PP 
Tipo de request: POST
Uri: /professor/me/profilePic
Header: authToken
Body: {
    buffer: ("image")
}
Status code:

#### Delete PP
Tipo de request: DELETE
Uri: /professor/me/profilePic
Header: authToken
Body: none
Status code: 204, 500

#### Get PP
Tipo de request: GET
Uri: /professor/:id/profilePic
Header: none
Body: none
Status code: 200, 404

### Professor Subjects

#### Get all Professor's subjects
Tipo de request: GET
Uri: /professor/me/subjects
Header: authToken
Body: none
Status code: 200, 500
