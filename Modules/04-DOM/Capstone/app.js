let header = document.querySelector(".header");
let test=document.querySelector('.home__username');
window.addEventListener("scroll", () => {
  const maxScroll = window.scrollY > 50 ? true : false;
  test.innerText = window.scrollY;
  if (maxScroll) {
    header.style.display='none'} 
    else {
    header.style.display='flex'
  }
});
// let test = document.querySelector('.home__username')
