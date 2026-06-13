"use strict";



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

  }
});

/* ─────────────────────────────────────────────
     TEAM OVERLAY — legacy overlay removed.
     Content lives entirely in HTML.
     openTeamMember() retained for hash navigation.
   ───────────────────────────────────────────── */

function openTeamMember(id) {
  const item = document.querySelector(`.team-item[data-team="${id}"]`);
  if (item) {
    openTeamItem(item);
    setTimeout(
      () => item.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
  }
}

/* Keyboard ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
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

    /* ── Sticky filter bar mode ── */
    filtersEl.classList.toggle('pf-sticky', hasActiveFilter);

    /* ── See More button visibility ── */
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const seeMoreWrap = seeMoreBtn ? seeMoreBtn.closest('.see-more-wrap') : null;
    if (seeMoreWrap) {
      const hiddenVisibleCount = Array.from(items).filter(
        item => !item.classList.contains('pf-hidden') &&
                item.classList.contains('hidden-item') &&
                !item.classList.contains('revealed')
      ).length;
      seeMoreWrap.style.display = hiddenVisibleCount > 0 ? '' : 'none';
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
   FILM STILLS SLIDER  — infinite loop / peek
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

    const prevBtn   = slider.querySelector('.fss-prev');
    const nextBtn   = slider.querySelector('.fss-next');
    const currentEl = slider.querySelector('.fss-current');
    const totalEl   = slider.querySelector('.fss-total');
    const dotsEl    = slider.querySelector('.fss-dots');

    // ── Viewport wrapper ──────────────────────────
    if (!slider.querySelector('.fss-track-viewport')) {
      const vp = document.createElement('div');
      vp.className = 'fss-track-viewport';
      track.parentNode.insertBefore(vp, track);
      vp.appendChild(track);
    }

    // ── Dots ──────────────────────────────────────
    if (dotsEl) {
      dotsEl.innerHTML = '';
      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'fss-dot' + (i === 0 ? ' active' : '');
        dotsEl.appendChild(d);
      });
    }
    const dots = dotsEl ? Array.from(dotsEl.querySelectorAll('.fss-dot')) : [];
    if (totalEl) totalEl.textContent = String(total).padStart(2, '0');

    // ── Clone buffer ──────────────────────────────
    // Layout: [ clones-before (total) | real slides (total) | clones-after (total) ]
    // Real slides → extended indices [total … 2*total-1]
    // Build ordered clone-before array, then prepend as a block
    const beforeFrag = document.createDocumentFragment();
    const afterFrag  = document.createDocumentFragment();
    slides.forEach(s => {
      const b = s.cloneNode(true); b.setAttribute('aria-hidden', 'true');
      const a = s.cloneNode(true); a.setAttribute('aria-hidden', 'true');
      beforeFrag.appendChild(b);
      afterFrag.appendChild(a);
    });
    track.insertBefore(beforeFrag, track.firstChild);
    track.appendChild(afterFrag);

    // ── State ─────────────────────────────────────
    // extIndex moves monotonically. After each animated step we silently
    // snap it back into the real-slide zone so buffers never run out.
    let current   = 0;
    let extIndex  = total;   // start at first real slide
    let animating = false;

    // ── Helpers ───────────────────────────────────
    function getStep() {
      const gap = parseFloat(getComputedStyle(track).gap) || 8;
      return slides[0].offsetWidth + gap;
    }

    function applyPos(idx, withTransition) {
      if (!withTransition) track.style.transition = 'none';
      track.style.transform = `translateX(-${idx * getStep()}px)`;
      if (!withTransition) track.getBoundingClientRect(); // force reflow
    }

    function updateUI(realIdx) {
      if (currentEl) currentEl.textContent = String(realIdx + 1).padStart(2, '0');
      dots.forEach((d, i) => d.classList.toggle('active', i === realIdx));
      slides.forEach((s, i) => s.classList.toggle('fss-active', i === realIdx));
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    }

    // ── Navigate ──────────────────────────────────
    function navigate(dir) {
      if (animating) return;
      animating = true;

      extIndex += dir;
      current = ((extIndex - total) % total + total) % total;

      track.style.transition = '';   // ensure CSS transition is on
      applyPos(extIndex, true);
      updateUI(current);
    }

    // After animation: silently reset into real-slide zone
    track.addEventListener('transitionend', () => {
      animating = false;
      if (extIndex < total || extIndex >= total * 2) {
        extIndex = total + current;
        applyPos(extIndex, false);
        track.style.transition = '';
      }
    });

    // ── Resize ────────────────────────────────────
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        applyPos(extIndex, false);
        track.style.transition = '';
      }, 120);
    });

    // ── Buttons ───────────────────────────────────
    prevBtn && prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn && nextBtn.addEventListener('click', () => navigate(+1));

    // ── Keyboard ──────────────────────────────────
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navigate(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigate(+1); }
    });

    // ── Touch / swipe ─────────────────────────────
    let touchStartX = 0, touchDeltaX = 0;
    slider.addEventListener('touchstart', e => {
      touchStartX  = e.touches[0].clientX;
      touchDeltaX  = 0;
      track.style.transition = 'none';
    }, { passive: true });
    slider.addEventListener('touchmove', e => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
      track.style.transform = `translateX(${-(extIndex * getStep()) + touchDeltaX}px)`;
    }, { passive: true });
    slider.addEventListener('touchend', () => {
      track.style.transition = '';
      if      (touchDeltaX < -40) navigate(+1);
      else if (touchDeltaX >  40) navigate(-1);
      else applyPos(extIndex, true);
    });

    // ── Init ──────────────────────────────────────
    applyPos(extIndex, false);
    track.style.transition = '';
    updateUI(current);
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
