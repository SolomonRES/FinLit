import React, { useEffect, useRef } from 'react';
import { TrendingUp, Database } from 'lucide-react';

function drawSPXChart(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const pad = { top: 20, right: 15, bottom: 35, left: 55 };

  const data = [
    { time: "9:30", price: 4725.77 },
    { time: "10:00", price: 4730.45 },
    { time: "11:00", price: 4735.23 },
    { time: "12:00", price: 4745.67 },
    { time: "13:00", price: 4750.88 },
    { time: "14:00", price: 4760.12 },
    { time: "15:00", price: 4758.34 },
    { time: "16:00", price: 4760.12 },
  ];

  const prices = data.map(d => d.price);
  const minP = Math.min(...prices) - 10;
  const maxP = Math.max(...prices) + 10;

  function x(i) { return pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right); }
  function y(v) { return pad.top + (1 - (v - minP) / (maxP - minP)) * (h - pad.top - pad.bottom); }

  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const val = minP + (maxP - minP) * (i / yTicks);
    const yy = y(val);
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(val.toFixed(2), pad.left - 6, yy);
  }

  ctx.fillStyle = '#a3a3a3';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  data.forEach((d, i) => {
    ctx.fillText(d.time, x(i), h - pad.bottom + 8);
  });

  const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.30)');
  grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

  ctx.beginPath();
  ctx.moveTo(x(0), y(data[0].price));
  for (let i = 1; i < data.length; i++) {
    const cx1 = (x(i - 1) + x(i)) / 2;
    const cx2 = (x(i - 1) + x(i)) / 2;
    ctx.bezierCurveTo(cx1, y(data[i - 1].price), cx2, y(data[i].price), x(i), y(data[i].price));
  }
  ctx.lineTo(x(data.length - 1), h - pad.bottom);
  ctx.lineTo(x(0), h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x(0), y(data[0].price));
  for (let i = 1; i < data.length; i++) {
    const cx1 = (x(i - 1) + x(i)) / 2;
    const cx2 = (x(i - 1) + x(i)) / 2;
    ctx.bezierCurveTo(cx1, y(data[i - 1].price), cx2, y(data[i].price), x(i), y(data[i].price));
  }
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawVolumeChart(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const pad = { top: 20, right: 15, bottom: 35, left: 40 };

  const data = [
    { time: "9:30", volume: 45 },
    { time: "10:00", volume: 62 },
    { time: "11:00", volume: 48 },
    { time: "12:00", volume: 38 },
    { time: "13:00", volume: 52 },
    { time: "14:00", volume: 71 },
    { time: "15:00", volume: 85 },
    { time: "16:00", volume: 93 },
  ];

  const maxV = Math.max(...data.map(d => d.volume)) * 1.1;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / data.length * 0.6;
  const gap = chartW / data.length;

  ctx.strokeStyle = '#e5e5e5';
  ctx.lineWidth = 1;
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const val = (maxV / yTicks) * i;
    const yy = pad.top + chartH - (val / maxV) * chartH;
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(val), pad.left - 6, yy);
  }

  data.forEach((d, i) => {
    const bx = pad.left + i * gap + (gap - barW) / 2;
    const bh = (d.volume / maxV) * chartH;
    const by = pad.top + chartH - bh;
    const radius = 4;

    ctx.beginPath();
    ctx.moveTo(bx + radius, by);
    ctx.lineTo(bx + barW - radius, by);
    ctx.quadraticCurveTo(bx + barW, by, bx + barW, by + radius);
    ctx.lineTo(bx + barW, pad.top + chartH);
    ctx.lineTo(bx, pad.top + chartH);
    ctx.lineTo(bx, by + radius);
    ctx.quadraticCurveTo(bx, by, bx + radius, by);
    ctx.closePath();
    ctx.fillStyle = '#737373';
    ctx.fill();

    ctx.fillStyle = '#a3a3a3';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(d.time, bx + barW / 2, h - pad.bottom + 8);
  });
}

function SPXChart() {
  const spxRef = useRef(null);
  const volumeRef = useRef(null);

  useEffect(() => {
    drawSPXChart(spxRef.current);
    drawVolumeChart(volumeRef.current);
  }, []);

  return (
    <section className="markets-section">
      <div className="charts-grid">
        {/* S&P 500 area chart */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div>
              <div className="chart-symbol">SPX</div>
              <h3 className="chart-title">S&amp;P 500 Intraday</h3>
            </div>
            <div className="chart-badge positive">
              <TrendingUp className="chart-badge-icon" strokeWidth={2} />
              +0.73%
            </div>
          </div>
          <div className="chart-area-wrapper">
            <canvas id="spxChart" ref={spxRef} width="500" height="250"></canvas>
          </div>
        </div>

        {/* Volume bar chart */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <div>
              <div className="chart-symbol">VOLUME</div>
              <h3 className="chart-title">Trading Volume</h3>
            </div>
            <Database className="chart-header-icon" strokeWidth={2} />
          </div>
          <div className="chart-area-wrapper">
            <canvas id="volumeChart" ref={volumeRef} width="500" height="250"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SPXChart;
