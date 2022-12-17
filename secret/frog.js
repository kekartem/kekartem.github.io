const window_width = window.innerWidth
const window_height = window.innerHeight
let coords = []

function randint(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}

function colliderect(coords1, coords2) {
    return coords1[0] < coords1[0] + 70 && coords1[0] + 70 > coords2[0] && coords1[1] < coords2[1] + 70 && 70 + coords1[1] > coords2[1]
}

function calc_rotate(coords1, coords2) {
    if (coords2[0] > coords1[0]) {
        if (coords2[1] > coords1[1]) {
            return 90 - Math.atan((coords2[0] - coords1[0])/(coords2[1] - coords1[1])) * 180 / Math.PI + 35
        } else if (coords2[1] < coords1[1]) {
            return -1 * Math.atan((coords1[1] - coords2[1])/(coords2[0] - coords1[0])) * 180 / Math.PI + 35
        } else if (coords2[1] == coords1[1]) {
            return 35
        }
    } else if (coords2[0] < coords1[0]) {
        if (coords2[1] > coords1[1]) {
            return 90 + Math.atan((coords1[0] - coords2[0])/(coords2[1] - coords1[1])) * 180 / Math.PI + 35
        } else if (coords2[1] < coords1[1]) {
            return 180 + Math.atan((coords1[1] - coords2[1])/(coords1[0] - coords2[0])) * 180 / Math.PI + 35
        } else if (coords2[1] == coords1[1]) {
            return 180 + 35
        }
    } else if (coords2[0] == coords1[0]) {
        if (coords2[1] > coords1[1]) {
            return 90 + 35
        } else {
            return -90 + 35
        }
    }
    return 35
    
}

let leaf_container = document.querySelector('.leaf-container')
for (let i = 0; i < 10; i++) {
    let leaf = document.createElement('div')
    leaf.classList.add('leaf')
    let left
    if (i < 5) {
        left = randint(0, window_width / 2 - 70)
    } else {
        left = randint(window_width / 2, window_width - 70)
    }
    left = randint(0, window_width - 70)
    let top = randint(0.35 * window_height, window_height - 70)
    let flag = false
    for(let i = 0; i < coords.length; i++) {
        if (colliderect([left, top], coords[i])) {
            flag = true
            break
        }
    }
    let count = 0
    while (flag == true) {
        if (count == 100) { break }
        if (i < 5) {
            left = randint(0, window_width / 2 - 70)
        } else {
            left = randint(window_width / 2, window_width - 70)
        }
        top = randint(0.35 * window_height, window_height - 70)
        flag = false
        for(let i = 0; i < coords.length; i++) {
            if (colliderect([left, top], coords[i])) {
                flag = true
                break
            }
        }
        count += 1
    }
    coords.push([left, top])
    leaf.style.left = `${left}px`
    leaf.style.top = `${top}px`
    leaf.innerHTML = '<img src="leaf.png">'
    leaf_container.append(leaf)
}

let current_leaf = 0;
let frog = document.createElement('div')
frog.classList.add('frog')
frog.innerHTML = '<img src="frog.png">'
frog.style.left = `${coords[current_leaf][0] + 10}px`
frog.style.top = `${coords[current_leaf][1] + 3}px`
leaf_container.appendChild(frog)

let current_leaf1 = 5;
let frog1 = document.createElement('div')
frog1.classList.add('frog1')
frog1.innerHTML = '<img src="frog.png">'
frog1.style.left = `${coords[current_leaf1][0] + 10}px`
frog1.style.top = `${coords[current_leaf1][1] + 3}px`
leaf_container.appendChild(frog1)

setInterval(function() {
    let new_leaf = randint(0, coords.length - 1)
    while (new_leaf == current_leaf || new_leaf == current_leaf1) {
        new_leaf = randint(0, coords.length - 1)
    }

    let delay = randint(0, 2000)

    anime({
        targets: '.frog',
        rotate: calc_rotate([coords[current_leaf][0] + 35, coords[current_leaf][1] + 35], [coords[new_leaf][0] + 35, coords[new_leaf][1] + 35]),
        duration: 700,
        easing: 'linear',
        delay: delay,
        complete: function(anim) {
            frog.innerHTML = '<img src="frog1.png">'
            anime({
                targets: '.frog',
                scale: 2.5,
                duration: 500,
                direction: 'alternate',
                easing: 'linear',
            })
            anime({
                targets: '.frog',
                left: `${coords[new_leaf][0] + 10}px`,
                top: `${coords[new_leaf][1] + 3}px`,
                duration: 1000,
                easing: 'linear',
                complete: function(a) {
                    frog.innerHTML = '<img src="frog.png">'
                    anime({
                        targets: '.frog',
                        rotate: 0,
                        duration: 500,
                        easing: 'linear',
                    })
                }
            })
        }
    })
    current_leaf = new_leaf

    let new_leaf1 = randint(0, coords.length - 1)
    while (new_leaf1 == current_leaf1 || new_leaf1 == new_leaf || new_leaf1 == current_leaf) {
        new_leaf1 = randint(0, coords.length - 1)
    }
    let delay1 = randint(0, 2300)
    anime({
        targets: '.frog1',
        rotate: calc_rotate([coords[current_leaf1][0] + 35, coords[current_leaf1][1] + 35], [coords[new_leaf1][0] + 35, coords[new_leaf1][1] + 35]),
        duration: 700,
        easing: 'linear',
        delay: delay1,
        complete: function(anim) {
            frog1.innerHTML = '<img src="frog1.png">'
            anime({
                targets: '.frog1',
                scale: 2.5,
                duration: 500,
                direction: 'alternate',
                easing: 'linear',
            })
            anime({
                targets: '.frog1',
                left: `${coords[new_leaf1][0] + 10}px`,
                top: `${coords[new_leaf1][1] + 3}px`,
                duration: 1000,
                easing: 'linear',
                complete: function(a) {
                    frog1.innerHTML = '<img src="frog.png">'
                    anime({
                        targets: '.frog1',
                        rotate: 0,
                        duration: 500,
                        easing: 'linear',
                    })
                }
            })
        }
    })
    current_leaf1 = new_leaf1
}, 5500)

