export const getSecondsFromDay = () => {
  const d = new Date();
  return d.getUTCHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};
export const getTimeFromSeconds = seconds => {
  const h = (seconds / 3600).toFixed(0);
  const m = ((seconds % 3600) / 60).toFixed(0);
  return `${h > 9 ? "" + h : "0" + h}:${m > 9 ? "" + m : "0" + m}`;
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
