<div align="center">

<img src="https://raw.githubusercontent.com/SolomonRES/FinLit/main/public/assets/banner.svg" alt="FinLit" width="100%" />

<br/>

<img src="https://raw.githubusercontent.com/SolomonRES/FinLit/main/public/assets/finlit-logo.png" height="22" align="center" /> &nbsp; A financial literacy platform for aspiring finance professionals

<br/><br/>

<a href="https://SolomonRES.github.io/FinLit"><img src="https://img.shields.io/badge/Live_Site-000000?style=for-the-badge&logo=github" /></a>
&nbsp;
<a href="https://github.com/SolomonRES/FinLit"><img src="https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github" /></a>

<br/><br/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router&logoColor=white" />
<img src="https://img.shields.io/badge/Lucide_React-icons-f97316?style=flat-square" />
<img src="https://img.shields.io/badge/GitHub_Pages-deployed-222?style=flat-square&logo=github" />

</div>

<br/>

<img src="https://raw.githubusercontent.com/SolomonRES/FinLit/main/public/assets/demo.gif" alt="FinLit Demo" width="100%" />

<br/>

## Overview

FinLit is a single-page React application that delivers structured financial education across six core sectors: **Investment Banking, Capital Markets, Asset Management, Corporate Finance, Real Estate Finance,** and **Insurance & Risk**. The platform combines a curated module curriculum, interactive financial tools, market data visualizations, and detailed progress tracking inside a glassmorphism UI with smooth animations and full responsiveness.

<br/>

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| Styling | CSS3 - Custom Properties, Grid, Flexbox, Glassmorphism |
| Charts | HTML5 Canvas API |
| Contact Form | Web3Forms (async, no backend) |
| Deployment | GitHub Pages via `gh-pages` |
| Build Tool | Create React App (react-scripts 5) |

<br/>

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Animated landing page with hero, ticker, institutions, and contact |
| `/learning` | Learning | Module curriculum organized by financial domain with progress tracking |
| `/tools` | Tools | Financial calculators: DCF, WACC, LBO, Accretion/Dilution, Bond Pricing, Comps |
| `/markets` | Markets | Canvas-rendered market charts and major index data |
| `/resources` | Resources | Market intelligence, M&A activity, and IPO pipeline data |
| `/profile` | Profile | User progress dashboard with sector breakdown and achievements |

<br/>

## Getting Started

```bash
git clone https://github.com/SolomonRES/FinLit.git
cd FinLit
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

<br/>

## Deployment

The project deploys to GitHub Pages via `gh-pages`. The router uses `basename={process.env.PUBLIC_URL}` to handle the `/FinLit` subdirectory.

```bash
git add .
git commit -m "your message"
git push origin main
npm run deploy
```

Live at **[https://SolomonRES.github.io/FinLit](https://SolomonRES.github.io/FinLit)**

<br/>

<div align="center">

© 2026 FinLit · Solomon Ellis-Summers

</div>
