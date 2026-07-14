const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  '{isModalOpen && (\n          <React.Fragment key="modal-fragment">\n            <motion.div\n              key="modal-overlay"',
  '{isModalOpen && (\n            <motion.div\n              key="modal-overlay"'
);

content = content.replace(
  '              onClick={() => !isSubmitting && setIsModalOpen(false)}\n            />\n            <motion.div\n              key="modal-content"',
  '              onClick={() => !isSubmitting && setIsModalOpen(false)}\n            />\n        )}\n        {isModalOpen && (\n            <motion.div\n              key="modal-content"'
);

content = content.replace(
  '            </motion.div>\n          </React.Fragment>\n        )}',
  '            </motion.div>\n        )}'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed modal structure!');
