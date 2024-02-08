let SwiperTop = new Swiper('.swiper--top', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
        delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
});

let SwiperBottom = new Swiper('.swiper--bottom', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
        delay: 1,
        reverseDirection: true
    },
    loop: true,
    loopedSlides: 4,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
});

