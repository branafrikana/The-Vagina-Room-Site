const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

// The injected keys are between `const SUBDIVISIONS: Record<string, {` and `label: string;`
const startIdx = content.indexOf('const SUBDIVISIONS: Record<string, {\n  "Algeria"');
const endIdx = content.indexOf('  label: string; placeholder: string; options?: string[] }> = {\n');
if (startIdx !== -1 && endIdx !== -1) {
  // Extract injected keys
  const injected = content.substring(startIdx + 'const SUBDIVISIONS: Record<string, {'.length, endIdx);
  // Restore the type definition
  content = content.substring(0, startIdx + 'const SUBDIVISIONS: Record<string, {'.length) + content.substring(endIdx);
  // Now find the object literal opening brace which is after `}> = {`
  const objectBraceIdx = content.indexOf('}> = {\n', startIdx) + '}> = {'.length;
  // Inject keys after it
  content = content.substring(0, objectBraceIdx + 1) + injected + content.substring(objectBraceIdx + 1);
  fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
  console.log('Fixed syntax!');
} else {
  console.log('Could not find boundaries.');
}

