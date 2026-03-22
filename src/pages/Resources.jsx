import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, DollarSign, BookOpen, ArrowRight, FileText, Briefcase, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import IPOPipeline from '../components/IPOPipeline';
import MAChart from '../components/MAChart';

/* ---- canvas chart helpers ---- */
function initCanvas(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  return { ctx, w: rect.width, h: rect.height };
}

function drawGrid(ctx, pad, w, h, yTicks, minV, maxV, formatLabel) {
  ctx.strokeStyle = '#d4d4d4';
  ctx.lineWidth = 1;
  for (let i = 0; i <= yTicks; i++) {
    const val = minV + (maxV - minV) * (i / yTicks);
    const yy = pad.top + (h - pad.top - pad.bottom) * (1 - (val - minV) / (maxV - minV));
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#737373';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatLabel ? formatLabel(val) : Math.round(val), pad.left - 6, yy);
  }
}

function drawXLabels(ctx, labels, positions, h, pad) {
  ctx.fillStyle = '#737373';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => {
    ctx.fillText(label, positions[i], h - pad.bottom + 8);
  });
}

function roundedBar(ctx, x, y, w, h, r) {
  if (h < r * 2) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPEChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 15, right: 20, bottom: 20, left: 80 };
  const data = [
    { sector: "Tech", amount: 28.5 },
    { sector: "Healthcare", amount: 22.3 },
    { sector: "Financials", amount: 18.7 },
    { sector: "Industrials", amount: 15.2 },
    { sector: "Consumer", amount: 12.8 },
    { sector: "Energy", amount: 9.4 },
  ];
  const maxVal = 30, chartW = w - pad.left - pad.right, chartH = h - pad.top - pad.bottom;
  const barH = chartH / data.length * 0.6, gap = chartH / data.length;

  ctx.strokeStyle = '#d4d4d4';
  for (let i = 0; i <= 5; i++) {
    const val = (maxVal / 5) * i;
    const xx = pad.left + (val / maxVal) * chartW;
    ctx.beginPath(); ctx.setLineDash([3, 3]);
    ctx.moveTo(xx, pad.top); ctx.lineTo(xx, h - pad.bottom);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(Math.round(val), xx, h - pad.bottom + 4);
  }
  data.forEach((d, i) => {
    const by = pad.top + i * gap + (gap - barH) / 2;
    const bw = (d.amount / maxVal) * chartW;
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, by);
    ctx.lineTo(pad.left + bw - r, by);
    ctx.quadraticCurveTo(pad.left + bw, by, pad.left + bw, by + r);
    ctx.lineTo(pad.left + bw, by + barH - r);
    ctx.quadraticCurveTo(pad.left + bw, by + barH, pad.left + bw - r, by + barH);
    ctx.lineTo(pad.left, by + barH);
    ctx.closePath();
    ctx.fillStyle = '#525252'; ctx.fill();
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(d.sector, pad.left - 8, by + barH / 2);
  });
}

function drawHedgeChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 20, right: 20, bottom: 40, left: 45 };
  const data = [
    { strategy: "L/S Equity", ytd: 8.5, aum: 245 },
    { strategy: "Event Driven", ytd: 6.2, aum: 178 },
    { strategy: "Macro", ytd: 12.3, aum: 156 },
    { strategy: "Relative Value", ytd: 4.8, aum: 134 },
    { strategy: "Multi-Strategy", ytd: 9.7, aum: 289 },
  ];
  const minAum = 100, maxAum = 320, minYtd = 2, maxYtd = 14;
  const chartW = w - pad.left - pad.right, chartH = h - pad.top - pad.bottom;
  function xPos(v) { return pad.left + ((v - minAum) / (maxAum - minAum)) * chartW; }
  function yPos(v) { return pad.top + (1 - (v - minYtd) / (maxYtd - minYtd)) * chartH; }

  drawGrid(ctx, pad, w, h, 4, minYtd, maxYtd, v => v.toFixed(0));
  for (let i = 0; i <= 4; i++) {
    const val = minAum + (maxAum - minAum) * (i / 4);
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(Math.round(val), xPos(val), h - pad.bottom + 8);
  }
  ctx.fillStyle = '#a3a3a3'; ctx.font = '10px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.fillText('AUM ($B)', w / 2, h - 4);
  data.forEach(d => {
    const cx = xPos(d.aum), cy = yPos(d.ytd);
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(82, 82, 82, 0.7)'; ctx.fill();
    ctx.strokeStyle = '#525252'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#525252'; ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(d.strategy, cx, cy - 12);
  });
}

function drawBondChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 20, right: 20, bottom: 55, left: 45 };
  const data = [
    { type: "IG Corp", q1: 245, q2: 268, q3: 285, q4: 312 },
    { type: "HY Corp", q1: 82, q2: 95, q3: 88, q4: 102 },
    { type: "Muni", q1: 115, q2: 128, q3: 135, q4: 142 },
    { type: "Sov", q1: 156, q2: 178, q3: 192, q4: 205 },
  ];
  const maxVal = 350, chartW = w - pad.left - pad.right, chartH = h - pad.top - pad.bottom;
  const groupGap = chartW / data.length, barCount = 4, barW = groupGap * 0.7 / barCount;
  const colors = ['#525252', '#737373', '#a3a3a3', '#d4d4d4'];
  const qLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

  drawGrid(ctx, pad, w, h, 5, 0, maxVal);
  data.forEach((d, i) => {
    const groupX = pad.left + i * groupGap;
    const startX = groupX + (groupGap - barCount * barW) / 2;
    [d.q1, d.q2, d.q3, d.q4].forEach((val, q) => {
      const bx = startX + q * barW, bh = (val / maxVal) * chartH, by = pad.top + chartH - bh;
      roundedBar(ctx, bx, by, barW - 2, bh, 3);
      ctx.fillStyle = colors[q]; ctx.fill();
    });
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText(d.type, groupX + groupGap / 2, h - pad.bottom + 8);
  });
  const legendY = h - 12, legendStartX = w / 2 - 100;
  qLabels.forEach((label, i) => {
    const lx = legendStartX + i * 55;
    ctx.fillStyle = colors[i]; ctx.fillRect(lx, legendY - 6, 12, 12);
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(label, lx + 16, legendY);
  });
}

function drawAllocChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const data = [
    { asset: "Equities", allocation: 42 },
    { asset: "Fixed Income", allocation: 28 },
    { asset: "Alternatives", allocation: 15 },
    { asset: "Real Estate", allocation: 10 },
    { asset: "Cash", allocation: 5 },
  ];
  const colors = ['#525252', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5'];
  const total = data.reduce((s, d) => s + d.allocation, 0);
  const cx = w * 0.4, cy = h * 0.45, radius = Math.min(cx - 20, cy - 20, 80);

  let startAngle = -Math.PI / 2;
  data.forEach((d, i) => {
    const sweep = (d.allocation / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + sweep);
    ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
    const mid = startAngle + sweep / 2;
    const lx = cx + Math.cos(mid) * (radius * 0.65);
    const ly = cy + Math.sin(mid) * (radius * 0.65);
    if (d.allocation >= 10) {
      ctx.fillStyle = i < 2 ? '#fff' : '#525252';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(d.allocation + '%', lx, ly);
    }
    startAngle += sweep;
  });
  const legX = w * 0.7;
  data.forEach((d, i) => {
    const ly = 30 + i * 22;
    ctx.fillStyle = colors[i]; ctx.fillRect(legX, ly - 5, 12, 12);
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(d.asset + ' ' + d.allocation + '%', legX + 18, ly + 1);
  });
}

function drawREChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 20, right: 50, bottom: 40, left: 45 };
  const data = [
    { type: "Office", volume: 45.2, avgCap: 6.8 },
    { type: "Retail", volume: 32.8, avgCap: 7.2 },
    { type: "Industrial", volume: 68.5, avgCap: 5.4 },
    { type: "Multifamily", volume: 52.3, avgCap: 5.9 },
    { type: "Hotel", volume: 18.7, avgCap: 8.1 },
  ];
  const maxVol = 75, minCap = 4, maxCap = 9;
  const chartW = w - pad.left - pad.right, chartH = h - pad.top - pad.bottom;
  const gap = chartW / data.length, barW = gap * 0.5;

  drawGrid(ctx, pad, w, h, 4, 0, maxVol);
  for (let i = 0; i <= 4; i++) {
    const val = minCap + (maxCap - minCap) * (i / 4);
    const yy = pad.top + chartH - ((val - minCap) / (maxCap - minCap)) * chartH;
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(val.toFixed(1), w - pad.right + 6, yy);
  }
  data.forEach((d, i) => {
    const bx = pad.left + i * gap + (gap - barW) / 2;
    const bh = (d.volume / maxVol) * chartH, by = pad.top + chartH - bh;
    roundedBar(ctx, bx, by, barW, bh, 4);
    ctx.fillStyle = '#737373'; ctx.fill();
  });
  ctx.beginPath();
  data.forEach((d, i) => {
    const lx = pad.left + i * gap + gap / 2;
    const ly = pad.top + chartH - ((d.avgCap - minCap) / (maxCap - minCap)) * chartH;
    if (i === 0) ctx.moveTo(lx, ly); else ctx.lineTo(lx, ly);
  });
  ctx.strokeStyle = '#525252'; ctx.lineWidth = 2; ctx.stroke();
  data.forEach((d, i) => {
    const lx = pad.left + i * gap + gap / 2;
    const ly = pad.top + chartH - ((d.avgCap - minCap) / (maxCap - minCap)) * chartH;
    ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#525252'; ctx.fill();
  });
  drawXLabels(ctx, data.map(d => d.type), data.map((_, i) => pad.left + i * gap + gap / 2), h, pad);
}

