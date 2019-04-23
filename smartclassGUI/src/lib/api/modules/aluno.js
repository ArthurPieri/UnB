import { api } from "../";

// Login student
export const loginAluno = (matricula, password) => api.post("/alunos/login", { matricula, password });

// New student
export const newAluno = aluno => api.post("/alunos", aluno);

// List student
export const getAlunos = query => api.get(`/alunos/${query}`);

// Update Student
export const updateAluno = aluno => api.patch(`/alunos/${aluno.id}`, aluno);

// delete student
export const deleteAluno = id => api.delete(`/alunos/${id}`);
