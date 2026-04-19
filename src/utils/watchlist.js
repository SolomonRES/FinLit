export const SECTORS = [
  'Technology',
  'Healthcare',
  'Financials',
  'Energy',
  'Consumer Discretionary',
  'Industrials',
  'Real Estate',
  'Utilities',
  'Materials',
  'Communication Services',
];

export function validateWatchlistFields(fields) {
  const errs = {};
  if (!fields.symbol || !/^[A-Za-z]{1,5}$/.test(fields.symbol))
    errs.symbol = 'Symbol must be 1-5 letters (e.g. AAPL)';
  if (!fields.name || fields.name.length < 2) errs.name = 'Name must be at least 2 characters';
  else if (fields.name.length > 60) errs.name = 'Name must be 60 characters or fewer';
  const price = Number(fields.targetPrice);
  if (!fields.targetPrice || isNaN(price)) errs.targetPrice = 'Enter a valid price';
  else if (price <= 0) errs.targetPrice = 'Price must be positive';
  if (fields.notes && fields.notes.length > 200) errs.notes = '200 characters max';
  if (!fields.sector) errs.sector = 'Please select a sector';
  return errs;
}
