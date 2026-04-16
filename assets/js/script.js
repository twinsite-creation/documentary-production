"use strict";

/* ─────────────────────────────────────────────
       DATA
    ───────────────────────────────────────────── */
const FILMS = {
  "shadows-of-kyiv": {
    title: "Shadows of Kyiv",
    year: "2022",
    type: "Feature",
    runtime: "94 min",
    ratio: "2.39:1",
    director: "Marta Hryhorenko",
    producer: "Dmytro Savchenko",
    country: "Ukraine · Poland",
    tagline: "A city remembers everything. Its people are learning to forget.",
    bg: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=85",
    stills: [
      {
        src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&q=80",
        cap: "Kyiv · Winter 2021",
      },
      {
        src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80",
        cap: "Old City · Dawn",
      },
      {
        src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80",
        wide: true,
      },
    ],
    synopsis: {
      lead: "Every city carries its dead. Kyiv carries more than most.",
      body: "Over eighteen months, Marta Hryhorenko followed four residents of Kyiv's historic districts — a retired archivist, a young musician, a former Soviet engineer, and a teenage street artist — each living in a different relationship with the city's layered past.",
      quote:
        "What the camera found was not nostalgia.\nIt was something rawer: the question of whether memory is a gift or a debt.",
      body2:
        "Shot in the weeks before and after a period of significant political upheaval, <em>Shadows of Kyiv</em> becomes, unexpectedly, a document of a city in the last moment before it changed irrevocably. The film does not explain events. It gives them faces.",
    },
    festivals: [
      {
        year: "2022",
        name: "IDFA Amsterdam",
        note: "World Premiere · Main Competition",
      },
      { year: "2022", name: "Sheffield DocFest", note: "Official Selection" },
      {
        year: "2023",
        name: "Hot Docs Toronto",
        note: "Best International Feature",
      },
      { year: "2023", name: "Docudays UA", note: "Grand Prix" },
      {
        year: "2023",
        name: "Ukrainian Film Academy",
        note: "Golden Dzyga · Best Documentary",
      },
    ],
    awards: [
      {
        year: "2023",
        name: "Hot Docs Toronto",
        note: "Best International Feature",
      },
      { year: "2023", name: "Golden Dzyga", note: "Best Documentary Feature" },
    ],
    partners: ["IDFA", "Hot Docs", "DocFest", "Arte France"],
    prev: null,
    next: "the-last-witness",
  },
  "the-last-witness": {
    title: "The Last Witness",
    year: "2021",
    type: "Short",
    runtime: "38 min",
    ratio: "1.85:1",
    director: "Marta Hryhorenko",
    producer: "Dmytro Savchenko",
    country: "Ukraine",
    tagline: "Three voices. One century. What happens when they go silent?",
    bg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=85",
    stills: [
      {
        src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80",
        cap: "Portrait session",
      },
      {
        src: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=900&q=80",
        cap: "Archive material",
      },
      {
        src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80",
        wide: true,
      },
    ],
    synopsis: {
      lead: "Before the first word, there was sound. Before sound, there was memory.",
      body: "Three elderly witnesses to the 20th century's most pivotal moments speak — cautiously, precisely — about what they saw, what they carried, and what they chose to keep silent about for decades.",
      quote:
        "Neither group has the complete picture.\nBoth know more than they can say.",
      body2:
        "The Last Witness asks what happens to historical truth when its last custodians die. It offers no consolation. It offers instead their faces, their hands, their pauses.",
    },
    festivals: [
      { year: "2021", name: "Visions du Réel", note: "Short Competition" },
      { year: "2022", name: "CPH:DOX", note: "Best Short Documentary" },
      { year: "2022", name: "Docudays UA", note: "Official Selection" },
    ],
    awards: [
      {
        year: "2022",
        name: "CPH:DOX Copenhagen",
        note: "Best Short Documentary",
      },
    ],
    partners: ["CPH:DOX", "Visions du Réel", "NRK Norway"],
    prev: "shadows-of-kyiv",
    next: "dust-and-memory",
  },
  "dust-and-memory": {
    title: "Dust & Memory",
    year: "2020",
    type: "Feature",
    runtime: "112 min",
    ratio: "2.39:1",
    director: "Marta Hryhorenko",
    producer: "Dmytro Savchenko",
    country: "Ukraine · Germany · Georgia",
    tagline:
      "Five cities. Two years. One question: what do we choose to remember?",
    bg: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=85",
    stills: [
      {
        src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=900&q=80",
        cap: "Tbilisi · Summer",
      },
      {
        src: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=900&q=80",
        cap: "Lviv · Autumn",
      },
      {
        src: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=1600&q=80",
        wide: true,
      },
    ],
    synopsis: {
      lead: "Memory is not a record. It is a negotiation.",
      body: "Shot across five Eastern European cities — Kyiv, Lviv, Warsaw, Tbilisi, and Leipzig — over the course of two years, Dust & Memory follows the traces that ordinary people leave in the fabric of cities: photographs pinned to fences, inscriptions worn into doorframes, the routes old people still walk to houses that no longer exist.",
      quote:
        "What the film proposes is that forgetting is not failure.\nSometimes it is the only way a city survives.",
      body2:
        "A meditation on urban memory and architectural grief, the film received co-production support from ZDF/Arte and was premiered at Berlinale Documentary Forum.",
    },
    festivals: [
      { year: "2020", name: "Berlinale", note: "Documentary Forum" },
      { year: "2020", name: "DOK Leipzig", note: "Official Selection" },
      { year: "2021", name: "IDFA", note: "Masters Competition" },
    ],
    awards: [
      { year: "2020", name: "DOK Leipzig", note: "Special Jury Prize" },
      { year: "2021", name: "IDFA", note: "Audience Award" },
    ],
    partners: ["ZDF/Arte", "Berlinale", "IDFA", "DOK Leipzig"],
    prev: "the-last-witness",
    next: "iron-cartography",
  },
  "iron-cartography": {
    title: "Iron Cartography",
    year: "2023",
    type: "Feature",
    runtime: "88 min",
    ratio: "2.39:1",
    director: "Marta Hryhorenko",
    producer: "Dmytro Savchenko",
    country: "Ukraine · France · UK",
    tagline: "War does not only destroy places. It redraws who we are.",
    bg: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1600&q=85",
    stills: [
      {
        src: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=900&q=80",
        cap: "Eastern Front",
      },
      {
        src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=900&q=80",
        cap: "Displaced communities",
      },
      {
        src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
        wide: true,
      },
    ],
    synopsis: {
      lead: "Maps lie. They always have.",
      body: "Iron Cartography is a visual essay on the invisible borders drawn by conflict — on how war does not merely alter geography but changes the internal maps by which people navigate identity, belonging, and home.",
      quote: "The film does not take sides.\nIt takes the side of complexity.",
      body2:
        "Following cartographers, veterans, displaced families, and city planners in three countries, the film asks what it means to redraw a life after the lines have moved.",
    },
    festivals: [
      {
        year: "2023",
        name: "Venice Film Festival",
        note: "Orizzonti Doc Competition",
      },
      { year: "2023", name: "TIFF", note: "Official Selection" },
      { year: "2024", name: "IDFA", note: "Best Feature Documentary" },
    ],
    awards: [
      { year: "2024", name: "IDFA", note: "Best Feature Documentary" },
      { year: "2023", name: "Venice", note: "Special Jury Mention" },
    ],
    partners: ["ARTE France", "BBC Storyville", "Venice", "IDFA"],
    prev: "dust-and-memory",
    next: "silent-archive",
  },
  "silent-archive": {
    title: "Silent Archive",
    year: "2019",
    type: "Short",
    runtime: "24 min",
    ratio: "1.33:1",
    director: "Marta Hryhorenko",
    producer: "Dmytro Savchenko",
    country: "Ukraine",
    tagline:
      "The films they didn't want you to see. The cinema they almost erased.",
    bg: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=1600&q=85",
    stills: [
      {
        src: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=900&q=80",
        cap: "Archive reels · Kyiv",
      },
      {
        src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&q=80",
        cap: "Projection booth",
      },
      {
        src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80",
        wide: true,
      },
    ],
    synopsis: {
      lead: "Every suppressed artwork is a document of what was feared.",
      body: "Silent Archive journeys through the forgotten footage of Ukrainian cinema from the 1960s — films shelved, cut, or quietly destroyed by Soviet censors — and asks what these fragments reveal about a suppressed artistic identity.",
      quote: "The gaps in the archive are as telling\nas what survives.",
      body2:
        "Working with film historians, archivists, and the surviving members of the Ukrainian Poetic Cinema movement, the film reconstructs not what was lost but why.",
    },
    festivals: [
      {
        year: "2019",
        name: "Docudays UA",
        note: "World Premiere · Grand Prix",
      },
      { year: "2019", name: "Jihlava IDFF", note: "Official Selection" },
      {
        year: "2020",
        name: "Krakow Film Festival",
        note: "Golden Dragon Nominee",
      },
    ],
    awards: [
      { year: "2019", name: "Docudays UA", note: "Grand Prix — Short Film" },
    ],
    partners: ["Docudays UA", "Jihlava IDFF", "Krakow FF"],
    prev: "iron-cartography",
    next: null,
  },
};

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
       OVERLAY RENDERING
    ───────────────────────────────────────────── */
