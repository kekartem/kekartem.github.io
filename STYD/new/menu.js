anime({
    targets: '.menu',
    translateY: 0.2 * window.innerHeight,
    scale: 0.8,
    duration: 300,
    easing: 'linear'
})

let menu_circle = document.querySelector('.menu-circle')
menu_circle.state = 'closed'

menu_circle.addEventListener('click', function() {
    if (menu_circle.state == 'closed') {
        anime({
            targets: document.querySelector('.container'),
            translateY: `${- window.innerHeight / 2}px`,
            duration: 200,
            easing: 'easeInOutQuad',
            complete: function() {
                document.querySelector('.menu').style.zIndex = '0'

            }
        })
        anime({
            targets: '.menu',
            translateY: 0,
            scale: 1,
            opacity: 1,
            duration: 200,
            easing: 'easeInOutQuad'
        })
        menu_circle.state = 'open'
    } else {
        document.querySelector('.menu').style.zIndex = '-1'
        anime({
            targets: document.querySelector('.container'),
            translateY: `0`,
            duration: 200,
            easing: 'easeInOutQuad',
        })
        anime({
            targets: '.menu',
            translateY: 0.2 * window.innerHeight,
            scale: 0.8,
            opacity: 0,
            duration: 200,
            easing: 'easeInOutQuad',
        })
        menu_circle.state = 'closed'
    }
})

let covers = document.querySelectorAll('.cover')
let cover_images = ['home.png', 'concerts.png', 'music.png', 'lyrics.png', 'chords.png', 'contacts.png']

for (let i = 0; i < covers.length; i++) {
    covers[i].style.backgroundImage = `url(${cover_images[i]})`
    covers[i].style.backgroundSize = 'cover'
    covers[i].style.backgroundPosition = 'center center'
}


let locations_temp = {
    '1': '/STYD/new/index.html',
    '2': '#',
    '3': '/STYD/new/music.html',
    '4': '/STYD/new/lyrics.html',
    '5': '#',
    '6': '#'
}

let menu_temp = document.querySelectorAll('.menu-item')
menu_temp.forEach(e => {
    e.addEventListener('click', function() {
        window.location.href = locations_temp[e.getAttribute('id')]
    })
})