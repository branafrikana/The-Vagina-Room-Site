const fs = require('fs');
const data = JSON.parse(fs.readFileSync('africa_data.json', 'utf8'));
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

const oldAfricaRegex = /"Africa": \[.*?\]/s;
const newAfricaArray = `"Africa": ${JSON.stringify(data.africaList)}`;
content = content.replace(oldAfricaRegex, newAfricaArray);

const match = content.match(/const SUBDIVISIONS: Record<string, \{ label: string; placeholder: string; options\?: string\[\] \}> = (\{[\s\S]*?\}\n*?);/);
if (!match) {
  console.log("Could not find SUBDIVISIONS!");
  process.exit(1);
}

let injectedKeys = '';
for (const [country, config] of Object.entries(data.subdivisions)) {
  injectedKeys += `  ${JSON.stringify(country)}: ${JSON.stringify(config, null, 2).replace(/\n/g, '\n  ')},\n`;
}

const openingBraceIndex = content.indexOf('{', match.index);
const newContent = content.substring(0, openingBraceIndex + 1) + '\n' + injectedKeys + content.substring(openingBraceIndex + 1);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', newContent);
console.log("Patched successfully again.");
