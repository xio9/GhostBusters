document.addEventListener('DOMContentLoaded', () => {
    var mySwiper = new Swiper('.actors-slider', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
      });
});