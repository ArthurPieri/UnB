export const getFromStorage = item => JSON.parse(window.localStorage.getItem(item));
export const setOnStorage = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};
