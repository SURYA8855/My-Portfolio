import { useState, useEffect, useRef, useCallback } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  :root {
    --black:   #070710;
    --black2:  #0f0f1a;
    --black3:  #17172a;
    --teal:    #00ffea;
    --teal2:   #00d4c2;
    --coral:   #ff2d55;
    --yellow:  #ffdd00;
    --violet:  #bf5fff;
    --white:   #f0f0ff;
    --muted:   #5a5a7a;
    --border:  #1e1e35;
    --display: 'Bebas Neue', sans-serif;
    --body:    'Plus Jakarta Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--body);
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--black2); }
  ::-webkit-scrollbar-thumb { background: var(--teal); }

  /* ── NAV ── */
  .nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    display:flex; justify-content:space-between; align-items:center;
    padding: 1.4rem 4rem;
    background: rgba(7,7,16,0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,255,234,.1);
    box-shadow: 0 1px 30px rgba(0,255,234,.05);
  }
  .nav-logo {
    font-family: var(--display);
    font-size:1.6rem; font-weight:400;
    letter-spacing:.08em;
    display:flex; align-items:center; gap:.5rem;
  }
  .nav-logo-bracket { color:var(--teal); font-size:1.8rem; line-height:1; text-shadow: 0 0 20px var(--teal); }
  .nav-pill {
    display:flex; gap:.3rem;
    background:var(--black3);
    border:1px solid var(--border);
    border-radius:100px; padding:.3rem .4rem;
  }
  .nav-pill a {
    font-family:var(--body); font-size:.72rem; font-weight:600;
    letter-spacing:.08em; text-transform:uppercase;
    color:var(--muted); text-decoration:none;
    padding:.4rem 1rem; border-radius:100px;
    transition: all .25s;
  }
  .nav-pill a:hover, .nav-pill a.active {
    background:var(--teal); color:var(--black); font-weight:700;
    box-shadow: 0 0 16px rgba(0,255,234,.4);
  }
  .nav-time {
    font-family:var(--display); font-size:1rem; font-weight:400;
    color:var(--teal); letter-spacing:.15em;
    border:1px solid rgba(0,255,234,.2);
    padding:.4rem 1rem; border-radius:4px;
    text-shadow: 0 0 12px rgba(0,255,234,.6);
    background: rgba(0,255,234,.04);
  }

  /* ── HERO ── */
  .hero {
    min-height:100vh; display:flex; flex-direction:column;
    justify-content:center; padding:8rem 4rem 4rem;
    position:relative; overflow:hidden;
  }
  .hero-grid-lines {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,229,204,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,204,.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-blob {
    position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none;
  }
  .blob1 { width:600px; height:600px; background:rgba(0,255,234,.12); top:-100px; right:-50px; animation: blobmove 12s ease-in-out infinite; }
  .blob2 { width:400px; height:400px; background:rgba(255,45,85,.1); bottom:-50px; left:-50px; animation: blobmove 9s ease-in-out infinite reverse; }
  .blob3 { width:300px; height:300px; background:rgba(191,95,255,.1); top:40%; left:40%; animation: blobmove 15s ease-in-out infinite 3s; }
  @keyframes blobmove {
    0%,100% { transform:translate(0,0) scale(1); }
    33% { transform:translate(30px,-20px) scale(1.05); }
    66% { transform:translate(-20px,30px) scale(.96); }
  }

  .hero-tag {
    display:inline-flex; align-items:center; gap:.6rem;
    background:rgba(0,229,204,.08); border:1px solid rgba(0,229,204,.2);
    border-radius:4px; padding:.5rem 1rem; margin-bottom:2.5rem;
    width:fit-content; position:relative; z-index:1;
  }
  .hero-tag-dot {
    width:7px; height:7px; border-radius:50%;
    background:var(--teal);
    animation: tagpulse 2s ease-in-out infinite;
  }
  @keyframes tagpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
  .hero-tag span { font-size:.7rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); }

  .hero-headline {
    font-family:var(--display);
    font-size: clamp(5rem, 11vw, 12rem);
    font-weight:400; line-height:.88;
    letter-spacing:.04em;
    position:relative; z-index:1;
    margin-bottom:1.5rem;
  }
  .hero-headline .line1 { display:block; color:var(--white); }
  .hero-headline .line2 {
    display:block;
    -webkit-text-stroke: 2px var(--teal);
    color:transparent;
    text-shadow: none;
    filter: drop-shadow(0 0 30px rgba(0,255,234,.35));
  }
  .hero-headline .line3 { display:block; color:var(--coral); font-family:var(--body); font-size:.13em; font-weight:600; margin-top:.6em; letter-spacing:.12em; text-transform:uppercase; text-shadow: 0 0 20px rgba(255,45,85,.5); }

  .hero-bottom {
    display:flex; justify-content:space-between; align-items:flex-end;
    margin-top:4rem; position:relative; z-index:1;
    border-top:1px solid var(--border); padding-top:2rem; flex-wrap:wrap; gap:2rem;
  }
  .hero-desc {
    font-size:1rem; font-weight:400; color:#888;
    line-height:1.8; max-width:420px;
  }
  .hero-desc strong { color:var(--white); font-weight:700; }
  .hero-actions { display:flex; gap:1rem; flex-wrap:wrap; }

  .mag-btn {
    position:relative; overflow:hidden;
    font-family:var(--display); font-size:.8rem; font-weight:600;
    letter-spacing:.1em; text-transform:uppercase;
    padding:.9rem 2.2rem; border-radius:3px;
    text-decoration:none; display:inline-flex; align-items:center; gap:.5rem;
    transition: transform .3s, box-shadow .3s;
  }
  .mag-btn::before {
    content:''; position:absolute; inset:0;
    background:var(--teal); transform:translateY(101%);
    transition:transform .35s cubic-bezier(.76,0,.24,1);
  }
  .mag-btn:hover::before { transform:translateY(0); }
  .mag-btn span { position:relative; z-index:1; }
  .mag-btn-primary {
    background:var(--teal); color:var(--black);
    border:2px solid var(--teal);
  }
  .mag-btn-primary::before { background:var(--yellow); }
  .mag-btn-primary:hover { color:var(--black); }
  .mag-btn-ghost {
    background:transparent; color:var(--white);
    border:2px solid var(--border);
  }
  .mag-btn-ghost::before { background:var(--coral); }
  .mag-btn-ghost:hover { color:var(--white); border-color:var(--coral); }

  .hero-scroll-hint {
    display:flex; align-items:center; gap:.7rem;
    font-size:.7rem; font-weight:500; letter-spacing:.15em;
    text-transform:uppercase; color:var(--muted);
  }
  .scroll-line {
    width:40px; height:1px; background:var(--muted);
    animation: scrollpulse 2s ease-in-out infinite;
  }
  @keyframes scrollpulse { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(.4); transform-origin:left;} }

  /* ── SECTION ── */
  .sec { padding:6rem 4rem; max-width:1200px; margin:0 auto; }
  .full-sec { padding:6rem 4rem; }

  .sec-eyebrow {
    display:flex; align-items:center; gap:1rem; margin-bottom:1rem;
  }
  .sec-num {
    font-family:var(--display); font-size:.9rem; font-weight:400;
    letter-spacing:.2em; color:var(--teal);
    background:rgba(0,255,234,.07); border:1px solid rgba(0,255,234,.2);
    padding:.25rem .7rem; border-radius:2px;
    text-shadow: 0 0 10px rgba(0,255,234,.5);
  }
  .sec-label {
    font-size:.7rem; font-weight:700; letter-spacing:.25em;
    text-transform:uppercase; color:var(--muted);
  }
  .sec-title {
    font-family:var(--display);
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    font-weight:400; letter-spacing:.05em; line-height:1;
    margin-bottom:3.5rem;
  }
  .sec-title em { font-style:normal; color:var(--teal); text-shadow: 0 0 20px rgba(0,255,234,.4); }
  .sec-title .coral { color:var(--coral); text-shadow: 0 0 20px rgba(255,45,85,.4); }
  .sec-title .yellow { color:var(--yellow); text-shadow: 0 0 20px rgba(255,221,0,.3); }

  /* ── ABOUT ── */
  .about-layout { display:grid; grid-template-columns:1.2fr 1fr; gap:5rem; align-items:start; }
  .about-text { font-size:1.05rem; font-weight:400; line-height:1.85; color:#aaa; }
  .about-text p { margin-bottom:1.2rem; }
  .about-text strong { color:var(--white); font-weight:700; }
  .about-text .highlight {
    color:var(--teal); font-weight:700;
    border-bottom:2px solid rgba(0,229,204,.3);
  }

  .about-cards { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
  .about-card {
    background:var(--black2); border:1px solid var(--border);
    border-radius:8px; padding:1.8rem;
    transition: all .3s; position:relative; overflow:hidden;
  }
  .about-card::before {
    content:''; position:absolute;
    top:0; left:0; right:0; height:2px;
    background: linear-gradient(90deg, var(--teal), var(--violet));
    transform:scaleX(0); transform-origin:left;
    transition:transform .4s ease;
  }
  .about-card:hover { border-color:rgba(0,255,234,.3); transform:translateY(-4px); box-shadow: 0 10px 40px rgba(0,255,234,.1); }
  .about-card:hover::before { transform:scaleX(1); }
  .card-val {
    font-family:var(--display); font-size:3.5rem; font-weight:400;
    color:var(--teal); line-height:1; margin-bottom:.3rem;
    text-shadow: 0 0 30px rgba(0,255,234,.5);
  }
  .card-label { font-size:.72rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); }

  /* ── SKILLS ── */
  .skills-full { background:var(--black2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .skills-inner { max-width:1200px; margin:0 auto; padding:6rem 4rem; }
  .skills-tabs { display:flex; gap:.5rem; margin-bottom:2.5rem; flex-wrap:wrap; }
  .skill-tab {
    font-family:var(--body); font-size:.75rem; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase;
    padding:.55rem 1.4rem; border-radius:3px;
    border:1px solid var(--border);
    background:transparent; color:var(--muted);
    cursor:pointer; transition:all .25s;
  }
  .skill-tab:hover { border-color:var(--teal); color:var(--teal); box-shadow: 0 0 12px rgba(0,255,234,.2); }
  .skill-tab.active { background:var(--teal); color:var(--black); border-color:var(--teal); font-weight:800; box-shadow: 0 0 25px rgba(0,255,234,.4); }

  .skill-panel { display:none; animation: fadeup .4s ease; }
  .skill-panel.active { display:block; }
  @keyframes fadeup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .skill-bars { display:flex; flex-direction:column; gap:1.2rem; }
  .skill-bar-row { display:flex; flex-direction:column; gap:.5rem; }
  .skill-bar-top { display:flex; justify-content:space-between; align-items:center; }
  .skill-bar-name { font-size:.9rem; font-weight:700; color:var(--white); }
  .skill-bar-pct { font-family:var(--display); font-size:.8rem; font-weight:700; color:var(--teal); }
  .skill-bar-track {
    height:5px; background:var(--black3); border-radius:100px; overflow:hidden;
  }
  .skill-bar-fill {
    height:100%; border-radius:100px;
    background: linear-gradient(90deg, var(--teal), var(--violet), var(--coral));
    width:0; transition:width 1s cubic-bezier(.25,.46,.45,.94);
    box-shadow: 0 0 8px rgba(0,255,234,.3);
  }

  /* ── EXPERIENCE ── */
  .exp-tabs { display:flex; gap:0; margin-bottom:3rem; border-bottom:1px solid var(--border); }
  .exp-tab {
    font-family:var(--body); font-size:.82rem; font-weight:700;
    letter-spacing:.05em; padding:1rem 2rem;
    background:transparent; color:var(--muted);
    border:none; border-bottom:2px solid transparent;
    cursor:pointer; transition:all .25s; margin-bottom:-1px;
    text-align:left; text-transform:uppercase;
  }
  .exp-tab:hover { color:var(--white); }
  .exp-tab.active { color:var(--teal); border-bottom-color:var(--teal); text-shadow: 0 0 12px rgba(0,255,234,.5); }

  .exp-panel { display:none; animation:fadeup .4s ease; }
  .exp-panel.active { display:block; }

  .exp-header { margin-bottom:2rem; }
  .exp-role-title {
    font-family:var(--display); font-size:2.8rem; font-weight:400;
    color:var(--white); letter-spacing:.04em; margin-bottom:.4rem; line-height:1;
  }
  .exp-meta { display:flex; gap:1.5rem; align-items:center; flex-wrap:wrap; }
  .exp-company-badge {
    display:inline-flex; align-items:center; gap:.5rem;
    background:rgba(0,229,204,.08); border:1px solid rgba(0,229,204,.2);
    border-radius:3px; padding:.35rem .8rem;
    font-size:.78rem; font-weight:700; color:var(--teal); letter-spacing:.05em;
  }
  .exp-period-badge {
    font-size:.75rem; font-weight:500; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted);
    border:1px solid var(--border); padding:.35rem .8rem; border-radius:3px;
  }
  .exp-bullets { list-style:none; display:flex; flex-direction:column; gap:.85rem; }
  .exp-bullets li {
    display:flex; gap:1rem; align-items:flex-start;
    font-size:.92rem; font-weight:400; line-height:1.7; color:#aaa;
  }
  .exp-bullet-icon {
    width:20px; height:20px; flex-shrink:0;
    background:rgba(0,229,204,.1); border:1px solid rgba(0,229,204,.2);
    border-radius:3px; display:flex; align-items:center; justify-content:center;
    font-size:.6rem; color:var(--teal); margin-top:3px;
  }

  /* ── PROJECTS ── */
  .projects-layout { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
  .proj-card {
    background:var(--black2); border:1px solid var(--border);
    border-radius:10px; padding:2rem;
    transition:all .35s; position:relative; overflow:hidden;
    display:flex; flex-direction:column; gap:1rem;
  }
  .proj-card-glow {
    position:absolute; width:200px; height:200px;
    border-radius:50%; filter:blur(60px);
    pointer-events:none; opacity:0;
    transition:opacity .5s;
    background:radial-gradient(circle, rgba(0,229,204,.15), transparent);
  }
  .proj-card:hover .proj-card-glow { opacity:1; }
  .proj-card:hover { border-color:rgba(0,255,234,.4); transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,255,234,.12), 0 0 0 1px rgba(0,255,234,.05); }

  .proj-num {
    font-family:var(--display); font-size:.85rem; font-weight:400;
    letter-spacing:.2em; color:var(--teal);
    background:rgba(0,255,234,.07); border:1px solid rgba(0,255,234,.2);
    width:fit-content; padding:.2rem .7rem; border-radius:2px;
    text-shadow: 0 0 8px rgba(0,255,234,.4);
  }
  .proj-title {
    font-family:var(--display); font-size:1.5rem; font-weight:400;
    color:var(--white); letter-spacing:.04em; line-height:1.1;
  }
  .proj-desc { font-size:.85rem; color:#888; line-height:1.7; flex:1; }
  .proj-footer { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.5rem; }
  .proj-tags { display:flex; flex-wrap:wrap; gap:.4rem; }
  .proj-tag {
    font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
    color:var(--black); background:var(--teal);
    padding:.2rem .55rem; border-radius:2px;
  }
  .proj-tag.coral { background:var(--coral); }
  .proj-tag.yellow { background:var(--yellow); }
  .proj-arrow {
    width:32px; height:32px; border-radius:50%;
    border:1px solid var(--border);
    display:flex; align-items:center; justify-content:center;
    font-size:.9rem; color:var(--muted);
    transition:all .25s; flex-shrink:0;
  }
  .proj-card:hover .proj-arrow { background:var(--teal); border-color:var(--teal); color:var(--black); }

  /* ── EDUCATION ── */
  .edu-layout { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
  .edu-card {
    background:var(--black2); border:1px solid var(--border);
    border-radius:10px; padding:2rem;
    transition:all .3s; position:relative; overflow:hidden;
  }
  .edu-card::after {
    content:''; position:absolute;
    bottom:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, var(--teal), var(--yellow));
    transform:scaleX(0); transform-origin:left; transition:transform .4s ease;
  }
  .edu-card:hover { border-color:rgba(0,255,234,.25); transform:translateY(-4px); box-shadow: 0 12px 40px rgba(191,95,255,.1); }
  .edu-card:hover::after { transform:scaleX(1); }
  .edu-icon { font-size:2rem; margin-bottom:1rem; }
  .edu-deg { font-family:var(--display); font-size:1.2rem; font-weight:400; color:var(--white); margin-bottom:.4rem; line-height:1.2; letter-spacing:.03em; }
  .edu-school { font-size:.82rem; color:var(--muted); margin-bottom:1rem; line-height:1.5; font-weight:500; }
  .edu-score {
    display:inline-flex; align-items:center; gap:.4rem;
    background:rgba(255,221,0,.08); border:1px solid rgba(255,221,0,.25);
    border-radius:3px; padding:.3rem .8rem;
    font-family:var(--body); font-size:.78rem; font-weight:800; color:var(--yellow);
    text-shadow: 0 0 12px rgba(255,221,0,.4);
  }

  /* ── CONTACT ── */
  .contact-full { background:var(--black2); border-top:1px solid var(--border); }
  .contact-inner { max-width:1200px; margin:0 auto; padding:6rem 4rem; }
  .contact-blurb { font-size:1.1rem; color:#888; line-height:1.8; margin-bottom:3rem; max-width:600px; font-weight:500; }
  .contact-blurb strong { color:var(--white); }
  .contact-links { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; max-width:800px; }
  .c-link {
    display:flex; align-items:center; gap:1rem;
    padding:1.2rem 1.5rem; border-radius:8px;
    border:1px solid var(--border); text-decoration:none;
    transition:all .3s; background:var(--black3);
  }
  .c-link:hover { background:rgba(0,255,234,.04); border-color:var(--teal); transform:translateY(-3px); box-shadow:0 8px 30px rgba(0,255,234,.1); }
  .c-icon {
    width:42px; height:42px; border-radius:8px;
    background:rgba(0,255,234,.08); border:1px solid rgba(0,255,234,.15);
    display:flex; align-items:center; justify-content:center;
    font-size:1.1rem; flex-shrink:0;
  }
  .c-info { display:flex; flex-direction:column; gap:.1rem; }
  .c-info-label { font-size:.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); }
  .c-info-val { font-size:.92rem; font-weight:600; color:var(--white); }

  /* ── FOOTER ── */
  footer {
    background:var(--black); border-top:1px solid var(--border);
    padding:2rem 4rem; display:flex; justify-content:space-between; align-items:center;
  }
  footer p { font-size:.75rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
  footer span { color:var(--teal); }

  /* ── REVEAL ── */
  .reveal { opacity:0; transform:translateY(28px); transition:opacity .75s ease, transform .75s ease; }
  .reveal.show { opacity:1; transform:translateY(0); }

  /* ── TICKER ── */
  .ticker-wrap {
    background:var(--teal); overflow:hidden;
    padding:.6rem 0; border-top:1px solid var(--teal2); border-bottom:1px solid var(--teal2);
  }
  .ticker-track {
    display:flex; gap:0; width:max-content;
    animation: ticker 25s linear infinite;
  }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-item {
    font-family:var(--display); font-size:.72rem; font-weight:700;
    letter-spacing:.2em; text-transform:uppercase; color:var(--black);
    padding:0 2.5rem; white-space:nowrap;
    display:flex; align-items:center; gap:1rem;
  }
  .ticker-dot { width:5px; height:5px; background:var(--black); border-radius:50%; opacity:.4; }

  @media (max-width:900px) {
    .nav { padding:1rem 1.5rem; }
    .nav-pill { display:none; }
    .hero { padding:7rem 1.5rem 3rem; }
    .sec, .skills-inner, .contact-inner { padding:4rem 1.5rem; }
    .full-sec { padding:4rem 1.5rem; }
    .about-layout { grid-template-columns:1fr; gap:3rem; }
    .contact-links { grid-template-columns:1fr; }
    .projects-layout, .edu-layout { grid-template-columns:1fr; }
    .about-cards { grid-template-columns:1fr 1fr; }
    footer { flex-direction:column; gap:.5rem; padding:1.5rem; }
  }
`;

const skills = {
  Frontend: [
    { name: "React.js", pct: 92 }, { name: "Angular", pct: 88 },
    { name: "TypeScript", pct: 85 }, { name: "JavaScript", pct: 90 }, { name: "Redux / NgRx", pct: 80 },
  ],
  Styling: [
    { name: "CSS / SCSS / SASS", pct: 90 }, { name: "HTML5", pct: 95 },
    { name: "Bootstrap", pct: 82 }, { name: "LESS", pct: 72 },
  ],
  "Libraries & Tools": [
    { name: "RxJS", pct: 83 }, { name: "Git", pct: 88 },
    { name: "RESTful APIs", pct: 87 }, { name: "Postman", pct: 80 }, { name: "Java", pct: 65 },
  ],
};

const experience = [
  {
    tab: "WeCodee",
    role: "Associate Consultant – Frontend Developer",
    company: "WeCodee Innovations, Coimbatore",
    period: "Oct 2024 — Present",
    bullets: [
      "Developed and maintained secure, scalable banking web applications using React, Angular, TypeScript, and RxJS.",
      "Mentored 4 junior developers on React.js, Angular, RxJS, and NgRx — accelerating onboarding and improving team code quality.",
      "Implemented responsive UI components, form validations, and role-based access control for financial workflows.",
      "Integrated RESTful APIs for account management, transactions, and reporting.",
      "Assisted in deploying applications to client servers ensuring smooth production rollouts.",
    ]
  },
  {
    tab: "HRlytics",
    role: "Software Developer",
    company: "HRlytics Private Limited, Bangalore",
    period: "Aug 2023 — Sep 2024",
    bullets: [
      "Built two AI-powered examination modules (video and audio question types) for an EdTech platform.",
      "Developed a real-time user analytics dashboard visualising all user actions for data-driven product decisions.",
      "Developed and deployed reusable React.js components, cutting development time for future features by 30%.",
    ]
  }
];

const projects = [
  { name: "AI Examination Modules", desc: "Two AI-powered exam modules — video and audio-based question types — for an EdTech platform. Responsive interfaces guiding learners through each examination flow.", tags: ["React.js", "AI", "EdTech"], color: "teal" },
  { name: "Springflow – National ID", desc: "Integrated National ID verification into bank account creation workflows with robust API integration and strict banking compliance.", tags: ["Angular", "REST API", "Banking"], color: "coral" },
  { name: "AOB – Customer Onboarding", desc: "Multi-step onboarding app with form validations and role-based screens for new banking customers with real-time data submission.", tags: ["React.js", "RBAC", "Forms"], color: "yellow" },
  { name: "CDB – Bill Payments", desc: "Secure bill payment and transaction history UI with filtering, status tracking, and full banking security compliance.", tags: ["Angular", "TypeScript"], color: "teal" },
  { name: "ICB TIPS – Fund Transfer", desc: "Multi-screen module covering bill payments, TRA statements, transaction history, and fund transfers with real-time API integration.", tags: ["React.js", "RxJS", "Real-time"], color: "coral" },
  { name: "WeEngage – Campaigns", desc: "Notification trigger system and campaign management module with customer segmentation, scheduling UI, and audience targeting.", tags: ["Angular", "NgRx", "UI"], color: "yellow" },
];

const education = [
  { icon: "🎓", deg: "B.E. – Electrical & Electronics Engineering", school: "Karpagam College of Engineering", score: "CGPA: 8.9" },
  { icon: "📚", deg: "Higher Secondary Education (HSE)", school: "San Jose Matriculation Higher Secondary School", score: "80.83%" },
  { icon: "🏫", deg: "Secondary School (SSLC)", school: "San Jose Matriculation Higher Secondary School", score: "91%" },
];

function useReveal(ref) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return show;
}

function Rev({ children, delay = 0 }) {
  const ref = useRef(null);
  const show = useReveal(ref);
  return <div ref={ref} className={`reveal${show ? " show" : ""}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SkillBars({ items, active }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!active) return;
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, [active, items]);
  return (
    <div className="skill-bars" ref={ref}>
      {items.map((s, i) => (
        <div className="skill-bar-row" key={s.name}>
          <div className="skill-bar-top">
            <span className="skill-bar-name">{s.name}</span>
            <span className="skill-bar-pct">{s.pct}%</span>
          </div>
          <div className="skill-bar-track">
            <div className="skill-bar-fill" style={{ width: animate ? `${s.pct}%` : "0%", transitionDelay: `${i * 80}ms` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const tickerItems = ["React.js", "Angular", "TypeScript", "RxJS", "NgRx", "Redux", "SCSS", "REST APIs", "Banking UI", "EdTech", "Mentorship", "Agile"];

export default function App() {
  const [time, setTime] = useState("");
  const [activeSkill, setActiveSkill] = useState("Frontend");
  const [activeExp, setActiveExp] = useState(0);
  const [activeNav, setActiveNav] = useState("about");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.4 });
    ["about", "skills", "experience", "projects", "education", "contact"].forEach(id => {
      const el = document.getElementById(id); if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="nav-logo-bracket">[</span>
          Surya R
          <span className="nav-logo-bracket">]</span>
        </div>
        <div className="nav-pill">
          {["about", "skills", "experience", "projects", "contact"].map(s => (
            <a key={s} href={`#${s}`} className={activeNav === s ? "active" : ""}>{s}</a>
          ))}
        </div>
        <div className="nav-time">🕐 {time} IST</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-lines" />
        <div className="hero-blob blob1" /><div className="hero-blob blob2" /><div className="hero-blob blob3" />

        <div className="hero-tag">
          <div className="hero-tag-dot" />
          <span>Available for new opportunities</span>
        </div>

        <h1 className="hero-headline">
          <span className="line1">Surya R.</span>
          <span className="line2">Frontend Dev</span>
          <span className="line3">React.js · Angular · TypeScript · Banking & EdTech Specialist</span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            Building <strong>precise, performant, and beautiful</strong> web interfaces for financial platforms and EdTech products. Based in <strong>Coimbatore, India</strong>.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="mag-btn mag-btn-primary"><span>View Projects ↗</span></a>
            <a href="#contact" className="mag-btn mag-btn-ghost"><span>Let's Talk</span></a>
          </div>
          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            Scroll to explore
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <div className="ticker-item" key={i}><span className="ticker-dot" />{t}</div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="sec">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">01</span><span className="sec-label">About Me</span></div>
            <h2 className="sec-title">Crafting <em>interfaces</em> that<br />actually <span className="coral">matter</span></h2>
          </Rev>
          <div className="about-layout">
            <Rev delay={100}>
              <div className="about-text">
                <p>I'm a <span className="highlight">Frontend Developer</span> with 2+ years of production experience building secure, scalable web applications for banking and EdTech platforms. My craft sits at the crossroads of clean engineering and thoughtful UI design.</p>
                <p>At <strong>WeCodee Innovations</strong>, I work on real-world banking applications — handling everything from role-based access control to RESTful API integrations. I also <strong>mentor junior developers</strong>, helping them level up with React, Angular, RxJS, and NgRx.</p>
                <p>Before that, at <strong>HRlytics</strong>, I built two AI-powered examination modules and a real-time analytics dashboard that shipped to thousands of learners — reducing future dev time by <strong>30%</strong> through reusable component systems.</p>
              </div>
            </Rev>
            <Rev delay={200}>
              <div className="about-cards">
                {[
                  { val: "2+", label: "Years Experience" },
                  { val: "8+", label: "Projects Shipped" },
                  { val: "4", label: "Devs Mentored" },
                  { val: "30%", label: "Dev Time Saved" },
                ].map((c, i) => (
                  <div className="about-card" key={i}>
                    <div className="card-val">{c.val}</div>
                    <div className="card-label">{c.label}</div>
                  </div>
                ))}
              </div>
            </Rev>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <div className="skills-full" id="skills">
        <div className="skills-inner">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">02</span><span className="sec-label">Skills</span></div>
            <h2 className="sec-title">My <em>tech</em> <span className="yellow">stack</span></h2>
          </Rev>
          <Rev delay={100}>
            <div className="skills-tabs">
              {Object.keys(skills).map(k => (
                <button key={k} className={`skill-tab${activeSkill === k ? " active" : ""}`} onClick={() => setActiveSkill(k)}>{k}</button>
              ))}
            </div>
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className={`skill-panel${activeSkill === k ? " active" : ""}`}>
                <SkillBars items={v} active={activeSkill === k} />
              </div>
            ))}
          </Rev>
        </div>
      </div>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">03</span><span className="sec-label">Experience</span></div>
            <h2 className="sec-title">Where I've <em>worked</em></h2>
          </Rev>
          <Rev delay={100}>
            <div className="exp-tabs">
              {experience.map((e, i) => (
                <button key={i} className={`exp-tab${activeExp === i ? " active" : ""}`} onClick={() => setActiveExp(i)}>{e.tab}</button>
              ))}
            </div>
            {experience.map((e, i) => (
              <div key={i} className={`exp-panel${activeExp === i ? " active" : ""}`}>
                <div className="exp-header">
                  <div className="exp-role-title">{e.role}</div>
                  <div className="exp-meta">
                    <span className="exp-company-badge">⚡ {e.company}</span>
                    <span className="exp-period-badge">{e.period}</span>
                  </div>
                </div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => (
                    <li key={j}><div className="exp-bullet-icon">✦</div>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Rev>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "var(--black2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="sec">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">04</span><span className="sec-label">Projects</span></div>
            <h2 className="sec-title">Things I've <em>built</em></h2>
          </Rev>
          <Rev delay={100}>
            <div className="projects-layout">
              {projects.map((p, i) => (
                <div className="proj-card" key={i}>
                  <div className="proj-card-glow" />
                  <div className="proj-num">0{i + 1}</div>
                  <div className="proj-title">{p.name}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-footer">
                    <div className="proj-tags">
                      {p.tags.map((t, j) => <span key={j} className={`proj-tag ${j === 1 ? p.color : ""}`}>{t}</span>)}
                    </div>
                    <div className="proj-arrow">↗</div>
                  </div>
                </div>
              ))}
            </div>
          </Rev>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="sec">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">05</span><span className="sec-label">Education</span></div>
            <h2 className="sec-title">Academic <em>background</em></h2>
          </Rev>
          <Rev delay={100}>
            <div className="edu-layout">
              {education.map((e, i) => (
                <div className="edu-card" key={i}>
                  <div className="edu-icon">{e.icon}</div>
                  <div className="edu-deg">{e.deg}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-score">★ {e.score}</div>
                </div>
              ))}
            </div>
          </Rev>
        </div>
      </section>

      {/* CONTACT */}
      <div className="contact-full" id="contact">
        <div className="contact-inner">
          <Rev>
            <div className="sec-eyebrow"><span className="sec-num">06</span><span className="sec-label">Contact</span></div>
            <h2 className="sec-title">Let's <em>work</em> together</h2>
          </Rev>
          <Rev delay={100}>
            <p className="contact-blurb">Have a project, a role, or just want to chat about frontend? <strong>My inbox is open.</strong> I'm always interested in new challenges and meaningful work.</p>
            <div className="contact-links">
              {[
                { icon: "✉", label: "Email", val: "suryarhms@gmail.com", href: "mailto:suryarhms@gmail.com" },
                { icon: "📞", label: "Phone", val: "6383561509", href: "tel:6383561509" },
                { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/suryarravichandran", href: "#" },
                { icon: "📍", label: "Location", val: "Coimbatore, Tamil Nadu", href: "#" },
              ].map((c, i) => (
                <a key={i} className="c-link" href={c.href}>
                  <div className="c-icon">{c.icon}</div>
                  <div className="c-info">
                    <span className="c-info-label">{c.label}</span>
                    <span className="c-info-val">{c.val}</span>
                  </div>
                </a>
              ))}
            </div>
          </Rev>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} <span>Surya R.</span> — Frontend Developer</p>
        <p>Built with <span>React.js</span> · Coimbatore, India 🇮🇳</p>
      </footer>
    </>
  );
}