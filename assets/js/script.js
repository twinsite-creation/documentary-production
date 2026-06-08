"use strict";

/* ─────────────────────────────────────────────
     TEAM DATA — збережено без змін
   ───────────────────────────────────────────── */
const TEAM = {
  "marta-hryhorenko": {
    name: "Marta Hryhorenko",
    role: "Director",
    index: "01 / 03",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    bio: [
      "Marta Hryhorenko is an award-winning documentary director whose work spans a decade of filmmaking in Eastern Europe. Her films have screened at IDFA, Berlinale, Venice, and Sundance — and have been broadcast in over forty countries.",
      'She studied directing at the Kyiv National I.K. Karpenko-Kary Theatre, Cinema and Television University and later completed a fellowship at the Berlinale Talents programme. Her approach is rooted in what she calls "patient cinema" — long-form observation that refuses to arrive at conclusions before the subject is ready.',
      "Marta currently divides her time between Kyiv and Warsaw, where she is in development on a new feature examining the post-war reconstruction of identity in southern Ukraine.",
    ],
    films: [
      {
        id: "iron-cartography",
        title: "Iron Cartography",
        meta: "2023 · Feature",
      },
      {
        id: "shadows-of-kyiv",
        title: "Shadows of Kyiv",
        meta: "2022 · Feature",
      },
      {
        id: "the-last-witness",
        title: "The Last Witness",
        meta: "2021 · Short",
      },
      { id: "dust-and-memory", title: "Dust & Memory", meta: "2020 · Feature" },
      { id: "silent-archive", title: "Silent Archive", meta: "2019 · Short" },
    ],
    prev: null,
    next: "dmytro-savchenko",
  },
  "dmytro-savchenko": {
    name: "Dmytro Savchenko",
    role: "Producer",
    index: "02 / 03",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85",
    bio: [
      "Dmytro Savchenko has produced fourteen documentary features and over twenty shorts across Europe and the Middle East. He entered the industry as a fixer in conflict zones and carries that discipline into every production — calm under pressure, precise in everything.",
      "His producing philosophy is one of radical trust: in the director's instinct, in the subject's time, and in the audience's intelligence. He does not rush stories to their conclusions.",
      "Dmytro holds an MA in International Film Business from the London Film School and serves on the advisory board of DocuDays UA International Human Rights Documentary Film Festival.",
    ],
    films: [
      {
        id: "iron-cartography",
        title: "Iron Cartography",
        meta: "2023 · Feature",
      },
      {
        id: "shadows-of-kyiv",
        title: "Shadows of Kyiv",
        meta: "2022 · Feature",
      },
      {
        id: "the-last-witness",
        title: "The Last Witness",
        meta: "2021 · Short",
      },
      { id: "dust-and-memory", title: "Dust & Memory", meta: "2020 · Feature" },
    ],
    prev: "marta-hryhorenko",
    next: "olena-bondar",
  },
  "olena-bondar": {
    name: "Olena Bondar",
    role: "Editor",
    index: "03 / 03",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85",
    bio: [
      "Olena Bondar assembles silence as much as image. Her editorial approach — developed across twelve years and over thirty projects — treats each cut not as a break but as a breath: the space between where meaning lives.",
      "Trained at the National Film School of Łódź, Olena has collaborated with directors across Ukraine, Poland, Germany, and Georgia. She brings to each project an acute sensitivity to pacing, an architectural eye for structure, and an unwillingness to let beauty override truth.",
      'Her work on Dust & Memory was cited by DOK Leipzig\'s jury for "an editorial intelligence that transforms documentation into poetry." She is currently editing two features simultaneously — a practice she describes as "the best way to stay honest about both."',
    ],
    films: [
      {
        id: "iron-cartography",
        title: "Iron Cartography",
        meta: "2023 · Feature",
      },
      {
        id: "shadows-of-kyiv",
        title: "Shadows of Kyiv",
        meta: "2022 · Feature",
      },
      { id: "dust-and-memory", title: "Dust & Memory", meta: "2020 · Feature" },
      { id: "silent-archive", title: "Silent Archive", meta: "2019 · Short" },
    ],
    prev: "dmytro-savchenko",
    next: null,
  },
};

