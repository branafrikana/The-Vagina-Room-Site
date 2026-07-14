const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  'const SUBDIVISIONS: Record<string, {\n  "Algeria"',
  'const SUBDIVISIONS: Record<string, { label: string; placeholder: string; options?: string[] }> = {\n  "Algeria"'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed syntax 2!');
