function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}


let loadedImages = 0
let images_raw = []
for (let i = 1; i <= 24; i++) {
    images_raw.push(`${i}.webp`)
}

images_raw = shuffle(images_raw)

images_raw.forEach(image => {
    let src = new Image()
    src.src = `images/${image}`
    src.onload = function() { loadedImages += 1 }
})

let images = [
    [],
    [],
    [],
    [],
]


for (let i = 0; i < 24; i++) {
    images[i % 4].push(images_raw[i])
}

let timer = setInterval(function() {
    if (loadedImages == images_raw.length) {
        clearInterval(timer)
        add()
        runScroll()
    }
}, 10)

function add() {
    let cols = document.querySelectorAll('.col')
    for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < images[i].length; j++) {
            let img = document.createElement('img');
            img.setAttribute('src', `images/${images[i][j]}`)
            cols[i].appendChild(img)
        }
        for (let j = 0; j < images[i].length; j++) {
            let img = document.createElement('img');
            img.setAttribute('src', `images/${images[i][j]}`)
            cols[i].appendChild(img)
        }
    }
}

function runScroll() {
    let cols1 = document.querySelectorAll('.col')
    cols1.forEach(e => {
        e.style.display = 'none'
        e.style.display = 'block'
        anime({
            targets: e,
            translateY: `${- parseFloat(getComputedStyle(e).height)/2}px`,
            duration: anime.random(60000, 80000),
            easing: 'linear',
            loop: true
        })
    })
}
