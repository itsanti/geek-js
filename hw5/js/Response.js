function Response(root) {
    Container.call(this, 'response');

    this.responses = [];
    this.root = root;
    this.collectResponseItems(); //Загружаем отзывы, которые уже добавлены
}

Response.prototype = Object.create(Container.prototype);
Response.prototype.constructor = Response;

Response.prototype.render = function(){
  var html = '';
  var phtml = '';
  var pclass = ' panel-default';
  var rid;

  for (var index in this.responses){
    rid = this.responses[index].id_comment;
    if (this.responses[index].draft) {
      phtml = '<a href="#" class="resp-pub text-success pull-right" id="rpid_' + rid + '">одобрить</a>';
      pclass = ' panel-warning';
    }
    html += '<div class="panel' + pclass + '">';
    html += '<div class="panel-heading">Отзыв #' + rid;
    html += '<a href="#" class="resp-del text-danger pull-right" id="rdid_' + rid + '">удалить</a>';
    html += phtml;
    html += '</div><div class="panel-body">' + this.responses[index].text + '</div></div>';
  }
  $(this.root).html(html);
};

Response.prototype.add = function(text, id_user){
    //TODO: Передаем товар на сервер
    var response = {
      "id_comment": getRandom(id_user),
      "text": text,
      "draft": true
    };

    function getRandom(id_user) {
      return Math.floor(Math.random() * id_user);
    }

    this.responses.push(response);
    this.render();
};

Response.prototype.remove = function(idResponse){
    //TODO: Передаем удаляемый отзыв на сервер
    for (var index in this.responses) {
        if (this.responses[index].id_comment == idResponse) {
            this.responses.splice(index, 1);
            break;
        }
    }
    this.render();
};

Response.prototype.publish = function(idResponse){
    //TODO: Передаем публикуемый отзыв на сервер
    $.each(this.responses, function(i, obj) {
      if (obj.id_comment == idResponse) {
        delete obj.draft;
        return;
      }
    });

    this.render();
};

Response.prototype.collectResponseItems = function () {
    $.get({
        url: './review.list.json',
        dataType: 'json',
        success: function (data) {
            for (var index in data.comments){
                this.responses.push(data.comments[index]);
            }

            var self = this;
            $(this.root).on('click', '.resp-del', function(e){
              e.preventDefault();
              self.remove($(this).attr('id').split('_')[1]);
            });
            $(this.root).on('click', '.resp-pub', function(e){
              e.preventDefault();
              self.publish($(this).attr('id').split('_')[1]);
            });
        },
        context: this
    });
};
