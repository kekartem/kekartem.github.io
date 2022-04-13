let current = $('.firststep');
let STATE = 1;
let dataURL;
let current_detail;
let current_detail_moving;
let dragging_state = '0';
let timer;


// Calculating transform: rotate() rotation angle
function getRotationAngle() {
    const obj = window.getComputedStyle(current_detail.get(0), null);
    const matrix = obj.getPropertyValue('-webkit-transform') ||
        obj.getPropertyValue('-moz-transform') ||
        obj.getPropertyValue('-ms-transform') ||
        obj.getPropertyValue('-o-transform') ||
        obj.getPropertyValue('transform');

    let angle = 0;

    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    return (angle < 0) ? angle += 360 : angle;
}

// Highlighting selected item
$('.firststep').on('click', function () {
    current.removeClass('controls_selected');
    $(this).addClass('controls_selected');
    $('.templateimg').attr('src', `assets/images/templates/template${$(this).attr('id')}.webp`);
    current = $(this);
});

// Dragging function
function dragging(event) {
    if (dragging_state == "1") {
        event.preventDefault();
        let cardoffset = $('.card').offset()
        if (event.pageX > cardoffset.left + parseInt(current_detail_moving.css('width')) / 2 && event.pageX < cardoffset.left + parseInt($('.card').css('width')) - parseInt(current_detail_moving.css('width')) / 2) {

            let x = `${event.clientX - parseInt(current_detail_moving.css('width')) / 2}px`;

            current_detail_moving.css({
                'left': x,
            });
        }

        if (event.pageY > cardoffset.top + parseInt(current_detail_moving.css('height')) / 2 && event.pageY < cardoffset.top + parseInt($('.card').css('height')) - parseInt(current_detail_moving.css('height')) / 2) {

            let y = `${event.clientY - parseInt(current_detail_moving.css('height')) / 2}px`;
            current_detail_moving.css({
                'top': y,
            });
        }
    }
}

// Coverting canvas into png
function convert() {
    let container = document.getElementById('container');

    html2canvas(document.getElementById('card')).then(function (canvas) {

        var my_screen = canvas;
        canvas.setAttribute('id', 'mycanvas');
        canvas.style.position = 'absolute'
        canvas.style.left = '10000px'
        container.appendChild(my_screen);
    })
        .then((data) => {
                var tmp_canvas = document.getElementById('mycanvas');
                dataURL = tmp_canvas.toDataURL("image/png");
                container.innerHTML = `<h1 class="mainh1">Result as an image:</h1><img class="resultimage" src='${dataURL}'>`;
                let downloadbutton = document.createElement('div');
                downloadbutton.className = 'downloadbutton';
                downloadbutton.innerHTML = 'Download!'
                container.appendChild(downloadbutton);
                downloadbutton.addEventListener('click', function () {
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = dataURL;
                    link.download = 'valentinescard';
                    document.body.appendChild(link);
                    link.click();
                })
            }
        )
}

// Updating html and adding handlers to new controls on each step
function state1() {
    $('.controls_main').html('');
    STATE += 1;
    anime({
        targets: '.progressbar',
        width: (STATE - 1) * window.innerWidth / 5,
        duration: 1000,
    });
    let result_html = '';
    result_html += '<div class="controls_item texturestep notexture" id="0"><img src="assets/images/texture0.webp"></div>';
    for (let i = 1; i < 8; i++) {
        result_html += `<div class="controls_item texturestep" id="${i}"><img src="assets/images/textures/texture${i}.webp"></div>`;
    }

    $('.controls_main').html(result_html);
    current = $('.texturestep');
    $('.texturestep').on('click', function () {
        current.removeClass('controls_selected');
        $(this).addClass('controls_selected');
        if (document.querySelectorAll(".textureimage").length) {
            $('.textureimage').attr('src', `assets/images/textures/texture${$(this).attr('id')}.webp`)
        } else {
            let result_html = $('.card').html() + `<img class="textureimage" src='assets/images/textures/texture${$(this).attr('id')}.webp'>`;
            $('.card').html(result_html);
        }
        current = $(this);
    });
}

