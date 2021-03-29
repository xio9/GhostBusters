document.addEventListener('DOMContentLoaded', () => {
    let mySwiper = new Swiper('.actors-slider', {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
      });

      let mySwiper1 = new Swiper('.photos-slider', {
        loop: true,
        autoplay: {
          delay: 2500,
        },
        slidesPerView: 1,
      });

      let mySwiper2 = new Swiper('.photos-slider1', {
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplay: {
          delay: 2500,
        },
        slidesPerView: 1,
      });

      let mySwiper3 = new Swiper('.vr-slider', {
        loop: false,
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          shadow: false,
        },
        autoplay: {
          delay: 2500,
        },
        slidesPerView: 1,
      });

      let click = document.getElementById('button');
      button.addEventListener('click', function(){
        Swal.fire(
          'Ooops',
          'Регистрация на данный момент не доступна',
          'error'
        );
      });

      let click1 = document.getElementById('button1');
      button1.addEventListener('click', function(){
        Swal.fire(
          'Ooops',
          'Авторизация на данный момент не доступна',
          'error'
        );
      });

      let progress = document.getElementById('progressBar');
      let totalHeight = document.body.scrollHeight - window.innerHeight;
      window.onscroll = function(){
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        progress.style.height = progressHeight + "%";
      }


      // slider
      // new Splide( '.splide' ).mount();

      //Ymap start
    var spinner = $('.ymap-container').children('.loader');
    var check_if_load = 0;
    var myMapTemp, myPlacemarkTemp;

    function init () {
      var myMapTemp = new ymaps.Map("map-yandex", {
        center: [55.672537, 37.276083],
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl']
      });

      var myPlacemarkTemp = new ymaps.Placemark([55.672537, 37.276083], {
          balloonContent: "Кинотеатр находится здесь",
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'img/location.png',
          // Размеры метки.
          iconImageSize: [24, 32],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-15, -15],
      });
      
      myMapTemp.geoObjects.add(myPlacemarkTemp);

      //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
      var layer = myMapTemp.layers.get(0).get(0);

      //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
      waitForTilesLoad(layer).then(function() {
        //Скрываем
        spinner.removeClass('is-active');
      });
    }

    function waitForTilesLoad(layer) {
      return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
          if (!tile.isReady()) {
            readyAll = false;
          }
        });
        if (readyAll) {
          resolve();
        } else {
          tc.events.once("ready", function() {
            resolve();
          });
        }
      });
    }

    function getTileContainer(layer) {
      for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
          if (
            layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
            || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
          ) {
            return layer[k];
          }
        }
      }
      return null;
    }

    function loadScript(url, callback){

      var script = document.createElement("script");

      if (script.readyState){  //IE
        script.onreadystatechange = function(){
          if (script.readyState == "loaded" ||
                  script.readyState == "complete"){
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  //Другие браузеры
        script.onload = function(){
          callback();
        };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    var ymap = function() {
      $('.ymap-container').mouseenter(function(){
          if (check_if_load == 0) {
            check_if_load = 1;

            spinner.addClass('is-active');

            loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                ymaps.load(init);
            });          
          }
        }
      );  
    }

    $(function() {

      //Map Yandex
      ymap();
    });

});