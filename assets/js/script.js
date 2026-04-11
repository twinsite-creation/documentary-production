"use strict";

/* ───────────────── DOM ───────────────── */
const header =
  document.getElementById("site-header") || document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const yearEl = document.getElementById("year");

/* ─── FOOTER YEAR ─── */
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ─── SCROLL HANDLER (GLOBAL) ─── */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Header
  if (header) {
    header.classList.toggle("scrolled", scrollY > 50);
  }

  // Film nav
  const filmNav = document.getElementById("filmNav");
  if (filmNav) {
    filmNav.classList.toggle("scrolled", scrollY > 60);
  }

  // Hero fade
  const hero = document.getElementById("hero");
  const heroContent = document.getElementById("heroContent");
  const headerLogo = document.getElementById("headerLogo");

  if (hero && heroContent && headerLogo) {
    const progress = Math.min(scrollY / (hero.offsetHeight * 0.5), 1);

    heroContent.style.opacity = 1 - progress;
    heroContent.style.transform = `translateY(${progress * 40}px)`;

    headerLogo.classList.toggle("visible", progress > 0.4);
  }

  // Parallax beams
  const beams = document.querySelectorAll(".hero-beam");
  if (beams.length) {
    const s = scrollY * 0.15;
    beams.forEach((b, i) => {
      b.style.transform = `rotate(${i === 0 ? -8 : i === 2 ? 6 : 0}deg) translateY(${s * (i + 1) * 0.3}px)`;
    });
  }
});

/* ─── MOBILE NAV ─── */
function toggleMenu(forceClose = false) {
  if (!navMenu || !navToggle) return;

  const isOpen = navMenu.classList.contains("is-open");

  if (forceClose || isOpen) {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("open");
    document.body.style.overflow = "";
  } else {
    navMenu.classList.add("is-open");
    navToggle.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => toggleMenu());
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(true));
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

/* ─── SCROLL REVEAL (ЄДИНА ВЕРСІЯ) ─── */
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ─── FILM GRAIN ─── */
const canvas = document.getElementById("grain");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeGrain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeGrain();
  window.addEventListener("resize", resizeGrain);

  let grainFrame = 0;

  function drawGrain() {
    const img = ctx.createImageData(canvas.width, canvas.height);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = Math.random() * 40;
    }

    ctx.putImageData(img, 0, 0);

    grainFrame++;
    if (grainFrame % 2 === 0) requestAnimationFrame(drawGrain);
    else setTimeout(() => requestAnimationFrame(drawGrain), 50);
  }

  drawGrain();
}

/* ─── FILM STRIPS ─── */
function buildStrip(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const html = Array(60).fill('<div class="strip-hole"></div>').join("");
  el.innerHTML = html + html;
}

buildStrip("stripLeft");
buildStrip("stripRight");

/* ─── FILMS ORBIT ANIMATION ─── */
const filmsOrbit = document.getElementById("filmsOrbit");

if (filmsOrbit) {
  const filmCards = filmsOrbit.querySelectorAll(".film-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          filmCards.forEach((c) => c.classList.add("gathering"));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(filmsOrbit);
}

/* ─── PRODUCTIONS SEE MORE ─── */
let productionsOpen = false;

window.toggleProductions = function () {
  productionsOpen = !productionsOpen;

  const items = document.querySelectorAll(".production-item.hidden-item");
  const btn = document.getElementById("seeMoreBtn");
  const txt = document.getElementById("seeMoreText");

  items.forEach((item, i) => {
    item.style.animationDelay = i * 0.1 + "s";
    item.classList.toggle("revealed", productionsOpen);
  });

  if (txt) txt.textContent = productionsOpen ? "Collapse" : "See more";
  if (btn) btn.classList.toggle("open", productionsOpen);
};

/* ─── MOBILE MENU (ALT VERSION) ─── */
const mobileMenu = document.getElementById("mobileMenu");
const burger = document.getElementById("burger");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  });
}

/* ─── LANGUAGE SWITCH ─── */
window.setLang = function (lang) {
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === lang);
  });
};

/* ─── FILM ACCORDION + HASH ─── */
(function () {
  const cards = document.querySelectorAll(".film-card[data-film]");
  if (!cards.length) return;

  function openFilm(id) {
    cards.forEach((card) => {
      card.classList.toggle("film-open", card.dataset.film === id);
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.film;
      const isOpen = card.classList.contains("film-open");

      if (isOpen) {
        history.pushState(null, "", "#films");
        openFilm(null);
      } else {
        history.pushState(null, "", `#films-${id}`);
        openFilm(id);
      }
    });
  });

  const hash = window.location.hash;
  if (hash.startsWith("#films-")) {
    const id = hash.replace("#films-", "");
    setTimeout(() => openFilm(id), 500);
  }
})();
