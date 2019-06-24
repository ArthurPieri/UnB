export const getFromStorage = item => {
  let x = JSON.parse(window.localStorage.getItem(item));
  console.log("student from lstorage", x);
  return x;
};
export const setOnStorage = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};
