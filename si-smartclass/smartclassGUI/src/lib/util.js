export const getSecondsFromDay = () => {
  const d = new Date();
  const x = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  return x;
};
export const getTimeFromSeconds = seconds => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h > 9 ? "" + h : "0" + h}:${m > 9 ? "" + m : "0" + m}`;
};

export const getFormattedDate = time => {
  const d = new Date(time);
  return daysOfWeek[d.getDay()] + ": " + d.toLocaleDateString();
};

export const daysOfWeek = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado"
];
