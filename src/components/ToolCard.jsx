import React from 'react';
import { ArrowRight } from 'lucide-react';

function ToolCard({ icon, category, name, description }) {
  return (
    <div className="tool-card">
      <div className="tool-icon-wrapper">
        {icon}
      </div>
      <span className="tool-category-badge">{category}</span>
      <h3 className="tool-name">{name}</h3>
      <p className="tool-description">{description}</p>
      <a href="#" className="tool-open-link">
        Open Calculator
        <ArrowRight className="tool-open-arrow" strokeWidth={2} />
      </a>
    </div>
  );
}

export default ToolCard;
