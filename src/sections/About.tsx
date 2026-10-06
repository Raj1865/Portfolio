const STATS = [
  { name: 'AI & PROMPT ENGINEERING', level: 92 },
  { name: 'BACKEND ENGINEERING', level: 90 },
  { name: 'PROBLEM SOLVING (DSA)', level: 88 },
  { name: 'COFFEE → CODE CONVERSION', level: 100 },
];

export default function About() {
  return (
    <section id="about">
      <div className="section-tag reveal">WORLD 1-1 · PLAYER PROFILE</div>
      <h2 className="title reveal">One player,<br />two <span className="hl">classes</span></h2>
      <p className="subtitle reveal">
        Most teams make AI engineers and full-stack devs fight over architecture.
        I just argue with myself — and both sides win.
      </p>

      <div className="about-grid">
        <div className="acard reveal">
          <span className="px" style={{ fontSize: '0.55rem', color: 'var(--red)' }}>CHARACTER BIO</span>
          <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', margin: '0.8rem 0' }}>
            An AI engineer who codes. A dev who automates.
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, fontWeight: 500 }}>
            I'm an IT student and software engineer diving deep into AI and
            agentic systems — because the future isn't just about writing code,
            it's about teaching machines to write it with you. I build backends
            that scale, frontends that delight, and AI workflows that multiply
            output. When I'm not shipping, I'm competing — sports on the field,
            esports on the screen. The original PvP: observe quickly, react
            faster, don't break anything.
          </p>
        </div>

        <div className="acard reveal">
          <span className="px" style={{ fontSize: '0.55rem', color: 'var(--red)' }}>BASE STATS</span>
          {STATS.map((s) => (
            <div className="stat-row" key={s.name}>
              <label><span>{s.name}</span><span data-count={s.level}>0%</span></label>
              <div className="bar"><div className="fill" data-w={s.level} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="acard reveal" style={{ marginTop: '2rem' }}>
        <span className="px" style={{ fontSize: '0.55rem', color: 'var(--red)' }}>SAVE FILE · LOADED</span>
        <div className="savefile" style={{ marginTop: '1rem', columns: 2, columnGap: '3rem' }}>
          <div><span className="k">LOCATION —</span> Indore, India</div>
          <div><span className="k">DEGREE —</span> B.Tech Information Technology</div>
          <div><span className="k">CLASS —</span> AI Software Engineer</div>
          <div><span className="k">STATUS —</span> Open to full-time roles</div>
          <div><span className="k">SIDE QUESTS —</span> Sports & Esports</div>
          <div><span className="k">WEAKNESS —</span> Says "one more game" too often</div>
        </div>
      </div>
    </section>
  );
}
