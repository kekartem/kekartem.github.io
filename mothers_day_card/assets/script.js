let current_head = 0;
let current_head_img = 1;
let current_body = 0;
let current_body_img = 1;
let current_legs = 0;
let current_legs_img = 1;
let current_feet = 0;
let current_feet_img = 1;
let current_detail = 1;
let current_painting = 1;
let current_window = 1;
let current_background = 1;
let current_tone = 'first';
let a;

// Conver cancas into png
function convert() {
    let container = document.getElementById('container');

    html2canvas(document.getElementById('back')).then(function (canvas) {

        var my_screen = canvas;
        canvas.setAttribute('id', 'mycanvas');
        canvas.style.position = 'absolute'
        canvas.style.left = '10000px'
        container.appendChild(my_screen);
    })
    .then((data) => {
            var tmp_canvas = document.getElementById('mycanvas');
            dataURL = tmp_canvas.toDataURL("image/webp");
            container.innerHTML = '<h1 class="mainh1">Result as an image:</h1>'

            let todownload = document.createElement('div');
            todownload.className = 'todownload'
            todownload.id = 'todownload'
            todownload.innerHTML = `<img class="resultimage" src='${dataURL}'><textarea class="textfield" placeholder="Add some text"></textarea>`;
            container.appendChild(todownload);
            let downloadbutton = document.createElement('div');
            downloadbutton.className = 'downloadbutton';
            downloadbutton.innerHTML = 'Download!'
            container.appendChild(downloadbutton);
            downloadbutton.addEventListener('click', function () {
                html2canvas(document.getElementById('todownload')).then(function (canvas) {
                    var my_screen_2 = canvas;
                    canvas.setAttribute('id', 'mycanvas2');
                    canvas.style.position = 'absolute'
                    canvas.style.left = '10000px'
                    container.appendChild(my_screen_2);
                })
                .then((data) => {
                        var tmp_canvas_2 = document.getElementById('mycanvas2');
                        dataURL = tmp_canvas_2.toDataURL("image/webp");
                        let link = document.createElement("a");
                        link.style.display = "none";
                        link.href = dataURL;
                        link.download = 'mothersdatcard';
                        document.body.appendChild(link);
                        link.click();
                    
                    }
                )
            })
        });
}

// Animating head image changing
$('.head').on('click', function() {
    current_head -= 25;
    current_head_img += 1;
    if (current_head == -125) {
        current_head = 0;
        current_head_img = 1;
    }
    anime({
        targets: '.heads_row',
        translateX: `${current_head}vh`,
        easing: 'easeInOutQuad',
        duration: 250,
      });
    
});

// Animating body image changing
$('.body').on('click', function() {
    current_body -= 25;
    current_body_img += 1
    if (current_body == -125) {
        current_body = -25;
        current_body_img = 1;
    }
    anime({
        targets: '.bodies_row',
        translateX: `${current_body}vh`,
        easing: 'easeInOutQuad',
        duration: 250,
      });
});

// Animating legs image changing
$('.legs').on('click', function() {
    current_legs -= 25;
    current_legs_img += 1
    if (current_legs == -125) {
        current_legs = -25;
        current_legs_img = 1;
    }
    anime({
        targets: '.legs_row',
        translateX: `${current_legs}vh`,
        easing: 'easeInOutQuad',
        duration: 250,
      });
});

// Animating feet image changing
$('.feet').on('click', function() {
    current_feet -= 25;
    current_feet_img += 1;
    if (current_feet == -75) {
        current_feet = -25;
        current_feet_img = 1;
    }
    anime({
        targets: '.feet_row',
        translateX: `${current_feet}vh`,
        easing: 'easeInOutQuad',
        duration: 250,
      });
});