/* ─────────────────────────────────────────────
     ЗМІНА 1: FILM STRIPS — CINEMATIC LAYOUT
     При кліку strip розширюється, показує info panel.
     Інші strips стискаються і затемнюються.
     Hash navigation збережено.
   ───────────────────────────────────────────── */
let _activeFilmCard = null;

function openFilmCard(id) {
  const stage = document.getElementById("filmsOrbit");
  const target = document.getElementById("film-" + id);
  if (!target) return;

  /* Close previous without hash update */
  if (_activeFilmCard && _activeFilmCard !== target) {
    _closeStripInternal(_activeFilmCard);
  }

  _activeFilmCard = target;

  /* Mark stage as having an active strip */
  stage.classList.add("has-active");

  /* Activate target */
  target.classList.add("strip-active");
  target.setAttribute("aria-expanded", "true");
  const info = target.querySelector(".fstrip-info");
  if (info) {
    info.setAttribute("aria-hidden", "false");
    /* Stagger content reveal */
    info
      .querySelectorAll(
        ".fsi-meta, .fsi-title, .fsi-year-large, .fsi-tagline, .fsi-synopsis, .fsi-credits, .fsi-awards, .fsi-actions",
      )
      .forEach((el, i) => {
        el.style.transitionDelay = 0.18 + i * 0.055 + "s";
      });
  }

  /* Dim all other strips */
  stage.querySelectorAll(".film-strip:not(.strip-active)").forEach((s) => {
    s.classList.add("strip-dim");
  });

  /* Hash */
  history.pushState({ film: id }, "", "#film-" + id);
}

function _closeStripInternal(strip) {
  const stage = document.getElementById("filmsOrbit");
  strip.classList.remove("strip-active");
  strip.setAttribute("aria-expanded", "false");
  const info = strip.querySelector(".fstrip-info");
  if (info) {
    info.setAttribute("aria-hidden", "true");
    /* Reset delays */
    info
      .querySelectorAll("[style]")
      .forEach((el) => (el.style.transitionDelay = ""));
  }
  stage
    .querySelectorAll(".film-strip")
    .forEach((s) => s.classList.remove("strip-dim"));
  stage.classList.remove("has-active");
}

function closeFilmCard(stripOrId, updateHash = true) {
  const strip =
    typeof stripOrId === "string"
      ? document.getElementById("film-" + stripOrId)
      : stripOrId;
  if (!strip) return;

  _closeStripInternal(strip);
  if (_activeFilmCard === strip) _activeFilmCard = null;
  if (updateHash) history.pushState(null, "", window.location.pathname);
}

/* Click handlers for film strips */
document
  .getElementById("filmsOrbit")
  .querySelectorAll(".film-strip[data-film]")
  .forEach((strip) => {
    strip.addEventListener("click", (e) => {
      if (e.target.closest(".fsi-close")) return;
      if (e.target.closest(".fsi-cta")) return; /* let link work */

      const id = strip.dataset.film;
      if (strip.classList.contains("strip-active")) {
        closeFilmCard(strip);
      } else {
        openFilmCard(id);
      }
    });

    strip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = strip.dataset.film;
        if (strip.classList.contains("strip-active")) {
          closeFilmCard(strip);
        } else {
          openFilmCard(id);
        }
      }
    });
  });

/* Close buttons inside strips */
document.querySelectorAll(".fstrip-info .fsi-close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const strip = btn.closest(".film-strip");
    if (strip) closeFilmCard(strip);
  });
});

