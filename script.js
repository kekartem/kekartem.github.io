const paths = {
    '1': 'valentines_day_card/main.html',
    '2': 'mothers_day_card/index.html',
    '3': 'appearing_background/index.html',
    '4': 'page_onload_animation/index.html',
    '5': 'btn_onclick_animation/index.html',
    '6': '#',
    '7': '#',
    '8': '',
    '9': 'keyboard_training/index.html',

};

$('.card_arrow').on('click', function() {
    window.location.href =paths[$(this).attr('id')];
});