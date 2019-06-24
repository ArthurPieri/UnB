import { api, requireAuth } from "../";

const baseURL = "/subjects";

// New subject
export const newSubject = subject => {
  requireAuth();
  return api.post(baseURL, subject);
};

// List subject
export const getSubjects = () => {
  requireAuth();
  return api.get(`${baseURL}/all`);
};

// Update Subject
export const updateSubject = subject => api.patch(`${baseURL}/${subject.id}`, subject);

// delete subject
export const deleteSubject = id => api.delete(`${baseURL}/${id}`);