/* ─────────────────────────────────────────────
     ЗМІНА 2: PRODUCTIONS LIST ACCORDION
     Відкривається на місці, один за раз.
     Hash navigation збережено.
   ───────────────────────────────────────────── */
let _activeProdItem = null;

function openProdDetail(item) {
  /* Close previous */
  if (_activeProdItem && _activeProdItem !== item) {
    closeProdDetail(_activeProdItem, false);
  }

  _activeProdItem = item;
  item.classList.add("prod-open");

  const panel = item.querySelector(".prod-detail-panel");
  if (panel) panel.setAttribute("aria-hidden", "false");

  const expandBtn = item.querySelector(".prod-expand-btn");
  if (expandBtn) expandBtn.setAttribute("aria-expanded", "true");

  const id = item.dataset.film;
  history.pushState({ film: id }, "", "#film-" + id);

  /* Smooth scroll to item */
  setTimeout(() => {
    item.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 80);
}

function closeProdDetail(item, updateHash = true) {
  item.classList.remove("prod-open");

  const panel = item.querySelector(".prod-detail-panel");
  if (panel) panel.setAttribute("aria-hidden", "true");

  const expandBtn = item.querySelector(".prod-expand-btn");
  if (expandBtn) expandBtn.setAttribute("aria-expanded", "false");

  if (_activeProdItem === item) _activeProdItem = null;
  if (updateHash) history.pushState(null, "", window.location.pathname);
}

document.querySelectorAll(".production-item[data-film]").forEach((item) => {
  /* Expand/collapse entire film panel via prod-row or expand button */
  const row = item.querySelector(".prod-row");
  const expandBtn = item.querySelector(".prod-expand-btn");

  function handleProdToggle(e) {
    if (e.target.closest(".pdp-close") || e.target.closest(".film-acc-trigger"))
      return;
    if (item.classList.contains("prod-open")) {
      closeProdDetail(item);
    } else {
      openProdDetail(item);
    }
  }

  if (row) row.addEventListener("click", handleProdToggle);
  if (expandBtn)
    expandBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleProdToggle(e);
    });
});

/* Production close button */
document.querySelectorAll(".prod-detail-panel .pdp-close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = btn.closest(".production-item");
    if (item) closeProdDetail(item);
  });
});

