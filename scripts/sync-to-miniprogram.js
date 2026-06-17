#!/usr/bin/env node
/**
 * Sync shared code from Next.js (Web) to Taro (Mini Program)
 * Run: node scripts/sync-to-miniprogram.js
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const WEB_LIB = path.join(PROJECT_ROOT, 'lib');
const MINIPROGRAM_SRC = path.join(PROJECT_ROOT, 'miniprogram', 'src');
const MINIPROGRAM_LIB = path.join(MINIPROGRAM_SRC, 'lib');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created: ${dir}`);
  }
}

function copyFile(src, dest) {
  try {
    const content = fs.readFileSync(src, 'utf-8');
    ensureDir(path.dirname(dest));
    fs.writeFileSync(dest, content, 'utf-8');
    console.log(`✅ Copied: ${path.relative(PROJECT_ROOT, src)} → ${path.relative(PROJECT_ROOT, dest)}`);
  } catch (err) {
    console.error(`❌ Failed to copy ${src}:`, err.message);
  }
}

function transformTsForTaro(content) {
  // Remove Next.js specific imports/exports
  // Keep only the core logic that works in both environments
  return content
    .replace(/^import .* from ['"]next\/.*['"];?\n?/gm, '')
    .replace(/^export.*Metadata.*/gm, '')
    .replace(/^export.*Viewport.*/gm, '')
    .replace(/['"]use client['"];?\n?/gm, '');
}

// Files to sync: core logic only (no React components)
const filesToSync = [
  {
    src: path.join(WEB_LIB, 'calculator.ts'),
    dest: path.join(MINIPROGRAM_LIB, 'calculator.ts'),
    transform: false,
  },
  {
    src: path.join(WEB_LIB, 'site-config.ts'),
    dest: path.join(MINIPROGRAM_LIB, 'site-config.ts'),
    transform: false,
  },
  {
    src: path.join(WEB_LIB, 'utils.ts'),
    dest: path.join(MINIPROGRAM_LIB, 'utils.ts'),
    transform: false,
  },
];

console.log('🔄 Syncing shared code to Mini Program...\n');

filesToSync.forEach(({ src, dest, transform }) => {
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf-8');
    if (transform) {
      content = transformTsForTaro(content);
    }
    ensureDir(path.dirname(dest));
    fs.writeFileSync(dest, content, 'utf-8');
    console.log(`✅ ${path.relative(PROJECT_ROOT, src)}`);
  } else {
    console.warn(`⚠️  Source not found: ${src}`);
  }
});

// Create Mini Program specific exports
const miniprogramIndex = `// Mini Program shared exports
export * from './calculator';
export * from './site-config';
export * from './utils';
`;

ensureDir(MINIPROGRAM_LIB);
fs.writeFileSync(path.join(MINIPROGRAM_LIB, 'index.ts'), miniprogramIndex);
console.log(`✅ Created: miniprogram/src/lib/index.ts`);

console.log('\n✨ Sync complete!');
console.log('📝 Next steps:');
console.log('   1. cd miniprogram && npm install');
console.log('   2. npm run dev  (in miniprogram dir)');
console.log('   3. Open 微信开发者工具 → 导入 miniprogram/dist 目录');