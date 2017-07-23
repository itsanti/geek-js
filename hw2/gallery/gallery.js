document.getElementsByTagName('button')[0].addEventListener('click', function(){

  var xhr = new XMLHttpRequest();
  xhr.open('GET', './items.json', true);
  xhr.onreadystatechange = function () {
      if(xhr.readyState !==4) return;
      if(xhr.status !== 200){
          console.log('Error', xhr.status, xhr.statusText);
      } else {
          var items = JSON.parse(xhr.responseText);
          document.getElementById('gallery').innerHTML = render(items);
      }
  };
  xhr.send();

}, false);

document.getElementsByTagName('button')[1].addEventListener('click', function(){
  document.getElementById('gallery').innerHTML = '';
}, false);

function render(items) {
  var isEven = false;
  if (items.length % 2 === 0) {
    isEven = true;
  }
  var html = '';
  for (var i = 0; i < items.length; i++) {
    if (i % 2 === 0) {
      if (i === 0) {
        html += '<div class="row">';
      } else {
        html += '</div><div class="row">';
      }
    }
    html += '<div class="col-md-6"><figure><a href="' +
    items[i].href + '" target="_blank"><img src="' + items[i].src +
    '" alt="' + items[i].alt + '" class="img-thumbnail"></a>\
    <figcaption>Fig' + (i+1) + '. - ' + items[i].alt + '</figcaption></figure></div>';
  }
  if (!isEven) {
    html += '<div class="col-md-6">&nbsp;</div>';
  }
  html += '</div>';
  return html;
}