/* ─── Inner film accordion (Film Details, Synopsis, Stills, Trailer, Festivals) ─── */
document.querySelectorAll(".film-acc-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const accItem = trigger.closest(".film-acc-item");
    const isOpen = accItem.classList.contains("film-acc-open");

    if (isOpen) {
      accItem.classList.remove("film-acc-open");
      trigger.setAttribute("aria-expanded", "false");
    } else {
      accItem.classList.add("film-acc-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

/* ─────────────────────────────────────────────
     ЗМІНА 3: HASH NAVIGATION (film cards + productions)
     Відкриває правильний елемент при завантаженні або popstate.
   ───────────────────────────────────────────── */
function handleFilmHash(id) {
  /* Try film card first */
  const card = document.getElementById("film-" + id);
  if (card) {
    openFilmCard(id);
    const filmsSection = document.getElementById("films");
    setTimeout(() => {
      if (filmsSection)
        filmsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      else card.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
    return;
  }
  /* Try production item */
  const prodItem = document.querySelector(
    `.production-item[data-film="${id}"]`,
  );
  if (prodItem) {
    /* Reveal hidden items first if needed */
    if (
      prodItem.classList.contains("hidden-item") &&
      !prodItem.classList.contains("revealed")
    ) {
      toggleProductions();
    }
    openProdDetail(prodItem);
  }
}

(function initFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#film-")) {
    handleFilmHash(hash.slice(6));
  } else if (hash.startsWith("#team-")) {
    openTeamMember(hash.slice(6));
  }
})();

window.addEventListener("popstate", () => {
  const hash = window.location.hash;
  if (hash.startsWith("#film-")) {
    handleFilmHash(hash.slice(6));
  } else if (hash.startsWith("#team-")) {
    openTeamMember(hash.slice(6));
  } else {
    /* Close all open films */
    if (_activeFilmCard) closeFilmCard(_activeFilmCard, false);
    if (_activeProdItem) closeProdDetail(_activeProdItem, false);
    if (_activeTeamOverlay) closeTeamOverlay(false);
  }
});

/* ─────────────────────────────────────────────
     TEAM OVERLAY — збережено, функції перейменовані
     для уникнення конфлікту з видаленим film overlay
   ───────────────────────────────────────────── */
let _savedScrollY = 0;
let _activeTeamOverlay = null;

function renderTeamOverlay(id) {
  const m = TEAM[id];
  if (!m) return "";

  const bioParas = m.bio.map((p) => `<p>${p}</p>`).join("");
  const filmItems = m.films
    .map(
      (f) =>
        `<li><span class="film-entry-title" onclick="openFilmCard('${f.id}'); closeTeamOverlay();">${f.title}</span><span class="film-entry-meta">${f.meta}</span></li>`,
    )
    .join("");

  const prevBtn = m.prev
    ? `<button class="fof-link prev" onclick="openTeamMember('${m.prev}')">${TEAM[m.prev].name}</button>`
    : `<span class="fof-link prev" onclick="closeTeamOverlay()">All Team</span>`;
  const nextBtn = m.next
    ? `<button class="fof-link next" onclick="openTeamMember('${m.next}')">${TEAM[m.next].name}</button>`
    : `<span class="fof-link next" style="visibility:hidden">—</span>`;

  return `
    <div class="team-overlay-inner">
      <div class="team-overlay-img-col">
        <img src="${m.photo}" alt="${m.name}">
        <div class="team-overlay-img-overlay"></div>
      </div>
      <div class="team-overlay-content">
        <div class="profile-index">${m.index}</div>
        <div class="profile-role-tag">${m.role}</div>
        <h1 class="profile-name-h">${m.name.replace(" ", "<br>")}</h1>
        <div class="profile-divider"></div>
        <div class="profile-bio-text">${bioParas}</div>
        <div class="filmography-label">Filmography</div>
        <ul class="filmography-list">${filmItems}</ul>
        <div style="display:flex;gap:32px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.05)">
          ${prevBtn}
          ${nextBtn}
        </div>
      </div>
    </div>
  `;
}

function openTeamMember(id) {
  /* Used by hash navigation — maps to new inline row system */
  const item = document.querySelector(`.team-item[data-team="${id}"]`);
  if (item) {
    openTeamItem(item);
    setTimeout(
      () => item.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
  }
}

function closeTeamOverlay(updateHash = true) {
  document.getElementById("teamOverlay").classList.remove("is-open");
  document.body.style.overflow = "";
  _activeTeamOverlay = null;
  if (updateHash) history.pushState(null, "", window.location.pathname);
  setTimeout(() => window.scrollTo(0, _savedScrollY), 50);
}

/* Legacy alias so inline onclick="closeOverlay()" in team overlay HTML still works */
function closeOverlay() {
  closeTeamOverlay();
}

/* Keyboard ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (_activeTeamOverlay) closeTeamOverlay();
    if (_activeTeamItem) closeTeamItem(_activeTeamItem);
    if (_activeFilmCard) closeFilmCard(_activeFilmCard);
    if (_activeProdItem) closeProdDetail(_activeProdItem);
  }
});

/* ─────────────────────────────────────────────
     TEAM ROWS — inline expand/collapse (one at a time)
   ───────────────────────────────────────────── */
let _activeTeamItem = null;

function openTeamItem(item) {
  if (_activeTeamItem && _activeTeamItem !== item) {
    closeTeamItem(_activeTeamItem);
  }
  _activeTeamItem = item;
  item.classList.add("team-item-open");
  const panel = item.querySelector(".team-detail-panel");
  if (panel) panel.setAttribute("aria-hidden", "false");
  const btn = item.querySelector(".team-row-toggle");
  if (btn) {
    btn.setAttribute("aria-expanded", "true");
    const label = btn.querySelector(".team-row-toggle-label");
    if (label) label.textContent = "Close";
  }
  const id = item.dataset.team;
  if (id) history.pushState({ team: id }, "", `#team-${id}`);
  setTimeout(
    () => item.scrollIntoView({ behavior: "smooth", block: "nearest" }),
    80,
  );
}

function closeTeamItem(item, updateHash = true) {
  item.classList.remove("team-item-open");
  const panel = item.querySelector(".team-detail-panel");
  if (panel) panel.setAttribute("aria-hidden", "true");
  const btn = item.querySelector(".team-row-toggle");
  if (btn) {
    btn.setAttribute("aria-expanded", "false");
    const label = btn.querySelector(".team-row-toggle-label");
    if (label) label.textContent = "Open";
  }
  if (_activeTeamItem === item) _activeTeamItem = null;
  if (updateHash) history.pushState(null, "", window.location.pathname);
}

document.querySelectorAll(".team-item[data-team]").forEach((item) => {
  const row = item.querySelector(".team-row");
  if (row) {
    row.addEventListener("click", () => {
      if (item.classList.contains("team-item-open")) {
        closeTeamItem(item);
      } else {
        openTeamItem(item);
      }
    });
  }
});

/* Inner team accordions (About / Filmography) */
document.querySelectorAll(".team-acc-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const acc = trigger.closest(".team-acc-item");
    const isOpen = acc.classList.contains("team-acc-open");
    if (isOpen) {
      acc.classList.remove("team-acc-open");
      trigger.setAttribute("aria-expanded", "false");
    } else {
      acc.classList.add("team-acc-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

/* Read more inside About */
document.querySelectorAll(".team-read-more").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const more = btn.previousElementSibling;
    const expanded = more.classList.toggle("expanded");
    btn.classList.toggle("expanded", expanded);
    btn.childNodes[0].textContent = expanded ? "Read less " : "Read more ";
  });
});

/* Filmography film links inside team rows */
document.querySelectorAll(".tf-title[data-film]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = el.dataset.film;
    openFilmCard(id);
    /* Scroll to #films section so the strip is visible */
    const filmsSection = document.getElementById("films");
    if (filmsSection) {
      setTimeout(() => {
        filmsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  });
});

/* ─────────────────────────────────────────────
     FILM GRAIN
   ───────────────────────────────────────────── */
const canvas = document.getElementById("grain");
const ctx = canvas.getContext("2d");
function resizeGrain() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeGrain();
window.addEventListener("resize", resizeGrain);
let gf = 0;
function drawGrain() {
  const img = ctx.createImageData(canvas.width, canvas.height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = d[i + 1] = d[i + 2] = v;
    d[i + 3] = Math.random() * 40;
  }
  ctx.putImageData(img, 0, 0);
  gf++;
  if (gf % 2 === 0) requestAnimationFrame(drawGrain);
  else setTimeout(() => requestAnimationFrame(drawGrain), 50);
}
drawGrain();

/* ─────────────────────────────────────────────
     FILM STRIPS
   ───────────────────────────────────────────── */
function buildStrip(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const h = Array(60).fill('<div class="strip-hole"></div>').join("");
  el.innerHTML = h + h;
}
buildStrip("stripLeft");
buildStrip("stripRight");

/* ─────────────────────────────────────────────
     HEADER SCROLL + HERO FADE
   ───────────────────────────────────────────── */
const hdr = document.getElementById("header");
const hdrLogo = document.getElementById("headerLogo");
const heroContent = document.getElementById("heroContent");

window.addEventListener("scroll", () => {
  if (_activeTeamOverlay) return;
  const sy = window.scrollY;
  hdr.classList.toggle("scrolled", sy > 50);
  const prog = Math.min(
    sy / (document.getElementById("hero").offsetHeight * 0.5),
    1,
  );
  heroContent.style.opacity = 1 - prog;
  heroContent.style.transform = `translateY(${prog * 40}px)`;
  // Logo always visible — hdrLogo.classList.toggle removed

  document.querySelectorAll(".hero-beam").forEach((b, i) => {
    const s = sy * 0.15;
    b.style.transform = `rotate(${i === 0 ? -8 : i === 2 ? 6 : 0}deg) translateY(${s * (i + 1) * 0.3}px)`;
  });
});

/* ─────────────────────────────────────────────
     SCROLL REVEAL
   ───────────────────────────────────────────── */
const revObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

/* ─────────────────────────────────────────────
     FILMS GATHER ANIMATION
   ───────────────────────────────────────────── */
/* ЗМІНА 1: Updated to use .film-strip and strip-visible */
const orbitEl = document.getElementById("filmsOrbit");
const gatherObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        orbitEl.querySelectorAll(".film-strip").forEach((c, i) => {
          setTimeout(() => c.classList.add("strip-visible"), i * 90);
        });
        gatherObs.disconnect();
      }
    }),
  { threshold: 0.1 },
);
gatherObs.observe(orbitEl);

