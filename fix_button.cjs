const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  '                  <button\n                    type="submit"\n                    onClick={handleNextStep}',
  '                  <button\n                    type="submit"'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed button!');
