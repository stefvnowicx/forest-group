const burgerBtn = document.querySelector(".burger-btn");
const mobileNav = document.querySelector(".nav__mobile");
const links = document.querySelectorAll(".nav__desktop-link");
const allSections = document.querySelectorAll(".section");
const allMobileLinks = document.querySelectorAll(".nav__mobile-link");
const footerYear = document.querySelector(".footer__year");
const burgerBtnBars = document.querySelectorAll(".burger-btn__bars");
let sectionID;

// nawigacja
const handleNav = () => {
   mobileNav.classList.toggle("nav__mobile--active");
   burgerBtn.classList.toggle("burger-btn--active");
};
// nawigacja -- linki
allMobileLinks.forEach((link) => {
   link.addEventListener("click", handleNav);
});

burgerBtn.addEventListener("click", handleNav);

// animacje do linkow desktop przy hover
links.forEach((link) => {
   link.addEventListener("mouseenter", () => {
      links.forEach((otherLink) => {
         if (otherLink !== link) {
            otherLink.style.transform = "scale(0.85)";
            otherLink.classList.remove("nav__desktop-link--active");
         }
      });
      link.style.transform = "scale(1.1)";
   });
   link.addEventListener("mouseleave", () => {
      links.forEach((otherLink) => {
         if (otherLink !== link) {
            otherLink.style.transform = "scale(1)";
            if (otherLink.hash === `#${sectionID}`) {
               otherLink.classList.add("nav__desktop-link--active");
            }
         }
      });
      link.style.transform = "scale(1)";
   });
});

// footer
const handleCurrentYear = () => {
   const year = new Date().getFullYear();
   footerYear.innerText = year;
};
handleCurrentYear();
// scrollspy --- linki
const handleLinks = () => {
    links.forEach((link, index) => {
       link.classList.remove("nav__desktop-link--active");

       if (sectionID === "nav" && index === 0) {
          link.classList.add("nav__desktop-link--active");
       } else if (link.hash === `#${sectionID}`) {
          link.classList.add("nav__desktop-link--active");
       }
    });
    links.forEach((otherLink) => {
       if (!otherLink.classList.contains("nav__desktop-link--active")) {
        //   otherLink.style.transform = "scale(0.85)";
       } else {
          otherLink.style.transform = "scale(1)";
       }
    });
 };
// zmiana koloru burgera
const handleBurgerColors = () => {
   if (sectionID === "header" || sectionID === "divider") {
      burgerBtnBars.forEach((bar) => {
         bar.classList.add("burger-btn__bars-colored");
      });
   } else {
      burgerBtnBars.forEach((bar) => {
         bar.classList.remove("burger-btn__bars-colored");
      });
   }
};

const handleObserver = () => {
   const currentSection = window.scrollY;
   const width = window.innerWidth;
   let margin;

   if (width >= 576 && width <= 768) {
      margin = 50;
   } else if (width > 0 && width <= 576) {
      margin = -75;
   }

   allSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (currentSection <= 60) {
         sectionID = "nav";
         handleLinks()
         handleBurgerColors();
         return;
      }

      if (currentSection >= sectionTop - 60 && currentSection < sectionTop + sectionHeight - 60) {
         sectionID = section.getAttribute("id");
         handleLinks();
      }
      if (currentSection >= sectionTop && currentSection < sectionTop + sectionHeight - margin) {
         sectionID = section.getAttribute("id");
         handleBurgerColors();
      }
   });
};

window.addEventListener("scroll", handleObserver);

document.addEventListener("DOMContentLoaded", () => {
   handleObserver();
   handleBurgerColors();
});

