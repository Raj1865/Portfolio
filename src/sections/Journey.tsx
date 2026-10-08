const MAP = [
  {
    when: '2023 · LEVEL 1',
    title: 'Pressed start',
    desc: 'Started my B.Tech journey at VIT. First lines of code written, diving into the fundamentals of computer science and discovering my passion for development.',
  },
  {
    when: '2024 · LEVEL 2',
    title: 'Learned the combos',
    desc: 'Deep-dived into Python, Java, and Web Technologies. Shipped early projects like the Anugrah and built strong logic with DSA.',
  },
  {
    when: '2025 · LEVEL 3',
    title: 'Unlocked multiplayer',
    desc: 'Expanded into Web Dev and Machine Learning. Built impactful projects like SafeChain and Depression Detector, learning to connect the frontend to complex AI/backend systems.',
  },
  {
    when: '2026 · FINAL LEVEL',
    title: 'Boss door unlocked',
    desc: 'Final year in B.Tech IT. Led development on ThermaFL and mastered AI agentic tools. Seeking full-time AI Software Engineer roles where pixel-perfect UI meets powerful backend logic. The castle flag is in sight.',
  },
];

export default function Journey() {
  return (
    <section id="journey">
      <div className="section-tag reveal">WORLD MAP · PROGRESS</div>
      <h2 className="title reveal">The save file<br /><span className="hl">so far</span></h2>

      <div className="journey-layout">
        <div className="map-path">
          <div className="map-line" />
          {MAP.map((m, i) => (
            <div className="map-node reveal" key={m.when}>
              <div className="dot">{i === MAP.length - 1 ? '⚑' : String(i + 1).padStart(2, '0')}</div>
              <div className="card">
                <span className="when">{m.when}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="journey-sprite hidden-mobile reveal">
          <div className="mario-world-scene">
            <div className="pixel-cloud c1"></div>
            <div className="pixel-cloud c2"></div>

            <div className="blocks">
              <div className="qblock bounce">?</div>
              <div className="brick"></div>
              <div className="qblock used"></div>
            </div>

            <div className="pixel-mario-run"></div>
            <div className="pixel-goomba-walk"></div>

            <div className="ground-floor"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
