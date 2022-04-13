let button = document.querySelector('.button');
let circle = document.querySelector('.circle');
let container = document.querySelector('.container');
let timer;

button.addEventListener("click", function(e) {
  if (typeof timer != "undefined") {
    clearInterval(timer);
  }

  let width = 0;
  let opacity = 1;
  let offsetLeft = button.offsetLeft;
  let offsetTop = button.offsetTop;

  timer = setInterval(function () {
    width++;
    circle.style.width = `${width}px`;
    circle.style.height = `${width}px`;
    circle.style.opacity = opacity;
    circle.style.left = `${e.pageX - offsetLeft - width / 2}px`;
    circle.style.top = `${e.pageY - offsetTop - width / 2}px`;
    opacity = opacity - 0.01;
    if (parseInt(getComputedStyle(circle).width) == 100) {
      clearInterval(timer);
    }
  }, 3);
});

