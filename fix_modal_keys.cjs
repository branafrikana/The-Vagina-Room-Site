const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  '          <React.Fragment key="modal-fragment">\n            <motion.div\n              initial={{ opacity: 0 }}',
  '          <React.Fragment key="modal-fragment">\n            <motion.div\n              key="modal-overlay"\n              initial={{ opacity: 0 }}'
);

content = content.replace(
  '            <motion.div\n              initial={{ opacity: 0, scale: 0.95, y: 20 }}',
  '            <motion.div\n              key="modal-content"\n              initial={{ opacity: 0, scale: 0.95, y: 20 }}'
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed modal keys!');
