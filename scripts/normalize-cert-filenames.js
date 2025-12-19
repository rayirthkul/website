#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images', 'education', 'Certifications');
if (!fs.existsSync(dir)) {
  console.error('Certifications directory not found:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f !== 'thumbnails');
let renamed = 0;
for (const f of files) {
  if (f.includes(':')) {
    const newName = f.replace(/:/g, '-');
    const from = path.join(dir, f);
    const to = path.join(dir, newName);
    if (fs.existsSync(to)) {
      console.warn('Target already exists, skipping:', to);
      continue;
    }
    fs.renameSync(from, to);
    console.log(`Renamed: ${f} -> ${newName}`);
    renamed++;
  }
}

console.log(`Done. Renamed ${renamed} files.`);
