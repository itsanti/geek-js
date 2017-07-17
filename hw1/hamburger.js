/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
* @throws {HamburgerException}  При неправильном использовании
*/
function Hamburger(size, stuffing) {
  if (!Array.isArray(size) || !Array.isArray(stuffing)) {
    throw new HamburgerException('Неверные параметры', Hamburger.arguments);
  }
  this.toppings = [];
  this.size = size;
  this.stuffing = stuffing;
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = [50, 20];
Hamburger.SIZE_LARGE = [100, 40];
Hamburger.STUFFING_CHEESE = [10, 20];
Hamburger.STUFFING_SALAD = [20, 5];
Hamburger.STUFFING_POTATO = [15, 10];
Hamburger.TOPPING_MAYO = [15, 0];
Hamburger.TOPPING_SPICE = [20, 5];

/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
*
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании
*/
Hamburger.prototype.addTopping = function (topping) {
  if(!this.toppings.includes(topping)) {
    this.toppings.push(topping);
  } else {
    throw new HamburgerException('Такая добавка уже есть!', topping);
  }
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  if(this.toppings.includes(topping)) {
    var index = this.toppings.indexOf(topping);
    this.toppings.splice(index, 1);
  } else {
    throw new HamburgerException('Не удалось убрать добавку!', topping);
  }
};
/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
  return this.toppings;
};
/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  return this.size;
};
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
};
/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
  var price = 0;
  var size = this.getSize();
  var stuffing = this.getStuffing();
  var toppings = this.getToppings();

  price += size[0] + stuffing[0];

  if (toppings.length > 0) {
      for (var i = 0; i < toppings.length; i++) {
        price += toppings[i][0];
      }
  }

  return price;
};
/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
  var calories = 0;
  var size = this.getSize();
  var stuffing = this.getStuffing();
  var toppings = this.getToppings();

  calories += size[1] + stuffing[1];

  if (toppings.length > 0) {
      for (var i = 0; i < toppings.length; i++) {
        calories += toppings[i][1];
      }
  }

  return calories;
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (msg, data) {
  this.message = msg;
  this.data = data;
  this.name = 'HamburgerException';
}
