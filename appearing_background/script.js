let container = document.querySelector(".container");
let circle = document.querySelector(".circle");
let size = parseInt(getComputedStyle(circle).width);

container.addEventListener("mousemove", (e) => {
  circle.style.transform = `translate(${e.pageX - size / 2}px, ${e.pageY - size / 2}px)`;
  circle.style.backgroundPosition = `${-e.pageX + size / 2}px ${-e.pageY + size / 2}px`;
});