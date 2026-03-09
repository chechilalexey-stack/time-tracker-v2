export default function getInitials(name: string | null) {
  if (!name) return "";
  const inicials = name
    .split(/[,\s]+/) // Разделить по запятой ИЛИ пробелу (одному или нескольким)
    .filter(Boolean) // Удалить пустые элементы (если запятая и пробел стоят рядом)
    .map((word) => word[0]) // Берем первую букву каждого слова
    .join("")
    .toUpperCase();
  return inicials;
}
