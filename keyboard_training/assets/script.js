let state = 0;
let current;
let offsets = [];
let amount;
let selected_field = [-1, -1];

// Checking if there is a slot close enough to the dragging button, and if there is - check if it's the one
function check(event) {
    state = 0;
    if (selected_field[0] == -1) {
        $(event.target).css({
            left: anime.random(0, parseInt($('.moving_row').css('width')) - parseInt($('.key').css('width'))),
            top: anime.random(0, parseInt($('.moving_row').css('height')) - parseInt($('.key').css('height'))),
        })
    } else {
        let left = $(`#${selected_field[1]}`).offset().left;
        let top = $(`#${selected_field[1]}`).offset().top;
        $(event.target).css({
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
}

// Moving the block which is currently being dragged and checking is there is a slot close enough to change it's styles while moving
function drag(event) {
    if (state == 1) {
        current.css({
            'left': `${event.pageX - parseInt(current.css('width')) / 2 - $('.moving_row').offset().left}px`,
            'top': `${event.pageY - parseInt(current.css('height')) / 2 - $('.moving_row').offset().top}px`,
        })
        let centerX = current.offset().left + parseInt(current.css('width')) / 2;
        let centerY = current.offset().top + parseInt(current.css('height')) / 2;
        let field = parseInt(current.css('width'));
        for (let i = 0; i < amount; i++) {
            if ( offsets[i][0] < centerX && centerX < (offsets[i][0] + field) && offsets[i][1] < centerY && centerY < (offsets[i][1] + field)) {
                selected_field = [i, offsets[i][2]];
                $(`#${offsets[i][2]}`).addClass('selected_field');
                break;
            } else {
                selected_field = [-1, -1];
                $(`#${offsets[i][2]}`).removeClass('selected_field');
            }
        } 
    }
}

function main(event) {
    $('.moving_row').html('')
    if ($(event.target).attr('id') == 'diff1') {
        amount = 3;
    } else if ($(event.target).attr('id') == 'diff2') {
        amount = 5;
    } else if ($(event.target).attr('id') == 'diff3') {
        amount = 7;
    }
    let letters = [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']]

    let result = '';
    let count = 1
    for (let j = 0; j < 3; j++){
        result += '<div class="keys_row">'
        for (let i = 0; i < letters[j].length; i++) {
            result += `<div class="key static" id="${count}">${letters[j][i]}</div>`;
            count++;
        }
        result += '</div>'
    }

    $('.keyboard').html('');
    $('.keyboard').append(result);

    // This thing works in a weird way with coords so this code just selects a couple of random letters, changes their styles and moves keys to the .moving_row
    let temp = [];
    for (let i = 1; i <= amount; i++) {
        let f = anime.random(1, 32);
        while (temp.indexOf(f) != -1) {
            f = anime.random(1, 32);
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
        $('.moving_row').append(k);
        $(`#${f}`).html('');
    }

    // Changing the state when mouse clicked over a draggable button
    $('.moving').on('mousedown', function() {
        state = 1;
        current = $(this);
    })

    // Deciding what to do when user released the mouse button
    $('.moving').on('mouseup', check);

    $(document).on('mousemove', drag);
}




$('.difficulty_button').on('click', main)
