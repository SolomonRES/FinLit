import ThreeStatementFlow  from './ThreeStatementFlow';
import MAProcessFlow       from './MAProcessFlow';
import ValuationRanges     from './ValuationRanges';
import YieldCurve          from './YieldCurve';
import OptionsPayoff       from './OptionsPayoff';
import EfficientFrontier   from './EfficientFrontier';
import WorkingCapitalCycle from './WorkingCapitalCycle';
import RiskMatrix          from './RiskMatrix';
import DefaultDiagram      from './DefaultDiagram';

// Map module _id → diagram component
const DIAGRAM_MAP = {
  1:  MAProcessFlow,        // M&A Fundamentals
  2:  ValuationRanges,      // Valuation Methods
  5:  ThreeStatementFlow,   // Financial Modeling in Excel
  8:  YieldCurve,           // Fixed Income Trading
  9:  OptionsPayoff,        // Derivatives & Options
  12: EfficientFrontier,    // Portfolio Theory
  19: WorkingCapitalCycle,  // Working Capital Management
  23: RiskMatrix,           // Risk Management Fundamentals
};

export function getDiagram(id) {
  return DIAGRAM_MAP[id] ?? DefaultDiagram;
}
