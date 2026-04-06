import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Lock, ChevronRight, CheckCircle2, AlertCircle, BookOpenCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import { getDiagram } from '../components/diagrams';
import { LESSONS } from '../data/lessons';
import { API_BASE } from '../config';

function CourseDetail() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);   // index of answered quiz
  const [selectedOpt, setSelectedOpt] = useState(null);

  useEffect(() => {
    const slowTimer = setTimeout(() => setSlowLoad(true), 6000);

    fetch(`${API_BASE}/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        clearTimeout(slowTimer);
        setCourse(data);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(slowTimer);
        setError('Could not load course details. Please try again.');
        setLoading(false);
      });

    return () => clearTimeout(slowTimer);
  }, [id]);

  const lesson = LESSONS[Number(id)];
  const Diagram = course ? getDiagram(course._id) : null;
  const imgSrc = course?.img_name ? `${API_BASE}/${course.img_name}` : null;
  const [imgError, setImgError] = useState(false);
  const showImg = imgSrc && !imgError;

  const handleQuizAnswer = (qIdx, optIdx) => {
    setActiveQuiz(qIdx);
    setSelectedOpt(optIdx);
  };

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Loading overlay */}
      {loading && (
        <div className="backend-loading-overlay" aria-live="polite">
          <div className="backend-loading-card">
            <div className="backend-spinner" />
            <p className="backend-loading-title">Loading Course</p>
            <p className="backend-loading-sub">
              {slowLoad
                ? 'The server is waking up - this can take up to 2 minutes on first load.'
                : 'Fetching course details\u2026'}
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="cd-error-wrap">
          <div className="cd-error-card">
            <AlertCircle size={32} />
            <p>{error}</p>
            <Link to="/learning" className="cd-back-link">
              <ArrowLeft size={16} /> Back to Courses
            </Link>
          </div>
        </div>
      )}

      {/* Course content */}
      {course && !loading && (
        <>
          {/* Hero banner */}
          <section className="cd-hero">
            <div className="grid-pattern"></div>
            <div className="cd-hero-content">
              <Link to="/learning" className="cd-back-link">
                <ArrowLeft size={16} /> All Courses
              </Link>
              <div className="cd-hero-layout">
                <div className="cd-hero-text">
                  <span className={`drawer-domain-chip dk-${course.domain_key}`}>{course.domain}</span>
                  <h1 className="cd-title">{course.title}</h1>
                  <p className="cd-description">{course.description}</p>
                  <div className="cd-meta">
                    <span className="cd-meta-item">
                      <Clock size={14} /> {course.duration} min
                    </span>
                    {course.difficulty && (
                      <span className={`cd-meta-item diff-${course.difficulty}`}>{course.difficulty}</span>
                    )}
                    <span className={`cd-status-badge cd-status-${course.status}`}>
                      {course.status === 'completed' && <><CheckCircle2 size={13} /> Completed</>}
                      {course.status === 'not-completed' && 'In Progress'}
                      {course.status === 'locked' && <><Lock size={13} /> Locked</>}
                    </span>
                  </div>
                </div>
                <div className="cd-hero-image">
                  {showImg ? (
                    <img src={imgSrc} alt={course.title} onError={() => setImgError(true)} />
                  ) : (
                    <div className="cd-hero-placeholder">
                      <BookOpenCheck size={56} strokeWidth={1.2} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="cd-content">
            <div className="cd-container">
              <div className="cd-layout">
                {/* Main column */}
                <div className="cd-main">
                  {/* Lesson sections */}
                  {lesson?.sections?.length > 0 && (
                    <div className="cd-card">
                      <h2 className="cd-card-title">
                        <BookOpen size={18} /> Course Content
                      </h2>
                      <div className="cd-sections">
                        {lesson.sections.map((sec, i) => (
                          <div key={i} className="cd-section">
                            <h3 className="cd-section-title">
                              <span className="cd-section-num">{i + 1}</span>
                              {sec.title}
                            </h3>
                            <p className="cd-section-body">{sec.body}</p>
                            {sec.callout && (
                              <div className="cd-callout">
                                <AlertCircle size={14} className="cd-callout-icon" />
                                <p>{sec.callout}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz */}
                  {lesson?.quiz?.length > 0 && (
                    <div className="cd-card">
                      <h2 className="cd-card-title">
                        <CheckCircle2 size={18} /> Knowledge Check
                      </h2>
                      <div className="cd-quiz-list">
                        {lesson.quiz.map((q, qIdx) => {
                          const answered = activeQuiz === qIdx;
                          const isCorrect = answered && selectedOpt === q.answer;
                          return (
                            <div key={qIdx} className={`cd-quiz-item${answered ? (isCorrect ? ' correct' : ' wrong') : ''}`}>
                              <p className="cd-quiz-question">
                                <span className="cd-quiz-num">Q{qIdx + 1}</span>
                                {q.q}
                              </p>
                              <div className="cd-quiz-options">
                                {q.opts.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    className={`cd-quiz-opt${answered && oIdx === q.answer ? ' is-answer' : ''}${answered && oIdx === selectedOpt && oIdx !== q.answer ? ' is-wrong' : ''}`}
                                    onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                    disabled={answered}
                                    type="button"
                                  >
                                    <span className="cd-opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                                    {opt}
                                  </button>
                                ))}
                              </div>
                              {answered && (
                                <div className={`cd-quiz-explanation${isCorrect ? ' correct' : ' wrong'}`}>
                                  <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar column */}
                <div className="cd-sidebar">
                  {/* Interactive diagram */}
                  {Diagram && (
                    <div className="cd-card">
                      <h3 className="cd-card-title">Interactive Overview</h3>
                      <div className="drawer-diagram-frame">
                        <Diagram module={course} />
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  {course.topics?.length > 0 && (
                    <div className="cd-card">
                      <h3 className="cd-card-title">Topics Covered</h3>
                      <ul className="cd-topics-list">
                        {course.topics.map((t, i) => (
                          <li key={i} className="cd-topic-item">
                            <ChevronRight size={13} />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action card */}
                  <div className="cd-card cd-action-card">
                    <Link to="/learning" className="cd-all-courses-link">
                      <ArrowLeft size={14} /> Back to All Courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default CourseDetail;
