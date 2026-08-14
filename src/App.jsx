import React, { useEffect, useState } from "react";
import "./styles.css";

const THEME_STORAGE_KEY = "oireachtas-insights-theme";
const LEGACY_THEME_STORAGE_KEY = "open-data-insights-theme";

const explorers = [
  {
    id: "vote",
    eyebrow: "Vote Explorer",
    title: "Casting votes in Parliament",
    description:
      "Take a look at how your public representatives vote on the questions that matter.",
    href: "https://bubcass.github.io/chamber-vote-poc/?chamber=dail",
    media: {
      type: "video",
      src: `${import.meta.env.BASE_URL}media/vote-hero.mp4`,
      ariaLabel: "Parliamentary chamber vote preview",
    },
  },
  {
    id: "pq",
    eyebrow: "PQ Explorer",
    title: "Parliamentary Questions",
    description:
      "Explore how TDs hold the Government to account by asking questions about policies and services",
    href: "https://bubcass.github.io/pq-explorer/",
    media: {
      type: "image",
      src: `${import.meta.env.BASE_URL}media/bound-volume.jpeg`,
      alt: "Historic bound volume of Dail proceedings",
    },
  },
  {
    id: "elections",
    eyebrow: "Election Explorer",
    title: "How Members are elected",
    description:
      "Discover how votes for candidates are counted and lead TDs and Senators to take their seats in Parliament.",
    href: "https://bubcass.github.io/election-explorer/",
    media: {
      type: "video",
      src: `${import.meta.env.BASE_URL}media/election.mp4`,
      ariaLabel: "Election visualisation preview",
    },
  },
];

const constituencyInsights = [
  {
    id: "constituency",
    eyebrow: "Constituency Insights",
    title: "What shapes a constituency?",
    description:
      "See beyond the numbers with our constituency-level insights into the people and policies represented by our TDs.",
    href: "/constituency-insight/",
    media: {
      type: "video",
      src: `${import.meta.env.BASE_URL}media/people-walking-in-blurred.mp4`,
      ariaLabel: "People walking through a public space",
    },
  },
  {
    id: "spotlights",
    eyebrow: "Constituency Snapshots",
    title: "National matters, local focus",
    description:
      "With specialist insight and a local focus, our curated snapshots take a look at how national issues affect local constituencies.",
    href: "/constituency-insight/spotlight",
    media: {
      type: "image",
      src: `${import.meta.env.BASE_URL}media/road-with-glass.jpg`,
      alt: "A road viewed through a car windscreen",
    },
  },
];

