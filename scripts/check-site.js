const fs = require('fs');
const path = require('path');
const http = require('http');

const root = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let missing = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const re = /assets\/images\/[A-Za-z0-9_\-\.\/\(\)\%\s]+/g;
  const matches = content.match(re) || [];
  matches.forEach(m => {
    const p = path.join(root, m);
    if (!fs.existsSync(p)) {
      missing.push({file, ref: m});
    }
  });
});

console.log('HTML files checked:', htmlFiles.length);
if (missing.length) {
  console.log('Missing image references:');
  missing.forEach(x => console.log(`  ${x.file} -> ${x.ref}`));
} else {
  console.log('No missing image references detected.');
}

// Check server
const url = process.env.URL || 'http://localhost:3000';
http.get(url, res => {
  console.log(`HTTP ${url} -> ${res.statusCode}`);
  res.resume();
}).on('error', err => {
  console.error('HTTP check failed:', err.message);
  process.exitCode = 2;
});
