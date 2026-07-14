const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

content = content.replace(
  'const handleNextStep = () => {',
  'const handleNextStep = (e?: React.FormEvent) => {\n    if (e) e.preventDefault();'
);

content = content.replace(
  '              step === 1 ? (\n                <div className="space-y-4">',
  '              step === 1 ? (\n                <form onSubmit={handleNextStep} className="space-y-4">'
);

content = content.replace(
  '                  <button\n                    type="button"\n                    onClick={handleNextStep}',
  '                  <button\n                    type="submit"\n                    onClick={handleNextStep}'
);

content = content.replace(
  '                    Continue to Location <ArrowRight size={16} />\n                  </button>\n                </div>\n              ) : (',
  '                    Continue to Location <ArrowRight size={16} />\n                  </button>\n                </form>\n              ) : ('
);

fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
console.log('Fixed step 1 form!');
