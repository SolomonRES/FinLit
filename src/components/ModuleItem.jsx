import { useState } from 'react';
import { CheckCircle2, Circle, Lock, ArrowRight, Clock, BookOpenCheck } from 'lucide-react';
import { API_BASE } from '../config';

const STATUS_ICONS = {
  completed:     <CheckCircle2 className="status-icon completed"     strokeWidth={2} />,
  'not-completed': <Circle    className="status-icon not-completed"  strokeWidth={2} />,
  locked:        <Lock        className="status-icon locked-icon"    strokeWidth={2} />,
};

const DIFFICULTY_LABELS = {
  beginner:     { label: 'Beginner',     cls: 'difficulty-beginner' },
  intermediate: { label: 'Intermediate', cls: 'difficulty-intermediate' },
  advanced:     { label: 'Advanced',     cls: 'difficulty-advanced' },
};

function ModuleItem({ mod, onOpen }) {
  const isLocked = mod.status === 'locked';
  const difficulty = mod.difficulty ? DIFFICULTY_LABELS[mod.difficulty] : null;

  let statusText = null;
  if (mod.status === 'completed') {
    statusText = <span className="module-status-text completed-text">&bull; Completed</span>;
  } else if (mod.status === 'locked') {
    statusText = <span className="module-status-text locked-text">&bull; Locked</span>;
  }

  const imgSrc = mod.img_name ? `${API_BASE}/${mod.img_name}` : null;
  const [imgError, setImgError] = useState(false);
  const showImg = imgSrc && !imgError;

  const inner = (
    <div className="module-item-inner">
      <div className="module-thumbnail">
        {showImg ? (
          <img src={imgSrc} alt={mod.title} onError={() => setImgError(true)} />
        ) : (
          <div className="module-thumb-placeholder">
            <BookOpenCheck size={28} strokeWidth={1.2} />
          </div>
        )}
      </div>
      <div className="module-left">
        <div className="module-status">{STATUS_ICONS[mod.status]}</div>
        <div className="module-content">
          <div className="module-title-row">
            <h4 className="module-title">{mod.title}</h4>
            {difficulty && (
              <span className={`module-difficulty ${difficulty.cls}`}>{difficulty.label}</span>
            )}
          </div>
          <p className="module-description">{mod.description}</p>
          {mod.topics && mod.topics.length > 0 && (
            <ul className="module-topics">
              {mod.topics.slice(0, 3).map((t, i) => (
                <li key={i} className="module-topic-item">
                  <span className="topic-dot" />
                  {t}
                </li>
              ))}
              {mod.topics.length > 3 && (
                <li className="module-topic-more">+{mod.topics.length - 3} more topics</li>
              )}
            </ul>
          )}
          <div className="module-meta">
            <span className="module-duration">
              <Clock className="meta-icon" strokeWidth={2} /> {mod.duration} min
            </span>
            {statusText}
          </div>
        </div>
      </div>
      {!isLocked && <ArrowRight className="module-arrow" strokeWidth={2} />}
    </div>
  );

  if (isLocked) {
    return <div className="module-item locked">{inner}</div>;
  }

  return (
    <button
      className="module-item"
      onClick={() => onOpen?.(mod)}
      type="button"
    >
      {inner}
    </button>
  );
}

export default ModuleItem;