function getInitialTheme() {
  try {
    let saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== "dark" && saved !== "light") {
      saved = window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        window.localStorage.setItem(THEME_STORAGE_KEY, saved);
      }
    }
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event) => {
      if (event.key === THEME_STORAGE_KEY && (event.newValue === "dark" || event.newValue === "light")) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try { window.localStorage.setItem(THEME_STORAGE_KEY, next); } catch {}
      return next;
    });
  };

  const sharePage = async () => {
    const shareData = {
      title: "Insights",
      text: "Explore parliamentary visual data from the Houses of the Oireachtas.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
      return;
    }

    await navigator.clipboard?.writeText(shareData.url);
  };

  return (
    <div className="page-shell">
      <header className="oireachtas-masthead">
        <div className="oireachtas-masthead__inner">
          <a
            className="oireachtas-masthead__home"
            href="https://www.oireachtas.ie/"
            aria-label="Return to oireachtas.ie"
            title="Return to oireachtas.ie"
          >
            <img
              className="oireachtas-masthead__logo"
              src={`${import.meta.env.BASE_URL}media/oireachtas-logo.svg`}
              alt=""
            />
          </a>
          <h1 className="oireachtas-masthead__title">
            <span className="oireachtas-masthead__brand-mark" aria-hidden="true">
              <svg viewBox="0 0 64 28" focusable="false">
                <path d="M12 9H26L32 5L38 9H52" />
                <line x1="12" y1="10.5" x2="52" y2="10.5" />
                <rect x="12" y="10.5" width="40" height="13.5" />
                <line x1="27.5" y1="10.5" x2="27.5" y2="24" />
                <line x1="30" y1="10.5" x2="30" y2="24" />
                <line x1="34" y1="10.5" x2="34" y2="24" />
                <line x1="36.5" y1="10.5" x2="36.5" y2="24" />
                <line x1="26.5" y1="24" x2="37.5" y2="24" />
                {[
                  [30.7, 18.2, 2.6, 5.8],
                  [15, 13, 1.7, 1.7], [19, 13, 1.7, 1.7], [23, 13, 1.7, 1.7],
                  [39.3, 13, 1.7, 1.7], [43.3, 13, 1.7, 1.7], [47.3, 13, 1.7, 1.7],
                  [15, 18, 1.7, 1.7], [19, 18, 1.7, 1.7], [23, 18, 1.7, 1.7],
                  [39.3, 18, 1.7, 1.7], [43.3, 18, 1.7, 1.7], [47.3, 18, 1.7, 1.7],
                ].map(([x, y, width, height], index) => (
                  <rect key={index} className="oireachtas-masthead__brand-mark-fill" x={x} y={y} width={width} height={height} />
                ))}
                <line x1="12" y1="24" x2="52" y2="24" />
              </svg>
            </span>
            <span className="oireachtas-masthead__brand-copy">
              <span className="oireachtas-masthead__brand-title">Insights</span>
              <span className="oireachtas-masthead__brand-tagline">Parliamentary visual data</span>
            </span>
          </h1>
          <div className="oireachtas-masthead__actions">
            <button
              className="oireachtas-masthead__action"
              type="button"
              onClick={sharePage}
              aria-label="Share Open Data Insights"
              title="Share"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M14.5 5.5 19 10l-4.5 4.5" />
                <path d="M18.5 10H10a5 5 0 0 0-5 5v2" />
              </svg>
            </button>
            <button
              className="oireachtas-masthead__action"
              type="button"
              onClick={toggleTheme}
              aria-label={`Use ${theme === "dark" ? "light" : "dark"} mode across Insights`}
              title={`Use ${theme === "dark" ? "light" : "dark"} mode across Insights`}
            >
              {theme === "dark" ? (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="page-main">
        <p className="omnibus-intro">
          With research from across the Houses of the Oireachtas, our data-driven insights inform citizens and public representatives by bringing together parliamentary activity, election results and constituency
          analysis.
        </p>
        <section
          className="page-intro"
          aria-label="Open Data Insights introduction"
        >
          <h2 className="section-heading">Open Data Insights</h2>
          <p className="page-intro__text">
            Get closer to the work being done in Parliament with our interactive visualisations and data-driven storytelling.
          </p>
          <p className="page-intro__text">
            Read how we want to bring the work of Parliament closer to you with
            our open data in our{" "}
            <a
              className="page-intro__link"
              href="https://bubcass.github.io/stor-concept/articles/open-data-insights-20260121/"
              target="_blank"
              rel="noreferrer"
            >
              position paper
            </a>
            .
          </p>
        </section>

        <CardGrid items={explorers} label="Open Data explorer collection" />

        <section className="insight-section" aria-labelledby="constituency-heading">
          <div className="section-intro">
            <h2 className="section-heading" id="constituency-heading">
              Constituency Insights
            </h2>
            <p className="section-intro__text">
              Explore the people, places and policy issues shaping constituencies across Ireland or take a deep dive into our focused local issue snapshots.
            </p>
          </div>
          <CardGrid
            items={constituencyInsights}
            label="Constituency Insights collection"
            columns="two"
          />
        </section>

        <section className="coming-soon" aria-labelledby="pbo-heading">
          <h2 className="section-heading" id="pbo-heading">PBO Insights</h2>
          <p>New insights from the Parliamentary Budget Office are coming soon.</p>
        </section>

        <section className="coming-soon" aria-labelledby="lrs-heading">
          <h2 className="section-heading" id="lrs-heading">L&amp;RS Insights</h2>
          <p>New insights from the Library &amp; Research Service are coming soon.</p>
        </section>
      </main>
      <OireachtasFooter />
    </div>
  );
}

function CardGrid({ items, label, columns = "three" }) {
  return (
    <section className={`explorer-composition explorer-composition--${columns}`} aria-label={label}>
      {items.map((explorer) => (
        <a
          key={explorer.id}
          className={`explorer-panel explorer-panel--${explorer.id}${
            explorer.media ? " explorer-panel--media" : ""
          }`}
          href={explorer.href}
        >
          <div className="explorer-panel__art explorer-panel__art--media">
            <CardMedia media={explorer.media} />
          </div>
          <div className="explorer-panel__content explorer-panel__content--media">
            <p className="panel-eyebrow">{explorer.eyebrow}</p>
            <h3 className="panel-title">{explorer.title}</h3>
            <p className="panel-description">{explorer.description}</p>
            <span className="panel-link">
              <span>Explore</span>
              <span className="panel-link__arrow" aria-hidden="true">→</span>
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}

function OireachtasFooter() {
  const links = [
    ["Accessibility", "https://www.oireachtas.ie/en/accessibility-statement/"],
    ["Cookies", "https://www.oireachtas.ie/en/cookies/"],
    ["Transparency", "https://www.oireachtas.ie/en/transparency/"],
    ["Contact us", "https://www.oireachtas.ie/en/contact-us/"],
    ["Copyright and reuse", "https://www.oireachtas.ie/en/copyright-and-reuse/"],
  ];

  return (
    <footer className="oireachtas-footer">
      <nav aria-label="Oireachtas information">
        <ul className="oireachtas-footer__links">
          {links.map(([label, href]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

function CardMedia({ media }) {
  if (media.type === "image") {
    return <img className="panel-media" src={media.src} alt="" />;
  }

  if (media.type === "video") {
    return (
      <video
        className="panel-media"
        src={media.src}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return null;
}
