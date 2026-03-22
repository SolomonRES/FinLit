import React from 'react';
import { CheckCircle2, Circle, Lock, ArrowRight, Clock } from 'lucide-react';

const STATUS_ICONS = {
  completed: <CheckCircle2 className="status-icon completed" strokeWidth={2} />,
  'not-completed': <Circle className="status-icon not-completed" strokeWidth={2} />,
  locked: <Lock className="status-icon locked-icon" strokeWidth={2} />,
};

const ARROW_ICON = <ArrowRight className="module-arrow" strokeWidth={2} />;
const CLOCK_ICON = <Clock className="meta-icon" strokeWidth={2} />;

function ModuleItem({ mod }) {
  const isLocked = mod.status === 'locked';
  let statusText = null;
  if (mod.status === 'completed') {
    statusText = <span className="module-status-text completed-text">&bull; Completed</span>;
  } else if (mod.status === 'locked') {
    statusText = <span className="module-status-text locked-text">&bull; Locked</span>;
  }

  const inner = (
    <div className="module-item-inner">
      <div className="module-thumbnail">
        <img src={process.env.PUBLIC_URL + '/' + mod.img_name} alt={mod.title} />
      </div>
      <div className="module-left">
        <div className="module-status">{STATUS_ICONS[mod.status]}</div>
        <div className="module-content">
          <h4 className="module-title">{mod.title}</h4>
          <p className="module-description">{mod.description}</p>
          <div className="module-meta">
            <span className="module-duration">{CLOCK_ICON} {mod.duration} min</span>
            {statusText}
          </div>
        </div>
      </div>
      {!isLocked && ARROW_ICON}
    </div>
  );

  if (isLocked) {
    return <div className="module-item locked">{inner}</div>;
  }
  return <a className="module-item" href="#" onClick={e => e.preventDefault()}>{inner}</a>;
}

export default ModuleItem;
