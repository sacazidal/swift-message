export function generateConfirmationEmail() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // получаем случайный номер из 6-значного диапазона
}