function state2() {
    $('.controls_main').html('');
    STATE += 1;
    anime({
        targets: '.progressbar',
        width: (STATE - 1) * window.innerWidth / 5,
        duration: 1000,
    })
    let result_html = '';
    result_html += '<div class="controls_item secondstep notexture" id="0"><img src="assets/images/texture0.webp"></div>';
    for (let i = 1; i < 8; i++) {
        result_html += `<div class="controls_item secondstep" id="${i}"><img src="assets/images/borders/border${i}.webp"></div>`;
    }

    $('.controls_main').html(result_html);
    current = $('.secondstep');
    $('.secondstep').on('click', function () {
        current.removeClass('controls_selected');
        $(this).addClass('controls_selected');
        if (document.querySelectorAll(".borderimage").length) {
            $('.borderimage').attr('src', `assets/images/borders/border${$(this).attr('id')}.webp`)
        } else {
            let result_html = `${$('.card').html()}<img class="borderimage" src='assets/images/borders/border${$(this).attr('id')}.webp'>`;
            $('.card').html(result_html);
        }

        current = $(this);
    });
}

function state3() {
    $('.controls_main').html('');
    STATE += 1;
    anime({
        targets: '.progressbar',
        width: (STATE - 1) * window.innerWidth / 5,
        duration: 1000,
    })
    let result_html = '';
    for (let i = 1; i < 12; i++) {
        result_html += `<div class="controls_item thirdstep" id="${i}"><img src="assets/images/details/detail${i}.webp"></div>`;
    }

    $('.controls_main').html(result_html);
    $('.thirdstep').on('click', function () {
        let a = $(this);
        var newimage = $('<img>', {
            class: 'detailimage draggable',
            src: `assets/images/details/detail${a.attr('id')}.webp`,
        });
        $('.card').append(newimage);
        offcontrols()
        controls()
    });

    function offcontrols() {
        $('detailimage').off('contextmenu');
        $('.remove').off('click')
        $('.scaleup').off('click')
        $('.scaledown').off('click')
    }

    function controls() {
        $('.detailimage').on('contextmenu', function (e) {
            e.preventDefault();
            $('.detailpopup').css({
                'display': 'inline-block',
                'top': `${e.clientY}px`,
                'left': `${e.clientX}px`,
            });
            current_detail = $(this);
        });

        $('.remove').on('click', function () {
            current_detail.remove();
            current_detail = $('<div>');
            $('.detailpopup').css({
                'display': 'none',
                'top': '10000px',
                'left': '10000px',
            })
        });
        $('.scaleup').on('click', function () {
            current_detail.css({
                'width': `${parseInt(current_detail.css('width')) + 10}px`,
            });
        });
        $('.scaledown').on('click', function () {
            current_detail.css({
                'width': `${parseInt(current_detail.css('width')) - 10}px`,
            });
        });
        $('.rotateleft').on('click', function () {
            current_detail.css({
                'transform': `rotate(${getRotationAngle() - 5}deg)`,
            });
        });
        $('.rotateright').on('click', function () {
            current_detail.css({
                'transform': `rotate(${getRotationAngle() + 5}deg)`,
            });
        });
        $(document).click(function (e) {
            if ($(e.target).closest('.detailpopup').length) {
                // клик внутри элемента 
                return;
            }
            // клик снаружи элемента 
            $('.detailpopup').css({
                'display': 'none',
                'top': '10000px',
                'left': '10000px',
            })
        });

        $('.detailimage').on('mousedown', function () {
            dragging_state = '1';
            current_detail_moving = $(this);
        });
        $('.detailimage').on('mouseup', function () {
            dragging_state = "0"
            current_detail_moving = $('<div>')
        });


        $(window).on('mousemove', dragging);
    }
}