/* ─────────────────────────────────────────────
     PRODUCTIONS SEE MORE
   ───────────────────────────────────────────── */
let productionsOpen = false;
function toggleProductions() {
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
}

/* ─────────────────────────────────────────────
     MOBILE MENU
   ───────────────────────────────────────────── */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const mmClose = document.getElementById("mmClose");
const mmLogoLink = document.querySelector(".mobile-menu .header-logo");
if (mmLogoLink) mmLogoLink.addEventListener("click", closeMenu);

function toggleMenu() {
  const open = mobileMenu.classList.toggle("open");
  burger.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
function closeMenu() {
  burger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

burger.addEventListener("click", toggleMenu);
mmClose.addEventListener("click", closeMenu);
mobileMenu
  .querySelectorAll("a[href]")
  .forEach((a) => a.addEventListener("click", closeMenu));

/* ─────────────────────────────────────────────
     LANGUAGE SWITCH
   ───────────────────────────────────────────── */
function setLang(lang) {
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === lang);
  });
}

const btt = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  btt.classList.toggle("visible", window.scrollY > 600);
});

/* ─────────────────────────────────────────────
     FSTRIP-INFO SCROLL FADE HINT
   ───────────────────────────────────────────── */
function initFstripScrollHint(panel) {
  function checkScroll() {
    const atEnd = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 8;
    panel.classList.toggle('scrolled-end', atEnd);
  }
  panel.addEventListener('scroll', checkScroll, { passive: true });
  // Re-check when strip becomes active (content reflows)
  const observer = new MutationObserver(checkScroll);
  observer.observe(panel.closest('.film-strip'), { attributes: true, attributeFilter: ['class'] });
  checkScroll();
}

