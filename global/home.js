$('.return').on('mouseover', function() {
    anime({
        targets: '.return',
        width: '10vw',
        easing: 'easeInOutQuad',
        duration: 200,
    });

    anime({
        targets: '.icon',
        opacity: 1,
        easing: 'easeInOutQuad',
        duration: 200,
    });
});

$('.return').on('mouseout', function() {
    anime({
        targets: '.return',
        width: '5vw',
        easing: 'easeInOutQuad',
        duration: 200,
    });
    
    anime({
        targets: '.icon',
        opacity: 0,
        easing: 'easeInOutQuad',
        duration: 200,
    });
});

$('.return').on('click', function() {
    window.location.href = '../index.html';
})