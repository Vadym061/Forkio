export function burgerMenu(){

const headerBurgerMenuIcon = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".header__navigation");

    (function clickBurgerMenu() {
        headerBurgerMenuIcon.addEventListener("click", () => {
            headerBurgerMenuIcon.classList.toggle("active")
            if (headerBurgerMenuIcon.classList.contains("active")) {
                document.querySelector(".header__navigation").classList.add("active")
            } else {
                document.querySelector(".header__navigation").classList.remove("active")
            }
        })
    }());
    window.addEventListener("click", e => {
        const target = e.target
        if (!target.closest(".header__burger") && !target.closest(".header__navigation")) {
            burgerMenu.classList.remove("active");
            headerBurgerMenuIcon.classList.remove("active");
        }
    });
}