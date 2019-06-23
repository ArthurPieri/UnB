## Setup

1. [Instale o MongoDB](https://docs.mongodb.com/manual/installation/)

2. Rode o Mongo seguindo o tutorial acima

3. Rode o backend com o comando `npm i && npm run dev (para ambiente de desenvolvimento) npm start (para ambiente de produção  `. Isso irá atualizar os pacotes e rodar o serviço do backend

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

#### Logout all Student 
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

### Student profile

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
