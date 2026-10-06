import type { ReactElement } from 'react';

const ICONS: Record<string, ReactElement> = {
  flower: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="6" y="1" width="4" height="2" fill="#f03749"/><rect x="4" y="3" width="8" height="2" fill="#f03749"/>
      <rect x="4" y="5" width="8" height="2" fill="#fee600"/><rect x="6" y="7" width="4" height="2" fill="#f03749"/>
      <rect x="7" y="9" width="2" height="5" fill="#009146"/><rect x="4" y="10" width="3" height="2" fill="#009146"/>
    </svg>
  ),
  mushroom: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="4" y="2" width="8" height="2" fill="#f03749"/><rect x="2" y="4" width="12" height="3" fill="#f03749"/>
      <rect x="4" y="4" width="2" height="2" fill="#f8ebda"/><rect x="10" y="4" width="2" height="2" fill="#f8ebda"/>
      <rect x="5" y="7" width="6" height="6" fill="#f8ebda"/><rect x="6" y="8" width="1" height="2" fill="#141313"/><rect x="9" y="8" width="1" height="2" fill="#141313"/>
    </svg>
  ),
  star: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="7" y="1" width="2" height="3" fill="#fee600"/><rect x="5" y="4" width="6" height="2" fill="#fee600"/>
      <rect x="2" y="6" width="12" height="2" fill="#fee600"/><rect x="4" y="8" width="8" height="2" fill="#fee600"/>
      <rect x="5" y="10" width="3" height="4" fill="#fee600"/><rect x="8" y="10" width="3" height="4" fill="#fee600"/>
      <rect x="6" y="6" width="1" height="2" fill="#141313"/><rect x="9" y="6" width="1" height="2" fill="#141313"/>
    </svg>
  ),
  oneup: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="4" y="2" width="8" height="2" fill="#009146"/><rect x="2" y="4" width="12" height="3" fill="#009146"/>
      <rect x="3" y="4" width="3" height="2" fill="#f8ebda"/><rect x="9" y="5" width="3" height="2" fill="#f8ebda"/>
      <rect x="5" y="7" width="6" height="6" fill="#f8ebda"/><rect x="6" y="8" width="1" height="2" fill="#141313"/><rect x="9" y="8" width="1" height="2" fill="#141313"/>
    </svg>
  ),
  wing: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="2" y="3" width="2" height="10" fill="#0756a5"/><rect x="4" y="2" width="2" height="10" fill="#7ec8e3"/>
      <rect x="6" y="4" width="2" height="8" fill="#0756a5"/><rect x="8" y="6" width="2" height="6" fill="#7ec8e3"/>
      <rect x="10" y="8" width="2" height="4" fill="#0756a5"/>
    </svg>
  ),
  block: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="2" y="2" width="12" height="12" fill="#fee600"/>
      <rect x="2" y="2" width="12" height="2" fill="#eb6325"/><rect x="2" y="12" width="12" height="2" fill="#eb6325"/>
      <rect x="6" y="6" width="4" height="4" fill="#141313"/>
    </svg>
  ),
  circuit: (
    <svg width="30" height="30" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <rect x="3" y="2" width="10" height="12" fill="#8b5cf6"/>
      <rect x="5" y="4" width="2" height="2" fill="#fee600"/><rect x="9" y="4" width="2" height="2" fill="#fee600"/>
      <rect x="6" y="7" width="4" height="1" fill="#fee600"/>
      <rect x="5" y="9" width="6" height="2" fill="#f8ebda"/>
      <rect x="7" y="9" width="2" height="2" fill="#8b5cf6"/>
      <rect x="1" y="5" width="2" height="1" fill="#fee600"/><rect x="13" y="5" width="2" height="1" fill="#fee600"/>
      <rect x="1" y="10" width="2" height="1" fill="#fee600"/><rect x="13" y="10" width="2" height="1" fill="#fee600"/>
    </svg>
  ),
};

const CATEGORIES = [
  {
    icon: 'flower', color: '#f03749', name: 'Languages', item: 'SYNTAX MASTERY',
    skills: ['Java', 'JavaScript', 'Python'],
  },
  {
    icon: 'mushroom', color: '#eb6325', name: 'Backend', item: 'SERVER POWER',
    skills: ['Node.js', 'Express.js', 'REST API Design', 'Firebase (Realtime DB)', 'Android Studio (Java)'],
  },
  {
    icon: 'block', color: '#fee600', name: 'Databases', item: 'DATA VAULT',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    icon: 'star', color: '#6607a5', name: 'Tools', item: 'UTILITY BELT',
    skills: ['Git', 'GitHub', 'Figma'],
  },
  {
    icon: 'oneup', color: '#009146', name: 'Core CS', item: 'KNOWLEDGE BASE',
    skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Agile / SDLC'],
  },
  {
    icon: 'wing', color: '#0756a5', name: 'Analytics', item: 'DATA WINGS',
    skills: ['KNIME', 'Power BI', 'Excel', 'Google Sheets'],
  },
  {
    icon: 'circuit', color: '#8b5cf6', name: 'AI / Agentic Tools', item: 'AI COMPANION',
    skills: ['Claude Code', 'ChatGPT Codex', 'Google Antigravity', 'Prompt Engineering'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-tag reveal">WORLD 1-2 · POWER-UP INVENTORY</div>
      <h2 className="title reveal">Collected<br /><span className="hl">power-ups</span></h2>
      <p className="subtitle reveal">
        Years of grabbing everything that glowed. Each power-up below has
        been tested in real boss fights (read: deadlines).
      </p>

      <div className="power-grid">
        {CATEGORIES.map((cat) => (
          <div className="acard power-card reveal tilt" key={cat.name}>
            <div className="picon" style={{ background: cat.color }}>{ICONS[cat.icon]}</div>
            <h3>{cat.name}</h3>
            <span className="pname">{cat.item}</span>
            <div className="skill-tags">
              {cat.skills.map((s) => (
                <span key={s} className="skill-tag">
                  <span className="skill-bullet">✦</span> {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