function renderFilmOverlay(id) {
  const f = FILMS[id];
  if (!f) return "";

  const stills = f.stills.map((s) =>
    s.wide
      ? `<figure class="film-still wide"><img src="${s.src}" alt="" loading="lazy"></figure>`
      : `<figure class="film-still tall"><img src="${s.src}" alt="" loading="lazy"><figcaption class="still-cap">${s.cap}</figcaption></figure>`,
  );

  const festItems = f.festivals
    .map(
      (fe) =>
        `<li class="fest-entry"><span class="fest-year">${fe.year}</span><div><p class="fest-name">${fe.name}</p><p class="fest-note">${fe.note}</p></div></li>`,
    )
    .join("");

  const awardItems = f.awards
    .map(
      (a) =>
        `<li class="fest-entry"><span class="fest-year">${a.year}</span><div><p class="fest-name">${a.name}</p><p class="fest-note">${a.note}</p></div></li>`,
    )
    .join("");

  const logoChips = f.partners
    .map((p) => `<span class="logo-chip">${p}</span>`)
    .join("");

  const prevBtn = f.prev
    ? `<button class="fof-link prev" onclick="openFilm('${f.prev}')">${FILMS[f.prev].title}</button>`
    : `<span class="fof-link prev" onclick="closeOverlay()">All Films</span>`;
  const nextBtn = f.next
    ? `<button class="fof-link next" onclick="openFilm('${f.next}')">${FILMS[f.next].title}</button>`
    : `<span class="fof-link next" style="visibility:hidden">—</span>`;

  return `
        <div class="film-overlay-hero">
          <div class="film-overlay-bg" id="fogBg" style="background-image:url('${f.bg}')"></div>
          <div class="film-overlay-content">
            <div class="film-overlay-meta">${f.type} · ${f.year}</div>
            <h1 class="film-overlay-title">${f.title}</h1>
            <p class="film-overlay-tagline">${f.tagline}</p>
          </div>
        </div>

        <div class="film-overlay-body">
          <div class="fob-section">
            <div class="fob-label">Film Details</div>
            <div class="film-details-strip">
              <div class="fds-cell"><div class="fds-label">Director</div><div class="fds-value"><a onclick="openTeamMember('${slugify(f.director)}')">${f.director}</a></div></div>
              <div class="fds-cell"><div class="fds-label">Producer</div><div class="fds-value"><a onclick="openTeamMember('${slugify(f.producer)}')">${f.producer}</a></div></div>
              <div class="fds-cell"><div class="fds-label">Year</div><div class="fds-value">${f.year}</div></div>
              <div class="fds-cell"><div class="fds-label">Country</div><div class="fds-value">${f.country}</div></div>
              <div class="fds-cell"><div class="fds-label">Runtime · Format</div><div class="fds-value">${f.runtime}<br>${f.ratio}</div></div>
            </div>
          </div>

          <div class="fob-section">
            <div class="fob-label">Synopsis</div>
            <p class="film-synopsis-lead">${f.synopsis.lead}</p>
            <p class="film-synopsis-p">${f.synopsis.body}</p>
            <blockquote class="film-pull-quote">${f.synopsis.quote.replace("\n", "<br>")}</blockquote>
            <p class="film-synopsis-p">${f.synopsis.body2}</p>
          </div>

          <div class="fob-section">
            <div class="fob-label">Film Stills</div>
            <div class="film-stills-lead">${stills.filter((s) => !s.includes("wide")).join("")}</div>
            ${stills.find((s) => s.includes("wide")) || ""}
          </div>

          <div class="fob-section">
            <div class="fob-label">Trailer</div>
            <div class="film-trailer-wrap">
              <div class="film-trailer-placeholder">
                <div class="trailer-play-icon"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg></div>
                <p>Trailer available on request</p>
              </div>
            </div>
          </div>

          <div class="fob-section">
            <div class="fob-label">Festivals &amp; Partners</div>
            <div class="fest-grid">
              <div class="fest-col">
                <p class="fest-col-title">Festival Selections</p>
                <ul class="fest-list">${festItems}</ul>
              </div>
              <div class="fest-col">
                <p class="fest-col-title">Awards</p>
                <ul class="fest-list">${awardItems}</ul>
              </div>
              <div class="fest-col">
                <p class="fest-col-title">Broadcasters &amp; Partners</p>
                <div class="logo-row">${logoChips}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="film-overlay-footer">
          ${prevBtn}
          <span class="fof-mark">◉ MOVIE</span>
          ${nextBtn}
        </div>
      `;
}

