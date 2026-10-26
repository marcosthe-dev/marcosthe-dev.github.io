const fs = require('node:fs');
const html = fs.readFileSync('index.html', 'utf8');
const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) throw new Error('Invalid anchor: ' + match[1]);
}
for (const file of ['styles.css', 'script.js', 'index.previous.html']) {
  if (!fs.existsSync(file)) throw new Error('Missing: ' + file);
}
console.log('OK: internal anchors, assets and original backup.');
