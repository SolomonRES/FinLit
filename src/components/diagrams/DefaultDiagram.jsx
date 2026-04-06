export default function DefaultDiagram({ module: mod }) {
  if (!mod?.topics?.length) return null;

  return (
    <div className="dd-wrap">
      <p className="dd-headline">What you'll learn in this module</p>
      <ul className="dd-topics">
        {mod.topics.map((t, i) => (
          <li key={i} className="dd-topic">
            <span className="dd-num">{i + 1}</span>
            <span className="dd-text">{t}</span>
          </li>
        ))}
      </ul>
      <div className="dd-meta-row">
        <span className="dd-meta-item">{mod.duration} min module</span>
        {mod.difficulty && <span className={`dd-meta-item diff-${mod.difficulty}`}>{mod.difficulty}</span>}
      </div>
    </div>
  );
}
