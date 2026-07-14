const { Country, State } = require('country-state-city');

const africanCountries = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic",
  "Chad", "Comoros", "Congo", "Democratic Republic of the Congo", "Côte d'Ivoire", "Djibouti", "Egypt", "Equatorial Guinea",
  "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia",
  "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger",
  "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
  "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

// Let's get all countries from the library
const allCountries = Country.getAllCountries();

let africaList = [];
let subdivisions = {};

for (const name of africanCountries) {
  // Find country
  let c = allCountries.find(x => x.name.toLowerCase() === name.toLowerCase());
  
  if (!c) {
    // try partial match
    c = allCountries.find(x => x.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (c) {
    africaList.push(c.name);
    const states = State.getStatesOfCountry(c.isoCode);
    let opts = states.map(s => s.name);
    // some might have no states
    subdivisions[c.name] = {
      label: "State/Region",
      placeholder: "Select State/Region",
      options: opts.length > 0 ? opts : undefined
    };
  } else {
    africaList.push(name);
    subdivisions[name] = {
      label: "State/Region",
      placeholder: "Select State/Region"
    };
  }
}

// Add Other African Country
africaList.push("Other African Country");

console.log(JSON.stringify({ africaList, subdivisions }, null, 2));
