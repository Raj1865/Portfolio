const QUESTS = [
  {
    status: 'cleared', diff: '★★★★★',
    title: 'ThermaFL',
    desc: 'Final Year Project. A federated learning approach for thermal imaging and advanced data analysis.',
    stack: 'PYTHON',
    link: 'https://github.com/Raj1865/ThermaFL',
  },
  {
    status: 'cleared', diff: '★★★★',
    title: 'Academic Burnout Prediction',
    desc: 'Machine learning model predicting student burnout utilizing behavioral and academic metrics for early intervention.',
    stack: 'JAVASCRIPT · ML',
    link: 'https://github.com/Raj1865/Burnout_Prediction',
  },
  {
    status: 'cleared', diff: '★★★★',
    title: 'Depression Detector',
    desc: 'NLP-driven tool designed to analyze and detect early signs of depression from textual inputs.',
    stack: 'PYTHON · NLP',
    link: 'https://github.com/Raj1865/Depression_Predictor',
  },
  {
    status: 'cleared', diff: '★★★',
    title: 'Anugrah',
    desc: 'Responsive donation platform allowing users to submit item details, location, and images with secure authentication.',
    stack: 'HTML · CSS · JS',
    link: 'https://github.com/Raj1865/Anugrah',
  },
  {
    status: 'cleared', diff: '★★★★★',
    title: 'Safe Chain',
    desc: 'Unified women\'s safety platform for filing complaints, SOS alerts, and secure routing with zero-knowledge proof.',
    stack: 'JAVA · BLOCKCHAIN',
    link: 'https://github.com/Raj1865/SafeChain',
  },
  {
    status: 'cleared', diff: '★★★',
    title: 'Banking Transaction App',
    desc: 'Secure and scalable banking application built for handling transactions efficiently.',
    stack: 'JAVA',
    link: 'https://github.com/Raj1865/BankingTransactionApp',
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
            <a href={q.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="qtop">
                <span className={`qstatus ${q.status === 'cleared' ? 'cleared' : 'wip'}`}>
                  {q.status === 'cleared' ? '✓ CLEARED' : '▶ IN PROGRESS'}
                </span>
                <span className="qdiff" title="Difficulty">{q.diff}</span>
              </div>
              <h3 style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>
                {q.title} ↗
              </h3>
              <p style={{ flex: 1 }}>{q.desc}</p>
              <div className="stack">{q.stack}</div>
            </a>
          </article>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
        <a href="https://github.com/Raj1865?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn alt">
          VIEW ALL REPOSITORIES
        </a>
      </div>
    </section>
  );
}
