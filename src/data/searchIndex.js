/**
 * Static search index for global navbar search.
 * Modules are added dynamically from the API at runtime.
 */

const STATIC_ITEMS = [
  // --- Pages ---
  { label: 'Learning', description: 'Training curriculum and modules', path: '/learning', category: 'Page' },
  { label: 'Tools', description: 'Financial calculators and templates', path: '/tools', category: 'Page' },
  { label: 'Markets', description: 'Live global market data', path: '/markets', category: 'Page' },
  { label: 'Resources', description: 'Professional resources and analytics', path: '/resources', category: 'Page' },
  { label: 'Profile', description: 'Your progress and achievements', path: '/profile', category: 'Page' },

  // --- Tools ---
  { label: 'DCF Valuation', description: 'Calculate intrinsic value using discounted cash flow', path: '/tools', category: 'Tool' },
  { label: 'WACC Calculator', description: 'Compute weighted average cost of capital', path: '/tools', category: 'Tool' },
  { label: 'LBO Returns', description: 'Model leveraged buyout returns and equity multiples', path: '/tools', category: 'Tool' },
  { label: 'Accretion / Dilution', description: 'Analyze M&A impact on earnings per share', path: '/tools', category: 'Tool' },
  { label: 'Bond Pricing', description: 'Calculate bond prices, yields, and duration', path: '/tools', category: 'Tool' },
  { label: 'Comparable Analysis', description: 'Analyze trading and transaction multiples', path: '/tools', category: 'Tool' },

  // --- Markets ---
  { label: 'S&P 500', description: 'US large-cap equity index', path: '/markets', category: 'Market' },
  { label: 'Dow Jones', description: 'US blue-chip equity index', path: '/markets', category: 'Market' },
  { label: 'NASDAQ', description: 'US tech-heavy equity index', path: '/markets', category: 'Market' },
  { label: 'FTSE 100', description: 'UK equity index', path: '/markets', category: 'Market' },
  { label: 'DAX', description: 'German equity index', path: '/markets', category: 'Market' },
  { label: 'Hang Seng', description: 'Hong Kong equity index', path: '/markets', category: 'Market' },
  { label: 'Nikkei 225', description: 'Japanese equity index', path: '/markets', category: 'Market' },
  { label: 'Live Market Chart', description: 'Real-time S&P 500 TradingView chart', path: '/markets', category: 'Market' },

  // --- Resources ---
  { label: 'Bloomberg Terminal', description: 'Professional market data and analytics', path: '/resources', category: 'Resource' },
  { label: 'Financial Times', description: 'Global financial news and analysis', path: '/resources', category: 'Resource' },
  { label: 'The Wall Street Journal', description: 'Business and financial news', path: '/resources', category: 'Resource' },
  { label: 'CFA Institute', description: 'Investment management education', path: '/resources', category: 'Resource' },
  { label: 'FINRA Investor Education', description: 'Regulatory investor resources', path: '/resources', category: 'Resource' },
  { label: 'SEC EDGAR Database', description: 'Public company filings', path: '/resources', category: 'Resource' },
  { label: 'M&A Journal', description: 'Mergers and acquisitions publication', path: '/resources', category: 'Resource' },
  { label: 'Commercial Real Estate Direct', description: 'CRE industry news', path: '/resources', category: 'Resource' },
  { label: 'Institutional Investor', description: 'Institutional finance publication', path: '/resources', category: 'Resource' },
  { label: 'FactSet', description: 'Financial data and analytics platform', path: '/resources', category: 'Resource' },
  { label: 'Capital IQ', description: 'Financial research platform', path: '/resources', category: 'Resource' },
  { label: 'PitchBook', description: 'Private market data platform', path: '/resources', category: 'Resource' },
  { label: 'PE Deployment by Sector', description: 'Private equity sector analytics', path: '/resources', category: 'Resource' },
  { label: 'Hedge Fund Performance', description: 'Hedge fund strategy analytics', path: '/resources', category: 'Resource' },
  { label: 'Asset Allocation', description: 'Portfolio allocation analytics', path: '/resources', category: 'Resource' },
];

/**
 * Build search items from API modules.
 * Call once after modules load to merge with static items.
 */
export function buildModuleItems(modules) {
  return modules.map(m => ({
    label: m.title,
    description: m.domain + ' - ' + (m.description || ''),
    path: '/learning/' + m._id,
    category: 'Module',
    topics: m.topics || [],
  }));
}

/**
 * Search the index. Returns up to `limit` matches.
 */
export function searchItems(query, extraItems = [], limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const all = [...extraItems, ...STATIC_ITEMS];
  const scored = [];

  for (const item of all) {
    let score = 0;
    const lbl = item.label.toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    const topics = (item.topics || []).map(t => t.toLowerCase());

    if (lbl === q) score = 100;
    else if (lbl.startsWith(q)) score = 80;
    else if (lbl.includes(q)) score = 60;
    else if (desc.includes(q)) score = 40;
    else if (cat.includes(q)) score = 30;
    else if (topics.some(t => t.includes(q))) score = 50;

    if (score > 0) scored.push({ ...item, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export default STATIC_ITEMS;
