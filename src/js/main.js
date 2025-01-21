const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav__mobile')

const handleNav = () =>{
    mobileNav.classList.toggle('nav__mobile--active')
    burgerBtn.classList.toggle('burger-btn--active')
}

burgerBtn.addEventListener('click', handleNav)