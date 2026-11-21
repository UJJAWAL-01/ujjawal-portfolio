// All on-page copy lives here so content edits never touch layout code.
// House rules: no em dashes, plain first-person voice in the bio, no buzzword triads.

import resume from './assets/Ujjawal_Patel_Data_Engineer.pdf';

export const profile = {
  name: 'Ujjawal Patel',
  role: 'Data Engineer',
  email: 'ujjawal.patel@tamu.edu',
  location: 'College Station, TX',
  timezone: 'America/Chicago',
  availability: 'Open to full-time roles from May 2027',
  resume,
  links: {
    github: 'https://github.com/UJJAWAL-01',
    linkedin: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/',
    medium: 'https://medium.com/@ujjawal.patel',
  },
};

export const hero = {
  role: 'Data Engineer',
  lede:
    'Data engineer at the Texas A&M Transportation Institute, working on geospatial pipelines, data platforms, and agent-assisted engineering.',
  sub: 'MS in Management Information Systems at Texas A&M, graduating May 2027.',
  now: [
    { label: 'Working on', value: 'Geospatial data engineering', note: 'TTI · Visual Analytics Program' },
    { label: 'Latest build', value: 'h3-lowpoints', note: 'Open-source Python library', href: '#work' },
    { label: 'Latest writing', value: 'Mapping 10.5M low points', note: 'On Medium', href: '#writing' },
    { label: 'Based in', value: 'College Station, TX', note: 'Local time', clock: true },
  ],
};

