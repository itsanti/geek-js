(function () {

// перевод интерпретатора на стандарт ES6
// делаем это только для кода внутри данной функции
//'use strict';

// синтаксическое создание объекта без классов
var tel = {
  model: 'alcatel',
  color: 'string',
  inp: function() {
    console.log(this.model);
    return true;
  }
};

var model = tel.model;

function getTel(tel, comment) {
  console.log(this, tel, comment);
}

// вызов метода в контексте объекта
// apply, если параметры в массиве
// чаще всего применяется для расширения существующего функционала
getTel.call(tel, '123-45-67', 'tel number');

// вызов метода в контексте объекта через Bind
// создаем новую функцию, которая постоянно связана с объектом
// MDN: Метод bind() создаёт новую функцию, которая при вызове устанавливает
// в качестве контекста выполнения this предоставленное значение.
// можно сделать привязку вместе с контекстом и параметрами (!)
var getBind = getTel.bind(tel, '123-45-67');
getBind('tel number'); // выведет tel, '123-45-67', 'tel number'

// через функцию конструктор (ES6 есть классы)
function User(name, age, email) {
  // задание значений по умолчанию
  name = name || 'Гость';
  
  // this будет ссылаться на новый объект, а не на window
  // когда мы вызовем функцию с оператором new
  this.name = name;
  this.age = age;
  this.email = email;

  this.getName = function() {
    return this.name;
  };

}
var user1 = new User('Sasha', 33, 'test@l.com');
console.log(user1.getName());

}());
