const fs = require('fs');
let content = fs.readFileSync('src/pages/WhatsAppCommunityPage.tsx', 'utf8');

// I want to replace everything from "const SUBDIVISIONS" up to "};" before "export default function"
// with a clean SUBDIVISIONS that contains both my Africa data and the existing countries.

const africaData = JSON.parse(fs.readFileSync('africa_data.json', 'utf8')).subdivisions;

const existingSubdivisions = {
  "Nigeria": {
    label: "State",
    placeholder: "Select State",
    options: [
      "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ]
  },
  "Kenya": {
    label: "County",
    placeholder: "Select County",
    options: [
      "Nairobi", "Mombasa", "Kiambu", "Nakuru", "Kisumu", "Uasin Gishu", "Machakos", "Kajiado", "Nyeri", "Makueni", "Kilifi", "Kakamega", "Other County"
    ]
  },
  "Ghana": {
    label: "Region",
    placeholder: "Select Region",
    options: [
      "Greater Accra", "Ashanti", "Western", "Eastern", "Central", "Volta", "Northern", "Brong-Ahafo", "Upper East", "Upper West", "Other Region"
    ]
  },
  "South Africa": {
    label: "Province",
    placeholder: "Select Province",
    options: [
      "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape"
    ]
  },
  "United States": {
    label: "State",
    placeholder: "Select State",
    options: [
      "California", "Texas", "New York", "Florida", "Illinois", "Georgia", "North Carolina", "Pennsylvania", "Ohio", "Michigan", "Other State"
    ]
  },
  "Canada": {
    label: "Province",
    placeholder: "Select Province",
    options: [
      "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Other Province"
    ]
  },
  "United Kingdom": {
    label: "Country/Region",
    placeholder: "Select Country/Region",
    options: ["England", "Scotland", "Wales", "Northern Ireland", "Other Region"]
  }
};

const merged = { ...africaData, ...existingSubdivisions };

const newSubString = `const SUBDIVISIONS: Record<string, { label: string; placeholder: string; options?: string[] }> = ${JSON.stringify(merged, null, 2)};`;

const subStartIdx = content.indexOf('const SUBDIVISIONS');
const exportIdx = content.indexOf('export default function WhatsAppCommunityPage()');
if (subStartIdx !== -1 && exportIdx !== -1) {
  content = content.substring(0, subStartIdx) + newSubString + '\n\n' + content.substring(exportIdx);
  fs.writeFileSync('src/pages/WhatsAppCommunityPage.tsx', content);
  console.log('Fixed syntax 3!');
} else {
  console.log('Could not find indices');
}
