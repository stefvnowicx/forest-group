const burgerBtn = document.querySelector('.burger-btn')
const mobileNav = document.querySelector('.nav__mobile')

const allMobileLinks = document.querySelectorAll('.nav__mobile-link')

const handleNav = () =>{
    mobileNav.classList.toggle('nav__mobile--active')
    burgerBtn.classList.toggle('burger-btn--active')
}

allMobileLinks.forEach(link => {
    link.addEventListener('click', handleNav)
})

burgerBtn.addEventListener('click', handleNav)