function drawCreditChart(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 20, right: 20, bottom: 55, left: 45 };
  const data = [
    { date: "Jan 15", ig: 95, hy: 345 },
    { date: "Jan 18", ig: 92, hy: 338 },
    { date: "Jan 22", ig: 88, hy: 325 },
    { date: "Jan 25", ig: 85, hy: 318 },
    { date: "Jan 29", ig: 82, hy: 308 },
  ];
  const maxVal = 380, chartH = h - pad.top - pad.bottom;
  drawGrid(ctx, pad, w, h, 5, 0, maxVal);
  function xPos(i) { return pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right); }
  function yPos(v) { return pad.top + (1 - v / maxVal) * chartH; }

  const gradHY = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradHY.addColorStop(0, 'rgba(239, 68, 68, 0.4)'); gradHY.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.beginPath();
  data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.hy)) : ctx.lineTo(xPos(i), yPos(d.hy)); });
  ctx.lineTo(xPos(data.length - 1), h - pad.bottom); ctx.lineTo(xPos(0), h - pad.bottom);
  ctx.closePath(); ctx.fillStyle = gradHY; ctx.fill();
  ctx.beginPath();
  data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.hy)) : ctx.lineTo(xPos(i), yPos(d.hy)); });
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();

  const gradIG = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradIG.addColorStop(0, 'rgba(16, 185, 129, 0.4)'); gradIG.addColorStop(1, 'rgba(16, 185, 129, 0)');
  ctx.beginPath();
  data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.ig)) : ctx.lineTo(xPos(i), yPos(d.ig)); });
  ctx.lineTo(xPos(data.length - 1), h - pad.bottom); ctx.lineTo(xPos(0), h - pad.bottom);
  ctx.closePath(); ctx.fillStyle = gradIG; ctx.fill();
  ctx.beginPath();
  data.forEach((d, i) => { i === 0 ? ctx.moveTo(xPos(i), yPos(d.ig)) : ctx.lineTo(xPos(i), yPos(d.ig)); });
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();

  drawXLabels(ctx, data.map(d => d.date), data.map((_, i) => xPos(i)), h, pad);
  const legendY = h - 12;
  [{ label: 'IG Corp', color: '#10b981' }, { label: 'HY Corp', color: '#ef4444' }].forEach((item, i) => {
    const lx = w / 2 - 60 + i * 100;
    ctx.fillStyle = item.color; ctx.fillRect(lx, legendY - 6, 12, 12);
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(item.label, lx + 16, legendY);
  });
}

