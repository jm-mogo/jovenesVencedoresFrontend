export default function dateParser(date: string) {
  let dateString = "";

  const dateD = new Date(date);

  dateString += dateD.getDate() + 1 + "/";
  dateString += dateD.getMonth() + 1 + "/";
  dateString += dateD.getFullYear();
  return dateString;
}
