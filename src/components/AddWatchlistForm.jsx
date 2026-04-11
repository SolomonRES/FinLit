import { useState } from 'react';
import { PlusCircle, CheckCircle2, AlertCircle, Loader2, Clock } from 'lucide-react';
import { API_BASE } from '../config';
import '../styles/components/AddWatchlistForm.css';

const SECTORS = [
  'Technology',
  'Healthcare',
  'Financials',
  'Energy',
  'Consumer Discretionary',
  'Industrials',
  'Real Estate',
  'Utilities',
  'Materials',
  'Communication Services',
];

const INITIAL = { symbol: '', name: '', targetPrice: '', notes: '', sector: '' };

function validate(fields) {
  const errs = {};
  if (!fields.symbol || !/^[A-Za-z]{1,5}$/.test(fields.symbol))
    errs.symbol = 'Symbol must be 1–5 letters (e.g. AAPL)';
  if (!fields.name || fields.name.length < 2) errs.name = 'Name must be at least 2 characters';
  else if (fields.name.length > 60) errs.name = 'Name must be 60 characters or fewer';
  const price = Number(fields.targetPrice);
  if (!fields.targetPrice || isNaN(price)) errs.targetPrice = 'Enter a valid price';
  else if (price <= 0) errs.targetPrice = 'Price must be positive';
  if (fields.notes && fields.notes.length > 200) errs.notes = '200 characters max';
  if (!fields.sector) errs.sector = 'Please select a sector';
  return errs;
}

function AddWatchlistForm({ onEntryAdded }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [serverMsg, setServerMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/watchlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: fields.symbol.trim().toUpperCase(),
          name: fields.name.trim(),
          targetPrice: Number(fields.targetPrice),
          notes: fields.notes.trim(),
          sector: fields.sector,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitStatus('error');
        setServerMsg(Array.isArray(data.error) ? data.error.join(', ') : data.error || 'Server error');
      } else {
        setSubmitStatus('success');
        setServerMsg(`${data.symbol} added - auto-removes in 5 min`);
        setFields(INITIAL);
        setErrors({});
        if (onEntryAdded) onEntryAdded(data);
      }
    } catch {
      setSubmitStatus('error');
      setServerMsg('Could not reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="watchlist-form-card">
      <div className="watchlist-form-header">
        <PlusCircle size={20} strokeWidth={2} />
        <h3>Add to Watchlist</h3>
        <span className="watchlist-ttl-badge"><Clock size={12} /> Entries expire in 5 min</span>
      </div>

      {submitStatus === 'success' && (
        <div className="watchlist-banner success">
          <CheckCircle2 size={16} /> {serverMsg}
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="watchlist-banner error">
          <AlertCircle size={16} /> {serverMsg}
        </div>
      )}

      <form className="watchlist-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className={`form-group${errors.symbol ? ' has-error' : ''}`}>
            <label htmlFor="wl-symbol">Ticker Symbol</label>
            <input
              id="wl-symbol"
              name="symbol"
              type="text"
              placeholder="e.g. AAPL"
              value={fields.symbol}
              onChange={handleChange}
              maxLength={5}
              style={{ textTransform: 'uppercase' }}
            />
            {errors.symbol && <span className="field-error">{errors.symbol}</span>}
          </div>

          <div className={`form-group${errors.name ? ' has-error' : ''}`}>
            <label htmlFor="wl-name">Company Name</label>
            <input
              id="wl-name"
              name="name"
              type="text"
              placeholder="e.g. Apple Inc."
              value={fields.name}
              onChange={handleChange}
              maxLength={60}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group${errors.targetPrice ? ' has-error' : ''}`}>
            <label htmlFor="wl-price">Target Price ($)</label>
            <input
              id="wl-price"
              name="targetPrice"
              type="number"
              step="0.01"
              placeholder="e.g. 185.50"
              value={fields.targetPrice}
              onChange={handleChange}
              min={0.01}
            />
            {errors.targetPrice && <span className="field-error">{errors.targetPrice}</span>}
          </div>

          <div className={`form-group${errors.sector ? ' has-error' : ''}`}>
            <label htmlFor="wl-sector">Sector</label>
            <select id="wl-sector" name="sector" value={fields.sector} onChange={handleChange}>
              <option value="">Select sector…</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.sector && <span className="field-error">{errors.sector}</span>}
          </div>
        </div>

        <div className={`form-group${errors.notes ? ' has-error' : ''}`}>
          <label htmlFor="wl-notes">Notes <span className="optional-label">(optional)</span></label>
          <textarea
            id="wl-notes"
            name="notes"
            placeholder="Why are you watching this stock?"
            value={fields.notes}
            onChange={handleChange}
            maxLength={200}
            rows={2}
          />
          <span className="char-count">{fields.notes.length}/200</span>
          {errors.notes && <span className="field-error">{errors.notes}</span>}
        </div>

        <button className="watchlist-submit" type="submit" disabled={submitting}>
          {submitting ? (
            <><Loader2 size={16} className="spin" /> Adding…</>
          ) : (
            <><PlusCircle size={16} /> Add to Watchlist</>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddWatchlistForm;
