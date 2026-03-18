import './App.css';
import { useEffect, useRef, useState } from 'react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&display=swap');
 
  * { margin: 0; padding: 0; box-sizing: border-box; }
 
  :root {
    --bg: #0a0612;
    --bg2: #110d1e;
    --purple-deep: #1a0f2e;
    --purple-mid: #6b21a8;
    --purple-bright: #a855f7;
    --purple-glow: #c084fc;
    --purple-pale: #e9d5ff;
    --accent: #f0abfc;
    --accent2: #38bdf8;
    --text: #f5f0ff;
    --text-muted: #a78bca;
    --border: rgba(168,85,247,0.2);
    --serif: 'Playfair Display', Georgia, serif;
    --mono: 'DM Mono', monospace;
  }
 
  html { scroll-behavior: smooth; }
 
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    overflow-x: hidden;
  }
 
  /* NOISE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }
 
  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--purple-mid); border-radius: 2px; }
 
  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 4rem;
    background: rgba(10,6,18,0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
 
  .nav-logo {
    font-family: var(--serif);
    font-size: 1.4rem;
    font-style: italic;
    color: var(--purple-glow);
    letter-spacing: -0.02em;
  }
 
  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
 
  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: color 0.3s;
  }
 
  .nav-links a:hover { color: var(--purple-glow); }
 
  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 8rem 4rem 4rem;
    position: relative;
    overflow: hidden;
  }
 
  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
 
  .orb1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%);
    top: -100px; right: -100px;
    animation: float1 8s ease-in-out infinite;
  }
 
  .orb2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%);
    bottom: 0; left: -100px;
    animation: float2 10s ease-in-out infinite;
  }
 
  @keyframes float1 {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(-30px, 40px) scale(1.05); }
  }
 
  @keyframes float2 {
    0%, 100% { transform: translate(0,0); }
    50% { transform: translate(40px, -30px); }
  }
 
  .hero-content { position: relative; z-index: 1; max-width: 800px; }
 
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(168,85,247,0.1);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--purple-glow);
    margin-bottom: 2rem;
  }
 
  .hero-tag::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--purple-bright);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
 
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
 
  .hero-name {
    font-family: var(--serif);
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
 
  .hero-name span {
    display: block;
    background: linear-gradient(135deg, var(--purple-pale) 0%, var(--purple-glow) 40%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
 
  .hero-name em {
    display: block;
    font-style: italic;
    color: var(--text-muted);
    -webkit-text-fill-color: var(--text-muted);
    font-size: 0.6em;
    font-weight: 400;
    margin-top: 0.3em;
    letter-spacing: 0.02em;
  }
 
  .hero-desc {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.8;
    max-width: 500px;
    margin-bottom: 3rem;
  }
 
  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
 
  .btn-primary {
    background: linear-gradient(135deg, var(--purple-mid), var(--purple-bright));
    color: white;
    border: none;
    padding: 0.85rem 2rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 0 30px rgba(168,85,247,0.3);
  }
 
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(168,85,247,0.5);
  }
 
  .btn-secondary {
    background: transparent;
    color: var(--purple-glow);
    border: 1px solid var(--border);
    padding: 0.85rem 2rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }
 
  .btn-secondary:hover {
    border-color: var(--purple-bright);
    background: rgba(168,85,247,0.05);
  }
 
  /* SECTIONS */
  section {
    padding: 6rem 4rem;
    max-width: 1100px;
    margin: 0 auto;
  }
 
  .section-label {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--purple-bright);
    margin-bottom: 0.5rem;
  }
 
  .section-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 3rem;
    color: var(--text);
  }
 
  .section-title em {
    font-style: italic;
    color: var(--purple-glow);
  }
 
  /* DIVIDER */
  .divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0;
  }
 
  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
 
  .about-text p {
    color: var(--text-muted);
    line-height: 1.9;
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }
 
  .about-text p strong {
    color: var(--purple-pale);
    font-weight: 500;
  }
 
  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
 
  .stat-card {
    background: rgba(168,85,247,0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s;
  }
 
  .stat-card:hover {
    border-color: var(--purple-bright);
    background: rgba(168,85,247,0.1);
    transform: translateY(-3px);
  }
 
  .stat-num {
    font-family: var(--serif);
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--purple-glow);
    line-height: 1;
    margin-bottom: 0.3rem;
  }
 
  .stat-label {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
 
  /* SKILLS */
  .skills-container { display: flex; flex-direction: column; gap: 2.5rem; }
 
  .skill-category-title {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--purple-bright);
    margin-bottom: 1rem;
  }
 
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
 
  .skill-pill {
    background: rgba(168,85,247,0.08);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.5rem 1.2rem;
    font-size: 0.78rem;
    color: var(--purple-pale);
    letter-spacing: 0.05em;
    transition: all 0.25s;
    cursor: default;
  }
 
  .skill-pill:hover {
    background: rgba(168,85,247,0.2);
    border-color: var(--purple-bright);
    color: white;
    transform: translateY(-2px);
  }
 
  /* PROJECTS */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
 
  .project-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.35s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
 
  .project-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.35s;
  }
 
  .project-card:hover::before { opacity: 1; }
 
  .project-card:hover {
    border-color: var(--purple-bright);
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(168,85,247,0.15);
  }
 
  .project-num {
    font-family: var(--serif);
    font-size: 3rem;
    font-weight: 900;
    color: rgba(168,85,247,0.15);
    line-height: 1;
    margin-bottom: 1rem;
    font-style: italic;
  }
 
  .project-title {
    font-family: var(--serif);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.75rem;
  }
 
  .project-desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
 
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
 
  .project-tag {
    background: rgba(168,85,247,0.1);
    border: 1px solid rgba(168,85,247,0.2);
    border-radius: 4px;
    padding: 0.25rem 0.6rem;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    color: var(--purple-glow);
    text-transform: uppercase;
  }
 
  .project-link {
    position: absolute;
    top: 1.5rem; right: 1.5rem;
    color: var(--text-muted);
    font-size: 1.2rem;
    transition: color 0.3s;
    text-decoration: none;
  }
 
  .project-card:hover .project-link { color: var(--purple-glow); }
 
  /* EXPERIENCE */
  .exp-timeline { position: relative; }
 
  .exp-timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--purple-bright), transparent);
  }
 
  .exp-item {
    padding-left: 2.5rem;
    padding-bottom: 3rem;
    position: relative;
  }
 
  .exp-item::before {
    content: '';
    position: absolute;
    left: -4px; top: 6px;
    width: 9px; height: 9px;
    border-radius: 50%;
    background: var(--purple-bright);
    box-shadow: 0 0 12px var(--purple-bright);
  }
 
  .exp-period {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--purple-bright);
    margin-bottom: 0.4rem;
  }
 
  .exp-role {
    font-family: var(--serif);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.2rem;
  }
 
  .exp-company {
    font-size: 0.85rem;
    color: var(--purple-glow);
    margin-bottom: 0.8rem;
    font-style: italic;
  }
 
  .exp-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.8;
    max-width: 600px;
  }
 
  /* CONTACT */
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
 
  .contact-info p {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
 
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
 
  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.82rem;
    letter-spacing: 0.05em;
    transition: color 0.3s;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
  }
 
  .contact-link:hover { color: var(--purple-glow); }
 
  .contact-link-icon {
    width: 32px; height: 32px;
    background: rgba(168,85,247,0.1);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
 
  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
 
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
 
  .form-label {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--purple-bright);
  }
 
  .form-input, .form-textarea {
    background: rgba(168,85,247,0.05);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.85rem 1rem;
    color: var(--text);
    font-family: var(--mono);
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.3s;
    resize: none;
  }
 
  .form-input:focus, .form-textarea:focus {
    border-color: var(--purple-bright);
    background: rgba(168,85,247,0.08);
  }
 
  .form-textarea { min-height: 130px; }
 
  /* FOOTER */
  footer {
    text-align: center;
    padding: 2.5rem 4rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  }
 
  footer span { color: var(--purple-bright); }
 
  /* FADE IN */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
 
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 4rem 1.5rem; }
    .hero { padding: 7rem 1.5rem 3rem; }
    .about-grid, .contact-wrapper { grid-template-columns: 1fr; gap: 2rem; }
  }