document.querySelectorAll('.fstrip-info').forEach(initFstripScrollHint);

/* ─────────────────────────────────────────────
     PRODUCTIONS FILTER SYSTEM
     Масштабований: нові значення — лише новий <button> в HTML.
     Логіка не потребує змін при розширенні до 15+ фільмів.
   ───────────────────────────────────────────── */
(function initProductionFilters() {
  const filtersEl = document.getElementById('prodFilters');
  const listEl = document.getElementById('productionsList');
  const countEl = document.getElementById('pfCount');
  const resetBtn = document.getElementById('pfReset');
  if (!filtersEl || !listEl) return;

  /*
   * Active filter state: { groupName: activeValue | null }
   * null means no filter for that group (show all).
   */
  const activeFilters = {};

  /* Build initial state from groups */
  filtersEl.querySelectorAll('[data-filter-group]').forEach(group => {
    const groupName = group.dataset.filterGroup;
    activeFilters[groupName] = null;
  });

  /* Map group names to data-attributes on production-item */
  const GROUP_TO_ATTR = {
    'status':    'status',
    'format':    'format',
    'genre':     'genre',
    'prod-type': 'prodType',
  };

  /* ── Chip click handler ── */
  filtersEl.querySelectorAll('.pf-group').forEach(group => {
    const groupName = group.dataset.filterGroup;

    group.querySelectorAll('.pf-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const value = chip.dataset.value;
        const current = activeFilters[groupName];

        if (current === value) {
          /* Toggle off — reset this group */
          activeFilters[groupName] = null;
        } else {
          activeFilters[groupName] = value;
        }

        updateChipStates(group, groupName);
        applyFilters();
      });
    });
  });

  function updateChipStates(group, groupName) {
    const activeVal = activeFilters[groupName];
    group.querySelectorAll('.pf-chip').forEach(c => {
      c.classList.remove('pf-chip--active', 'pf-chip--inactive');
      if (activeVal === null) {
        /* Nothing selected — all chips neutral */
        return;
      }
      if (c.dataset.value === activeVal) {
        c.classList.add('pf-chip--active');
      } else {
        c.classList.add('pf-chip--inactive');
      }
    });
  }

  const scrollHintEl = document.getElementById('pfScrollHint');

  function applyFilters() {
    const items = listEl.querySelectorAll('.production-item[data-film]');
    let visibleCount = 0;
    let hasActiveFilter = false;

    Object.values(activeFilters).forEach(val => {
      if (val !== null) hasActiveFilter = true;
    });

    items.forEach(item => {
      const matches = itemMatchesAllFilters(item);
      if (matches) {
        item.classList.remove('pf-hidden');
        visibleCount++;
      } else {
        item.classList.add('pf-hidden');
        if (item.classList.contains('prod-open')) {
          closeProdDetail(item, false);
        }
      }
    });

    const total = items.length;
    countEl.textContent = hasActiveFilter
      ? `${visibleCount} of ${total} film${total !== 1 ? 's' : ''}`
      : `${total} film${total !== 1 ? 's' : ''}`;

    resetBtn.classList.toggle('visible', hasActiveFilter);

    /* ── Filtered scroll mode ── */
    listEl.classList.toggle('pf-filtered', hasActiveFilter);
    if (hasActiveFilter) {
      /* Scroll list back to top when filter changes */
      listEl.scrollTop = 0;
    }
    if (scrollHintEl) {
      scrollHintEl.classList.toggle('visible', hasActiveFilter);
    }

    let noResults = listEl.querySelector('.pf-no-results');
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.className = 'pf-no-results';
      noResults.textContent = 'No films match the selected filters.';
      listEl.appendChild(noResults);
    }
    noResults.classList.toggle('visible', visibleCount === 0);
  }

  function itemMatchesAllFilters(item) {
    for (const [groupName, activeVal] of Object.entries(activeFilters)) {
      if (activeVal === null) continue;

      const attrKey = GROUP_TO_ATTR[groupName];
      const itemValues = (item.dataset[attrKey] || '').trim().toLowerCase().split(/\s+/);

      if (!itemValues.includes(activeVal)) return false;
    }
    return true;
  }

  /* Reset all filters */
  resetBtn.addEventListener('click', () => {
    filtersEl.querySelectorAll('[data-filter-group]').forEach(group => {
      const groupName = group.dataset.filterGroup;
      activeFilters[groupName] = null;
      updateChipStates(group, groupName);
    });
    applyFilters();
  });

  /* Initial count render */
  applyFilters();
})();

