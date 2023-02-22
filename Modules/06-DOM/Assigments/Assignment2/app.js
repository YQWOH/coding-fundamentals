const wrapper = document.querySelector(".wrapper")
const palette = document.querySelector(".palette")

document.addEventListener('keydown', (event) => {
    console.log("event.key: ", event.key);
    console.log("event:", event);
    
    if (event.ctrlKey && event.key === "k") {
        console.log("Ctrl + K");
        event.preventDefault();
        wrapper.classList.toggle("hidden");
        palette.classList.toggle("fade-out");
        palette.classList.toggle("fade-in");
    }
})
