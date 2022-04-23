const headerBurgerMenuIcon = document.querySelector(".header-content__burger");
const burgerMenu = document.querySelector(".page-header__menu");
(function clickBurgerMenu() {
    headerBurgerMenuIcon.addEventListener("click", () => {
        headerBurgerMenuIcon.classList.toggle("active")
        if (headerBurgerMenuIcon.classList.contains("active")) {
            document.querySelector(".page-header__menu").classList.add("active")
        } else {
            document.querySelector(".page-header__menu").classList.remove("active")
        }
    })
}());
window.addEventListener("click", e => {
    const target = e.target
    if (!target.closest(".header-content__burger") && !target.closest(".page-header__menu")) {
        burgerMenu.classList.remove("active");
        headerBurgerMenuIcon.classList.remove("active");
    }
})
document.querySelector(".prising-list").addEventListener("click", e => {
    if (e.target.classList.contains("prising-list__card")) {
        document.querySelector(".prising-list .prising-list__active-card").classList.remove("prising-list__active-card");
        e.target.classList.add("prising-list__active-card");
    }
})

