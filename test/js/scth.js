let classifier;
let video;

function setup() {
  noCanvas();
  // Создание видеозахвата
  video = createCapture(VIDEO);
  // Инициализация классификатора изображений и видеопотока
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Статус готовности для модели
  select('#status').html('Модель загружена');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

  // Получаем прогноз для текущего видеокадра
function classifyVideo() {
  classifier.predict(gotResult);
}

  // Когда мы получим результат
function gotResult(err, results) {
  // Результаты находятся в массиве, упорядоченном по вероятности.
 // select('#result').html(results[0].className);
 var word = results[0].className;
  console.log(word);


  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
 

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  var req = new XMLHttpRequest();

  // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
  // (с примером ниже работать не будет, нужно получить и вставить свой!)
  var API_KEY = 'trnsl.1.1.20190127T114618Z.cebd9d06678b4c1d.d3649c85126037ab3136f13d27817905de6b3b9d';

  // Сохраняем адрес API
  var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

  // Формируем полный адрес запроса:
  url += '?key=' + API_KEY; // добавляем к запросу ключ API
  url += '&text='+ word; // текст для перевода
  url += '&lang=en-ru'; // направление перевода: с русского на английский

  // Таким образом формируется строка вида:
  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en
  
  var translate = document.querySelector('.translate');

  // Назначаем обработчик события load
  req.addEventListener('load', function () {
    console.log(req.response); // отображаем в консоли текст ответа сервера
    var response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или что-то другое
    if (response.code !== 200) {
      translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    // Проверяем, найден ли перевод для данного слова
    if (response.text.length === 0) {
      translate.innerHTML = 'К сожалению, перевод для данного слова не найден';
      return;
    }

    // Если все в порядке, то отображаем перевод на странице
    translate.innerHTML = response.text.join('<br>'); // вставляем его на страницу
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  req.open('get', url);
  req.send();

}

window.onload = function() {

}
