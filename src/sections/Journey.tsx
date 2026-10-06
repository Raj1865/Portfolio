const MAP = [
  {
    when: '2022 · LEVEL 1',
    title: 'Pressed start',
    desc: 'Started the CS degree and wrote my first lines of code. Discovered the web is where engineering and design share a controller.',
  },
  {
    when: '2023 · LEVEL 2',
    title: 'Learned the combos',
    desc: 'Deep-dived JavaScript and React, shipped my first real projects, and started contributing to open source. Button-mashing phase: complete.',
  },
  {
    when: '2024 · LEVEL 3',
    title: 'First boss fight: industry',
    desc: 'First software engineering internship. Shipped production features, survived code review, learned that "it works on my machine" is not a defense.',
  },
  {
    when: '2025 · LEVEL 4',
    title: 'Unlocked multiplayer',
    desc: 'Expanded into backend, databases, and cloud. Led a campus project team and mentored juniors in the web-dev club. Turns out explaining code is a skill too.',
  },
  {
    when: '2026 · FINAL LEVEL',
    title: 'Boss door unlocked',
    desc: 'Final year, PM-focused. Seeking internships and junior roles where product thinking and frontend chops both matter. The castle flag is in sight.',
  },
];

export default function Journey() {
  return (
    <section id="journey">
      <div className="section-tag reveal">WORLD MAP · PROGRESS</div>
      <h2 className="title reveal">The save file<br /><span className="hl">so far</span></h2>

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
    </section>
  );
}
