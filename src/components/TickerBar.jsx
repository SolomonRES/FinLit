import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const UP_ICON = <ChevronUp className="ticker-icon" strokeWidth={2} />;
const DOWN_ICON = <ChevronDown className="ticker-icon" strokeWidth={2} />;

const TICKER_ITEMS = [
  { logo: 'gs.png', symbol: 'GS', price: '385.20', change: '+0.88%', positive: true },
  { logo: 'jpmc.png', symbol: 'JPM', price: '168.90', change: '+0.56%', positive: true },
  { logo: 'morgan-stanley.png', symbol: 'MS', price: '97.45', change: '-0.41%', positive: false },
  { logo: 'citi.png', symbol: 'C', price: '62.14', change: '+0.73%', positive: true },
  { logo: 'bofa.png', symbol: 'BAC', price: '38.57', change: '+0.59%', positive: true },
  { logo: 'deutsche.png', symbol: 'DB', price: '14.82', change: '-0.29%', positive: false },
  { logo: 'barclays.png', symbol: 'BCS', price: '9.84', change: '+1.14%', positive: true },
  { logo: 'hsbc.png', symbol: 'HSBC', price: '41.23', change: '+0.45%', positive: true },
  { logo: null, symbol: 'SPX', price: '4,760.12', change: '+0.73%', positive: true },
  { logo: null, symbol: 'DJI', price: '37,529.84', change: '+0.84%', positive: true },
  { logo: null, symbol: 'IXIC', price: '14,864.85', change: '-0.67%', positive: false },
  { logo: null, symbol: 'FTSE', price: '7,632.45', change: '-0.29%', positive: false },
  { logo: null, symbol: 'DAX', price: '16,758.23', change: '+1.14%', positive: true },
  { logo: null, symbol: 'NIKKEI', price: '32,891.45', change: '+0.45%', positive: true },
];

function TickerItem({ item }) {
  return (
    <div className="ticker-item">
      {item.logo && (
        <img src={process.env.PUBLIC_URL + '/assets/' + item.logo} alt="" className="ticker-logo" />
      )}
      <span className="ticker-symbol">{item.symbol}</span>
      <span className="ticker-price">{item.price}</span>
      <span className={`ticker-change ${item.positive ? 'positive' : 'negative'}`}>
        {item.positive ? UP_ICON : DOWN_ICON}
        {item.change}
      </span>
    </div>
  );
}

function TickerBar() {
  return (
    <section className="ticker-section">
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, i) => <TickerItem key={'a' + i} item={item} />)}
        {TICKER_ITEMS.map((item, i) => <TickerItem key={'b' + i} item={item} />)}
      </div>
    </section>
  );
}

export default TickerBar;
