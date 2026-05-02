const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
  const p = path.join(root, file);
  let content = fs.readFileSync(p, 'utf8');
  // Normalize backslashes to forward slashes (single backslash)
  content = content.replace(/\\/g, '/');
  // Fix accidental duplication like 'assets/images/assets/images' -> 'assets/images'
  content = content.replace(/assets\/images\/assets\/images/g, 'assets/images');
  content = content.replace(/assets\/images\/assets\/images/g, 'assets/images');
  // Fix malformed normalized clients path created earlier
  content = content.replace(/assets\/images\/normalized\/clients.webp\//g, 'assets/images/clients/');
  content = content.replace(/assets\/images\/normalized\/clients.webp/g, 'assets/images/clients');
  // Generic: remove any accidental repeated 'assets/images/' sequences
  content = content.replace(/(assets\/images\/){2,}/g, 'assets/images/');
  fs.writeFileSync(p, content, 'utf8');
  console.log('Fixed:', file);
});
