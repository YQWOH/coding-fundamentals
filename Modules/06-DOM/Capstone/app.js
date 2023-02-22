let header = document.querySelector(".header");

function showHeader() {
  header.style.transform ='translateY(0%)'
}

function hideHeader() {
  header.style.transform ='translateY(-100%)'
}

window.addEventListener("mouseover", e => {
  if (e.clientY <= 100) {
    showHeader()
}})

window.addEventListener("scroll", () => {
  const maxScroll = window.scrollY > 50

  if (maxScroll) {
    header.style.transform ='translateY(-100%)'
    header.addEventListener("mouseleave", e=> {hideHeader()})
  } else {
    header.style.transform ='translateY(0%)'
    header.addEventListener("mouseleave", e=> {showHeader()})
    }
});