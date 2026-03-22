import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const UP_ARROW = <TrendingUp className="change-arrow" strokeWidth={2} />;
const DOWN_ARROW = <TrendingDown className="change-arrow" strokeWidth={2} />;

function MarketIndex({ symbol, name, region, value, change, positive }) {
  const regionClass = region === 'US' ? 'region-us' : region === 'EU' ? 'region-eu' : 'region-apac';
  return (
    <div className="index-card glass-card">
      <div className="index-card-top">
        <div>
          <div className="index-symbol">{symbol}</div>
          <div className="index-name">{name}</div>
        </div>
        <span className={`index-region ${regionClass}`}>{region}</span>
      </div>
      <div className="index-value">{value}</div>
      <div className={`index-change ${positive ? 'positive' : 'negative'}`}>
        {positive ? UP_ARROW : DOWN_ARROW}
        <span>{change}</span>
      </div>
    </div>
  );
}

export default MarketIndex;
