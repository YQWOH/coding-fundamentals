const register = document.querySelector(".register");
const wrapper = document.querySelector(".wrapper");
const closeButton = document.querySelector(".close-button");
const slideOverPanel = document.querySelector(".slide-over-panel");


register.addEventListener("click", function() {
    wrapper.classList.remove("hidden");
    slideOverPanel.classList.add("slide-in");
});

closeButton.addEventListener("click", function() {
    wrapper.classList.add("hidden");
})

