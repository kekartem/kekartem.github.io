$('.field').css({
    "width": window.innerWidth * 0.4,
    "height": window.innerWidth * 0.4 / 2,
});

let size = window.innerWidth * 0.4 / 4 - 2;
let amount = 0;

$('.amount').html(8 - amount);


$('.thanos').click(function () {
    amount = amount + 1;
    $('.amount').html(8 - amount);
    if (amount < 8) {
        let cell = $('<div class="cell"></div>');
        cell.css({'width': size, 'height': size});
        $('.field').append(cell);

        anime({
            targets: '.thanos',
            left: function () {
                return anime.random(window.innerWidth * .06, window.innerWidth - 150);
            },
            top: function () {
                return anime.random(0, window.innerHeight - 300);
            },
            duration: function () {
                return anime.random(1200, 1800);
            },
            delay: 200,
            direction: 'alternate',
            loop: false
        });
    } else {
        let cell = $('<div class="cell"></div>');
        cell.css({'width': size, 'height': size});
        $('.field').append(cell);
        $('.text').html('You saved the world!');
        $('.text').css({'font-size': '5em'})
        $('.field').css({'display': 'none'});
        anime({
            targets: 'img',
            opacity: 0,
            width: $('.thanos').width() * 1.5,
            height: $('.thanos').height() * 1.5,
            delay: 500,
            duration: 15000,
        })
    }
})
