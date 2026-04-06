import { useState } from 'react';

const NODES = [
  { id: 'cash',  label: 'Cash',         value: '$240K', cx: 260, cy: 48,  color: '#059669' },
  { id: 'inv',   label: 'Inventory',    value: '$180K', cx: 440, cy: 168, color: '#2563eb' },
  { id: 'rec',   label: 'Receivables',  value: '$120K', cx: 80,  cy: 168, color: '#7c3aed' },
];

const ARROWS = [
  {
    id: 'cash-inv',
    from: 'cash', to: 'inv',
    label: 'Purchase inventory',
    metric: 'DIO: 45 days',
    metricDesc: 'Days Inventory Outstanding - how long inventory sits before being sold.',
    color: '#2563eb',
    // SVG path from cash node to inv node
    path: 'M 340 68 Q 440 68 440 148',
  },
  {
    id: 'inv-rec',
    from: 'inv', to: 'rec',
    label: 'Sell & invoice',
    metric: 'DSO: 35 days',
    metricDesc: 'Days Sales Outstanding - how long before customers pay their invoices.',
    color: '#7c3aed',
    path: 'M 400 188 Q 260 240 120 188',
  },
  {
    id: 'rec-cash',
    from: 'rec', to: 'cash',
    label: 'Collect payment',
    metric: 'DPO: 28 days',
    metricDesc: 'Days Payable Outstanding - how long the company takes to pay suppliers.',
    color: '#059669',
    path: 'M 80 148 Q 80 48 180 48',
  },
];

const CCC = 45 + 35 - 28; // = 52

export default function WorkingCapitalCycle() {
  const [active, setActive] = useState(null);
  const info = active !== null ? ARROWS[active] : null;

  return (
    <div className="wc-wrap">
      <svg viewBox="0 0 520 230" className="wc-svg">
        <defs>
          {ARROWS.map(a => (
            <marker key={a.id} id={`arrow-${a.id}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={a.color} />
            </marker>
          ))}
        </defs>

        {/* arrows */}
        {ARROWS.map((a, i) => (
          <g key={a.id} className="wc-arrow-group"
             onClick={() => setActive(active === i ? null : i)}
             style={{ cursor: 'pointer' }}>
            <path
              d={a.path}
              fill="none"
              stroke={a.color}
              strokeWidth={active === i ? 3 : 2}
              strokeDasharray={active === i ? 'none' : '6,4'}
              markerEnd={`url(#arrow-${a.id})`}
              opacity={active !== null && active !== i ? 0.3 : 1}
            />
            {/* label along path */}
          </g>
        ))}

        {/* arrow labels */}
        <text x="420" y="108" fontSize="10" fill="#2563eb" textAnchor="middle" className="wc-path-label">Purchase</text>
        <text x="260" y="228" fontSize="10" fill="#7c3aed" textAnchor="middle" className="wc-path-label">Sell &amp; Invoice</text>
        <text x="100" y="108" fontSize="10" fill="#059669" textAnchor="middle" className="wc-path-label">Collect</text>

        {/* nodes */}
        {NODES.map(n => (
          <g key={n.id}>
            <circle cx={n.cx} cy={n.cy} r="36" fill="white" stroke={n.color} strokeWidth="2.5" />
            <text x={n.cx} y={n.cy - 6} fontSize="11" fontWeight="700" fill={n.color} textAnchor="middle">{n.label}</text>
            <text x={n.cx} y={n.cy + 10} fontSize="10" fill="#525252" textAnchor="middle">{n.value}</text>
          </g>
        ))}

        {/* center CCC */}
        <text x="260" y="136" fontSize="10" fill="#737373" textAnchor="middle">CCC = {CCC} days</text>
        <text x="260" y="152" fontSize="9"  fill="#a3a3a3" textAnchor="middle">DIO + DSO − DPO</text>
      </svg>

      {/* metric detail */}
      <div className={`wc-detail${info ? ' visible' : ''}`}>
        {info ? (
          <>
            <div className="wc-detail-row">
              <span className="wc-detail-label" style={{ color: info.color }}>{info.label}</span>
              <span className="wc-detail-metric" style={{ color: info.color }}>{info.metric}</span>
            </div>
            <p className="wc-detail-desc">{info.metricDesc}</p>
          </>
        ) : (
          <p className="wc-hint">Click an arrow to explore each stage of the cash conversion cycle</p>
        )}
      </div>
    </div>
  );
}
