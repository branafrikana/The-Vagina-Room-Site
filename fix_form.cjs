const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  '              {step === 1 ? (\n                <div className="space-y-4">',
  '              {step === 1 ? (\n                <form onSubmit={handleNextStep} className="space-y-4">'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed form tags!');
