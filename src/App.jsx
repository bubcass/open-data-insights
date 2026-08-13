import React, { useEffect, useState } from "react";
import "./styles.css";

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
    title: "Local matters in focus",
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

export default function App() {
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem("open-data-insights-theme") === "dark"
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("open-data-insights-theme", theme);
  }, [theme]);

  const sharePage = async () => {
    const shareData = {
      title: "Open Data Insights",
      text: "Explore the Irish Parliament through interactive data with Open Data Insights.",
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
          <h1 className="oireachtas-masthead__title">Oireachtas Insights</h1>
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
        <article
          key={explorer.id}
          className={`explorer-panel explorer-panel--${explorer.id}${
            explorer.media ? " explorer-panel--media" : ""
          }`}
        >
          <div className="explorer-panel__art explorer-panel__art--media">
            <CardMedia media={explorer.media} />
          </div>
          <div className="explorer-panel__content explorer-panel__content--media">
            <p className="panel-eyebrow">{explorer.eyebrow}</p>
            <h3 className="panel-title">{explorer.title}</h3>
            <p className="panel-description">{explorer.description}</p>
            <a className="panel-link" href={explorer.href}>
              <span>Explore</span>
              <span className="panel-link__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
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
    return <img className="panel-media" src={media.src} alt={media.alt} />;
  }

  if (media.type === "video") {
    return (
      <video
        className="panel-media"
        src={media.src}
        aria-label={media.ariaLabel}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return null;
}

function PQIllustration() {
  return (
    <svg viewBox="0 0 520 680" className="panel-graphic" role="img">
      <title>Abstract representation of parliamentary questions</title>
      <g className="panel-graphic__frame">
        <rect x="52" y="74" width="182" height="246" rx="18" />
        <rect x="136" y="122" width="206" height="290" rx="18" />
        <rect x="238" y="168" width="160" height="214" rx="18" />
      </g>
      <g className="panel-graphic__rules">
        {Array.from({ length: 6 }).map((_, index) => (
          <line
            key={index}
            x1="88"
            y1={120 + index * 28}
            x2="198"
            y2={120 + index * 28}
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line
            key={`mid-${index}`}
            x1="176"
            y1={168 + index * 28}
            x2="312"
            y2={168 + index * 28}
          />
        ))}
      </g>
      <g className="panel-graphic__bands">
        <rect x="86" y="430" width="292" height="16" rx="8" />
        <rect x="112" y="474" width="230" height="16" rx="8" />
        <rect x="148" y="518" width="194" height="16" rx="8" />
      </g>
      <g fill="none" strokeLinecap="round">
        <path
          d="M88 564C145 528 202 518 249 482S340 422 398 388"
          className="panel-graphic__path panel-graphic__path--strong"
        />
        <path
          d="M94 610C162 575 224 570 279 540S352 490 410 446"
          className="panel-graphic__path panel-graphic__path--soft"
        />
      </g>
      <g className="panel-graphic__nodes">
        {[
          [96, 564, 7],
          [152, 540, 5],
          [210, 516, 6],
          [278, 482, 7],
          [336, 442, 5],
          [398, 388, 7],
          [106, 610, 4],
          [286, 536, 5],
          [410, 446, 6],
        ].map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}

function VoteIllustration() {
  return (
    <svg viewBox="0 0 520 760" className="panel-graphic" role="img">
      <title>Abstract representation of parliamentary votes</title>
      <g className="vote-graphic__arcs" fill="none">
        <path d="M90 480A170 170 0 0 1 430 480" />
        <path d="M126 480A134 134 0 0 1 394 480" />
        <path d="M162 480A98 98 0 0 1 358 480" />
      </g>
      <g className="vote-graphic__seats">
        {seatRows.map((row, rowIndex) =>
          row.map((seat, seatIndex) => (
            <circle
              key={`${rowIndex}-${seatIndex}`}
              cx={seat.cx}
              cy={seat.cy}
              r={seat.r}
              className={seat.className}
            />
          )),
        )}
      </g>
      <g className="vote-graphic__matrix">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((__, column) => {
            const className =
              matrixPattern[row][column] === "yes"
                ? "vote-graphic__cell vote-graphic__cell--yes"
                : matrixPattern[row][column] === "no"
                  ? "vote-graphic__cell vote-graphic__cell--no"
                  : "vote-graphic__cell vote-graphic__cell--abstain";

            return (
              <rect
                key={`${row}-${column}`}
                x={86 + column * 48}
                y={98 + row * 40}
                width="28"
                height="22"
                rx="11"
                className={className}
              />
            );
          }),
        )}
      </g>
      <g className="vote-graphic__divider">
        <line x1="84" y1="334" x2="436" y2="334" />
      </g>
    </svg>
  );
}

function ElectionsIllustration() {
  return (
    <svg viewBox="0 0 520 680" className="panel-graphic" role="img">
      <title>Abstract representation of election counts and transfers</title>
      <g className="election-graphic__tracks">
        {Array.from({ length: 5 }).map((_, index) => (
          <line
            key={index}
            x1="86"
            y1={112 + index * 96}
            x2="432"
            y2={112 + index * 96}
          />
        ))}
      </g>
      <g className="election-graphic__bars">
        <rect x="88" y="94" width="84" height="36" rx="18" />
        <rect x="88" y="190" width="118" height="36" rx="18" />
        <rect x="88" y="286" width="98" height="36" rx="18" />
        <rect x="88" y="382" width="128" height="36" rx="18" />
        <rect x="88" y="478" width="76" height="36" rx="18" />
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M172 112C232 112 258 208 320 208S380 304 432 304"
          className="election-graphic__flow election-graphic__flow--strong"
        />
        <path
          d="M206 208C252 208 274 304 330 304S388 400 432 400"
          className="election-graphic__flow election-graphic__flow--soft"
        />
        <path
          d="M186 304C242 304 256 400 314 400S376 496 432 496"
          className="election-graphic__flow election-graphic__flow--strong"
        />
        <path
          d="M216 400C266 400 274 496 338 496S394 592 432 592"
          className="election-graphic__flow election-graphic__flow--soft"
        />
      </g>
      <g className="election-graphic__nodes">
        {[
          [172, 112],
          [320, 208],
          [432, 304],
          [206, 208],
          [330, 304],
          [432, 400],
          [186, 304],
          [314, 400],
          [432, 496],
          [216, 400],
          [338, 496],
          [432, 592],
        ].map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r={6} />
        ))}
      </g>
    </svg>
  );
}

