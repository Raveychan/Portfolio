$('.main-carousel').flickity({
    autoPlay: 5000,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: false
});

$('.about--left').fadeIn(0).animate({"left":"-600px"},800);
$('.about--right').fadeIn(0).animate({"right":"-600px"},800);

$('.about--me, .about__image--decoration').fadeIn(0).delay( 400 ).animate({ opacity: 1}, 800);




var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

    $('.bg').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;

});

moveBackground();



function myFunction() {
    var popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
}



$(document).ready(function () {
    $('.gallery__image').click(function () {
        $('.popup').show();
        $('.popup-img').filter('[data-attr="' + $(this).attr('data-attr') +'"]').show();
    });

    $('.popup-img').click(function () {
        $('.popup-img').hide();
        $(".popup").hide();
    })
});