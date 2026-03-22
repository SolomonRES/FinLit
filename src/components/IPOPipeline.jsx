import React from 'react';
import { TrendingUp } from 'lucide-react';

const IPO_DATA = [
  { company: "TechCorp AI", sector: "Technology", status: "Filed", value: "$850M", date: "Feb 5" },
  { company: "FinServe Inc", sector: "Financials", status: "Pricing", value: "$420M", date: "Feb 12" },
  { company: "BioGen Pharma", sector: "Healthcare", status: "Filed", value: "$680M", date: "Feb 18" },
  { company: "GreenEnergy Co", sector: "Energy", status: "Roadshow", value: "$320M", date: "Feb 25" },
  { company: "CloudNet Systems", sector: "Technology", status: "Filed", value: "$560M", date: "Mar 3" },
];

function IPOPipeline() {
  return (
    <div className="res-card glass-card res-ipo-card">
      <div className="res-card-header">
        <TrendingUp className="res-card-icon" strokeWidth={2} />
        <h3 className="res-card-title">IPO PIPELINE</h3>
      </div>
      <div className="ipo-list">
        {IPO_DATA.map((ipo, i) => (
          <div className="ipo-item" key={i}>
            <div className="ipo-item-top">
              <div>
                <div className="ipo-company">{ipo.company}</div>
                <div className="ipo-sector">{ipo.sector}</div>
              </div>
              <span className="ipo-status">{ipo.status}</span>
            </div>
            <div className="ipo-item-bottom">
              <span className="ipo-value">{ipo.value}</span>
              <span className="ipo-date">{ipo.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IPOPipeline;
