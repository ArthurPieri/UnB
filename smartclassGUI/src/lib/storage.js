export const getFromStorage = item => {
  let x = JSON.parse(window.localStorage.getItem(item));
  return x;
};
export const setOnStorage = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};