const ExtIcon = () => (
  <svg className="res-pro-ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

function Resources() {
  const [menuOpen, setMenuOpen] = useState(false);

  const peRef = useRef(null);
  const hedgeRef = useRef(null);
  const bondRef = useRef(null);
  const allocRef = useRef(null);
  const reRef = useRef(null);
  const creditRef = useRef(null);

  useEffect(() => {
    drawPEChart(peRef.current);
    drawHedgeChart(hedgeRef.current);
    drawBondChart(bondRef.current);
    drawAllocChart(allocRef.current);
    drawREChart(reRef.current);
    drawCreditChart(creditRef.current);
  }, []);

  return (
    <>
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <SidePanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* resources header */}
      <section className="res-header">
        <div className="grid-pattern"></div>
        <div className="res-header-content">
          <div className="res-badge">
            <BarChart3 className="badge-icon" strokeWidth={2} />
            Market Intelligence
          </div>
          <h1 className="res-title">Resources &amp; Analytics</h1>
          <p className="res-subtitle">Real-time market data, professional resources, and institutional analytics</p>
        </div>
      </section>

      {/* main content */}
      <div className="res-content">
        <div className="res-container">

          {/* market overview cards */}
          <section className="res-overview-grid">
            <div className="res-overview-card glass-card">
              <div className="res-overview-label">S&amp;P 500</div>
              <div className="res-overview-row">
                <span className="res-overview-value">4,783.45</span>
                <span className="res-overview-change positive">
                  <TrendingUp className="change-arrow" strokeWidth={2} />
                  +1.2%
                </span>
              </div>
            </div>
            <div className="res-overview-card glass-card">
              <div className="res-overview-label">Dow Jones</div>
              <div className="res-overview-row">
                <span className="res-overview-value">37,545.33</span>
                <span className="res-overview-change positive">
                  <TrendingUp className="change-arrow" strokeWidth={2} />
                  +0.8%
                </span>
              </div>
            </div>
            <div className="res-overview-card glass-card">
              <div className="res-overview-label">NASDAQ</div>
              <div className="res-overview-row">
                <span className="res-overview-value">15,074.57</span>
                <span className="res-overview-change positive">
                  <TrendingUp className="change-arrow" strokeWidth={2} />
                  +1.5%
                </span>
              </div>
            </div>
            <div className="res-overview-card glass-card">
              <div className="res-overview-label">Russell 2000</div>
              <div className="res-overview-row">
                <span className="res-overview-value">2,045.12</span>
                <span className="res-overview-change negative">
                  <TrendingDown className="change-arrow" strokeWidth={2} />
                  -0.3%
                </span>
              </div>
            </div>
          </section>

          {/* IB section: IPO Pipeline + M&A */}
          <section className="res-ib-grid">
            <IPOPipeline />
            <MAChart />
          </section>

          {/* AM & PE section */}
          <section className="res-ampe-grid">
            <div className="res-card glass-card">
              <div className="res-card-header">
                <Target className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">PE DEPLOYMENT BY SECTOR</h3>
                <span className="res-card-subtitle">$B Invested</span>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="peChart" ref={peRef}></canvas>
              </div>
            </div>
            <div className="res-card glass-card">
              <div className="res-card-header">
                <Activity className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">HEDGE FUND PERFORMANCE</h3>
                <span className="res-card-subtitle">YTD Returns %</span>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="hedgeChart" ref={hedgeRef}></canvas>
              </div>
            </div>
          </section>

          {/* Fixed Income & Allocation */}
          <section className="res-fi-grid">
            <div className="res-card glass-card res-fi-card">
              <div className="res-card-header">
                <BarChart2 className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">FIXED INCOME ISSUANCE</h3>
                <span className="res-card-subtitle">Quarterly Volume ($B)</span>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="bondChart" ref={bondRef}></canvas>
              </div>
            </div>
            <div className="res-card glass-card">
              <div className="res-card-header">
                <DollarSign className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">ASSET ALLOCATION</h3>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="allocChart" ref={allocRef}></canvas>
              </div>
            </div>
          </section>

          {/* Real Estate & Credit */}
          <section className="res-recc-grid">
            <div className="res-card glass-card">
              <div className="res-card-header">
                <Activity className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">REAL ESTATE TRANSACTIONS</h3>
                <span className="res-card-subtitle">Volume ($B) &amp; Cap Rates %</span>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="reChart" ref={reRef}></canvas>
              </div>
            </div>
            <div className="res-card glass-card">
              <div className="res-card-header">
                <TrendingUp className="res-card-icon" strokeWidth={2} />
                <h3 className="res-card-title">CREDIT SPREADS</h3>
                <span className="res-card-subtitle">Basis Points</span>
              </div>
              <div className="res-chart-wrapper">
                <canvas id="creditChart" ref={creditRef}></canvas>
              </div>
            </div>
          </section>

          {/* professional resources section */}
          <section className="res-pro-section">
            <div className="res-pro-header">
              <h2 className="res-pro-title">Professional Resources</h2>
              <p className="res-pro-subtitle">Industry-leading platforms and publications for financial professionals</p>
            </div>

            {/* News & Analysis */}
            <div className="res-pro-category">
              <div className="res-pro-cat-header">
                <div className="res-pro-cat-icon">
                  <FileText strokeWidth={2} />
                </div>
                <h3 className="res-pro-cat-title">News &amp; Analysis</h3>
              </div>
              <div className="res-pro-items-grid">
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">Bloomberg Terminal</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Professional-grade financial data, news, and analytics platform</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span><span className="res-pro-tag">Capital Markets</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">Financial Times</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Global business news, analysis, and market insights</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Asset Management</span><span className="res-pro-tag">Capital Markets</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">The Wall Street Journal</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Business journalism and financial markets coverage</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span><span className="res-pro-tag">Corporate Finance</span></div></div>
                </a>
              </div>
            </div>

            {/* Educational Resources */}
            <div className="res-pro-category">
              <div className="res-pro-cat-header">
                <div className="res-pro-cat-icon">
                  <BookOpen strokeWidth={2} />
                </div>
                <h3 className="res-pro-cat-title">Educational Resources</h3>
              </div>
              <div className="res-pro-items-grid">
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">CFA Institute</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Chartered Financial Analyst program and investment research</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Asset Management</span><span className="res-pro-tag">Investment Banking</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">FINRA Investor Education</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Securities industry regulation and investor protection</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Capital Markets</span><span className="res-pro-tag">Insurance</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">SEC EDGAR Database</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Public company filings, 10-Ks, prospectuses, and disclosures</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span><span className="res-pro-tag">Corporate Finance</span></div></div>
                </a>
              </div>
            </div>

            {/* Industry Publications */}
            <div className="res-pro-category">
              <div className="res-pro-cat-header">
                <div className="res-pro-cat-icon">
                  <Briefcase strokeWidth={2} />
                </div>
                <h3 className="res-pro-cat-title">Industry Publications</h3>
              </div>
              <div className="res-pro-items-grid">
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">M&amp;A Journal</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Mergers, acquisitions, and corporate transactions analysis</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">Commercial Real Estate Direct</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">CRE financing, CMBS market intelligence and data</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Real Estate Finance</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">Institutional Investor</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Asset management, hedge funds, and institutional strategies</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Asset Management</span><span className="res-pro-tag">Capital Markets</span></div></div>
                </a>
              </div>
            </div>

            {/* Market Data Platforms */}
            <div className="res-pro-category">
              <div className="res-pro-cat-header">
                <div className="res-pro-cat-icon">
                  <BarChart3 strokeWidth={2} />
                </div>
                <h3 className="res-pro-cat-title">Market Data Platforms</h3>
              </div>
              <div className="res-pro-items-grid">
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">FactSet</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Integrated financial data and analytics workstation</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span><span className="res-pro-tag">Asset Management</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">Capital IQ</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Market intelligence and comprehensive financial database</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Investment Banking</span><span className="res-pro-tag">Corporate Finance</span></div></div>
                </a>
                <a href="#" className="res-pro-item" target="_blank" rel="noopener noreferrer">
                  <div className="res-pro-item-top"><h4 className="res-pro-item-title">PitchBook</h4><ExtIcon /></div>
                  <p className="res-pro-item-desc">Private equity, venture capital, and M&amp;A data</p>
                  <div className="res-pro-item-footer"><span className="res-pro-related-label">Related:</span><div className="res-pro-tags"><span className="res-pro-tag">Asset Management</span><span className="res-pro-tag">Investment Banking</span></div></div>
                </a>
              </div>
            </div>
          </section>

          {/* connect learning CTA */}
          <section className="res-connect-card glass-card">
            <div className="grid-pattern"></div>
            <div className="res-connect-inner">
              <div className="res-connect-icon">
                <BookOpen strokeWidth={2} />
              </div>
              <div className="res-connect-text">
                <h3 className="res-connect-title">Connect Learning to Practice</h3>
                <p className="res-connect-desc">These institutional analytics and professional resources complement your FinLit training. Apply concepts from your modules by exploring real market data, deal activity, and industry analysis.</p>
                <Link to="/learning" className="res-connect-btn">
                  <BookOpen strokeWidth={2} size={20} />
                  Continue Your Learning Journey
                  <ArrowRight strokeWidth={2} size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* disclaimer */}
          <div className="res-disclaimer">
            <Activity className="res-disclaimer-icon" strokeWidth={2} />
            <div>
              <h3 className="res-disclaimer-title">Demo Analytics &amp; Data</h3>
              <p className="res-disclaimer-text">All market analytics, deal data, and visualizations are for demonstration and educational purposes. Production systems integrate with institutional platforms like Bloomberg Terminal, Refinitiv, FactSet, PitchBook, and other professional data providers.</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Resources;
