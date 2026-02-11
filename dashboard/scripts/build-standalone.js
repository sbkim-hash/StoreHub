/**
 * Market-Landscape-Dashboard.html 을 단일 파일(서버 불필요) 형태로 dist 에 복사합니다.
 * 브라우저에서 file:// 로 바로 열 수 있습니다.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'Market-Landscape-Dashboard.html');
const distDir = path.join(root, 'dist');
const out = path.join(distDir, 'Market-Landscape-Dashboard.html');

if (!fs.existsSync(src)) {
  console.error('Source not found:', src);
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.copyFileSync(src, out);
console.log('Standalone build OK:', path.relative(root, out));
console.log('→ 브라우저에서 파일을 열면 서버 없이 실행됩니다 (file://).');
