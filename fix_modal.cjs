const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  '{isModalOpen && (\n          <>\n            <motion.div',
  '{isModalOpen && (\n          <React.Fragment key="modal-fragment">\n            <motion.div'
);

content = content.replace(
  '            </motion.div>\n          </>\n        )}',
  '            </motion.div>\n          </React.Fragment>\n        )}'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed modal fragment!');
