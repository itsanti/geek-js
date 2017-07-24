// флаги движка регулярных выражений
// i - поиск без учета регистра
// g - множественный поиск
// m - многострочный поиск

// вариант 2
var re = /java/ig;
var str = 'Популярный язык JavaScript, изучайте! А java уже знаете?';

// функции со стороны строки
// метод search игнорирует флаг g, ищите им одно вхождение
console.log(str.search(re)); // индекс вхождения или -1

// без флага g так же ищет первое вхождение и даёт доп. информацию
var matches = str.match(re); // массив совпадений или null
console.log(matches);

// функции со стороны регулярного выражения
console.log(re.lastIndex);

while (result = re.exec(str)) {
  console.log(result);
}

// чаще всего используют для валидации (минимум 1 раз совпадение найдено)
console.log(re.test(str));

// как заменить в строке. с g будет замена всех вхождений
console.log(str.replace(re, 'JAVVVA'));
console.log('----------');
console.log(str.replace(re, function(substr, offset, s){
  console.log(substr, offset, s);
  return 'JAVVVA11!!';
}));
