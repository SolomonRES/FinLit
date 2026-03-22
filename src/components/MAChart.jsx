import React, { useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';

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

function drawMAChartCanvas(canvas) {
  const result = initCanvas(canvas);
  if (!result) return;
  const { ctx, w, h } = result;
  const pad = { top: 20, right: 50, bottom: 40, left: 45 };
  const data = [
    { month: "Aug", deals: 45, value: 125 },
    { month: "Sep", deals: 52, value: 142 },
    { month: "Oct", deals: 48, value: 138 },
    { month: "Nov", deals: 61, value: 168 },
    { month: "Dec", deals: 58, value: 175 },
    { month: "Jan", deals: 67, value: 195 },
  ];
  const maxVal = 200, maxDeals = 70;
  const chartW = w - pad.left - pad.right, chartH = h - pad.top - pad.bottom;
  const gap = chartW / data.length, barW = gap * 0.5;

  drawGrid(ctx, pad, w, h, 4, 0, maxVal);
  for (let i = 0; i <= 4; i++) {
    const val = (maxDeals / 4) * i;
    const yy = pad.top + chartH - (val / maxDeals) * chartH;
    ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(val), w - pad.right + 6, yy);
  }
  data.forEach((d, i) => {
    const bx = pad.left + i * gap + (gap - barW) / 2;
    const bh = (d.value / maxVal) * chartH;
    roundedBar(ctx, bx, pad.top + chartH - bh, barW, bh, 4);
    ctx.fillStyle = '#525252'; ctx.fill();
  });
  ctx.beginPath();
  data.forEach((d, i) => {
    const lx = pad.left + i * gap + gap / 2;
    const ly = pad.top + chartH - (d.deals / maxDeals) * chartH;
    if (i === 0) ctx.moveTo(lx, ly); else ctx.lineTo(lx, ly);
  });
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();
  data.forEach((d, i) => {
    const lx = pad.left + i * gap + gap / 2;
    const ly = pad.top + chartH - (d.deals / maxDeals) * chartH;
    ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981'; ctx.fill();
  });
  ctx.fillStyle = '#737373'; ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  data.forEach((d, i) => {
    ctx.fillText(d.month, pad.left + i * gap + gap / 2, h - pad.bottom + 8);
  });
}

function MAChart() {
  const maRef = useRef(null);

  useEffect(() => {
    drawMAChartCanvas(maRef.current);
  }, []);

  return (
    <div className="res-card glass-card res-ma-card">
      <div className="res-card-header">
        <Briefcase className="res-card-icon" strokeWidth={2} />
        <h3 className="res-card-title">M&amp;A ACTIVITY TRENDS</h3>
        <span className="res-card-subtitle">Deal Value ($B) &amp; Volume</span>
      </div>
      <div className="res-chart-wrapper">
        <canvas id="maChart" ref={maRef}></canvas>
      </div>
    </div>
  );
}

export default MAChart;
