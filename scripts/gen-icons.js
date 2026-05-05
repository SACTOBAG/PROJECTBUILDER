const fs = require('fs');
const path = require('path');

function createSvg(size) {
  const r = Math.round(size * 0.15);
  const fontSize = Math.round(size * 0.3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#6F4E37"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="central"
    fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="${fontSize}">BM</text>
</svg>`;
}

const pubDir = path.join(__dirname, '..', 'client', 'public');

fs.writeFileSync(path.join(pubDir, 'pwa-192x192.svg'), createSvg(192));
fs.writeFileSync(path.join(pubDir, 'pwa-512x512.svg'), createSvg(512));
fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.svg'), createSvg(180));
console.log('PWA icons generated');
