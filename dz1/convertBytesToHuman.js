/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Округление, максимум,
 * до 2 знаков после запятой, исключая нули.
 *  Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * `convertBytesToHuman(1610612736) === '1.5 GB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа).
 * В случае передачи неподходящего аргумента,
 * функция должна вернуть false.
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof(bytes) !== "number" || bytes < 0 || isNaN(bytes) || isFinite(bytes) === false) {
    return false;
  };

  if (bytes === 0) {
    return '0 B';
  };

  const k = 1024;
  
  const ext = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(k),
  );

  const rB = +(bytes / Math.pow(k, index)).toFixed(2);

  return `${rB} ${ext[index]}`;

};

