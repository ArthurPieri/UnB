import { api } from "../";

const baseURL = "/professor";

// Login professor
export const loginProfessor = (enrollment, password) => api.post(`${baseURL}/login`, { enrollment, password });

// Logout professor
// export const logoutProfessor = () => {
//   requireAuth();
//   return api.post(`${baseURL}/logout`);
// };

// New professor
export const newProfessor = professor => api.post(baseURL, professor);

// List professor
export const getProfessors = query => api.get(`${baseURL}/${query}`);

// Update Professor
export const updateProfessor = professor => api.patch(`${baseURL}/${professor.id}`, professor);

// delete professor
export const deleteProfessor = id => api.delete(`${baseURL}/${id}`);
