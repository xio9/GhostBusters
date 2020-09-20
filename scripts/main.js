document.addEventListener('DOMContentLoaded', () => {
    var mySwiper = new Swiper('.actors-slider', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
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
});