export const work = [
  {
    id: 'h3-lowpoints',
    title: 'h3-lowpoints',
    kicker: 'Open-source Python library',
    badge: 'Built with Claude Code and Claude agents',
    summary:
      'Finds closed depressions in elevation models with priority-flood fill, then maps their depth, area, and volume onto H3 hexagons at any resolution. Designed and built from scratch in five weeks.',
    stats: [
      { value: '10.6M', label: 'depressions mapped' },
      { value: '34M', label: 'H3 cells published' },
      { value: '311', label: 'flood reports tested' },
      { value: '30+', label: 'test modules in CI' },
    ],
    points: [
      'Exact tiled processing handles regions larger than memory and gives identical results at any tile size.',
      'Ran it on USGS 3DEP elevation data for the lower 48 and published the output as an open Parquet dataset with a DOI on Zenodo.',
      'Validated against flood reports in six cities with spatial block-bootstrap intervals. 10 m terrain beat 30 m, and the negative results are published too.',
      'A browser explorer with 3D views and a storm simulator lets anyone query the data with nothing to install.',
    ],
    stack: ['Python', 'NumPy', 'SciPy', 'Numba', 'rasterio', 'H3', 'Parquet', 'MapLibre', 'GitHub Actions', 'Claude Code'],
    links: [
      { label: 'Open the explorer', href: 'https://ujjawal-01.github.io/h3-lowpoints/explorer/', primary: true },
      { label: 'GitHub', href: 'https://github.com/UJJAWAL-01/h3-lowpoints' },
      { label: 'PyPI', href: 'https://pypi.org/project/h3-lowpoints/' },
      { label: 'Docs', href: 'https://ujjawal-01.github.io/h3-lowpoints/' },
      { label: 'Dataset DOI', href: 'https://doi.org/10.5281/zenodo.24382887' },
    ],
    visual: 'hex',
  },
  {
    id: 'nexus',
    title: 'NEXUS',
    kicker: 'Market data platform',
    summary:
      'A full-stack data platform for U.S. and Indian markets. 30+ REST routes pull from SEC EDGAR, FRED, the World Bank, and market-data providers, served through 18 dashboard panels.',
    stats: [
      { value: '30+', label: 'API routes' },
      { value: '18', label: 'dashboard panels' },
      { value: '4+', label: 'public data sources' },
    ],
    points: [
      'PostgreSQL schema (Drizzle ORM) and TypeScript ingestion jobs that load SEC EDGAR XBRL fundamentals into relational tables, with retries and an audit log of every run.',
      'Redis caching and rate limiting keep it responsive on free-tier infrastructure.',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Drizzle', 'Redis'],
    links: [{ label: 'Visit the live site', href: 'https://nexus-trading-nine.vercel.app/', primary: true }],
    visual: 'screenshot',
    shotUrl: 'https://nexus-trading-nine.vercel.app/',
  },
];

export const experience = [
  {
    org: 'Texas A&M Transportation Institute',
    unit: 'Visual Analytics Program',
    location: 'Bryan, TX',
    period: 'Jun 2026 – Present',
    current: true,
    roles: [
      { title: 'Graduate Research Assistant, Data Engineering', period: 'Sep 2026 – Present' },
      { title: 'Data Engineering Intern', period: 'Jun – Aug 2026' },
    ],
    points: [
      'Build and maintain ETL pipelines in Python and SQL that process large geospatial datasets (millions of rows, GB scale) from multiple sources.',
      'Reproject and reconcile coordinate reference systems, then clean and structure spatial data in GeoPandas and PostGIS for analytics, maps, and reporting.',
      'Work with a cross-functional team on data warehousing workflows and data quality across pipelines.',
    ],
    stack: ['Python', 'SQL', 'GeoPandas', 'PostGIS'],
  },
  {
    org: 'ESPS FinServ',
    location: 'Mumbai, India',
    period: 'Dec 2024 – Jun 2025',
    roles: [{ title: 'Business Analyst Intern' }],
    points: [
      'Automated market research with Python and Pine Script indicators and rule-based strategies with risk management, cutting manual research time by 50 minutes per session.',
      'Built an Excel investment product catalog with financial models to streamline client portfolio recommendations across asset classes.',
    ],
    stack: ['Python', 'Pine Script', 'Excel'],
  },
];

export const earlierExperience = [
  {
    period: 'Jun – Dec 2024',
    title: 'Forensic Analyst Intern',
    org: 'DeepCytes Cyberlabs (UK, remote)',
    note: 'Automated parts of a forensic investigation toolkit and co-developed hardware against juice-jacking attacks.',
  },
  {
    period: 'Jan – Mar 2023',
    title: 'Application Developer Intern',
    org: 'K.J. Somaiya College of Engineering',
    note: 'Built an Android app for medicine redistribution, from Figma flows to Java.',
  },
];

export const writing = {
  intro: 'Notes on what I build, including the parts that didn’t go my way.',
  posts: [
    {
      title: 'I Mapped 10.5 Million Low Points in US Terrain. Then I Tested Whether They Predict Flooding.',
      excerpt:
        'What I learned building an open-source Python library and a browser map in five weeks, including the results that didn’t go my way.',
      date: 'Nov 2026',
      tags: ['Claude Code', 'Geospatial', 'Hydrology', 'Uber H3'],
      href: 'https://medium.com/@ujjawal.patel/i-mapped-10-5-million-low-points-in-us-terrain-then-i-tested-whether-they-predict-flooding-768112311371',
    },
  ],
};

export const sideWork = {
  intro:
    'Markets are where I test ideas against something that doesn\'t care about my opinion. These run alongside the main work.',
  items: [
    {
      title: 'Signal Confidence Engine',
      note: 'Scores trend, momentum, volume, and price structure across timeframes into one number, with the reasoning shown.',
      meta: 'Python',
      href: 'https://signal-confidence-engine.vercel.app/',
    },
    {
      title: 'Sector ETF Analyzer',
      note: 'Ranks sector leadership on Sharpe and alpha, with a dual-momentum backtester for rotation strategies.',
      meta: 'Python · Streamlit',
      href: 'https://sector-rotatio-analyzer-iblxmim8yvj3krgenrxbmv.streamlit.app/',
    },
    {
      title: 'Consolidated Financial Planner',
      note: 'Puts SIPs, bonds, PPF, and equities side by side so the trade-offs are clear. Designed in Figma, modeled in SQL.',
      meta: 'Private',
      href: null,
    },
    {
      title: 'Strategy research',
      note: 'Fibonacci CPR, Drifted Bollinger Bands, and Gap Reversal Capture. Built and backtested in Pine Script.',
      meta: 'Pine Script',
      href: null,
    },
  ],
};

export const stack = [
  { group: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'Java', 'C'] },
  { group: 'Data engineering', items: ['ETL / ELT', 'Data warehousing', 'PostgreSQL', 'MongoDB', 'Redis', 'Parquet', 'pandas', 'NumPy', 'Numba', 'REST APIs'] },
  { group: 'Geospatial', items: ['GeoPandas', 'PostGIS', 'rasterio', 'pyproj', 'H3', 'CRS & projections', 'DEM / raster analysis', 'MapLibre'] },
  { group: 'AI & agents', items: ['Claude Code', 'Claude agents', 'AWS AI Practitioner', 'n8n'] },
  { group: 'Cloud & tools', items: ['AWS', 'Azure', 'Git', 'GitHub Actions', 'Power BI', 'Streamlit', 'Plotly', 'Excel'] },
];

