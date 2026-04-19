import { useState } from 'react';
import { Pencil, AlertCircle, Loader2, X } from 'lucide-react';
import { API_BASE } from '../config';
import { SECTORS, validateWatchlistFields } from '../utils/watchlist';
import '../styles/components/AddWatchlistForm.css';

function EditWatchlistForm({ entry, onEntryUpdated, onCancel }) {
  const [fields, setFields] = useState({
    symbol: entry.symbol,
    name: entry.name,
    targetPrice: String(entry.targetPrice),
    notes: entry.notes || '',
    sector: entry.sector,
  });
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
    const errs = validateWatchlistFields(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/watchlist/${entry._id}`, {
        method: 'PUT',
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
        if (onEntryUpdated) onEntryUpdated(data);
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
        <Pencil size={20} strokeWidth={2} />
        <h3>Edit Watchlist Entry</h3>
        <button className="watchlist-form-close" type="button" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>

      {submitStatus === 'error' && (
        <div className="watchlist-banner error">
          <AlertCircle size={16} /> {serverMsg}
        </div>
      )}

      <form className="watchlist-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className={`form-group${errors.symbol ? ' has-error' : ''}`}>
            <label htmlFor="edit-symbol">Ticker Symbol</label>
            <input
              id="edit-symbol"
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
            <label htmlFor="edit-name">Company Name</label>
            <input
              id="edit-name"
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
            <label htmlFor="edit-price">Target Price ($)</label>
            <input
              id="edit-price"
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
            <label htmlFor="edit-sector">Sector</label>
            <select id="edit-sector" name="sector" value={fields.sector} onChange={handleChange}>
              <option value="">Select sector…</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.sector && <span className="field-error">{errors.sector}</span>}
          </div>
        </div>

        <div className={`form-group${errors.notes ? ' has-error' : ''}`}>
          <label htmlFor="edit-notes">Notes <span className="optional-label">(optional)</span></label>
          <textarea
            id="edit-notes"
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

        <div className="watchlist-edit-actions">
          <button className="watchlist-submit" type="submit" disabled={submitting}>
            {submitting ? (
              <><Loader2 size={16} className="spin" /> Saving…</>
            ) : (
              <><Pencil size={16} /> Save Changes</>
            )}
          </button>
          <button className="watchlist-cancel-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWatchlistForm;