`;

const data = {
  name: "Alex Rivera",
  role: "Full Stack Developer",
  tagline: "& Creative Technologist",
  bio: [
    "I craft <strong>digital experiences</strong> that live at the intersection of elegant engineering and thoughtful design. With a passion for clean code and intuitive interfaces, I turn complex problems into simple, beautiful solutions.",
    "When I'm not pushing pixels or architecting systems, you'll find me exploring the edges of what technology can create — from generative art to experimental web experiences."
  ],
  stats: [
    { num: "4+", label: "Years Experience" },
    { num: "32", label: "Projects Shipped" },
    { num: "12", label: "Happy Clients" },
    { num: "8", label: "Open Source Repos" },
  ],
  skills: [
    { category: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] },
    { category: "Backend", items: ["Node.js", "Java", "Spring Boot", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "Tools & Platforms", items: ["Docker", "AWS", "Git", "Figma", "Vercel", "Linux"] },
  ],
  projects: [
    { title: "Lumina Dashboard", desc: "A real-time analytics platform with interactive data visualizations and AI-powered insights for SaaS businesses.", tags: ["React", "D3.js", "Node.js", "PostgreSQL"] },
    { title: "Orbis Commerce", desc: "Full-stack e-commerce solution with headless CMS, dynamic pricing engine, and seamless payment integrations.", tags: ["Next.js", "Stripe", "MongoDB", "Redis"] },
    { title: "Pulse Social", desc: "A social networking app with real-time messaging, content feeds, and ML-based recommendation engine.", tags: ["React Native", "GraphQL", "Firebase"] },
    { title: "Nexus API Gateway", desc: "Scalable microservices gateway with rate limiting, auth middleware, and automatic API documentation generation.", tags: ["Java", "Spring Boot", "Docker", "AWS"] },
    { title: "Velox CLI", desc: "Developer productivity tool that automates boilerplate generation, git workflows, and deployment pipelines.", tags: ["Node.js", "TypeScript", "Shell"] },
    { title: "Ether Canvas", desc: "Generative art platform where algorithms and user input co-create unique visual compositions in real time.", tags: ["Three.js", "WebGL", "Canvas API"] },
  ],
  experience: [
    { period: "2023 — Present", role: "Senior Frontend Engineer", company: "Nexus Technologies, San Francisco", desc: "Leading the frontend architecture for a B2B SaaS platform serving 50,000+ users. Reduced bundle size by 40% and improved core web vitals scores to 98/100." },
    { period: "2021 — 2023", role: "Full Stack Developer", company: "Orbit Digital Agency, Remote", desc: "Built end-to-end web applications for clients across fintech, healthcare, and e-commerce. Delivered 14 projects on time with an average client satisfaction score of 4.9/5." },
    { period: "2020 — 2021", role: "Junior Developer", company: "Spark Startup Studio, Austin", desc: "Contributed to 3 early-stage product launches. Developed RESTful APIs and responsive frontends using React and Node.js in a fast-paced agile environment." },
  ],
  contact: {
    email: "alex.rivera@email.com",
    github: "github.com/alexrivera",
    linkedin: "linkedin.com/in/alexrivera",
    twitter: "@alexrivera_dev",
  }
};

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={`fade-in${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">{data.name.split(" ")[0]}.</div>
        <ul className="nav-links">
          {["about", "skills", "projects", "experience", "contact"].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero" id="home">
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-content">
          <div className="hero-tag">Available for work</div>
          <h1 className="hero-name">
            <span>{data.name}</span>
            <em>{data.role} {data.tagline}</em>
          </h1>
          <p className="hero-desc">
            Building beautiful, high-performance web applications with modern technologies. Turning ideas into elegant digital realities.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about">
        <FadeIn>
          <div className="section-label">01 — About</div>
          <h2 className="section-title">A little bit about <em>me</em></h2>
        </FadeIn>
        <div className="about-grid">
          <FadeIn delay={100}>
            <div className="about-text">
              {data.bio.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="about-stats">
              {data.stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills">
        <FadeIn>
          <div className="section-label">02 — Skills</div>
          <h2 className="section-title">Technologies I <em>work with</em></h2>
        </FadeIn>
        <div className="skills-container">
          {data.skills.map((cat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="skill-category-title">{cat.category}</div>
              <div className="skills-grid">
                {cat.items.map((skill, j) => (
                  <div className="skill-pill" key={j}>{skill}</div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects">
        <FadeIn>
          <div className="section-label">03 — Projects</div>
          <h2 className="section-title">Things I've <em>built</em></h2>
        </FadeIn>
        <div className="projects-grid">
          {data.projects.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="project-card">
                <div className="project-num">0{i + 1}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map((t, j) => <span className="project-tag" key={j}>{t}</span>)}
                </div>
                <span className="project-link">↗</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section id="experience">
        <FadeIn>
          <div className="section-label">04 — Experience</div>
          <h2 className="section-title">Where I've <em>worked</em></h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="exp-timeline">
            {data.experience.map((e, i) => (
              <div className="exp-item" key={i}>
                <div className="exp-period">{e.period}</div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-company">{e.company}</div>
                <div className="exp-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact">
        <FadeIn>
          <div className="section-label">05 — Contact</div>
          <h2 className="section-title">Let's <em>work together</em></h2>
        </FadeIn>
        <div className="contact-wrapper">
          <FadeIn delay={100}>
            <div className="contact-info">
              <p>Have a project in mind or just want to say hello? My inbox is always open. I'll try my best to get back to you!</p>
              <div className="contact-links">
                <a href={`mailto:${data.contact.email}`} className="contact-link">
                  <span className="contact-link-icon">✉</span>
                  {data.contact.email}
                </a>
                <a href="#" className="contact-link">
                  <span className="contact-link-icon">⌥</span>
                  {data.contact.github}
                </a>
                <a href="#" className="contact-link">
                  <span className="contact-link-icon">in</span>
                  {data.contact.linkedin}
                </a>
                <a href="#" className="contact-link">
                  <span className="contact-link-icon">𝕏</span>
                  {data.contact.twitter}
                </a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" placeholder="Your name" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" placeholder="your@email.com" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button className="btn-primary" onClick={handleSubmit} style={{ width: "fit-content" }}>
                {sent ? "✓ Message Sent!" : "Send Message →"}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer>
        <p>Designed & built by <span>{data.name}</span> · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default App;