export const about = {
  bio: [
    'I\'m a data engineer finishing an MS in Management Information Systems at Texas A&M, with a computer engineering degree from K.J. Somaiya in Mumbai.',
    'Most of my work is the unglamorous middle of data: taking sources that don\'t agree and turning them into one dataset people can trust. At TTI that\'s statewide spatial data. On my own time it\'s h3-lowpoints and NEXUS.',
    'I build with AI agents as part of the team. h3-lowpoints went from idea to a published library, dataset, and browser map in five weeks with Claude Code and Claude agents doing a lot of the heavy lifting, while I owned the method, the checks, and the calls on what to ship.',
  ],
  numbers: [
    { value: '10.6M', label: 'terrain depressions mapped' },
    { value: '9.15', label: 'undergrad GPA out of 10' },
    { value: '5', label: 'weeks from idea to h3-lowpoints' },
    { value: '5', label: 'professional certifications' },
  ],
  education: [
    {
      school: 'Texas A&M University, Mays Business School',
      degree: 'MS, Management Information Systems',
      period: 'May 2027',
      note: 'Advanced Database Management, Data Warehousing',
    },
    {
      school: 'K.J. Somaiya College of Engineering',
      degree: 'B.Tech, Computer Engineering',
      period: 'May 2025',
      note: 'GPA 9.15 / 10 · Honors in Cybersecurity, Forensics & Cyber Laws',
    },
  ],
  recognition: [
    '3rd place, Google Labs x Aggies-in-Tech Make-a-Thon',
    '2nd place, CMIS Case Competition, Mays Business School',
    'Treasurer, Business Information Technology Students (BITS), 2026–27',
    'Merit-based scholarship',
  ],
  certifications: [
    { title: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', href: 'https://www.credly.com/go/RfYK5cG3GUhQa4T8jckmDQ' },
    { title: 'Google Project Management', issuer: 'Google', href: 'https://coursera.org/share/9974fbc991abb53e55e55c20acd7d7f9' },
    { title: 'Databases and SQL for Data Science', issuer: 'IBM', href: 'https://coursera.org/share/604cd016a1fc11f3c3c414726fc254d0' },
    { title: 'Bloomberg Market Concepts', issuer: 'Bloomberg', href: 'https://portal.bloombergforeducation.com/certificates/v8shJE9tdA2ey6x1XRTk8akx' },
    { title: 'Google UX Design', issuer: 'Google', href: 'https://coursera.org/share/6df8d69758ab3cf00ff396bea25f4090' },
  ],
};

export const recommendation = {
  quote:
    'He doesn’t just wait for instructions; he anticipates needs and offers data-driven perspectives that help our team make better decisions.',
  author: 'Linzee Burch, MBA',
  title: 'Communications Manager, Texas A&M Division of Finance & Business Services',
  date: 'March 2026',
  href: 'https://www.linkedin.com/in/ujjawal-patel-7508b8199/',
  full: [
    'UJ has proven himself to be an extremely reliable and solution-oriented team member. Helping the communications team is not part of his job description, but he jumps in without hesitation, approaching every task with speed, accuracy, and a positive attitude.',
    'One of his most significant contributions was helping us meet the ADA Title II accessibility requirements for our division’s website. He executed it without flaw, then documented his process and trained our permanent staff on the workflows he used so we could grow our skillsets.',
    'Translating technical tasks into understandable comprehension and training for others is what will set UJ apart from the standard of an effective Data or Business Analyst.',
    'I recommend him without reservation.',
  ],
};

export const contact = {
  heading: 'Get in touch',
  body: 'I\'m looking for full-time data engineering roles starting May 2027. Email is the fastest way to reach me.',
};

export const nav = [
  { label: 'Work', href: '#work', icon: 'work' },
  { label: 'Experience', href: '#experience', icon: 'experience' },
  { label: 'Writing', href: '#writing', icon: 'writing' },
  { label: 'About', href: '#about', icon: 'about' },
  { label: 'Contact', href: '#contact', icon: 'contact' },
];

// Order used by keyboard navigation (j / k) and the command palette.
export const sectionIds = ['hero', 'work', 'experience', 'writing', 'side-work', 'stack', 'about', 'recommendation', 'contact'];
