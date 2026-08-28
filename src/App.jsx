import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const THEME_STORAGE_KEY = "oireachtas-insights-theme";
const LEGACY_THEME_STORAGE_KEY = "open-data-insights-theme";
const PROMOTED_EXPLORER_ID = "pq";

const explorers = [
  {
    id: "vote",
    eyebrow: "Vote Explorer",
    title: "Casting votes in Parliament",
    description:
      "Take a look at how your public representatives vote on the questions that matter.",
    href: "https://bubcass.github.io/chamber-vote-poc/?chamber=dail",
    media: {
      type: "image",
      src: `${import.meta.env.BASE_URL}media/vote-index.webp`,
      alt: "Division result displayed across the Dáil chamber seating plan",
    },
  },
  {
    id: "pq",
    eyebrow: "Featured Insight",
    title: "PQ Explorer",
    description: [
      "Parliamentary questions are an intrinsic part of Parliament and each year tens of thousands of questions are asked by Members.",
      "Explore how TDs hold the Government to account by asking questions about policies and services.",
    ],
    href: "https://bubcass.github.io/pq-explorer/",
    media: {
      type: "video",
      src: `${import.meta.env.BASE_URL}media/pq-index.mp4`,
      poster: `${import.meta.env.BASE_URL}media/pq-index.jpg`,
      ariaLabel: "Parliamentary Questions Explorer preview",
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
      src: `${import.meta.env.BASE_URL}media/election-index.mp4`,
      poster: `${import.meta.env.BASE_URL}media/election-index.jpg`,
      ariaLabel: "Election visualisation preview",
    },
  },
];

const promotedExplorer = explorers.find(({ id }) => id === PROMOTED_EXPLORER_ID);
const productExplorers = explorers.filter(({ id }) => id !== PROMOTED_EXPLORER_ID);

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
      src: `${import.meta.env.BASE_URL}media/constituency-index.mp4`,
      poster: `${import.meta.env.BASE_URL}media/constituency-index.jpg`,
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
      src: `${import.meta.env.BASE_URL}media/spotlights-index.jpg`,
      alt: "A road viewed through a car windscreen",
    },
  },
];

const pboInsights = [
  {
    id: "tax-revenues",
    eyebrow: "PBO Insights",
    title: "Ireland's tax revenue",
    description:
      "Explore the breakdown of Ireland's tax receipts and how shifts over time can be a useful indicator of tax base stability.",
    href: "https://bubcass.github.io/pbo-insight-tax-revenue/",
    media: {
      type: "image",
      src: `${import.meta.env.BASE_URL}media/tax-index.jpg`,
      alt: "Euro banknotes under a magnifying glass beside a calculator",
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
  const [shareStatus, setShareStatus] = useState("");

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

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyText(shareData.url);
      setShareStatus("Link copied");
      window.setTimeout(() => setShareStatus(""), 2_000);
    } catch (error) {
      if (error?.name === "AbortError") return;
      setShareStatus("Unable to copy link");
    }
  };

  return (
    <div className="page-shell">
      <header className="oireachtas-masthead oireachtas-masthead--index">
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
              className={`oireachtas-masthead__action${shareStatus === "Link copied" ? " is-copied" : ""}`}
              type="button"
              onClick={sharePage}
              aria-label={shareStatus || "Share Open Data Insights"}
              title={shareStatus || "Share"}
            >
              {shareStatus === "Link copied" ? (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="m7 12.5 3.2 3.2L17.5 8" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M14.5 5.5 19 10l-4.5 4.5" />
                  <path d="M18.5 10H10a5 5 0 0 0-5 5v2" />
                </svg>
              )}
            </button>
            <button
              className="oireachtas-masthead__action"
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
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
            <span className="oireachtas-masthead__status" aria-live="polite">
              {shareStatus}
            </span>
          </div>
        </div>
      </header>
      <main className="page-main">
        <p className="omnibus-intro">
          With research from across the Houses of the Oireachtas, our data-driven insights inform citizens and public representatives by bringing together the work of parliament, constituency information and in-depth analysis.
        </p>

        <PortfolioFeature explorer={promotedExplorer} />

        <section
          className="page-intro page-intro--products"
          aria-label="Open Data Insights introduction"
        >
          <h2 className="section-heading">Open Data Insights</h2>
          <p className="page-intro__text">
            Get closer to the work being done in Parliament with our interactive visualisations and data-driven storytelling. Read how we want to bring the work of Parliament closer to you with
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

        <CardGrid
          items={productExplorers}
          label="Open Data Insights products"
          columns="two"
        />

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

        <section className="insight-section" aria-labelledby="pbo-heading">
          <div className="section-intro">
            <h2 className="section-heading" id="pbo-heading">PBO Insights</h2>
            <p className="section-intro__text">
              Independent and specialist insight through economic and budgetary intelligence.
            </p>
          </div>
          <CardGrid items={pboInsights} label="PBO Insights collection" columns="one" />
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

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Copy command failed");
}

function PortfolioFeature({ explorer }) {
  const descriptionParagraphs = Array.isArray(explorer.description)
    ? explorer.description
    : [explorer.description];

  return (
    <a
      className={`explorer-feature explorer-panel--${explorer.id}`}
      href={explorer.href}
    >
      <div className="explorer-feature__media">
        <CardMedia media={explorer.media} />
      </div>
      <div className="explorer-feature__content">
        <p className="panel-eyebrow">{explorer.eyebrow}</p>
        <h2 className="explorer-feature__title">{explorer.title}</h2>
        <div className="explorer-feature__description">
          {descriptionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <span className="panel-link">
          <span>Explore</span>
          <span className="panel-link__arrow" aria-hidden="true">→</span>
        </span>
      </div>
    </a>
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
  const mediaRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (media.type !== "video") return undefined;

    const video = mediaRef.current;
    if (!video) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData === true;

    if (reduceMotion || saveData) {
      setLoaded(true);
      return () => video.pause();
    }

    const activate = () => {
      if (!video.src) {
        video.src = media.src;
        video.load();
      }
      video.play().catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      activate();
      return () => video.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activate();
      else video.pause();
    }, {rootMargin: "240px 0px", threshold: 0.05});

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [media.src, media.type]);

  if (media.type === "image") {
    return (
      <div className={`panel-media-frame${loaded ? " is-loaded" : ""}`} aria-busy={!loaded}>
        <img
          ref={mediaRef}
          className="panel-media"
          src={media.src}
          alt={media.alt ?? ""}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className={`panel-media-frame${loaded ? " is-loaded" : ""}`} aria-busy={!loaded}>
        <video
          ref={mediaRef}
          className="panel-media"
          poster={media.poster}
          preload="none"
          aria-hidden="true"
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </div>
    );
  }

  return null;
}
