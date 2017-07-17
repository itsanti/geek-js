function UserBase(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function() {
    return this.name;
  };
}

function User(name, age, email) {
  // вызываем конструктор родителя в контексте нашего дочернего объекта
  UserBase.call(this, name, age);
  // расширяем функционал
  this.email = email;
}
