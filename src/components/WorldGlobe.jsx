import React, { useRef, useEffect, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { X, TrendingUp, TrendingDown, Globe as GlobeIcon } from 'lucide-react';
import '../styles/components/WorldGlobe.css';

const EXCHANGES = [
  {
    id: 'NYSE', name: 'New York Stock Exchange', city: 'New York', country: 'United States',
    lat: 40.7128, lng: -74.006,
    index: 'S&P 500', symbol: 'SPX', value: '4,760.12', change: '+34.35', pct: '+0.73%',
    positive: true, volume: '$24.5B', marketCap: '$25.6T', region: 'Americas',
  },
  {
    id: 'NASDAQ', name: 'NASDAQ', city: 'New York', country: 'United States',
    lat: 40.759, lng: -73.985,
    index: 'NASDAQ Composite', symbol: 'IXIC', value: '14,864.85', change: '+123.74', pct: '+0.84%',
    positive: true, volume: '$18.2B', marketCap: '$22.1T', region: 'Americas',
  },
  {
    id: 'TSX', name: 'Toronto Stock Exchange', city: 'Toronto', country: 'Canada',
    lat: 43.6532, lng: -79.3832,
    index: 'TSX Composite', symbol: 'TSX', value: '21,543.67', change: '+81.62', pct: '+0.38%',
    positive: true, volume: '$4.1B', marketCap: '$3.2T', region: 'Americas',
  },
  {
    id: 'BOVESPA', name: 'B3 (Bovespa)', city: 'São Paulo', country: 'Brazil',
    lat: -23.5505, lng: -46.6333,
    index: 'Ibovespa', symbol: 'IBOV', value: '126,842', change: '-792.45', pct: '-0.62%',
    positive: false, volume: '$3.5B', marketCap: '$0.9T', region: 'Americas',
  },
  {
    id: 'LSE', name: 'London Stock Exchange', city: 'London', country: 'United Kingdom',
    lat: 51.5155, lng: -0.0922,
    index: 'FTSE 100', symbol: 'UKX', value: '7,632.45', change: '-22.14', pct: '-0.29%',
    positive: false, volume: '$8.1B', marketCap: '$3.8T', region: 'Europe',
  },
  {
    id: 'EURONEXT', name: 'Euronext Paris', city: 'Paris', country: 'France',
    lat: 48.8566, lng: 2.3522,
    index: 'CAC 40', symbol: 'CAC', value: '7,543.21', change: '+13.58', pct: '+0.18%',
    positive: true, volume: '$6.3B', marketCap: '$4.1T', region: 'Europe',
  },
  {
    id: 'FSE', name: 'Frankfurt Stock Exchange', city: 'Frankfurt', country: 'Germany',
    lat: 50.1109, lng: 8.6821,
    index: 'DAX', symbol: 'DAX', value: '16,758.23', change: '+45.67', pct: '+0.27%',
    positive: true, volume: '$5.9B', marketCap: '$2.4T', region: 'Europe',
  },
  {
    id: 'TSE', name: 'Tokyo Stock Exchange', city: 'Tokyo', country: 'Japan',
    lat: 35.6762, lng: 139.6503,
    index: 'Nikkei 225', symbol: 'NKY', value: '35,489.57', change: '+289.12', pct: '+0.82%',
    positive: true, volume: '$12.4B', marketCap: '$5.8T', region: 'Asia-Pacific',
  },
  {
    id: 'HKEX', name: 'Hong Kong Exchange', city: 'Hong Kong', country: 'China (SAR)',
    lat: 22.2783, lng: 114.1747,
    index: 'Hang Seng', symbol: 'HSI', value: '16,334.91', change: '-134.22', pct: '-0.81%',
    positive: false, volume: '$9.7B', marketCap: '$3.6T', region: 'Asia-Pacific',
  },
  {
    id: 'SSE', name: 'Shanghai Stock Exchange', city: 'Shanghai', country: 'China',
    lat: 31.2304, lng: 121.4737,
    index: 'SSE Composite', symbol: 'SHCOMP', value: '2,974.11', change: '-12.88', pct: '-0.43%',
    positive: false, volume: '$11.2B', marketCap: '$6.2T', region: 'Asia-Pacific',
  },
  {
    id: 'BSE', name: 'Bombay Stock Exchange', city: 'Mumbai', country: 'India',
    lat: 18.9322, lng: 72.8345,
    index: 'SENSEX', symbol: 'SENSEX', value: '72,348.21', change: '+801.25', pct: '+1.12%',
    positive: true, volume: '$4.2B', marketCap: '$3.9T', region: 'Asia-Pacific',
  },
  {
    id: 'ASX', name: 'Australian Securities Exchange', city: 'Sydney', country: 'Australia',
    lat: -33.8688, lng: 151.2093,
    index: 'S&P/ASX 200', symbol: 'AS51', value: '7,634.80', change: '+42.14', pct: '+0.55%',
    positive: true, volume: '$3.8B', marketCap: '$1.7T', region: 'Asia-Pacific',
  },
];

const FLOWS = [
  { from: 'NYSE',   to: 'LSE'      },
  { from: 'NYSE',   to: 'TSE'      },
  { from: 'NYSE',   to: 'FSE'      },
  { from: 'NYSE',   to: 'HKEX'     },
  { from: 'NYSE',   to: 'TSX'      },
  { from: 'NYSE',   to: 'BOVESPA'  },
  { from: 'NASDAQ', to: 'TSE'      },
  { from: 'NASDAQ', to: 'LSE'      },
  { from: 'NASDAQ', to: 'SSE'      },
  { from: 'LSE',    to: 'EURONEXT' },
  { from: 'LSE',    to: 'TSE'      },
  { from: 'LSE',    to: 'BSE'      },
  { from: 'LSE',    to: 'SSE'      },
  { from: 'FSE',    to: 'SSE'      },
  { from: 'FSE',    to: 'EURONEXT' },
  { from: 'TSE',    to: 'HKEX'     },
  { from: 'TSE',    to: 'SSE'      },
  { from: 'TSE',    to: 'ASX'      },
  { from: 'HKEX',   to: 'SSE'      },
  { from: 'HKEX',   to: 'BSE'      },
  { from: 'BSE',    to: 'LSE'      },
];

const arcsData = FLOWS.map(flow => {
  const fromEx = EXCHANGES.find(e => e.id === flow.from);
  const toEx   = EXCHANGES.find(e => e.id === flow.to);
  return {
    startLat: fromEx.lat, startLng: fromEx.lng,
    endLat:   toEx.lat,   endLng:   toEx.lng,
    label: `${fromEx.city} → ${toEx.city}`,
  };
});

function WorldGlobe() {
  const globeRef     = useRef();
  const containerRef = useRef();
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [globeSize, setGlobeSize] = useState({ width: 900, height: 560 });

  /* responsive sizing */
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.max(360, Math.min(620, w * 0.58));
      setGlobeSize({ width: w, height: h });
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* initial camera + auto-rotate */
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 25, lng: -20, altitude: 2.4 }, 0);
    const controls = globeRef.current.controls();
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom      = true;
    controls.minDistance     = 180;
    controls.maxDistance     = 520;
  }, []);

  const handlePointClick = useCallback((point) => {
    setSelectedExchange(prev => (prev?.id === point.id ? null : point));
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 2.0 }, 900);
    }
  }, []);

  const handlePointHover = useCallback((point) => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !point;
    }
    document.body.style.cursor = point ? 'pointer' : 'default';
  }, []);

  /* tooltip - dark card to match section */
  const getPointLabel = useCallback((d) => `
    <div style="
      background:rgba(10,10,20,0.96);
      border:1px solid ${d.positive ? 'rgba(74,222,128,0.35)' : 'rgba(248,113,113,0.35)'};
      border-radius:10px;padding:12px 14px;
      font-family:system-ui,-apple-system,sans-serif;
      min-width:190px;
      box-shadow:0 8px 32px rgba(0,0,0,0.7);
    ">
      <div style="font-weight:700;font-size:13px;color:${d.positive ? '#4ade80' : '#f87171'};margin-bottom:2px;">${d.name}</div>
      <div style="font-size:11px;color:#9ca3af;margin-bottom:8px;">${d.city}, ${d.country}</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;">
        <span style="font-size:12px;color:#d1d5db;">${d.index}</span>
        <span style="font-size:14px;font-weight:600;color:#f9fafb;">${d.value}</span>
      </div>
      <div style="text-align:right;font-size:12px;color:${d.positive ? '#4ade80' : '#f87171'};margin-top:2px;">${d.pct}</div>
      <div style="margin-top:8px;font-size:10px;color:#4b5563;border-top:1px solid rgba(255,255,255,0.07);padding-top:6px;">Click for details</div>
    </div>
  `, []);

  /* dark-gray arcs - visible against the light section background */
  const getArcColor = useCallback(() => [
    'rgba(60,80,110,0.55)',
    'rgba(60,80,110,0.0)',
  ], []);

  /* vibrant dots for contrast against monochrome globe */
  const getPointColor = useCallback(
    (d) => d.positive ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)',
    []
  );

  /* all exchanges pulse simultaneously; selected one pulses brighter */
  const getRingColor = useCallback(
    (d) => d.id === selectedExchange?.id
      ? 'rgba(30,50,80,0.7)'
      : 'rgba(30,50,80,0.18)',
    [selectedExchange]
  );

  return (
    <section className="globe-section">
      <div className="globe-section-inner">

        {/* header */}
        <div className="globe-section-header">
          <div className="globe-title-group">
            <div>
              <h2 className="globe-title">Global Exchange Network</h2>
              <p className="globe-subtitle">
                <GlobeIcon className="globe-title-icon" strokeWidth={2} />
                Live capital flows between major world exchanges
              </p>
            </div>
          </div>
          <div className="globe-legend">
            <div className="globe-legend-item">
              <span className="globe-legend-dot globe-legend-dot--positive"></span>
              <span>Positive</span>
            </div>
            <div className="globe-legend-item">
              <span className="globe-legend-dot globe-legend-dot--negative"></span>
              <span>Negative</span>
            </div>
            <div className="globe-legend-item">
              <span className="globe-legend-arc"></span>
              <span>Capital flow</span>
            </div>
          </div>
        </div>

        {/* canvas + scan-line overlay + floating info panel */}
        <div className="globe-canvas-wrapper">
          <div className="globe-canvas-container" ref={containerRef}>
            <Globe
              ref={globeRef}
              width={globeSize.width}
              height={globeSize.height}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl=""
              backgroundColor="rgba(0,0,0,0)"
              rendererConfig={{ alpha: true, antialias: true }}
              atmosphereColor="rgba(100,120,150,0.2)"
              atmosphereAltitude={0.14}

              pointsData={EXCHANGES}
              pointLat="lat"
              pointLng="lng"
              pointColor={getPointColor}
              pointAltitude={0.018}
              pointRadius={0.9}
              pointsMerge={false}
              pointLabel={getPointLabel}
              onPointClick={handlePointClick}
              onPointHover={handlePointHover}

              /* all exchanges pulse simultaneously */
              ringsData={EXCHANGES}
              ringLat="lat"
              ringLng="lng"
              ringColor={getRingColor}
              ringMaxRadius={3.5}
              ringPropagationSpeed={1.2}
              ringRepeatPeriod={1800}

              arcsData={arcsData}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor={getArcColor}
              arcAltitude={0.22}
              arcStroke={0.35}
              arcDashLength={0.28}
              arcDashGap={0.14}
              arcDashAnimateTime={2600}
              arcLabel="label"
            />
            {/* animated scan-line overlay */}
            <div className="globe-overlay" />
          </div>

          {selectedExchange && (
            <div className="globe-info-panel">
              <button className="globe-info-close" onClick={() => setSelectedExchange(null)}>
                <X size={14} />
              </button>

              <div className="globe-info-exchange-name">{selectedExchange.name}</div>
              <div className="globe-info-location">{selectedExchange.city}, {selectedExchange.country}</div>
              <div className="globe-info-region-tag">{selectedExchange.region}</div>

              <div className="globe-info-divider"></div>

              <div className="globe-info-index-label">{selectedExchange.index}</div>
              <div className="globe-info-value-row">
                <span className="globe-info-value">{selectedExchange.value}</span>
                <span className={`globe-info-change ${selectedExchange.positive ? 'positive' : 'negative'}`}>
                  {selectedExchange.positive
                    ? <TrendingUp size={12} />
                    : <TrendingDown size={12} />}
                  {selectedExchange.pct}
                </span>
              </div>
              <div className={`globe-info-change-abs ${selectedExchange.positive ? 'positive' : 'negative'}`}>
                {selectedExchange.change}
              </div>

              <div className="globe-info-divider"></div>

              <div className="globe-info-stats">
                <div className="globe-info-stat">
                  <span className="globe-info-stat-label">Volume</span>
                  <span className="globe-info-stat-value">{selectedExchange.volume}</span>
                </div>
                <div className="globe-info-stat">
                  <span className="globe-info-stat-label">Market Cap</span>
                  <span className="globe-info-stat-value">{selectedExchange.marketCap}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="globe-hint">Drag to rotate · Scroll to zoom · Click any exchange for details</div>
      </div>
    </section>
  );
}

export default WorldGlobe;
