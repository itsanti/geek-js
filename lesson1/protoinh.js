function UserBase(name, age) {
  this.name = name;
  this.age = age;
  //this.__proto__.constructor = User;
}

UserBase.prototype.getInfo = function() {
  console.log(this.name, this.age);
};

function User(name, age, email) {
  // с оператором new будет создан новый объект и привязан к this
  // у него будет скрытое свойство this.__proto__ -> User.prototype
  // соответственно все объекты, созданные через наш конструктор User
  // смогут ссылаться на один User.prototype

  // вызываем конструктор родителя в контексте нашего дочернего объекта
  UserBase.call(this, name, age);
  // расширяем функционал
  this.email = email;
}

// прототип родителя не копируется (!) нужно сделать это явно
// в свойство любого объекта User.__proto__ будет новый объект, а не прототип
// из базового по умолчанию. Object.create создаст новый объект, прототипом которого
// будет являтся объект, переданный как параметр. Подстановка нужного нам
// объекта-прототипа в цепочку наследования.
User.prototype = Object.create(UserBase.prototype);
// не забываем дописать свойство-конструктор
// т.к. в объекте UserBase этого нет (там новый объект)
// хорошая практика
User.prototype.constructor = User;

// поиск функции getName будет происходить по цепочке
// сам объект - прототип в скрытом свойстве __proto__
User.prototype.getName = function() {
  return this.name;
};