function renderTeamOverlay(id) {
  const m = TEAM[id];
  if (!m) return "";

  const bioParas = m.bio.map((p) => `<p>${p}</p>`).join("");
  const filmItems = m.films
    .map(
      (f) =>
        `<li><span class="film-entry-title" onclick="openFilm('${f.id}')">${f.title}</span><span class="film-entry-meta">${f.meta}</span></li>`,
    )
    .join("");

  const prevBtn = m.prev
    ? `<button class="fof-link prev" onclick="openTeamMember('${m.prev}')">${TEAM[m.prev].name}</button>`
    : `<span class="fof-link prev" onclick="closeOverlay()">All Team</span>`;
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

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/* ─────────────────────────────────────────────
       OVERLAY OPEN / CLOSE
    ───────────────────────────────────────────── */
let _savedScrollY = 0;
let _activeOverlay = null;

function openFilm(id) {
  if (!FILMS[id]) return;
  const panel = document.getElementById("filmOverlay");
  const content = document.getElementById("filmOverlayContent");

  // Close team if open
  document.getElementById("teamOverlay").classList.remove("is-open");

  content.innerHTML = renderFilmOverlay(id);
  panel.scrollTop = 0;

  if (!_activeOverlay) {
    _savedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
  }
  _activeOverlay = "film";

  panel.classList.add("is-open");
  history.pushState({ overlay: "film", id }, "", `#film-${id}`);

  // Animate hero bg
  requestAnimationFrame(() => {
    const bg = document.getElementById("fogBg");
    if (bg) setTimeout(() => bg.classList.add("loaded"), 80);
  });
}

function openTeamMember(id) {
  if (!TEAM[id]) return;
  const panel = document.getElementById("teamOverlay");
  const content = document.getElementById("teamOverlayContent");

  // Close film if open
  document.getElementById("filmOverlay").classList.remove("is-open");

  content.innerHTML = renderTeamOverlay(id);
  panel.scrollTop = 0;

  if (!_activeOverlay) {
    _savedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
  }
  _activeOverlay = "team";

  panel.classList.add("is-open");
  history.pushState({ overlay: "team", id }, "", `#team-${id}`);
}

function closeOverlay() {
  document.getElementById("filmOverlay").classList.remove("is-open");
  document.getElementById("teamOverlay").classList.remove("is-open");
  document.body.style.overflow = "";
  _activeOverlay = null;
  history.pushState(null, "", window.location.pathname);
  setTimeout(() => window.scrollTo(0, _savedScrollY), 50);
}

/* Keyboard ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && _activeOverlay) closeOverlay();
});

/* Popstate — browser back/forward */
window.addEventListener("popstate", (e) => {
  const hash = window.location.hash;
  if (hash.startsWith("#film-")) {
    const id = hash.slice(6);
    openFilm(id);
  } else if (hash.startsWith("#team-")) {
    const id = hash.slice(6);
    openTeamMember(id);
  } else {
    if (_activeOverlay) {
      document.getElementById("filmOverlay").classList.remove("is-open");
      document.getElementById("teamOverlay").classList.remove("is-open");
      document.body.style.overflow = "";
      _activeOverlay = null;
      setTimeout(() => window.scrollTo(0, _savedScrollY), 50);
    }
  }
});

/* ─────────────────────────────────────────────
       FILM CARDS — click → overlay
    ───────────────────────────────────────────── */
document
  .getElementById("filmsOrbit")
  .querySelectorAll(".film-card[data-film]")
  .forEach((card) => {
    card.addEventListener("click", () => openFilm(card.dataset.film));
  });

/* Production list items */
document.querySelectorAll(".production-item[data-film]").forEach((item) => {
  item.addEventListener("click", () => openFilm(item.dataset.film));
});

/* Team members */
document.querySelectorAll(".team-member[data-team]").forEach((card) => {
  card.addEventListener("click", () => openTeamMember(card.dataset.team));
});

/* ─────────────────────────────────────────────
       INIT FROM HASH
    ───────────────────────────────────────────── */
(function initFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#film-")) {
    openFilm(hash.slice(6));
  } else if (hash.startsWith("#team-")) {
    openTeamMember(hash.slice(6));
  }
})();

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
  if (_activeOverlay) return;
  const sy = window.scrollY;
  hdr.classList.toggle("scrolled", sy > 50);
  const prog = Math.min(
    sy / (document.getElementById("hero").offsetHeight * 0.5),
    1,
  );
  heroContent.style.opacity = 1 - prog;
  heroContent.style.transform = `translateY(${prog * 40}px)`;
  hdrLogo.classList.toggle("visible", prog > 0.4);

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
const orbitEl = document.getElementById("filmsOrbit");
const gatherObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        orbitEl
          .querySelectorAll(".film-card")
          .forEach((c) => c.classList.add("gathering"));
        gatherObs.disconnect();
      }
    }),
  { threshold: 0.2 },
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
