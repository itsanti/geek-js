function Basket() {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.collectBasketItems(); //Загружаем товары, которые уже добавлены (json файле)
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function(root){
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root); //Первый параметр - что, второй - куда
    //$(root).append(basketDiv);
};

Basket.prototype.add = function(product, quantity, price){
    //TODO: Передаем товар на сервер
    var basketItems = {
      "id_product": product,
        "price": price
    };

    for (var i = 1; i <= quantity; i++)
    {
        this.countGoods++;
    }

    this.amount += price;
    this.basketItems.push(basketItems);
    this.refresh();
};

Basket.prototype.remove = function(idProduct){
    //TODO: Передаем удаляемый товар на сервер
    //Сравнение id_product
    for (var index in this.basketItems) {
        if (this.basketItems[index].id_product == idProduct) {
            this.countGoods--;
            this.amount -= this.basketItems[index].price;
            this.basketItems.splice(index, 1);
            break;
        }
    }

    this.refresh();
};

Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basket_data');
    var $basketItemsTbl = $('#basket_all');

    $basketItemsTbl.find('tr:not(:first)').remove();

    for (var index in this.basketItems){
        $basketItemsTbl.append('<tr><td>' + this.basketItems[index].id_product + '</td>\
        <td>' + this.basketItems[index].price + '</td>\
        <td><a href="#" class="good_del" id="good_' + this.basketItems[index].id_product + '">del</a></td></tr>');
    }

    $basketDataDiv.empty(); //empty - удаляем все вложенные элементы //remove - полное удаление элемента
    $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
};

Basket.prototype.collectBasketItems = function () {
    var appendId = '#' + this.id + '_items';
    //var self = this;
    $.get({
        url: './basket.json',
        dataType: 'json',
        success: function (data) {
            var basketData = $('<div />', {
               id: 'basket_data'
                //text: 'Текст'
            });

            var basketItems = $('<table />', {
               id: 'basket_all',
               "class": 'table table-bordered'
            });
            basketItems.append('<tr class="bg-success"><th>id</th><th>price</th><th>del</th></tr>');

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            basketData.append('<p>Всего товаров: '+this.countGoods+'</p>');
            basketData.append('<p>Сумма: '+this.amount+'</p>');

            for (var index in data.basket){
                this.basketItems.push(data.basket[index]);
                basketItems.append('<tr><td>' + data.basket[index].id_product + '</td>\
                <td>' + data.basket[index].price + '</td>\
                <td><a href="#" class="good_del" id="good_' + data.basket[index].id_product + '">del</a></td></tr>');
            }

            basketItems.appendTo(appendId);
            basketData.appendTo(appendId);

            var self = this;
            $('#basket_all').on('click', '.good_del', function(e){
              e.preventDefault();
              self.remove($(this).attr('id').split('_')[1]);
            });
        },
        context: this
    });
};