/* ═══════════════════════════════════════════════
   FILM STILLS SLIDER  — peek / multi-visible
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  function initSlider(slider) {
    if (slider.dataset.sliderInit) return;
    slider.dataset.sliderInit = '1';

    const track = slider.querySelector('.fss-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.film-still'));
    const total = slides.length;
    if (total === 0) return;

    const prevBtn = slider.querySelector('.fss-prev');
    const nextBtn = slider.querySelector('.fss-next');
    const currentEl = slider.querySelector('.fss-current');
    const totalEl = slider.querySelector('.fss-total');
    const dotsEl = slider.querySelector('.fss-dots');

    // Wrap track in viewport if not already done
    if (!slider.querySelector('.fss-track-viewport')) {
      const viewport = document.createElement('div');
      viewport.className = 'fss-track-viewport';
      track.parentNode.insertBefore(viewport, track);
      viewport.appendChild(track);
    }

    let current = 0;

    // Build dots
    if (dotsEl) {
      dotsEl.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'fss-dot' + (i === 0 ? ' active' : '');
        dotsEl.appendChild(dot);
      });
    }
    const dots = dotsEl ? Array.from(dotsEl.querySelectorAll('.fss-dot')) : [];

    if (totalEl) totalEl.textContent = String(total).padStart(2, '0');

    /* Step = one slide width + gap */
    function getStep() {
      const gap = parseFloat(getComputedStyle(track).gap) || 8;
      return slides[0].offsetWidth + gap;
    }

    // Clone slides at both ends for seamless infinite loop
    // Prepend `total` clones, append `total` clones
    // Real slides sit at indices [total … 2*total-1] in the extended track
    const clonesBefore = slides.map(s => { const c = s.cloneNode(true); c.setAttribute('aria-hidden','true'); return c; });
    const clonesAfter  = slides.map(s => { const c = s.cloneNode(true); c.setAttribute('aria-hidden','true'); return c; });
    clonesBefore.forEach(c => track.prepend(c));
    clonesAfter.forEach(c => track.append(c));

    // Offset so we start at first real slide (index `total` in extended track)
    let extIndex = total; // position in extended track

    function goToExt(idx, animate) {
      if (!animate) track.style.transition = 'none';
      const step = getStep();
      track.style.transform = `translateX(-${idx * step}px)`;
      if (!animate) {
        // Force reflow then re-enable transition
        track.getBoundingClientRect();
        track.style.transition = '';
      }
    }

    function goTo(index) {
      // Which real slide (0-based)
      current = ((index % total) + total) % total;
      extIndex = total + current;

      goToExt(extIndex, true);

      if (currentEl) currentEl.textContent = String(current + 1).padStart(2, '0');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      slides.forEach((s, i) => s.classList.toggle('fss-active', i === current));
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    }

    // After transition ends, silently jump to real position if we're in clone territory
    track.addEventListener('transitionend', () => {
      // Already in real zone — nothing to do
    });

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        goToExt(extIndex, false);
      }, 120);
    });

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard navigation
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    // Touch / swipe
    let touchStartX = 0;
    let touchDeltaX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      track.style.transition = 'none';
    }, { passive: true });
    slider.addEventListener('touchmove', (e) => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
      const step = getStep();
      track.style.transform = `translateX(${-extIndex * step + touchDeltaX}px)`;
    }, { passive: true });
    slider.addEventListener('touchend', () => {
      track.style.transition = '';
      if (touchDeltaX < -40) goTo(current + 1);
      else if (touchDeltaX > 40) goTo(current - 1);
      else goToExt(extIndex, true);
    });

    goTo(0);
  }

  function attachToAccordions() {
    document.querySelectorAll('.film-acc-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        setTimeout(() => {
          const body = trigger.nextElementSibling;
          if (!body) return;
          body.querySelectorAll('.film-stills-slider').forEach(initSlider);
        }, 60);
      });
    });

    // Init already-open accordions
    document.querySelectorAll('.film-acc-item.film-acc-open .film-stills-slider').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToAccordions);
  } else {
    attachToAccordions();
  }
})();
