import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IS = [
  { id: 'rev',   label: 'Revenue',      value: '1,000' },
  { id: 'cogs',  label: '- COGS',       value: '(600)',  indent: true },
  { id: 'gross', label: 'Gross Profit', value: '400',    divider: true },
  { id: 'da',    label: '- D&A',        value: '(100)',  indent: true },
  { id: 'opex',  label: '- OpEx',       value: '(50)',   indent: true },
  { id: 'ebit',  label: 'EBIT',         value: '250',    divider: true },
  { id: 'int',   label: '- Interest',   value: '(30)',   indent: true },
  { id: 'tax',   label: '- Tax',        value: '(44)',   indent: true },
  { id: 'ni',    label: 'Net Income',   value: '176',    bold: true, divider: true },
];

const CFS = [
  { id: 'cf-ni',    label: 'Net Income',     value: '176' },
  { id: 'cf-da',    label: '+ D&A',          value: '100',  indent: true },
  { id: 'cf-wc',    label: '- Δ Work. Cap.', value: '(40)', indent: true },
  { id: 'cf-opcf',  label: 'Oper. CF',       value: '236',  bold: true, divider: true },
  { id: 'cf-capex', label: '- CapEx',        value: '(120)', indent: true },
  { id: 'cf-inv',   label: 'Invest. CF',     value: '(120)', bold: true, divider: true },
  { id: 'cf-net',   label: 'Net Cash Δ',     value: '116',  bold: true },
];

const BS = [
  { id: 'bs-cash', label: 'Cash & Equiv.',  value: '116' },
  { id: 'bs-rec',  label: 'Receivables',    value: '140' },
  { id: 'bs-ppe',  label: 'PP&E (net)',      value: '380', divider: true },
  { id: 'bs-ta',   label: 'Total Assets',   value: '636', bold: true, divider: true },
  { id: 'bs-debt', label: 'Debt',           value: '200' },
  { id: 'bs-re',   label: 'Retained Earn.', value: '436', divider: true },
  { id: 'bs-te',   label: 'Total L + E',    value: '636', bold: true },
];

const STEPS = [
  {
    color: '#2563eb',
    title: '① Net Income flows to CFS & Balance Sheet',
    desc: 'Net Income is the starting point of the Cash Flow Statement (indirect method). It also accumulates in Retained Earnings on the Balance Sheet each period.',
    is: ['ni'], cfs: ['cf-ni'], bs: ['bs-re'],
  },
  {
    color: '#7c3aed',
    title: '② D&A is added back - it\'s non-cash',
    desc: 'Depreciation & Amortization reduces Net Income but involves no cash outflow. It\'s added back in the CFS. The expense reduces PP&E\'s net book value on the Balance Sheet.',
    is: ['da'], cfs: ['cf-da'], bs: ['bs-ppe'],
  },
  {
    color: '#d97706',
    title: '③ CapEx flows to PP&E on the Balance Sheet',
    desc: 'Capital Expenditures are cash outflows in the Investing section of the CFS. They increase the gross value of PP&E on the Balance Sheet (then gradually reduced by D&A).',
    is: [], cfs: ['cf-capex'], bs: ['bs-ppe'],
  },
  {
    color: '#059669',
    title: '④ Working Capital changes link BS ↔ CFS',
    desc: 'Changes in current assets (Receivables, Inventory) and current liabilities flow through the Operating section of the CFS and are reflected in Balance Sheet balances.',
    is: [], cfs: ['cf-wc'], bs: ['bs-rec'],
  },
  {
    color: '#dc2626',
    title: '⑤ Net Cash Change updates Cash on the Balance Sheet',
    desc: 'The Net Cash Change (bottom of CFS) equals the period-over-period change in Cash & Equivalents on the Balance Sheet. This is the final reconciling link across all three statements.',
    is: [], cfs: ['cf-net'], bs: ['bs-cash'],
  },
];

function StatBox({ title, rows, activeIds, color }) {
  return (
    <div className="tsf-box">
      <div className="tsf-box-header">{title}</div>
      {rows.map(row => {
        const on = activeIds.includes(row.id);
        return (
          <div
            key={row.id}
            className={`tsf-row${row.indent ? ' tsf-indent' : ''}${row.divider ? ' tsf-divider' : ''}${row.bold ? ' tsf-bold' : ''}${on ? ' tsf-on' : ''}`}
            style={on ? { '--ac': color } : {}}
          >
            <span className="tsf-lbl">{row.label}</span>
            <span className="tsf-val">{row.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ThreeStatementFlow() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="tsf-wrap" style={{ '--ac': s.color }}>
      <div className="tsf-grid">
        <StatBox title="Income Statement" rows={IS}  activeIds={s.is}  color={s.color} />
        <StatBox title="Cash Flow Stmt"   rows={CFS} activeIds={s.cfs} color={s.color} />
        <StatBox title="Balance Sheet"    rows={BS}  activeIds={s.bs}  color={s.color} />
      </div>

      <div className="tsf-explanation">
        <span className="tsf-exp-title" style={{ color: s.color }}>{s.title}</span>
        <p className="tsf-exp-body">{s.desc}</p>
      </div>

      <div className="tsf-controls">
        <button
          className="tsf-btn"
          onClick={() => setStep(p => Math.max(0, p - 1))}
          disabled={step === 0}
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <div className="tsf-dots">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={`tsf-dot${i === step ? ' active' : ''}`}
              style={i === step ? { background: s.color } : {}}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="tsf-btn"
          onClick={() => setStep(p => Math.min(STEPS.length - 1, p + 1))}
          disabled={step === STEPS.length - 1}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
