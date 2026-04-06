import { useState } from 'react';

const RISKS = [
  { id: 1, label: 'Market Crash',       prob: 'Low',  impact: 'High',  desc: 'A broad market downturn (>20% decline). Low probability in any given year, but severe when it occurs. Hedging with derivatives or diversification helps mitigate this.' },
  { id: 2, label: 'Interest Rate Spike',prob: 'Medium',impact: 'High',  desc: 'Rapid rise in benchmark rates. Directly reprices bonds, increases borrowing costs, and often triggers equity sell-offs. Duration management is key.' },
  { id: 3, label: 'Counterparty Default',prob:'Low',  impact: 'High',  desc: 'A trading or lending counterparty fails to fulfill obligations. Managed through credit limits, collateral, and CDS protection.' },
  { id: 4, label: 'FX Volatility',      prob: 'High', impact: 'Medium', desc: 'Currency fluctuations affect revenues for multinational businesses. Common mitigation: FX forwards, options, and natural hedging through local funding.' },
  { id: 5, label: 'Liquidity Crunch',   prob: 'Low',  impact: 'High',  desc: 'Inability to sell assets or fund operations at reasonable cost. Liquidity buffers, credit facilities, and stress testing are standard defenses.' },
  { id: 6, label: 'Regulatory Change',  prob: 'High', impact: 'Medium', desc: 'New rules (capital requirements, reporting) increase compliance costs. Firms invest in regulatory intelligence and flexible compliance infrastructure.' },
  { id: 7, label: 'Operational Error',  prob: 'Medium',impact: 'Low',  desc: 'Human or system errors in trade execution or settlement. Managed through four-eyes principles, automated controls, and reconciliation processes.' },
  { id: 8, label: 'Minor Market Move',  prob: 'High', impact: 'Low',   desc: 'Daily price fluctuations within normal ranges. Accepted as inherent to markets; managed through position limits and stop-losses.' },
];

const QUADRANTS = [
  { prob: 'High', impact: 'Low',    label: 'Monitor',  color: '#d97706', bg: '#fffbeb', x: 0,   y: 0 },
  { prob: 'High', impact: 'Medium', label: 'Mitigate', color: '#dc2626', bg: '#fef2f2', x: 1,   y: 0 },
  { prob: 'High', impact: 'High',   label: 'Mitigate', color: '#dc2626', bg: '#fef2f2', x: 2,   y: 0 },
  { prob: 'Medium',impact: 'Low',   label: 'Accept',   color: '#059669', bg: '#f0fdf4', x: 0,   y: 1 },
  { prob: 'Medium',impact: 'Medium',label: 'Monitor',  color: '#d97706', bg: '#fffbeb', x: 1,   y: 1 },
  { prob: 'Medium',impact: 'High',  label: 'Mitigate', color: '#dc2626', bg: '#fef2f2', x: 2,   y: 1 },
  { prob: 'Low',   impact: 'Low',   label: 'Accept',   color: '#059669', bg: '#f0fdf4', x: 0,   y: 2 },
  { prob: 'Low',   impact: 'Medium',label: 'Accept',   color: '#059669', bg: '#f0fdf4', x: 1,   y: 2 },
  { prob: 'Low',   impact: 'High',  label: 'Mitigate', color: '#dc2626', bg: '#fef2f2', x: 2,   y: 2 },
];

const probOrder  = ['High', 'Medium', 'Low'];
const impactOrder = ['Low', 'Medium', 'High'];

function quadrantFor(prob, impact) {
  return QUADRANTS.find(q => q.prob === prob && q.impact === impact);
}

export default function RiskMatrix() {
  const [selected, setSelected] = useState(null);

  const sel = RISKS.find(r => r.id === selected);

  return (
    <div className="rm-wrap">
      <div className="rm-matrix">
        {/* column headers (Impact) */}
        <div className="rm-corner" />
        {impactOrder.map(imp => (
          <div key={imp} className="rm-col-header">{imp} Impact</div>
        ))}

        {/* rows */}
        {probOrder.map(prob => (
          <>
            <div key={`row-${prob}`} className="rm-row-header">{prob} Probability</div>
            {impactOrder.map(impact => {
              const q = quadrantFor(prob, impact);
              const cellRisks = RISKS.filter(r => r.prob === prob && r.impact === impact);
              return (
                <div
                  key={`${prob}-${impact}`}
                  className="rm-cell"
                  style={{ background: q?.bg }}
                >
                  <span className="rm-cell-label" style={{ color: q?.color }}>{q?.label}</span>
                  {cellRisks.map(r => (
                    <button
                      key={r.id}
                      className={`rm-risk-tag${selected === r.id ? ' active' : ''}`}
                      style={{ borderColor: q?.color, color: selected === r.id ? 'white' : q?.color, background: selected === r.id ? q?.color : 'white' }}
                      onClick={() => setSelected(selected === r.id ? null : r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div className={`rm-detail${sel ? ' visible' : ''}`}>
        {sel ? (
          <>
            <span className="rm-detail-name">{sel.label}</span>
            <span className="rm-detail-meta">{sel.prob} Probability &bull; {sel.impact} Impact</span>
            <p className="rm-detail-desc">{sel.desc}</p>
          </>
        ) : (
          <p className="rm-hint">Click a risk to understand its nature and how practitioners manage it</p>
        )}
      </div>
    </div>
  );
}
