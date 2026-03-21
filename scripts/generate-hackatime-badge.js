// scripts/generate-hackatime-badge.js
const fs = require('fs');
const fetch = require('node-fetch');

const uid = process.env.UID;
const secret = process.env.SECRET;

(async () => {
  try {
    const res = await fetch(`https://hackatime.hackclub.com/api/users/${uid}`, {
      headers: { Authorization: `Bearer ${secret}` }
    });
    if (!res.ok) throw new Error('Failed to fetch Hackatime stats');

    const data = await res.json();

    // Basic SVG badge
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="80">
        <rect width="300" height="80" fill="#2b2b2b" rx="10" />
        <text x="150" y="50" font-size="16" fill="white" text-anchor="middle" font-family="sans-serif">
          Hackatime Hours: ${data.total_hours || 0}h
        </text>
      </svg>
    `;

    if (!fs.existsSync('./badges')) fs.mkdirSync('./badges');
    fs.writeFileSync('./badges/hackatime.svg', svg);
    console.log('Hackatime badge generated!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
