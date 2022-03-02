$('.difficulty_button').on('click', function() {

    let state = 0;
    let current;
    let offsets = [];
    let amount;
    let selected_field = [-1, -1];
    
    $('.moving_row').html('')
    if ($(this).attr('id') == 'diff1') {
        amount = 3;
        console.log('1')
    } else if ($(this).attr('id') == 'diff2') {
        amount = 5;
        console.log('5')
    } else if ($(this).attr('id') == 'diff3') {
        amount = 7;
        console.log('7')
    }

    $('.keyboard').html($(`
    <div class="keys_row">
                <div class="key static" id="1">й</div>
                <div class="key static" id="2">ц</div>
                <div class="key static" id="3">у</div>
                <div class="key static" id="4">к</div>
                <div class="key static" id="5">е</div>
                <div class="key static" id="6">н</div>
                <div class="key static" id="7">г</div>
                <div class="key static" id="8">ш</div>
                <div class="key static" id="9">щ</div>
                <div class="key static" id="10">з</div>
                <div class="key static" id="11">х</div>
                <div class="key static" id="12">ъ</div>
            </div>
            <div class="keys_row">
                <div class="key static" id="13">ф</div>
                <div class="key static" id="14">ы</div>
                <div class="key static" id="15">в</div>
                <div class="key static" id="16">а</div>
                <div class="key static" id="17">п</div>
                <div class="key static" id="18">р</div>
                <div class="key static" id="19">о</div>
                <div class="key static" id="20">л</div>
                <div class="key static" id="21">д</div>
                <div class="key static" id="22">ж</div>
                <div class="key static" id="23">э</div>
            </div>
            <div class="keys_row">
                <div class="key static" id="24">я</div>
                <div class="key static" id="25">ч</div>
                <div class="key static" id="26">с</div>
                <div class="key static" id="27">м</div>
                <div class="key static" id="28">и</div>
                <div class="key static" id="29">т</div>
                <div class="key static" id="30">ь</div>
                <div class="key static" id="31">б</div>
                <div class="key static" id="32">ю</div>
            </div>
    `))

    let temp = [];
    for (let i = 1; i <= amount; i++) {
        let f = anime.random(1, 32);
        while (temp.indexOf(f) != -1) {
            f = anime.random(1, 32);
            console.log('dfvfd')
        }

        temp.push(f);
        
        offsets.push([$(`#${f}`).offset().left, $(`#${f}`).offset().top, f]);
        $(`#${f}`).removeClass('static');
        $(`#${f}`).addClass('field');
        let k = $('<div>', {
            class: `key moving parent${f}`,
        });
        k.html($(`#${f}`).html());
        k.css({
            left: anime.random(0, parseInt($('.moving_row').css('width')) - parseInt($('.key').css('width'))),
            top: anime.random(0, parseInt($('.moving_row').css('height')) - parseInt($('.key').css('height'))),
        })
        $('.moving_row').append(k)
        $(`#${f}`).html('');

    }



    $('.moving').on('mousedown', function() {
        state = 1;
        current = $(this);
    })


    $('.moving').on('mouseup', function() {
        state = 0;
        if (selected_field[0] == -1) {
            $(this).css({
                left: anime.random(0, parseInt($('.moving_row').css('width')) - parseInt($('.key').css('width'))),
                top: anime.random(0, parseInt($('.moving_row').css('height')) - parseInt($('.key').css('height'))),
            })
        } else {
            let left = $(`#${selected_field[1]}`).offset().left;
            let top = $(`#${selected_field[1]}`).offset().top;
            $(this).css({
                'left': `${left - $('.moving_row').offset().left}px`,
                'top': `${top - $('.moving_row').offset().top}px`,
            })
            let a = current.attr('class').split('parent')[1];
            if (a == selected_field[1]) {
                $(`#${selected_field[1]}`).css({
                    'border': '2px solid green',
                })
                $(`#${selected_field[1]}`).html(current.html())
                current.css('display', 'none')
            } else {
                current.css({
                    left: anime.random(0, parseInt($('.moving_row').css('width')) - parseInt($('.key').css('width'))),
                    top: anime.random(0, parseInt($('.moving_row').css('height')) - parseInt($('.key').css('height'))),
                })
            }
            $('.selected_field').removeClass('selected_field');
        }
        
    })

    $(document).on('mousemove', function(e) {
        if (state == 1) {
            current.css({
                'left': `${e.pageX - parseInt(current.css('width')) / 2 - $('.moving_row').offset().left}px`,
                'top': `${e.pageY - parseInt(current.css('height')) / 2 - $('.moving_row').offset().top}px`,
            })
            let centerX = current.offset().left + parseInt(current.css('width')) / 2;
            let centerY = current.offset().top + parseInt(current.css('height')) / 2;
            let field = parseInt(current.css('width'));
            for (let i = 0; i < amount; i++) {
                if ( offsets[i][0] < centerX && centerX < (offsets[i][0] + field) && offsets[i][1] < centerY && centerY < (offsets[i][1] + field)) {
                    selected_field = [i, offsets[i][2]];
                    console.log(selected_field)
                    $(`#${offsets[i][2]}`).addClass('selected_field');
                    break;
                } else {
                    selected_field = [-1, -1];
                    console.log(selected_field)
                    $(`#${offsets[i][2]}`).removeClass('selected_field')
                }
            } 
        }
    });




})
