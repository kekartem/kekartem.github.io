let cover = document.querySelector('.cover')
let cover_heading = cover.querySelector('h1')
if (parseInt(getComputedStyle(cover_heading).width) >= parseInt(getComputedStyle(cover).width) - 128) {
    let fontsize = parseInt(getComputedStyle(cover_heading).fontSize)
    while (parseInt(getComputedStyle(cover_heading).width) >= parseInt(getComputedStyle(cover).width) - 64) {
        cover_heading.style.fontSize = `${fontsize - 5}px`
        fontsize -= 5
    }
    cover_heading.style.lineHeight = `${fontsize}px`
}


// Teams members switch buttons

let buttons = document.querySelectorAll('.team-controls-btn');
let screen_width = window.innerWidth
i = 0
buttons.forEach(function(item) {
    item.addEventListener('click', function() {
        document.querySelector('.team-selected').classList.remove('team-selected')
        this.classList.add('team-selected')
        anime({
            targets: '.team-grid',
            translateX: - screen_width * (parseInt(item.innerHTML) - 1),
            duration: 500,
            easing: 'easeInOutQuad',
        })
    })
    i += 1
})
</script>
<!-- Slider script -->
<script>
// Загрузка картинок для корректной работы анимациии
var amount_images = 5

let loadedImages = 0
let images_raw = []
for (let i = 1; i <= amount_images; i++) {
    images_raw.push(`${i}.jpg`)
}

images_raw.forEach(image => {
    let src = new Image()
    src.src = `images/slider/${image}`
    src.onload = function() { loadedImages += 1 }
})

let timer = setInterval(function() {
    if (loadedImages == images_raw.length) {
        clearInterval(timer)
        main()
    }
}, 10)

// Весь функционал
function main() {
    let slider = document.querySelector('.slider')
    let slider_images = slider.querySelectorAll('img')
    let widths = []
    let full_width = parseInt(getComputedStyle(document.querySelector('.slider')).width)

    slider_images.forEach(function(image) {
        widths.push(parseInt(getComputedStyle(image).width))
    })

    anime({
        targets: '.slider',
        translateX: (full_width - widths[0]) / 2,
        duration: 100,
        easing: 'linear'
    })

    

    let ar_lt = document.querySelector('.ar-lt')
    let ar_rt = document.querySelector('.ar-rt')

    let current_image = 0
    let default_offset = (full_width - widths[0]) / 2

    ar_rt.addEventListener('click', function() {
        if (current_image != amount_images) {
            let distance = default_offset
            for (let i = 0; i < current_image; i++) {
                distance -= widths[i]
            }
            anime({
                targets: '.slider',
                translateX: distance - widths[current_image] / 2 - widths[current_image + 1] / 2,
                easing: 'easeInOutQuad',
                duration: 300
            })
            current_image += 1
        }
    })

    ar_lt.addEventListener('click', function() {
        if (current_image != 0) {
            let distance = default_offset
            for (let i = 0; i < current_image; i++) {
                distance -= widths[i]
            }
            anime({
                targets: '.slider',
                translateX: distance + widths[current_image] / 2 + widths[current_image - 1] / 2,
                easing: 'linear',
                duration: 300
            })
            current_image -= 1
        }
    })
}
</script>
<!-- Popup window -->
<script>
    let id_to_description = {
        's1': '<p>— это единственный способ, заранее оценить и получить полное видение  об проектируемом доме. На этом этапе планируется вид дома, определяются его формы, архитектурный стиль, внутреннее устройство и внешний облик дома. Этот этап позволяет избежать многих сложностей в ходе дальнейшего проектирования.</p><p>На основе разработанной концепции здания и точно сформированного технического задания производится дальнейшая отработка планов в полном объеме в рамках архитектурного или строительного проекта.</p>',
        's2': '<p>— это часть комплекса работ по проектированию, направленная на создание документации, нужной для строительства или реконструкции объекта. Данный раздел решает следующие основные задачи:</p><ul><li>Детальная проработка внешнего вида объекта;</li><li>Выбор подходящих вариантов наружной и внутренней отделки фасадов и помещений;</li><li>Разработка планировочных, функциональных и организационных решений.</li></ul>',
        's3': '<p>позволяют ответить на вопрос, каким образом необходимо построить новое здание, чтобы оно отвечало требованиям безопасности, прочности и комфорта при эксплуатации.</p><p>В основе подготовки раздела КП лежат точные инженерные расчеты, выполняемые при задействовании совершенного программного обеспечения.</p>',
        's4': '<p>— это процесс создания трехмерной модели пространства при помощи формы и цвета. Фотореалистичная 3D-картинка покажет, как сочетаются между собой материалы, мебель и декор.</p><p>Визуализация дизайн-проекта позволяет понять, как будет выглядеть ваш дом после окончания ремонтных работ и какого результата добиваться от подрядчиков.</p>',
        's5': '<p>Вы обретаете четкое понимание того, каким должен быть идеальный дом. Обеспечиваете гармоничность и практичность интерьера навсегда.</p>',
        's6': '<p>Чтобы  сэкономить ваши деньги, необходим авторский надзор для контроля воплощения проекта во время строительства.',
    }
    let popup_container = document.querySelector('.popup-container')
    let popup = document.querySelector('.popup')
    let services = document.querySelectorAll('.service')
    services.forEach(function(service) {
        let service_id = service.getAttribute('id')
        let service_name = service.querySelector('h3').innerHTML
        let service_description = id_to_description[service_id]
        service.addEventListener('click', function() {
            popup.querySelector('h1').innerHTML = service_name
            popup.querySelector('.popup-text').innerHTML = service_description
            popup_container.style.display = 'flex'
            anime({
                targets: popup_container,
                opacity: 1,
                easing: 'easeInOutQuad',
                duration: 500,
            })
        })
    })

    popup_container.addEventListener('click', function(e) {
        if (e.target !== this) {
            return
        }
        anime({
            targets: popup_container,
            opacity: 0,
            easing: 'easeInOutQuad',
            duration: 200,
            complete: function() {
                popup_container.style.display = 'none'
            }
        })
    })

    document.querySelector('.close').addEventListener('click', function() {
        anime({
            targets: popup_container,
            opacity: 0,
            easing: 'easeInOutQuad',
            duration: 200,
            complete: function() {
                popup_container.style.display = 'none'
            }
        })
    })

    document.addEventListener('keydown', function(e) {
        if (event.key == 'Escape') {
            anime({
                targets: popup_container,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 200,
                complete: function() {
                    popup_container.style.display = 'none'
                }
            }) 
        }
    })
