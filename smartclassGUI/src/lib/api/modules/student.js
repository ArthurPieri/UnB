import { api, requireAuth } from "../";

const baseURL = "/students";

// Login student
export const loginStudent = (enrollment, password) => api.post(`${baseURL}/login`, { enrollment, password });

// Logout student
export const logoutStudent = async () => {
  await requireAuth();
  return api.post(`${baseURL}/logout`);
};

// Enroll Student on a specific subject
export const enrollStudent = id => {
  requireAuth();
  return api.post(`${baseURL}/me/subject/${id}`);
};

// Get Student's enrolled subjects
export const getStudentSubjects = () => {
  requireAuth();
  return api.get(`${baseURL}/me/subjects`);
};

export const registerAttendance = (id, code) => {
  requireAuth();
  return api.post(`${baseURL}/me/subjects/${id}`, { code });
};

// New student
export const newStudent = student => api.post(baseURL, student);

// List student
export const getStudent = () => api.get(`${baseURL}/me`);

// Update Student
export const updateStudent = student => api.patch(`${baseURL}/${student.id}`, student);

// delete student
export const deleteStudent = id => api.delete(`${baseURL}/${id}`);