function state4() {
    $('.controls_main').html('');
    STATE += 1;
    anime({
        targets: '.progressbar',
        width: (STATE - 1) * window.innerWidth / 5,
        duration: 1000,
    });
    let text = $('.cardtext');
    text.css({
        'z-index': '999',
    })
    let shadowbuttons = $('<div>', {
        class: 'shadowbuttons',
    });
    $('.controls_main').append(shadowbuttons);
    document.querySelector('.text').focus();
    text.css({
        'opacity': 1,
    });
    let movebutton = $('.movebutton');
    let dragging_state = "0";
    let delayX = parseInt(document.querySelector('.cardtext').getBoundingClientRect().left) - parseInt(document.querySelector('.movebutton').getBoundingClientRect().left) - parseInt(movebutton.css('width')) / 2;
    let delayY = parseInt(document.querySelector('.cardtext').getBoundingClientRect().top) - parseInt(document.querySelector('.movebutton').getBoundingClientRect().top) - parseInt(movebutton.css('height')) / 2;
    timer = setInterval(function () {
        delayX = parseInt(document.querySelector('.cardtext').getBoundingClientRect().left) - parseInt(document.querySelector('.movebutton').getBoundingClientRect().left) - parseInt(movebutton.css('width')) / 2;
        delayY = parseInt(document.querySelector('.cardtext').getBoundingClientRect().top) - parseInt(document.querySelector('.movebutton').getBoundingClientRect().top) - parseInt(movebutton.css('height')) / 2;
    }, 100)

    movebutton.on('mousedown', function () {
        dragging_state = '1';
    });
    movebutton.on('mouseup', function () {
        dragging_state = "0"
    });
    $(window).on('mousemove', function (e) {
        if (dragging_state == 1) {
            e.preventDefault();
            let x = e.clientX + delayX;
            text.css({
                'left': x,
            });

            let y = e.clientY + delayY;
            text.css({
                'top': y,
            });
        }
    });

    let colors = ['#ffffff', '#000000', '#b02418', '#eb739a', '#ddbabb', '#c2e7c3', '#fcf1a7', '#f19446', '#3a3466', '#40679c', '#571039', '#92c0b0'];
    let count = 0;
    let dom_node;

    dom_node = $($.parseHTML('<div class="colorsrow"><div class="fontbutton sizeplus" id="1"><i class="fas fa-plus"></i></div><div class="fontbutton sizeminus" id="2"><i class="fas fa-minus"></i></div></div>'));
    $('.shadowbuttons').append(dom_node);
    dom_node = $($.parseHTML('<div class="colorsrow"><div class="fontbutton bold" id="3"><i class="fas fa-bold"></i></div><div class="fontbutton italic" id="4"><i class="fas fa-italic"></i></div></div>'));
    $('.shadowbuttons').append(dom_node);
    for (let i = 0; i < 6; i++) {
        dom_node = $($.parseHTML(`<div class="colorsrow"><div class="colorbutton" style="background-color: ${colors[count]};" id="${count + 5}"></div><div class="colorbutton colorbutton_selected" style="background-color: ${colors[count + 1]};" id="${count[colors + 6]}"></div></div>`));
        $('.shadowbuttons').append(dom_node);
        count += 2;
    }

    let sizeplus = $('.sizeplus');
    sizeplus.on('click', function () {
        $('.text').css({
            fontSize: `${parseInt($('.text').css('font-size')) + 10}px`,
        })
    })
    let sizeminus = $('.sizeminus');
    sizeminus.on('click', function () {
        $('.text').css({
            fontSize: `${parseInt($('.text').css('font-size')) - 10}px`,
        })
    });
    let bold = $('.bold');
    bold.on('click', function () {
        if ($('.text').css('font-weight') == 400) {
            $('.text').css({
                'font-weight': 600,
            })
            $(this).addClass('fontbutton_selected');
        } else {
            $('.text').css({
                'font-weight': 400,
            })
            $(this).removeClass('fontbutton_selected');
        }
    });
    let italic = $('.italic');
    italic.on('click', function () {
        if ($('.text').css('font-style') == 'normal') {
            $('.text').css({
                'font-style': 'italic',
            })
            $(this).addClass('fontbutton_selected');
        } else {
            $('.text').css({
                'font-style': 'normal',
            })
            $(this).removeClass('fontbutton_selected');
        }
    });

    $('.colorbutton').on('click', function () {
        if ($('.colorbutton_selected')) {
            $('.colorbutton_selected').removeClass('colorbutton_selected')
        }
        $('.text').css({
            color: $(this).css('background-color'),
        })
        $(this).addClass('colorbutton_selected')
    })
}

function state5() {
    STATE += 1;
    clearInterval(timer);
    anime({
        targets: '.progressbar',
        width: (STATE - 1) * window.innerWidth / 5,
        duration: 1000,
    });

    let buttons = $('.textbuttons');
    buttons.css({
        'opacity': 0,
    })
    $('.card').css({
        'border': 'none',
    });
    $('.stepbackbutton').css('display', 'none')

    let text = $('.text');
    text.css({
        'border': 'none',
    })

    convert()


}

// Picking a function dependint on the step
$('.nextstepbutton').on('click', function (event) {
    if (STATE == 1) {
        state1();
    } else if (STATE == 2) {
        state2();
    } else if (STATE == 3) {
        state3();
    } else if (STATE == 4) {
        state4();
    } else if (STATE == 5) {
        state5();
    }
});

// Alert before leaving the page
window.onbeforeunload = function () {
    return 'Are you sure?';
};

// Moving to the previous stage
$('.stepbackbutton').on('click', function () {
    $('.cardtext').css('z-index', '-1');
    if (STATE - 2 > 0) {
        STATE -= 2;
        document.getElementById('nextstepbutton').click();
    }
})