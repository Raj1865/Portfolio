const QUESTS = [
  {
    status: 'cleared', diff: '★★★',
    title: 'Canopy',
    desc: 'Task & project management with a calm, tree-structured UI. Nested boards, keyboard-first navigation, offline sync. Owned the roadmap and the repo.',
    stack: 'REACT · TYPESCRIPT · INDEXEDDB',
  },
  {
    status: 'cleared', diff: '★★★★',
    title: 'Migration',
    desc: 'Multi-city travel planner with live collaboration. Mapped routes, budgets, and itineraries — and the WebSocket layer that keeps friends from double-booking hostels.',
    stack: 'NODE.JS · POSTGRESQL · WEBSOCKETS',
  },
  {
    status: 'cleared', diff: '★★★',
    title: 'Photosynthesis',
    desc: 'Energy dashboard turning raw smart-meter data into charts a sustainability club actually checks. Data in, behavior change out.',
    stack: 'D3.JS · PYTHON · FASTAPI',
  },
  {
    status: 'cleared', diff: '★★★',
    title: 'Tidepool',
    desc: 'Lightweight community chat with channels, reactions, and end-to-end encrypted DMs. Small app, big opinions about message ordering.',
    stack: 'REACT NATIVE · SOCKET.IO',
  },
  {
    status: 'cleared', diff: '★★★★★',
    title: 'Wildfire Watch',
    desc: '36-hour hackathon boss fight: crowdsourced wildfire alerts on a live map. Beat 40 teams, won "Best Social Impact", slept eventually.',
    stack: 'NEXT.JS · MAPBOX · TWILIO',
  },
  {
    status: 'wip', diff: '★★★★',
    title: 'RAJ.EXE',
    desc: 'The game you are literally playing right now. A portfolio with a score counter, because a PDF couldn\'t hold all of Raj Kokate\'s personality.',
    stack: 'REACT · THREE.JS · CANVAS · WEBAUDIO',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-tag reveal">WORLD 2-1 · QUEST LOG</div>
      <h2 className="title reveal">Completed<br /><span className="hl">quests</span></h2>
      <p className="subtitle reveal">
        Every quest shipped, every loot drop documented. Difficulty rated in
        stars, bugs rated in tears (redacted).
      </p>

      <div className="quest-grid">
        {QUESTS.map((q) => (
          <article className="quest reveal tilt" key={q.title}>
            <div className="qtop">
              <span className={`qstatus ${q.status === 'cleared' ? 'cleared' : 'wip'}`}>
                {q.status === 'cleared' ? '✓ CLEARED' : '▶ IN PROGRESS'}
              </span>
              <span className="qdiff" title="Difficulty">{q.diff}</span>
            </div>
            <h3>{q.title}</h3>
            <p>{q.desc}</p>
            <div className="stack">{q.stack}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
