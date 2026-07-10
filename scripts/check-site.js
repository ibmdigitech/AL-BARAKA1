const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

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
      missing.push({ file, ref: m });
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
const urlString = process.env.URL || 'http://localhost:3000';
const client = urlString.startsWith('https') ? https : http;

client.get(urlString, res => {
  console.log(`HTTP ${urlString} -> ${res.statusCode}`);
  res.resume();
}).on('error', err => {
  console.error(`Connection to ${urlString} failed:`, err.message);
  process.exitCode = 2;
});
