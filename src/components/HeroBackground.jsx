import React from 'react';

/* Animated floating financial data elements used in both mobile and desktop heroes */
function HeroBackground({ mobile }) {
  return (
    <div className="financial-data-bg">
      {/* numbers */}
      <div className="data-point data-number" style={{ left: mobile ? '8%' : '10%', top: mobile ? '12%' : '20%', animationDelay: '0.0s' }}>$4523.80</div>
      <div className="data-point data-number" style={{ left: mobile ? '82%' : '85%', top: mobile ? '8%' : '15%', animationDelay: '0.7s' }}>$889.04</div>
      <div className="data-point data-number" style={{ left: mobile ? '45%' : '45%', top: mobile ? '65%' : '70%', animationDelay: '1.8s' }}>$9082.85</div>
      <div className="data-point data-number" style={{ left: mobile ? '18%' : '20%', top: mobile ? '80%' : '85%', animationDelay: '2.8s' }}>$4151.54</div>
      <div className="data-point data-number" style={{ left: mobile ? '65%' : '60%', top: mobile ? '5%' : '8%', animationDelay: '1.0s' }}>$2341.67</div>
      <div className="data-point data-number" style={{ left: mobile ? '72%' : '72%', top: mobile ? '85%' : '88%', animationDelay: '3.8s' }}>$7925.12</div>
      <div className="data-point data-number" style={{ left: mobile ? '5%' : '28%', top: mobile ? '45%' : '25%', animationDelay: '2.1s' }}>$5107.48</div>
      <div className="data-point data-number" style={{ left: mobile ? '90%' : '92%', top: mobile ? '55%' : '62%', animationDelay: '3.1s' }}>$3892.20</div>
      <div className="data-point data-number" style={{ left: mobile ? '35%' : '3%', top: mobile ? '30%' : '47%', animationDelay: '1.4s' }}>$1651.98</div>
      <div className="data-point data-number" style={{ left: mobile ? '55%' : '48%', top: mobile ? '90%' : '33%', animationDelay: '2.4s' }}>$6724.89</div>

      {!mobile && (
        <>
          <div className="data-point data-number" style={{ left: '15%', top: '5%', animationDelay: '0.3s' }}>$5956.74</div>
          <div className="data-point data-number" style={{ left: '78%', top: '42%', animationDelay: '1.2s' }}>$7767.93</div>
          <div className="data-point data-number" style={{ left: '55%', top: '58%', animationDelay: '2.3s' }}>$3214.05</div>
          <div className="data-point data-number" style={{ left: '38%', top: '12%', animationDelay: '3.3s' }}>$6603.56</div>
          <div className="data-point data-number" style={{ left: '93%', top: '78%', animationDelay: '4.2s' }}>$447.17</div>
          <div className="data-point data-number" style={{ left: '4%', top: '72%', animationDelay: '0.9s' }}>$5664.83</div>
          <div className="data-point data-number" style={{ left: '67%', top: '3%', animationDelay: '1.9s' }}>$8102.87</div>
          <div className="data-point data-number" style={{ left: '82%', top: '92%', animationDelay: '3.0s' }}>$2927.40</div>
          <div className="data-point data-number" style={{ left: '33%', top: '38%', animationDelay: '4.0s' }}>$641.26</div>
          <div className="data-point data-number" style={{ left: '52%', top: '82%', animationDelay: '0.2s' }}>$9431.18</div>
        </>
      )}

      {/* tickers */}
      <div className="data-point data-ticker positive" style={{ left: mobile ? '20%' : '25%', top: mobile ? '55%' : '60%', animationDelay: '0.3s' }}>
        <span>AAPL 182.45</span><span className="trend-icon">&#9650;</span>
      </div>
      <div className="data-point data-ticker negative" style={{ left: mobile ? '68%' : '70%', top: mobile ? '25%' : '30%', animationDelay: '1.0s' }}>
        <span>GOOGL 141.22</span><span className="trend-icon">&#9660;</span>
      </div>
      <div className="data-point data-ticker positive" style={{ left: mobile ? '10%' : '15%', top: mobile ? '35%' : '40%', animationDelay: '2.1s' }}>
        <span>MSFT 420.15</span><span className="trend-icon">&#9650;</span>
      </div>
      <div className="data-point data-ticker negative" style={{ left: mobile ? '75%' : '80%', top: mobile ? '70%' : '75%', animationDelay: '3.1s' }}>
        <span>JPM 168.90</span><span className="trend-icon">&#9660;</span>
      </div>
      <div className="data-point data-ticker positive" style={{ left: mobile ? '50%' : '55%', top: mobile ? '18%' : '25%', animationDelay: '1.4s' }}>
        <span>{mobile ? 'GS 385.20' : 'BLK 240.23'}</span><span className="trend-icon">&#9650;</span>
      </div>
      <div className="data-point data-ticker negative" style={{ left: mobile ? '30%' : '35%', top: mobile ? '75%' : '80%', animationDelay: '2.4s' }}>
        <span>BAC 51.57</span><span className="trend-icon">&#9660;</span>
      </div>

      {!mobile && (
        <>
          <div className="data-point data-ticker positive" style={{ left: '8%', top: '12%', animationDelay: '0.7s' }}>
            <span>NVDA 518.67</span><span className="trend-icon">&#9650;</span>
          </div>
          <div className="data-point data-ticker negative" style={{ left: '92%', top: '50%', animationDelay: '3.5s' }}>
            <span>TSLA 245.80</span><span className="trend-icon">&#9660;</span>
          </div>
          <div className="data-point data-ticker positive" style={{ left: '42%', top: '5%', animationDelay: '1.8s' }}>
            <span>GS 385.20</span><span className="trend-icon">&#9650;</span>
          </div>
          <div className="data-point data-ticker negative" style={{ left: '65%', top: '92%', animationDelay: '2.8s' }}>
            <span>META 352.44</span><span className="trend-icon">&#9660;</span>
          </div>
          <div className="data-point data-ticker positive" style={{ left: '3%', top: '8%', animationDelay: '0.2s' }}>
            <span>AMZN 51.56</span><span className="trend-icon">&#9650;</span>
          </div>
          <div className="data-point data-ticker negative" style={{ left: '88%', top: '85%', animationDelay: '2.3s' }}>
            <span>C 447.17</span><span className="trend-icon">&#9660;</span>
          </div>
          <div className="data-point data-ticker positive" style={{ left: '47%', top: '92%', animationDelay: '3.8s' }}>
            <span>AAPL 443.35</span><span className="trend-icon">&#9650;</span>
          </div>
          <div className="data-point data-ticker negative" style={{ left: '18%', top: '52%', animationDelay: '1.2s' }}>
            <span>WFC 62.14</span><span className="trend-icon">&#9660;</span>
          </div>
          <div className="data-point data-ticker positive" style={{ left: '73%', top: '18%', animationDelay: '3.3s' }}>
            <span>V 285.90</span><span className="trend-icon">&#9650;</span>
          </div>
          <div className="data-point data-ticker negative" style={{ left: '30%', top: '95%', animationDelay: '2.4s' }}>
            <span>MS 97.45</span><span className="trend-icon">&#9660;</span>
          </div>
        </>
      )}

      {/* charts / labels */}
      <div className="data-point data-chart" style={{ left: mobile ? '58%' : '60%', top: mobile ? '12%' : '15%', animationDelay: '0.5s' }}>DCF</div>
      <div className="data-point data-chart" style={{ left: mobile ? '28%' : '30%', top: mobile ? '42%' : '45%', animationDelay: '1.6s' }}>M&amp;A</div>
      <div className="data-point data-chart" style={{ left: mobile ? '72%' : '75%', top: mobile ? '50%' : '55%', animationDelay: '2.6s' }}>WACC</div>
      <div className="data-point data-chart" style={{ left: mobile ? '10%' : '12%', top: mobile ? '62%' : '65%', animationDelay: '1.2s' }}>ROE</div>
      <div className="data-point data-chart" style={{ left: mobile ? '85%' : '88%', top: mobile ? '30%' : '35%', animationDelay: '3.7s' }}>IRR</div>
      <div className="data-point data-chart" style={{ left: mobile ? '42%' : '38%', top: mobile ? '78%' : '72%', animationDelay: '2.3s' }}>NPV</div>
      <div className="data-point data-chart" style={{ left: mobile ? '15%' : '22%', top: mobile ? '15%' : '18%', animationDelay: '0.9s' }}>IPO</div>
      <div className="data-point data-chart" style={{ left: mobile ? '65%' : '78%', top: mobile ? '88%' : '82%', animationDelay: '3.3s' }}>LBO</div>

      {!mobile && (
        <>
          <div className="data-point data-chart" style={{ left: '50%', top: '48%', animationDelay: '3.3s' }}>EBITDA</div>
          <div className="data-point data-chart" style={{ left: '5%', top: '55%', animationDelay: '1.9s' }}>P/E</div>
          <div className="data-point data-chart" style={{ left: '90%', top: '8%', animationDelay: '0.3s' }}>WACC</div>
          <div className="data-point data-chart" style={{ left: '48%', top: '95%', animationDelay: '1.4s' }}>ROE</div>
          <div className="data-point data-chart" style={{ left: '15%', top: '28%', animationDelay: '2.8s' }}>M&amp;A</div>
          <div className="data-point data-chart" style={{ left: '82%', top: '68%', animationDelay: '3.5s' }}>EBITDA</div>
          <div className="data-point data-chart" style={{ left: '35%', top: '8%', animationDelay: '0.9s' }}>DCF</div>
          <div className="data-point data-chart" style={{ left: '68%', top: '42%', animationDelay: '2.4s' }}>LBO</div>
          <div className="data-point data-chart" style={{ left: '7%', top: '82%', animationDelay: '4.2s' }}>IRR</div>
        </>
      )}

      {/* arrows */}
      <div className="data-point data-arrow positive" style={{ left: mobile ? '48%' : '50%', top: mobile ? '8%' : '10%', animationDelay: '0.9s' }}>&#9650; +1.43%</div>
      <div className="data-point data-arrow negative" style={{ left: mobile ? '88%' : '90%', top: mobile ? '38%' : '40%', animationDelay: '1.9s' }}>&#9660; -2.90%</div>
      <div className="data-point data-arrow positive" style={{ left: mobile ? '38%' : '40%', top: mobile ? '85%' : '90%', animationDelay: '3.0s' }}>&#9650; +3.84%</div>
      <div className="data-point data-arrow negative" style={{ left: mobile ? '62%' : '65%', top: mobile ? '45%' : '50%', animationDelay: '2.3s' }}>&#9660; -1.85%</div>
      <div className="data-point data-arrow positive" style={{ left: mobile ? '5%' : '5%', top: mobile ? '28%' : '30%', animationDelay: '0.3s' }}>&#9650; +2.61%</div>
      <div className="data-point data-arrow negative" style={{ left: mobile ? '80%' : '82%', top: mobile ? '8%' : '10%', animationDelay: '1.2s' }}>&#9660; -0.72%</div>

      {!mobile && (
        <>
          <div className="data-point data-arrow positive" style={{ left: '17%', top: '75%', animationDelay: '2.6s' }}>&#9650; +4.21%</div>
          <div className="data-point data-arrow negative" style={{ left: '95%', top: '28%', animationDelay: '3.7s' }}>&#9660; -3.15%</div>
          <div className="data-point data-arrow positive" style={{ left: '32%', top: '55%', animationDelay: '1.6s' }}>&#9650; +1.94%</div>
          <div className="data-point data-arrow negative" style={{ left: '58%', top: '85%', animationDelay: '3.3s' }}>&#9660; -2.48%</div>
        </>
      )}

      {/* data tables */}
      <div className="data-table" style={{ left: mobile ? '15%' : '18%', top: mobile ? '8%' : '10%', animationDelay: '0.0s' }}>
        <table><tbody>
          <tr><td>$665</td><td>42.3</td><td>79.2</td></tr>
          <tr><td>$257</td><td>28.1</td><td>$133</td></tr>
          {!mobile && <tr><td>93.7</td><td>$905</td><td>43.1</td></tr>}
        </tbody></table>
      </div>
      <div className="data-table" style={{ left: mobile ? '65%' : '68%', top: mobile ? '60%' : '65%', animationDelay: '3.5s' }}>
        <table><tbody>
          <tr><td>84.7</td><td>36.8</td><td>48.6</td></tr>
          <tr><td>$412</td><td>91.2</td><td>67.5</td></tr>
          {!mobile && <tr><td>29.4</td><td>$783</td><td>55.9</td></tr>}
        </tbody></table>
      </div>

      {!mobile && (
        <>
          <div className="data-table" style={{ left: '42%', top: '35%', animationDelay: '5.3s' }}>
            <table><tbody>
              <tr><td>$931</td><td>64.1</td><td>97.8</td></tr>
              <tr><td>18.5</td><td>$546</td><td>72.3</td></tr>
              <tr><td>45.9</td><td>83.7</td><td>$219</td></tr>
            </tbody></table>
          </div>
          <div className="data-table" style={{ left: '8%', top: '78%', animationDelay: '1.8s' }}>
            <table><tbody>
              <tr><td>$214</td><td>58.9</td><td>31.2</td></tr>
              <tr><td>74.6</td><td>$689</td><td>12.8</td></tr>
              <tr><td>46.3</td><td>21.7</td><td>$957</td></tr>
            </tbody></table>
          </div>
          <div className="data-table" style={{ left: '85%', top: '8%', animationDelay: '4.2s' }}>
            <table><tbody>
              <tr><td>19.4</td><td>$782</td><td>54.3</td></tr>
              <tr><td>$346</td><td>67.1</td><td>92.8</td></tr>
              <tr><td>35.9</td><td>16.5</td><td>$521</td></tr>
            </tbody></table>
          </div>
        </>
      )}

      {/* candlestick charts */}
      <div className="candlestick-chart" style={{ left: mobile ? '6%' : '8%', top: mobile ? '48%' : '50%', animationDelay: '1.8s' }}>
        <div className="candle green"></div><div className="candle red"></div>
        <div className="candle green"></div><div className="candle red"></div>
        <div className="candle green"></div>
      </div>
      <div className="candlestick-chart" style={{ left: mobile ? '85%' : '88%', top: mobile ? '18%' : '20%', animationDelay: '4.2s' }}>
        <div className="candle red"></div><div className="candle green"></div>
        <div className="candle green"></div><div className="candle red"></div>
        <div className="candle green"></div>
      </div>
      <div className="candlestick-chart" style={{ left: mobile ? '22%' : '25%', top: mobile ? '88%' : '92%', animationDelay: '2.8s' }}>
        <div className="candle green"></div><div className="candle green"></div>
        <div className="candle red"></div><div className="candle green"></div>
        <div className="candle red"></div>
      </div>
      <div className="candlestick-chart" style={{ left: mobile ? '70%' : '72%', top: mobile ? '4%' : '5%', animationDelay: '1.0s' }}>
        <div className="candle red"></div><div className="candle red"></div>
        <div className="candle green"></div><div className="candle green"></div>
        <div className="candle red"></div>
      </div>

      {!mobile && (
        <>
          <div className="candlestick-chart" style={{ left: '45%', top: '15%', animationDelay: '2.4s' }}>
            <div className="candle green"></div><div className="candle red"></div>
            <div className="candle green"></div><div className="candle red"></div>
            <div className="candle red"></div><div className="candle green"></div>
          </div>
          <div className="candlestick-chart" style={{ left: '62%', top: '78%', animationDelay: '3.5s' }}>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle green"></div><div className="candle red"></div>
            <div className="candle green"></div><div className="candle green"></div>
          </div>
          <div className="candlestick-chart" style={{ left: '3%', top: '88%', animationDelay: '0.3s' }}>
            <div className="candle green"></div><div className="candle green"></div>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle red"></div>
          </div>
          <div className="candlestick-chart" style={{ left: '90%', top: '72%', animationDelay: '1.6s' }}>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle green"></div>
          </div>
          <div className="candlestick-chart" style={{ left: '18%', top: '35%', animationDelay: '3.1s' }}>
            <div className="candle green"></div><div className="candle red"></div>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle red"></div><div className="candle green"></div>
          </div>
          <div className="candlestick-chart" style={{ left: '82%', top: '45%', animationDelay: '2.1s' }}>
            <div className="candle red"></div><div className="candle green"></div>
            <div className="candle green"></div><div className="candle red"></div>
            <div className="candle green"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default HeroBackground;
