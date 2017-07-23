// тестовый сервер https://jsonplaceholder.typicode.com/

// синхронный запрос
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', false);
xhr.send();

if (xhr.status !== 200) {
  console.log('Error: ', xhr.status, xhr.statusText);
} else {
  console.log('Ok', xhr.responseText);
  var obj = JSON.parse( xhr.responseText);
  console.log(obj);
}

// асинхронный запрос
// выполняется в отдельном потоке
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
xhr2.onreadystatechange = function() {
  // 0 - запрос не инициализирован
  // 1 - загрузка данных
  // 2 - запрос принят
  // 3 - обмен данными
  // 4 - запрос выполнен
  if (xhr2.readyState != 4) return;

  if (xhr2.status !== 200) {
    console.log('Error: ', xhr2.status, xhr2.statusText);
  } else {
    var obj = JSON.parse( xhr2.responseText);
    console.log(obj);
  }
};
xhr2.send();