// Animating detail image changing
$('.detail').on('click', function() {
    current_detail += 1;
    if (current_detail == 3) {
        current_detail = 1;
    }
    anime({
        targets: '.detail', 
        left: '100vh',
        easing: 'easeInOutQuad',
        duration: 200,
    }).finished.then(function() {
        $('.detail img').attr('src', `assets/images/details/detail${current_detail}.webp`)
        anime({
            targets: '.detail',
            left: '61.6vh',
            easing: 'easeInOutQuad',
            duration: 200,
        });
    })
})

// Animating painting image changing
$('.painting').on('click', function() {
    current_painting += 1;
    if (current_painting == 6) {
        current_painting = 1;
    }
    anime({
        targets: '.painting', 
        left: '-20vh',
        easing: 'easeInOutQuad',
        duration: 300
    }).finished.then(function() {
        $('.painting img').attr('src', `assets/images/paintings/painting${current_painting}.webp`)
        anime({
            targets: '.painting',
            left: '4.04vh',
            easing: 'easeInOutQuad',
            duration: 300
        });
    })
})

// Animating window image changing
$('.window').on('click', function() {
    current_window += 1;
    if (current_window == 5) {
        current_window = 1;
    }
    anime({
        targets: '.window', 
        left: '-32vh',
        easing: 'easeInOutQuad',
        duration: 300
    }).finished.then(function() {
        $('.window img').attr('src', `assets/images/windows/window${current_window}.webp`)
        anime({
            targets: '.window',
            left: '1.7vh',
            easing: 'easeInOutQuad',
            duration: 300
        });
    })
})

// Background image changing
$('.bg_mini').on('click', function() {
    $('.back').css({
        'background': $(this).css('background'),
        'background-position': 'top left',
        'background-size': 'cover',
    })
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    if ($(this).attr('id') == 1) {
        $('.window').css('display', 'none');
        $('.painting').css('display', 'block')
    } else if ($(this).attr('id') == 2) {
        $('.window').css('display', 'block');
        $('.painting').css('display', 'none')
    }
})


// Skin tone image changing
$('.skin_tone').on('click', function() {
    $('.skin_tone_selected').removeClass('skin_tone_selected');
    $(this).addClass('skin_tone_selected');
    if ($(this).attr('id') == 'first') {
        $('.part').toArray().forEach(e => {
            a = $(e).attr('src');
            a = a.replace('second', 'first');
            a = a.replace('third', 'first');
            a = a.replace('fourth', 'first');
            $(e).attr('src', a);
            current_tone = 'first';
        })
    } else if ($(this).attr('id') == 'second') {
        $('.part').toArray().forEach(e => {
            a = $(e).attr('src');
            a = a.replace('first', 'second');
            a = a.replace('third', 'second');
            a = a.replace('fourth', 'second');
            $(e).attr('src', a);
            current_tone = 'second';
        })
    } else if ($(this).attr('id') == 'third') {
        $('.part').toArray().forEach(e => {
            a = $(e).attr('src');
            a = a.replace('first', 'third');
            a = a.replace('second', 'third');
            a = a.replace('fourth', 'third');
            $(e).attr('src', a);
            current_tone = 'third';
        })
    } else if ($(this).attr('id') == 'fourth') {
        $('.part').toArray().forEach(e => {
            a = $(e).attr('src');
            a = a.replace('first', 'fourth');
            a = a.replace('second', 'fourth');
            a = a.replace('third', 'fourth');
            $(e).attr('src', a);
            current_tone = 'fourth';
        })
    }
})

// Getting result as png
$('.done').on('click', function() {
    $('.heads_row_wrapper').html(`<img src="assets/images/${current_tone}/heads/head${current_head_img}.webp">`);
    $('.bodies_row_wrapper').html(`<img src="assets/images/${current_tone}/bodys/body${current_body_img}.webp">`);
    $('.legs_row_wrapper').html(`<img src="assets/images/${current_tone}/legs/legs${current_legs_img}.webp">`);
    $('.feet_row_wrapper').html(`<img src="assets/images/${current_tone}/feet/feet${current_feet_img}.webp">`);
    convert();
})