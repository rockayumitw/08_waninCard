$(document).ready(function () {

    animationLayout(0)
    companyName()
    var time = 5;
    var $bar,
        $slick,
        isPause,
        tick,
        percentTime;

    $slick = $('.slider');

    $slick.slick({
        draggable: true,
        infinite: true,
        arrows: false,
        adaptiveHeight: false,
        dots: false,
        mobileFirst: false,
        pauseOnDotsHover: false,
        previous: false,
        next: false,
        fade: true,
        cssEase: 'linear',
    });

    $bar = $('.progress');
    //beforeChange  event, slick, currentSlide, nextSlide
    $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if (slick.$slides[currentSlide]) {
            $(slick.$slides[currentSlide]).children().removeClass('active')
            animationInit()
        }
    });

    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        if (slick.$slides[currentSlide]) {
            $(slick.$slides[currentSlide]).children().addClass('active')
            animationLayout(currentSlide)
        }
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }

    //bar控制
    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);

            $bar.css({
                width: '100%',
                height: percentTime + "%"
            });

            if (percentTime >= 100) {
                $slick.slick('slickNext');
                startProgressbar();
            }
        }
    }

    //時間軸
    function resetProgressbar() {
        $bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }
    startProgressbar();
});

function animationInit() {
    $('.year,.star').removeClass('jackInTheBox animated')
    $('.flower').removeClass('fadeIn animated')
    $('.star').removeClass('active')
    $('.mouse,.title,.firework').removeClass('bounceIn animated')
    $('.animation-layer-02 .slogan').removeClass('jackInTheBox animated')
    $('.animation-layer-03 .slogan').removeClass('jackInTheBox animated')
    $('.fan').removeClass('fanAnimation-open')
}

function companyName() {
    setTimeout(function () {
        $('.name-01').attr('class', 'name name-01 cover fadeIn animated')
        $('.name-02').attr('class', 'name name-02 normal')
        $('.name-03').attr('class', 'name name-03 normal')
        $('.name-04').attr('class', 'name name-04 normal')
    }, 1000)
    setTimeout(function () {
        $('.name-02').attr('class', 'name name-02 cover fadeIn animated')
        $('.name-03').attr('class', 'name name-03 normal')
        $('.name-04').attr('class', 'name name-04 normal')
        $('.name-01').attr('class', 'name name-01 normal')
    }, 2000)
    setTimeout(function () {
        $('.name-03').attr('class', 'name name-03 cover fadeIn animated')
        $('.name-02').attr('class', 'name name-02 normal')
        $('.name-04').attr('class', 'name name-04 normal')
        $('.name-01').attr('class', 'name name-01 normal')
    }, 3000)
    setTimeout(function () {
        $('.name-04').attr('class', 'name name-04 cover fadeIn animated')
        $('.name-02').attr('class', 'name name-02 normal')
        $('.name-03').attr('class', 'name name-03 normal')
        $('.name-01').attr('class', 'name name-01 normal')
    }, 4000)
    setTimeout(function () {
        companyName();
    }, 5000)
}

function animationLayout(layer) {
    switch (layer) {
        case 0:
            gsap.to(".animation-layer-01", 1, {
                duration: 0,
                opacity: 1,
                stagger: 0.5,
                onStart: splitWord(0),
            });
            break;
        case 1:
            gsap.to(".animation-layer-02", 1, {
                duration: 0,
                opacity: 1,
                stagger: 0.5,
                onStart: splitWord(1),
            });
            break;
        case 2:
            gsap.to(".animation-layer-03", 1, {
                duration: 0,
                opacity: 1,
                stagger: 0.5,
                onStart: splitWord(2),
                onComplete: fanAnimationOpen
            });
            break;
    }
}

function splitWord(layer) {
    switch (layer) {
        case 0:
            $('.slide .animation-layer-01 .year,.animation-layer-01  .star').addClass('jackInTheBox animated')
            $('.slide .animation-layer-01 .flower').addClass('fadeIn animated')
            setTimeout(function () {
                $('.animation-layer-01 .star').addClass('active')
            }, 500)
            gsap.to(".animation-layer-01", 3, {
                duration: 0,
                opacity: 0,
                delay: 4,
                ease: "back.out(1.5)",
            });
            break;
        case 1:
            $('.slide .animation-layer-02 .mouse,.slide .animation-layer-02 .title,.firework').addClass('bounceIn animated')
            $('.slide .animation-layer-02 .slogan').addClass('jackInTheBox animated')
            gsap.to(".animation-layer-02", 3, {
                duration: 0,
                opacity: 0,
                delay: 4,
                ease: "back.out(1.5)",
            });
            break;
        case 2:
            $('.slide  .animation-layer-03 .slogan').addClass('jackInTheBox animated')
            gsap.to(".animation-layer-03", 3, {
                duration: 0,
                opacity: 0,
                delay: 4,
                ease: "back.out(1.5)",
            });
            break;
    }
}

//fanAnimationOpen
function fanAnimationOpen() {
    gsap.to(".fan", 1, {
        className: "+=fan fanAnimation-open",
        onComplete: fanAnimationClose
    });
}

function fanAnimationClose() {
    gsap.to(".fan", 1, {
        className: "+=fan fanAnimation-close",
        onComplete: fanAnimationOpen
    });
}
