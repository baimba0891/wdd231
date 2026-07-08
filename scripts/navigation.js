const menu = document.querySelector("#menu");
const nav = document.querySelector(".navigation");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");

    if(menu.innerHTML==="☰"){
        menu.innerHTML="✖";
    }else{
        menu.innerHTML="☰";
    }
});
