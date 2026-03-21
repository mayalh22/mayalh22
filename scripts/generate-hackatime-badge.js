// scripts/generate-hackatime-badge.js
const fs = require('fs');
const fetch = require('node-fetch');

const secret = process.env.HACKATIME_SECRET;

(async () => {
  try {
    const res = await fetch(`https://hackatime.hackclub.com/api/v1/users/current/stats`, {
      headers: { Authorization: `Bearer ${secret}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch Hackatime stats: ${res.status}`);

    const json = await res.json();
    const totalSeconds = json.data?.total_seconds || 0;
    const totalHours = (totalSeconds / 3600).toFixed(1);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80">
  <rect width="300" height="80" fill="#2b2b2b" rx="10" />
  <text x="150" y="50" font-size="16" fill="white" text-anchor="middle" font-family="sans-serif">
    Hackatime Hours: ${totalHours}h
  </text>
</svg>`;

    if (!fs.existsSync('./badges')) fs.mkdirSync('./badges');
    fs.writeFileSync('./badges/hackatime.svg', svg);
    console.log('Hackatime badge generated!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
