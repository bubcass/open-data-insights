import React from "react";
import "./styles.css";

const explorers = [
  {
    id: "vote",
    eyebrow: "Vote Explorer",
    title: "Casting votes in Parliament",
    description:
      "Take a look at how your public representatives vote on the questions that matter in the Oireachtas.",
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
      "Explore how TDs hold the Government to account by asking questions about policy and services in Departments",
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

export default function App() {
  return (
    <div className="page-shell">
      <main className="page-main">
        <section
          className="page-intro"
          aria-label="Open Data Insights introduction"
        >
          <p className="page-intro__eyebrow">Open Data Insights</p>
          <p className="page-intro__text">
            Get closer to your Parliament with our interactive visualisations
            and data-driven storytelling.
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

        <section
          className="explorer-composition"
          aria-label="Explorer collection"
        >
          {explorers.map((explorer) => (
            <article
              key={explorer.id}
              className={`explorer-panel explorer-panel--${explorer.id}${
                explorer.media ? " explorer-panel--media" : ""
              }`}
            >
              <div
                className={`explorer-panel__art${explorer.accent ? ` explorer-panel__art--${explorer.accent}` : ""}${
                  explorer.media ? " explorer-panel__art--media" : ""
                }`}
              >
                {explorer.media ? (
                  <CardMedia media={explorer.media} />
                ) : (
                  explorer.illustration
                )}
                {!explorer.media ? (
                  <div className="explorer-panel__headline">
                    <p className="panel-eyebrow">{explorer.eyebrow}</p>
                    <h3 className="panel-title">{explorer.title}</h3>
                  </div>
                ) : null}
              </div>
              <div
                className={`explorer-panel__content${
                  explorer.media ? " explorer-panel__content--media" : ""
                }`}
              >
                {explorer.media ? (
                  <>
                    <p className="panel-eyebrow">{explorer.eyebrow}</p>
                    <h3 className="panel-title">{explorer.title}</h3>
                  </>
                ) : null}
                <p className="panel-description">{explorer.description}</p>
                <a className="panel-link" href={explorer.href}>
                  <span>Start exploring</span>
                  <span className="panel-link__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
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