const matrixPattern = [
  ["yes", "yes", "abstain", "yes", "no", "yes", "yes"],
  ["abstain", "yes", "yes", "no", "yes", "yes", "abstain"],
  ["yes", "no", "yes", "yes", "abstain", "yes", "no"],
  ["yes", "yes", "no", "yes", "yes", "abstain", "yes"],
  ["abstain", "yes", "yes", "abstain", "no", "yes", "yes"],
];

const seatRows = [
  [
    {
      cx: 114,
      cy: 456,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 154,
      cy: 432,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 204,
      cy: 416,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 260,
      cy: 410,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--gold",
    },
    {
      cx: 316,
      cy: 416,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 366,
      cy: 432,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 406,
      cy: 456,
      r: 10,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
  ],
  [
    {
      cx: 142,
      cy: 484,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 188,
      cy: 462,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 236,
      cy: 448,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 284,
      cy: 448,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 332,
      cy: 462,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 378,
      cy: 484,
      r: 9,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
  ],
  [
    {
      cx: 170,
      cy: 514,
      r: 8,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
    {
      cx: 214,
      cy: 496,
      r: 8,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 260,
      cy: 488,
      r: 8,
      className: "vote-graphic__seat vote-graphic__seat--gold",
    },
    {
      cx: 306,
      cy: 496,
      r: 8,
      className: "vote-graphic__seat vote-graphic__seat--strong",
    },
    {
      cx: 350,
      cy: 514,
      r: 8,
      className: "vote-graphic__seat vote-graphic__seat--soft",
    },
  ],
];
