// Variables & Selectores

// ScrollTop

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("scrollTop");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#F3CF02 ${scrollValue}%, #D7D7D7 ${scrollValue}%)`;
};

// Year
const yearNow = document.querySelector("#footer .copyright #dateNow");

// navHamburger
const hamburgerOpen = document.querySelector("#navbar .hamburger #open");
const hamburgerClose = document.querySelector("#navbar .hamburger #close");
const menu = document.querySelector("#menuResponsive");
const linksMenu = document.querySelector("#menuResponsive .contentLinks");
let execFunction = true;

// Ubication Link
const links = document.querySelectorAll(".links li");
const ubication = ["home", "about", "services", "products", "contact"];

// Variables & Selectores

// EventListener & Init
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
document.addEventListener("DOMContentLoaded", showUbication);
document.addEventListener("DOMContentLoaded", (e) => {
  if (e.target.body.getAttribute("id") === "home") {
    splide();
  } else {
    return;
  }
});
document.addEventListener("scroll", fix);
hamburgerOpen.addEventListener("click", (e) => {
  if (execFunction) {
    new openMenu(true);
  } else {
    e.preventDefault();
  }
});
hamburgerClose.addEventListener("click", (e) => {
  if (execFunction) {
    e.preventDefault();
  } else {
    closeMenu();
  }
});

// EventListener & Init

// Funciones

Year();

function showUbication(e) {
  for (let i = 0; i < ubication.length; i++) {
    if (e.target.body.getAttribute("id") === ubication[i]) {
      links.forEach((link) => {
        if (parseFloat(link.getAttribute("data-id")) === i) {
          link.classList.add("active");
        }
      });
      new openMenu(false).sections.forEach((responsive) => {
        if (parseFloat(responsive.getAttribute("data-id")) === i) {
          responsive.classList.add("focus");
        }
      });
    }
  }
}

function fix() {
  const navBar = document.querySelector("#navbar");

  const ubication = navBar.getBoundingClientRect();

  if (ubication.top < -78) {
    navBar.style.position = "fixed";
    navBar.style.boxShadow = "0 0 10px rgba(17, 17, 17, 0.26)";
  } else if (window.scrollY < 68) {
    navBar.style.removeProperty("position");
    navBar.style.removeProperty("box-shadow");
  }
}

var openMenu = function (exec) {
  this.sections = document.querySelectorAll(".contentLinks a li");

  if (exec) {
    hamburgerOpen.style.display = "none";
    hamburgerClose.style.display = "block";
    menu.classList.add("visible");
    linksMenu.classList.add("open");

    if (linksMenu.classList.contains("open")) {
      setTimeout(() => {
        linksMenu.style.height = "400px";
      }, 100);
      setTimeout(() => {
        this.sections.forEach((menu) => {
          menu.style.setProperty("--menu", 1);
          menu.style.setProperty("--translate", "translateX(0)");
          setTimeout(() => {
            execFunction = false;
          }, 100);
        });
      }, 400);
    }
  } else {
    return;
  }
};

function closeMenu() {
  const sections = document.querySelectorAll(".contentLinks a li");

  sections.forEach((menu) => {
    menu.style.removeProperty("--menu");
    menu.style.removeProperty("--translate");
  });

  linksMenu.style.removeProperty("height");

  if (!linksMenu.style[0]) {
    setTimeout(() => {
      hamburgerOpen.style.removeProperty("display");
      hamburgerClose.style.removeProperty("display");
      menu.classList.remove("visible");
      linksMenu.classList.remove("open");
      setTimeout(() => {
        if (!linksMenu.classList.contains(open)) {
          execFunction = true;
        }
      }, 50);
    }, 500);
  }
}

function splide() {
  var splide = new Splide(".splide", {
    type: "loop",
    autoplay: true,
    pauseOnHover: true,
  });
  splide.mount();
}

function Year() {
  const dayNow = new Date();

  yearNow.textContent = dayNow.getFullYear();
}