</script>
<!-- Work script -->
<script>

let leaf_id_to_description = {
    'l1': '<p>Анализ всего участка подразумевает то-то и то-то lorem ispum lorem ispum lorem ispum lorem ispum</p>',
    'l2': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti debitis labore repellendus excepturi similique expedita sapiente recusandae. Dolores quod aperiam id sequi ex consequuntur quos totam accusantium provident inventore.',
    'l3': '',
    'l4': '',
}
let leaves = document.querySelectorAll('.leaf')
let i = 0
let leaf_height = parseInt(getComputedStyle(document.querySelector('.leaf-cover')).height)

if (window.innerWidth <= 600) {
    for (let i = 0; i < 4; i++) {
        let leaf = leaves[i]
        leaf.querySelector('.leaf-content').innerHTML = leaf_id_to_description[leaf.getAttribute('id')]
        let leaf_max_height = parseInt(getComputedStyle(leaf).height)
        leaf.style.height = `${parseInt(getComputedStyle(leaf.querySelector('.leaf-cover')).height)}px`
        leaf.addEventListener('click', function() {
            if (leaf.getAttribute('data-toggled') == 0) {
                anime({
                    targets: leaf,
                    height: leaf_max_height,
                    duration: 300,
                    easing: 'linear',
                })
                for (j = 0; j < 4; j++) {
                    if (leaves[j].dataset.toggled == 1) {
                        anime({
                            targets: leaves[j],
                            height: parseInt(getComputedStyle(leaves[j].querySelector('.leaf-cover')).height),
                            duration: 300,
                            easing: 'linear',
                        })
                        leaves[j].dataset.toggled = 0
                    }
                }
                leaf.dataset.toggled = 1
            } else {
                anime({
                    targets: leaf,
                    height: parseInt(getComputedStyle(leaf.querySelector('.leaf-cover')).height),
                    duration: 300,
                    easing: 'linear',
                })
                leaf.dataset.toggled = 0
            }
        })
    }
} else {
    leaves.forEach(function(item) {
        item.querySelector('.leaf-content').innerHTML = leaf_id_to_description[item.getAttribute('id')]
        item.querySelector('img').addEventListener('click', function() {
            popup.querySelector('h1').innerHTML = item.querySelector('.leaf-cover').querySelector('p').innerHTML
            popup.querySelector('.popup-text').innerHTML = item.querySelector('.leaf-content').innerHTML
            popup_container.style.display = 'flex'
            anime({
                targets: popup_container,
                opacity: 1,
                easing: 'easeInOutQuad',
                duration: 500,
            })
        })
    })
}
</script>