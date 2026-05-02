// Batch normalize and optimize images in assets/images/
// Usage: node optimize-images.js [--rewrite-html]

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const OUT_DIR = path.join(IMAGES_DIR, 'normalized');

function normalizeName(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/\(+|\)+/g, '')
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .toLowerCase();
}

async function ensureOut() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const normalized = normalizeName(name) + '.webp';
  const src = path.join(IMAGES_DIR, file);
  const dest = path.join(OUT_DIR, normalized);

  try {
    await sharp(src)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toFile(dest);
    console.log('Optimized:', file, '->', path.relative(process.cwd(), dest));
  } catch (err) {
    console.warn('Skipping (not an image or failed):', file, err.message);
  }
}

async function rewriteHtml(map) {
  const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(full));
      } else if (file.endsWith('.html')) {
        results.push(full);
      }
    });
    return results;
  };

  const htmlFiles = walk(path.join(__dirname, '..'));
  htmlFiles.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    Object.keys(map).forEach((orig) => {
      const normalized = map[orig].replace(/\\\\/g, '/');
      // Replace src="assets/images/<orig>" and src="./assets/images/<orig>"
      const esc = orig.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const re = new RegExp('(src=\\\"(?:\\./)?assets/images/)'+esc+'(\\\")','g');
      content = content.replace(re, `$1${normalized}$2`);
      // Replace occurrences in meta/content attributes and JSON-LD
      const re2 = new RegExp('((?:content|logo|image)\\s*[:=]\\s*\\")(?:https?:\\/\\/[^\"]*|(?:\\./)?assets/images/)'+esc+'(\\")','g');
      content = content.replace(re2, (m,p1,p2) => {
        return p1 + normalized + p2;
      });
      // Also replace plain assets/images/orig occurrences
      const re3 = new RegExp('(?:assets/images/)'+esc,'g');
      content = content.replace(re3, `assets/images/normalized/${path.basename(map[orig])}`);
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Rewrote:', path.relative(process.cwd(), file));
  });
}

async function main() {
  await ensureOut();
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f !== 'normalized' && !f.startsWith('.'));
  const map = {};
  for (const file of files) {
    const normalizedName = normalizeName(path.basename(file, path.extname(file))) + '.webp';
    const dest = path.join(OUT_DIR, normalizedName);
    await processImage(file);
    map[file] = path.join('assets','images','normalized', normalizedName);
  }

  console.log('\nDone.');
  console.log('Normalized images are in:', path.relative(process.cwd(), OUT_DIR));

  if (process.argv.includes('--rewrite-html')) {
    console.log('\nRewriting HTML to reference normalized images...');
    await rewriteHtml(map);
    console.log('HTML rewrite complete.');
  } else {
    console.log('To update HTML to use normalized images, run with --rewrite-html');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
