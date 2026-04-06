import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock, BookOpen, ChevronRight, Lock, ExternalLink, Loader2 } from 'lucide-react';
import { getDiagram } from './diagrams';
import { API_BASE } from '../config';

function ModuleDrawer({ module: mod, onClose }) {
  const isOpen = !!mod;
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch individual course details from /api/courses/:id
  useEffect(() => {
    if (!mod) { setDetail(null); return; }
    setDetailLoading(true);
    fetch(`${API_BASE}/api/courses/${mod._id}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setDetail(data); setDetailLoading(false); })
      .catch(() => { setDetail(null); setDetailLoading(false); });
  }, [mod]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const course = detail || mod;
  const Diagram = course ? getDiagram(course._id) : null;
  const isLocked = course?.status === 'locked';
  const handleViewFull = () => {
    onClose();
    navigate(`/learning/${course._id}`);
  };

  return (
    <>
      <div className={`drawer-overlay${isOpen ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`module-drawer${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={course?.title}
      >
        {course && (
          <>
            <div className="drawer-header">
              <div className="drawer-header-text">
                <span className={`drawer-domain-chip dk-${course.domain_key}`}>{course.domain}</span>
                <h2 className="drawer-title">{course.title}</h2>
                <div className="drawer-chips">
                  <span className="drawer-chip">
                    <Clock size={12} /> {course.duration} min
                  </span>
                  {course.difficulty && (
                    <span className={`drawer-chip diff-${course.difficulty}`}>{course.difficulty}</span>
                  )}
                  {isLocked && (
                    <span className="drawer-chip chip-locked">
                      <Lock size={11} /> Locked
                    </span>
                  )}
                  {detailLoading && (
                    <span className="drawer-chip">
                      <Loader2 size={11} className="drawer-spin" /> Loading…
                    </span>
                  )}
                </div>
              </div>
              <button className="drawer-close-btn" onClick={onClose} aria-label="Close panel">
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              <p className="drawer-description">{course.description}</p>

              <div className="drawer-section">
                <p className="drawer-section-label">Interactive Overview</p>
                <div className="drawer-diagram-frame">
                  {Diagram && <Diagram module={course} />}
                </div>
              </div>

              {course.topics?.length > 0 && (
                <div className="drawer-section">
                  <p className="drawer-section-label">Topics Covered</p>
                  <ul className="drawer-topics-list">
                    {course.topics.map((t, i) => (
                      <li key={i} className="drawer-topic-item">
                        <ChevronRight size={13} className="drawer-topic-chevron" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            <div className="drawer-cta-wrap">
              <button
                className="drawer-view-full-btn"
                onClick={handleViewFull}
                type="button"
              >
                <ExternalLink size={15} />
                View Full Module
              </button>
              <button
                className={`drawer-start-btn${isLocked ? ' locked' : ''}`}
                disabled={isLocked}
                onClick={handleViewFull}
                type="button"
              >
                <BookOpen size={15} />
                {isLocked ? 'Complete prior modules to unlock' : 'Start Learning'}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default ModuleDrawer;
