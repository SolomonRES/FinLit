import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

function ContactCTA() {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    const email = data.get('email');
    data.set('replyto', email);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section className="cta-dark" id="contactSection">
      <div className="cta-dark-bg">
        <div className="cta-dark-orb cta-dark-orb--1"></div>
        <div className="cta-dark-orb cta-dark-orb--2"></div>
        <div className="cta-dark-grid"></div>
      </div>

      <div className="cta-dark-inner">
        {/* left column */}
        <div className="cta-dark-left">
          <div className="cta-dark-badge">
            <ArrowRight strokeWidth={2} />
            Get Started Today
          </div>
          <h2 className="cta-dark-heading">Start Your<br />Learning Journey</h2>
          <p className="cta-dark-desc">Join thousands of professionals advancing their careers through comprehensive financial education.</p>

          {/* trust stats */}
          <div className="cta-dark-stats">
            <div className="cta-dark-stat">
              <span className="cta-dark-stat-num">100+</span>
              <span className="cta-dark-stat-label">Hours of Content</span>
            </div>
            <div className="cta-dark-stat">
              <span className="cta-dark-stat-num">6</span>
              <span className="cta-dark-stat-label">Domains</span>
            </div>
            <div className="cta-dark-stat">
              <span className="cta-dark-stat-num">13</span>
              <span className="cta-dark-stat-label">Modules</span>
            </div>
          </div>

          <div className="cta-dark-buttons">
            <Link to="/learning" className="btn cta-dark-btn-primary">
              <span>Begin Training</span>
              <ArrowRight strokeWidth={2} />
            </Link>
            <Link to="/markets" className="btn cta-dark-btn-ghost">
              Explore Markets
            </Link>
          </div>
        </div>

        {/* right column: contact form */}
        <div className="cta-dark-right">
          <div className="cta-dark-form-card">
            <div className="cta-dark-form-header">
              <div className="cta-dark-form-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="cta-dark-form-title">Get in Touch</h3>
                <p className="cta-dark-form-sub">Questions or feedback? We'd love to hear from you.</p>
              </div>
            </div>

            <form className="cta-dark-form" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="e2f970e6-4094-4b52-874c-4ad7ce04fa65" />
              <input type="hidden" name="subject" value="FinLit Contact Form Submission" />
              <input type="hidden" name="from_name" value="FinLit Contact Form" />

              <div className="cta-dark-form-row">
                <div className="form-group">
                  <label htmlFor="contactName" className="cta-dark-label">Name</label>
                  <input type="text" id="contactName" name="name" className="cta-dark-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail" className="cta-dark-label">Email</label>
                  <input type="email" id="contactEmail" name="email" className="cta-dark-input" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject" className="cta-dark-label">Subject</label>
                <input type="text" id="contactSubject" name="form_subject" className="cta-dark-input" placeholder="What is this about?" />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage" className="cta-dark-label">Message</label>
                <textarea id="contactMessage" name="message" className="cta-dark-input cta-dark-textarea" placeholder="Your message..." rows="4" required></textarea>
              </div>

              <button type="submit" className="cta-dark-submit" disabled={formStatus === 'sending'}>
                <span className="submit-text">{formStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <svg className="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>

              {formStatus === 'success' && (
                <div className="form-message form-success">
                  <CheckCircle2 strokeWidth={2} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-message form-error">
                  <X strokeWidth={2} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
