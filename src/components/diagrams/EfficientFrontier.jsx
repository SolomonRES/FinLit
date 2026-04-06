import { useState } from 'react';

// Illustrative stocks on a risk-return scatter
const STOCKS = [
  { label: 'Govt Bond', risk: 2, ret: 4.5, color: '#059669' },
  { label: 'Corp Bond', risk: 5, ret: 6.0, color: '#2563eb' },
  { label: 'Large Cap', risk: 14, ret: 10.5, color: '#7c3aed' },
  { label: 'Mid Cap',   risk: 18, ret: 12.0, color: '#d97706' },
  { label: 'Small Cap', risk: 24, ret: 14.0, color: '#dc2626' },
  { label: 'EM Equity', risk: 28, ret: 13.0, color: '#be185d' },
  { label: 'Hedge Fund',risk: 12, ret: 9.5,  color: '#0891b2' },
  { label: 'Real Estate',risk: 16, ret: 11.0, color: '#c2410c' },
];

// Efficient frontier points (risk, return) - parabola approximation
const FRONTIER = [
  [6, 6.8], [8, 7.8], [10, 9.0], [12, 10.0], [14, 11.2],
  [16, 12.0], [18, 12.8], [20, 13.4], [22, 14.0], [24, 14.5],
  [26, 14.8], [28, 15.0],
];

// Min variance portfolio
const MVP = { risk: 6, ret: 6.8 };
// Market portfolio (max Sharpe)
const MARKET = { risk: 14, ret: 11.2 };
// Risk-free rate
const RF = 4.5;

const W = 560;
const H = 320;
const PAD = { t: 20, r: 32, b: 44, l: 52 };

const RISK_MIN = 0; const RISK_MAX = 32;
const RET_MIN = 3;  const RET_MAX = 17;

function toX(risk) { return PAD.l + ((risk - RISK_MIN) / (RISK_MAX - RISK_MIN)) * (W - PAD.l - PAD.r); }
function toY(ret)  { return PAD.t + ((RET_MAX - ret) / (RET_MAX - RET_MIN)) * (H - PAD.t - PAD.b); }

const frontierPath = FRONTIER.map(([r, re], i) => `${i === 0 ? 'M' : 'L'}${toX(r).toFixed(1)},${toY(re).toFixed(1)}`).join(' ');

// CML from risk-free to market portfolio and beyond
const CML_END = { risk: 30, ret: RF + (MARKET.ret - RF) / MARKET.risk * 30 };
const cmlPath = `M${toX(0)},${toY(RF).toFixed(1)} L${toX(CML_END.risk).toFixed(1)},${toY(CML_END.ret).toFixed(1)}`;

export default function EfficientFrontier() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="ef-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="ef-svg">
        {/* grid */}
        {[4, 6, 8, 10, 12, 14, 16].map(r => (
          <g key={r}>
            <line x1={PAD.l} y1={toY(r)} x2={W - PAD.r} y2={toY(r)} stroke="#f0f0f0" strokeWidth="1" />
            <text x={PAD.l - 8} y={toY(r) + 4} fontSize="11" fill="#a3a3a3" textAnchor="end">{r}%</text>
          </g>
        ))}
        {[0, 8, 16, 24, 32].map(r => (
          <g key={r}>
            <line x1={toX(r)} y1={PAD.t} x2={toX(r)} y2={H - PAD.b} stroke="#f0f0f0" strokeWidth="1" />
            <text x={toX(r)} y={H - PAD.b + 16} fontSize="11" fill="#a3a3a3" textAnchor="middle">{r}%</text>
          </g>
        ))}

        {/* axis labels */}
        <text x={W / 2} y={H - 4} fontSize="11" fill="#737373" textAnchor="middle" fontWeight="500">Risk (Std Dev)</text>
        <text x={14} y={H / 2} fontSize="11" fill="#737373" textAnchor="middle" fontWeight="500" transform={`rotate(-90, 14, ${H / 2})`}>Return</text>

        {/* CML */}
        <path d={cmlPath} fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x={toX(CML_END.risk) - 4} y={toY(CML_END.ret) - 8} fontSize="10" fill="#d97706" textAnchor="end" fontWeight="600">CML</text>

        {/* efficient frontier */}
        <path d={frontierPath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

        {/* individual assets */}
        {STOCKS.map((s, i) => (
          <g key={s.label}
             onMouseEnter={() => setHovered(i)}
             onMouseLeave={() => setHovered(null)}
             style={{ cursor: 'pointer' }}
          >
            <circle cx={toX(s.risk)} cy={toY(s.ret)} r={hovered === i ? 8 : 5.5} fill={s.color} opacity={hovered === i ? 1 : 0.85} />
            {hovered === i && (
              <>
                <rect
                  x={toX(s.risk) - s.label.length * 3.2 - 6}
                  y={toY(s.ret) - 24}
                  width={s.label.length * 6.4 + 12}
                  height={16}
                  rx="3"
                  fill="white"
                  stroke={s.color}
                  strokeWidth="1"
                  opacity="0.95"
                />
                <text x={toX(s.risk)} y={toY(s.ret) - 12} fontSize="10" fill={s.color} textAnchor="middle" fontWeight="600">
                  {s.label}
                </text>
              </>
            )}
          </g>
        ))}

        {/* MVP */}
        <circle cx={toX(MVP.risk)} cy={toY(MVP.ret)} r="7" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x={toX(MVP.risk) - 12} y={toY(MVP.ret) - 10} fontSize="10" fill="#2563eb" fontWeight="500" textAnchor="end">Min Var.</text>

        {/* Market portfolio */}
        <circle cx={toX(MARKET.risk)} cy={toY(MARKET.ret)} r="7" fill="#d97706" stroke="white" strokeWidth="1.5" />
        <text x={toX(MARKET.risk)} y={toY(MARKET.ret) - 12} fontSize="10" fill="#d97706" fontWeight="500" textAnchor="middle">Market</text>

        {/* RF point */}
        <circle cx={toX(0)} cy={toY(RF)} r="4.5" fill="#059669" />
        <text x={toX(0) + 8} y={toY(RF) + 4} fontSize="10" fill="#059669" fontWeight="500">Rf</text>
      </svg>

      {hovered !== null ? (
        <div className="ef-info">
          <span className="ef-info-label" style={{ color: STOCKS[hovered].color }}>{STOCKS[hovered].label}</span>
          <span className="ef-info-meta">Risk: {STOCKS[hovered].risk}% &nbsp;|&nbsp; Expected Return: {STOCKS[hovered].ret}%</span>
        </div>
      ) : (
        <p className="ef-hint">Hover an asset dot to inspect. The blue curve is the efficient frontier - the set of optimal portfolios maximizing return for a given level of risk.</p>
      )}
    </div>
  );
}
