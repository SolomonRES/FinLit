import { useState, useEffect } from 'react';

const PHASES = [
  {
    num: '01',
    label: 'Preparation',
    weeks: 'Wks 1–4',
    color: '#1e3a5f',
    items: ['Hire M&A advisor (investment bank)', 'Prepare financials & projections', 'Draft Confidential Information Memo (CIM)', 'Define deal objectives & valuation range'],
  },
  {
    num: '02',
    label: 'Marketing',
    weeks: 'Wks 5–8',
    color: '#1d4ed8',
    items: ['Approach strategic & financial buyers', 'Execute Non-Disclosure Agreements (NDAs)', 'Distribute teaser & CIM to interested parties', 'Field management presentation requests'],
  },
  {
    num: '03',
    label: 'First Bids',
    weeks: 'Wks 9–12',
    color: '#2563eb',
    items: ['Receive Indications of Interest (IOIs)', 'Evaluate preliminary valuations', 'Select shortlist of bidders', 'Open Virtual Data Room (VDR)'],
  },
  {
    num: '04',
    label: 'Due Diligence',
    weeks: 'Wks 13–18',
    color: '#6d28d9',
    items: ['Bidders conduct legal, financial & commercial DD', 'Management presentations held', 'Q&A process via data room', 'Draft purchase agreement shared'],
  },
  {
    num: '05',
    label: 'Final Bids',
    weeks: 'Wks 19–22',
    color: '#7c3aed',
    items: ['Receive binding Letters of Intent (LOIs)', 'Negotiate price & terms', 'Select preferred buyer', 'Finalize representations & warranties'],
  },
  {
    num: '06',
    label: 'Sign & Close',
    weeks: 'Wks 23–28',
    color: '#059669',
    items: ['Execute Share Purchase Agreement (SPA)', 'Obtain regulatory approvals', 'Satisfy closing conditions', 'Wire funds - deal closes'],
  },
];

export default function MAProcessFlow() {
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= PHASES.length) clearInterval(timer);
    }, 180);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ma-wrap">
      <div className="ma-timeline">
        {PHASES.map((ph, idx) => (
          <button
            key={ph.num}
            className={`ma-phase${idx < visible ? ' visible' : ''}${active === idx ? ' ma-phase-active' : ''}`}
            style={{ '--ph-color': ph.color, animationDelay: `${idx * 60}ms` }}
            onClick={() => setActive(active === idx ? null : idx)}
          >
            <span className="ma-phase-num" style={{ background: ph.color }}>{ph.num}</span>
            <span className="ma-phase-label">{ph.label}</span>
            <span className="ma-phase-weeks">{ph.weeks}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="ma-detail" style={{ borderColor: PHASES[active].color }}>
          <p className="ma-detail-title" style={{ color: PHASES[active].color }}>
            Phase {PHASES[active].num}: {PHASES[active].label}
          </p>
          <ul className="ma-detail-list">
            {PHASES[active].items.map((item, i) => (
              <li key={i}>
                <span className="ma-bullet" style={{ background: PHASES[active].color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {active === null && (
        <p className="ma-hint">Click any phase to see key activities</p>
      )}
    </div>
  );
}
