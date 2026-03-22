import React from 'react';

const LOGO_ITEMS = [
  { file: 'gs.png', alt: 'Goldman Sachs', name: 'Goldman Sachs' },
  { file: 'jpmc.png', alt: 'JPMorgan Chase', name: 'JPMorgan Chase' },
  { file: 'morgan-stanley.png', alt: 'Morgan Stanley', name: 'Morgan Stanley' },
  { file: 'citi.png', alt: 'Citigroup', name: 'Citigroup' },
  { file: 'bofa.png', alt: 'Bank of America', name: 'Bank of America' },
  { file: 'deutsche.png', alt: 'Deutsche Bank', name: 'Deutsche Bank' },
  { file: 'barclays.png', alt: 'Barclays', name: 'Barclays' },
  { file: 'hsbc.png', alt: 'HSBC', name: 'HSBC' },
];

function LogoScroll() {
  return (
    <section className="logo-scroll">
      <div className="logo-track">
        {LOGO_ITEMS.map((item, i) => (
          <div key={'la' + i} className="logo-item">
            <img src={process.env.PUBLIC_URL + '/assets/' + item.file} alt={item.alt} className="logo-img" /> {item.name}
          </div>
        ))}
        {LOGO_ITEMS.map((item, i) => (
          <div key={'lb' + i} className="logo-item">
            <img src={process.env.PUBLIC_URL + '/assets/' + item.file} alt={item.alt} className="logo-img" /> {item.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default LogoScroll;
