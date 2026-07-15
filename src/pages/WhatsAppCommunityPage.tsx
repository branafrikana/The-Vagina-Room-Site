import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Sparkles, Heart, Shield, Users, Star, ArrowRight, ArrowLeft, MapPin,
  BookOpen, Brain, Activity, Flower2, HandHeart, CheckCircle2,
  Baby, Droplets, Smile, MessageCircleHeart
} from "lucide-react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import { SearchableDropdown } from "../components/SearchableDropdown";
import { safeJsonParse } from "../lib/json";
import { getCountryInfo } from "../lib/countryData";

// Sample Data for Bento Grid Showcase
const topics = [
  { icon: Flower2, title: "Fertility & Reproductive", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: BookOpen, title: "Women's Health Education", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Droplets, title: "Menstrual & Cycle Awareness", color: "text-red-400", bg: "bg-red-500/10" },
  { icon: Activity, title: "Hormonal Health", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Baby, title: "Pregnancy Preparation", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Smile, title: "Vaginal Health & Hygiene", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Brain, title: "Emotional Healing", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { icon: Heart, title: "Sexual Health Education", color: "text-brand-gold", bg: "bg-brand-gold/10" },
  { icon: HandHeart, title: "Intimate Self-Care", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: MessageCircleHeart, title: "Relationship Wellness", color: "text-rose-300", bg: "bg-rose-500/10" },
  { icon: Sparkles, title: "Holistic Solutions", color: "text-teal-400", bg: "bg-teal-500/10" },
  { icon: Users, title: "Personal Growth", color: "text-brand-gold", bg: "bg-brand-gold/10" },
];

const CONTINENT_COUNTRIES: Record<string, string[]> = {
  "Africa": ["Nigeria","Ghana","Kenya","South Africa","The Gambia","Tanzania","Uganda","Zambia","Zimbabwe","Botswana","Liberia","Sierra Leone","Algeria","Angola","Benin","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Congo","Democratic Republic of the Congo","Côte d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Guinea","Guinea-Bissau","Lesotho","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Somalia","South Sudan","Sudan","Togo","Tunisia"],
  "North America": ["United States", "Canada", "Jamaica", "Trinidad and Tobago", "Other North American Country"],
  "Europe": ["United Kingdom", "Germany", "France", "Netherlands", "Ireland", "Italy", "Spain", "Other European Country"],
  "South America": ["Brazil", "Colombia", "Argentina", "Other South American Country"],
  "Asia": ["India", "United Arab Emirates", "Saudi Arabia", "Singapore", "Japan", "Other Asian Country"],
  "Oceania": ["Australia", "New Zealand", "Other Oceanian Country"]
};

const SUBDIVISIONS: Record<string, { label: string; placeholder: string; options?: string[] }> = {
  "Algeria": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Adrar",
      "Algiers",
      "Annaba",
      "Aïn Defla",
      "Aïn Témouchent",
      "Batna",
      "Biskra",
      "Blida",
      "Bordj Baji Mokhtar",
      "Bordj Bou Arréridj",
      "Boumerdès",
      "Bouïra",
      "Béchar",
      "Béjaïa",
      "Béni Abbès",
      "Chlef",
      "Constantine",
      "Djanet",
      "Djelfa",
      "El Bayadh",
      "El M'ghair",
      "El Menia",
      "El Oued",
      "El Tarf",
      "Ghardaïa",
      "Guelma",
      "Illizi",
      "In Guezzam",
      "In Salah",
      "Jijel",
      "Khenchela",
      "Laghouat",
      "M'Sila",
      "Mascara",
      "Mila",
      "Mostaganem",
      "Médéa",
      "Naama",
      "Oran",
      "Ouargla",
      "Ouled Djellal",
      "Oum El Bouaghi",
      "Relizane",
      "Saïda",
      "Sidi Bel Abbès",
      "Skikda",
      "Souk Ahras",
      "Sétif",
      "Tamanghasset",
      "Tiaret",
      "Timimoun",
      "Tindouf",
      "Tipasa",
      "Tissemsilt",
      "Tizi Ouzou",
      "Tlemcen",
      "Touggourt",
      "Tébessa"
    ]
  },
  "Angola": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bengo Province",
      "Benguela Province",
      "Bié Province",
      "Cabinda Province",
      "Cuando Cubango Province",
      "Cuanza Norte Province",
      "Cuanza Sul",
      "Cunene Province",
      "Huambo Province",
      "Huíla Province",
      "Luanda Province",
      "Lunda Norte Province",
      "Lunda Sul Province",
      "Malanje Province",
      "Moxico Province",
      "Uíge Province",
      "Zaire Province"
    ]
  },
  "Benin": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Alibori Department",
      "Atakora Department",
      "Atlantique Department",
      "Borgou Department",
      "Collines Department",
      "Donga Department",
      "Kouffo Department",
      "Littoral Department",
      "Mono Department",
      "Ouémé Department",
      "Plateau Department",
      "Zou Department"
    ]
  },
  "Botswana": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Central District",
      "Ghanzi District",
      "Kgalagadi District",
      "Kgatleng District",
      "Kweneng District",
      "Ngamiland",
      "North-East District",
      "North-West District",
      "South-East District",
      "Southern District"
    ]
  },
  "Burkina Faso": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Balé Province",
      "Bam Province",
      "Banwa Province",
      "Bazèga Province",
      "Boucle du Mouhoun Region",
      "Bougouriba Province",
      "Boulgou",
      "Cascades Region",
      "Centre",
      "Centre-Est Region",
      "Centre-Nord Region",
      "Centre-Ouest Region",
      "Centre-Sud Region",
      "Comoé Province",
      "Est Region",
      "Ganzourgou Province",
      "Gnagna Province",
      "Gourma Province",
      "Hauts-Bassins Region",
      "Houet Province",
      "Ioba Province",
      "Kadiogo Province",
      "Komondjari Province",
      "Kompienga Province",
      "Kossi Province",
      "Koulpélogo Province",
      "Kouritenga Province",
      "Kourwéogo Province",
      "Kénédougou Province",
      "Loroum Province",
      "Léraba Province",
      "Mouhoun",
      "Nahouri Province",
      "Namentenga Province",
      "Nayala Province",
      "Nord Region, Burkina Faso",
      "Noumbiel Province",
      "Oubritenga Province",
      "Oudalan Province",
      "Passoré Province",
      "Plateau-Central Region",
      "Poni Province",
      "Sahel Region",
      "Sanguié Province",
      "Sanmatenga Province",
      "Sissili Province",
      "Soum Province",
      "Sourou Province",
      "Sud-Ouest Region",
      "Séno Province",
      "Tapoa Province",
      "Tuy Province",
      "Yagha Province",
      "Yatenga Province",
      "Ziro Province",
      "Zondoma Province",
      "Zoundwéogo Province"
    ]
  },
  "Burundi": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bubanza Province",
      "Bujumbura Mairie Province",
      "Bujumbura Rural Province",
      "Bururi Province",
      "Cankuzo Province",
      "Cibitoke Province",
      "Gitega Province",
      "Karuzi Province",
      "Kayanza Province",
      "Kirundo Province",
      "Makamba Province",
      "Muramvya Province",
      "Muyinga Province",
      "Mwaro Province",
      "Ngozi Province",
      "Rumonge Province",
      "Rutana Province",
      "Ruyigi Province"
    ]
  },
  "Cabo Verde": {
    "label": "State/Region",
    "placeholder": "Select State/Region"
  },
  "Cameroon": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Adamawa",
      "Centre",
      "East",
      "Far North",
      "Littoral",
      "North",
      "Northwest",
      "South",
      "Southwest",
      "West"
    ]
  },
  "Central African Republic": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bamingui-Bangoran Prefecture",
      "Bangui",
      "Basse-Kotto Prefecture",
      "Haut-Mbomou Prefecture",
      "Haute-Kotto Prefecture",
      "Kémo Prefecture",
      "Lobaye Prefecture",
      "Mambéré-Kadéï",
      "Mbomou Prefecture",
      "Nana-Grébizi Economic Prefecture",
      "Nana-Mambéré Prefecture",
      "Ombella-M'Poko Prefecture",
      "Ouaka Prefecture",
      "Ouham Prefecture",
      "Ouham-Pendé Prefecture",
      "Sangha-Mbaéré",
      "Vakaga Prefecture"
    ]
  },
  "Chad": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bahr el Gazel",
      "Batha Region",
      "Borkou",
      "Ennedi Region",
      "Ennedi-Est",
      "Ennedi-Ouest",
      "Guéra Region",
      "Hadjer-Lamis",
      "Kanem Region",
      "Lac Region",
      "Logone Occidental Region",
      "Logone Oriental Region",
      "Mandoul Region",
      "Mayo-Kebbi Est Region",
      "Mayo-Kebbi Ouest Region",
      "Moyen-Chari Region",
      "N'Djamena",
      "Ouaddaï Region",
      "Salamat Region",
      "Sila Region",
      "Tandjilé Region",
      "Tibesti Region",
      "Wadi Fira Region"
    ]
  },
  "Comoros": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Anjouan",
      "Grande Comore",
      "Mohéli"
    ]
  },
  "Congo": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bouenza Department",
      "Brazzaville",
      "Cuvette Department",
      "Cuvette-Ouest Department",
      "Kouilou Department",
      "Likouala Department",
      "Lékoumou Department",
      "Niari Department",
      "Plateaux Department",
      "Pointe-Noire",
      "Pool Department",
      "Sangha Department"
    ]
  },
  "Democratic Republic of the Congo": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bas-Uélé",
      "Haut-Katanga",
      "Haut-Lomami",
      "Haut-Uélé",
      "Ituri",
      "Kasaï",
      "Kasaï Central",
      "Kasaï Oriental",
      "Kinshasa",
      "Kongo Central",
      "Kwango",
      "Kwilu",
      "Lomami",
      "Lualaba",
      "Mai-Ndombe",
      "Maniema",
      "Mongala",
      "Nord-Kivu",
      "Nord-Ubangi",
      "Sankuru",
      "Sud-Kivu",
      "Sud-Ubangi",
      "Tanganyika",
      "Tshopo",
      "Tshuapa",
      "Équateur"
    ]
  },
  "Côte d'Ivoire": {
    "label": "State/Region",
    "placeholder": "Select State/Region"
  },
  "Djibouti": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Ali Sabieh Region",
      "Arta Region",
      "Dikhil Region",
      "Djibouti",
      "Obock Region",
      "Tadjourah Region"
    ]
  },
  "Egypt": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Alexandria",
      "Aswan",
      "Asyut",
      "Beheira",
      "Beni Suef",
      "Cairo",
      "Dakahlia",
      "Damietta",
      "Faiyum",
      "Gharbia",
      "Giza",
      "Ismailia",
      "Kafr el-Sheikh",
      "Luxor",
      "Matrouh",
      "Minya",
      "Monufia",
      "New Valley",
      "North Sinai",
      "Port Said",
      "Qalyubia",
      "Qena",
      "Red Sea",
      "Sharqia",
      "Sohag",
      "South Sinai",
      "Suez"
    ]
  },
  "Equatorial Guinea": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Annobón Province",
      "Bioko Norte Province",
      "Bioko Sur Province",
      "Centro Sur Province",
      "Insular Region",
      "Kié-Ntem Province",
      "Litoral Province",
      "Río Muni",
      "Wele-Nzas Province"
    ]
  },
  "Eritrea": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Anseba Region",
      "Debub Region",
      "Gash-Barka Region",
      "Maekel Region",
      "Northern Red Sea Region",
      "Southern Red Sea Region"
    ]
  },
  "Eswatini": {
    "label": "State/Region",
    "placeholder": "Select State/Region"
  },
  "Ethiopia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Addis Ababa",
      "Afar Region",
      "Amhara Region",
      "Benishangul-Gumuz Region",
      "Dire Dawa",
      "Gambela Region",
      "Harari Region",
      "Oromia Region",
      "Somali Region",
      "Southern Nations, Nationalities, and Peoples' Region",
      "Tigray Region"
    ]
  },
  "Gabon": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Estuaire Province",
      "Haut-Ogooué Province",
      "Moyen-Ogooué Province",
      "Ngounié Province",
      "Nyanga Province",
      "Ogooué-Ivindo Province",
      "Ogooué-Lolo Province",
      "Ogooué-Maritime Province",
      "Woleu-Ntem Province"
    ]
  },
  "The Gambia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Banjul",
      "Central River Division",
      "Lower River Division",
      "North Bank Division",
      "Upper River Division",
      "West Coast Division"
    ]
  },
  "Ghana": {
    "label": "Region",
    "placeholder": "Select Region",
    "options": [
      "Greater Accra",
      "Ashanti",
      "Western",
      "Eastern",
      "Central",
      "Volta",
      "Northern",
      "Brong-Ahafo",
      "Upper East",
      "Upper West",
      "Other Region"
    ]
  },
  "Guinea": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Beyla Prefecture",
      "Boffa Prefecture",
      "Boké Prefecture",
      "Boké Region",
      "Conakry",
      "Coyah Prefecture",
      "Dabola Prefecture",
      "Dalaba Prefecture",
      "Dinguiraye Prefecture",
      "Dubréka Prefecture",
      "Faranah Prefecture",
      "Forécariah Prefecture",
      "Fria Prefecture",
      "Gaoual Prefecture",
      "Guéckédou Prefecture",
      "Kankan Prefecture",
      "Kankan Region",
      "Kindia Prefecture",
      "Kindia Region",
      "Kissidougou Prefecture",
      "Koubia Prefecture",
      "Koundara Prefecture",
      "Kouroussa Prefecture",
      "Kérouané Prefecture",
      "Labé Prefecture",
      "Labé Region",
      "Lola Prefecture",
      "Lélouma Prefecture",
      "Macenta Prefecture",
      "Mali Prefecture",
      "Mamou Prefecture",
      "Mamou Region",
      "Mandiana Prefecture",
      "Nzérékoré Prefecture",
      "Nzérékoré Region",
      "Pita Prefecture",
      "Siguiri Prefecture",
      "Tougué Prefecture",
      "Télimélé Prefecture",
      "Yomou Prefecture"
    ]
  },
  "Guinea-Bissau": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bafatá",
      "Biombo Region",
      "Bolama Region",
      "Cacheu Region",
      "Gabú Region",
      "Leste Province",
      "Norte Province",
      "Oio Region",
      "Quinara Region",
      "Sul Province",
      "Tombali Region"
    ]
  },
  "Kenya": {
    "label": "County",
    "placeholder": "Select County",
    "options": [
      "Nairobi",
      "Mombasa",
      "Kiambu",
      "Nakuru",
      "Kisumu",
      "Uasin Gishu",
      "Machakos",
      "Kajiado",
      "Nyeri",
      "Makueni",
      "Kilifi",
      "Kakamega",
      "Other County"
    ]
  },
  "Lesotho": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Berea District",
      "Butha-Buthe District",
      "Leribe District",
      "Mafeteng District",
      "Maseru District",
      "Mohale's Hoek District",
      "Mokhotlong District",
      "Qacha's Nek District",
      "Quthing District",
      "Thaba-Tseka District"
    ]
  },
  "Liberia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bomi County",
      "Bong County",
      "Gbarpolu County",
      "Grand Bassa County",
      "Grand Cape Mount County",
      "Grand Gedeh County",
      "Grand Kru County",
      "Lofa County",
      "Margibi County",
      "Maryland County",
      "Montserrado County",
      "Nimba",
      "River Cess County",
      "River Gee County",
      "Sinoe County"
    ]
  },
  "Libya": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Al Wahat District",
      "Benghazi",
      "Derna District",
      "Ghat District",
      "Jabal al Akhdar",
      "Jabal al Gharbi District",
      "Jafara",
      "Jufra",
      "Kufra District",
      "Marj District",
      "Misrata District",
      "Murqub",
      "Murzuq District",
      "Nalut District",
      "Nuqat al Khams",
      "Sabha District",
      "Sirte District",
      "Tripoli District",
      "Wadi al Hayaa District",
      "Wadi al Shatii District",
      "Zawiya District"
    ]
  },
  "Madagascar": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Antananarivo Province",
      "Antsiranana Province",
      "Fianarantsoa Province",
      "Mahajanga Province",
      "Toamasina Province",
      "Toliara Province"
    ]
  },
  "Malawi": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Balaka District",
      "Blantyre District",
      "Central Region",
      "Chikwawa District",
      "Chiradzulu District",
      "Chitipa district",
      "Dedza District",
      "Dowa District",
      "Karonga District",
      "Kasungu District",
      "Likoma District",
      "Lilongwe District",
      "Machinga District",
      "Mangochi District",
      "Mchinji District",
      "Mulanje District",
      "Mwanza District",
      "Mzimba District",
      "Nkhata Bay District",
      "Nkhotakota District",
      "Northern Region",
      "Nsanje District",
      "Ntcheu District",
      "Ntchisi District",
      "Phalombe District",
      "Rumphi District",
      "Salima District",
      "Southern Region",
      "Thyolo District",
      "Zomba District"
    ]
  },
  "Mali": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bamako",
      "Gao Region",
      "Kayes Region",
      "Kidal Region",
      "Koulikoro Region",
      "Mopti Region",
      "Ménaka Region",
      "Sikasso Region",
      "Ségou Region",
      "Taoudénit Region",
      "Tombouctou Region"
    ]
  },
  "Mauritania": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Adrar Region",
      "Assaba Region",
      "Brakna Region",
      "Dakhlet Nouadhibou",
      "Gorgol Region",
      "Guidimaka Region",
      "Hodh Ech Chargui Region",
      "Hodh El Gharbi Region",
      "Inchiri Region",
      "Nouakchott-Nord Region",
      "Nouakchott-Ouest Region",
      "Nouakchott-Sud Region",
      "Tagant Region",
      "Tiris Zemmour Region",
      "Trarza Region"
    ]
  },
  "Mauritius": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Agaléga",
      "Beau Bassin-Rose Hill",
      "Cargados Carajos",
      "Curepipe",
      "Flacq District",
      "Grand Port District",
      "Moka District",
      "Pamplemousses District",
      "Plaines Wilhems District",
      "Port Louis",
      "Port Louis District",
      "Quatre Bornes",
      "Rivière Noire District",
      "Rivière du Rempart District",
      "Rodrigues",
      "Savanne District",
      "Vacoas-Phoenix"
    ]
  },
  "Morocco": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Agadir-Ida-Ou-Tanane",
      "Al Haouz",
      "Al Hoceïma",
      "Aousserd (EH)",
      "Assa-Zag (EH-partial)",
      "Azilal",
      "Benslimane",
      "Berkane",
      "Berrechid",
      "Boujdour (EH)",
      "Boulemane",
      "Béni Mellal",
      "Béni Mellal-Khénifra",
      "Casablanca",
      "Casablanca-Settat",
      "Chefchaouen",
      "Chichaoua",
      "Chtouka-Ait Baha",
      "Dakhla-Oued Ed-Dahab (EH)",
      "Driouch",
      "Drâa-Tafilalet",
      "El Hajeb",
      "El Jadida",
      "El Kelâa des Sraghna",
      "Errachidia",
      "Es-Semara (EH-partial)",
      "Essaouira",
      "Fahs-Anjra",
      "Figuig",
      "Fquih Ben Salah",
      "Fès",
      "Fès-Meknès",
      "Guelmim",
      "Guelmim-Oued Noun (EH-partial)",
      "Guercif",
      "Ifrane",
      "Inezgane-Ait Melloul",
      "Jerada",
      "Khouribga",
      "Khémisset",
      "Khénifra",
      "Kénitra",
      "L'Oriental",
      "Larache",
      "Laâyoune (EH)",
      "Laâyoune-Sakia El Hamra (EH-partial)",
      "Marrakech",
      "Marrakesh-Safi",
      "Meknès",
      "Midelt",
      "Mohammadia",
      "Moulay Yacoub",
      "Médiouna",
      "M’diq-Fnideq",
      "Nador",
      "Nouaceur",
      "Ouarzazate",
      "Oued Ed-Dahab (EH)",
      "Ouezzane",
      "Oujda-Angad",
      "Rabat",
      "Rabat-Salé-Kénitra",
      "Rehamna",
      "Safi",
      "Salé",
      "Sefrou",
      "Settat",
      "Sidi Bennour",
      "Sidi Ifni",
      "Sidi Kacem",
      "Sidi Slimane",
      "Skhirate-Témara",
      "Souss-Massa",
      "Tan-Tan (EH-partial)",
      "Tanger-Assilah",
      "Tanger-Tétouan-Al Hoceïma",
      "Taounate",
      "Taourirt",
      "Tarfaya (EH-partial)",
      "Taroudannt",
      "Tata",
      "Taza",
      "Tinghir",
      "Tiznit",
      "Tétouan",
      "Youssoufia",
      "Zagora"
    ]
  },
  "Mozambique": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Cabo Delgado Province",
      "Gaza Province",
      "Inhambane Province",
      "Manica Province",
      "Maputo",
      "Maputo Province",
      "Nampula Province",
      "Niassa Province",
      "Sofala Province",
      "Tete Province",
      "Zambezia Province"
    ]
  },
  "Namibia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Erongo Region",
      "Hardap Region",
      "Karas Region",
      "Kavango East Region",
      "Kavango West Region",
      "Khomas Region",
      "Kunene Region",
      "Ohangwena Region",
      "Omaheke Region",
      "Omusati Region",
      "Oshana Region",
      "Oshikoto Region",
      "Otjozondjupa Region",
      "Zambezi Region"
    ]
  },
  "Niger": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Agadez Region",
      "Diffa Region",
      "Dosso Region",
      "Maradi Region",
      "Tahoua Region",
      "Tillabéri Region",
      "Zinder Region"
    ]
  },
  "Nigeria": {
    "label": "State",
    "placeholder": "Select State",
    "options": [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT - Abuja",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara"
    ]
  },
  "Rwanda": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Eastern Province",
      "Kigali district",
      "Northern Province",
      "Southern Province",
      "Western Province"
    ]
  },
  "Sao Tome and Principe": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Príncipe Province",
      "São Tomé Province"
    ]
  },
  "Senegal": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Dakar",
      "Diourbel Region",
      "Fatick",
      "Kaffrine",
      "Kaolack",
      "Kolda",
      "Kédougou",
      "Louga",
      "Matam",
      "Saint-Louis",
      "Sédhiou",
      "Tambacounda Region",
      "Thiès Region",
      "Ziguinchor"
    ]
  },
  "Seychelles": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Anse Boileau",
      "Anse Royale",
      "Anse-aux-Pins",
      "Au Cap",
      "Baie Lazare",
      "Baie Sainte Anne",
      "Beau Vallon",
      "Bel Air",
      "Bel Ombre",
      "Cascade",
      "Glacis",
      "Grand'Anse Mahé",
      "Grand'Anse Praslin",
      "La Digue",
      "La Rivière Anglaise",
      "Les Mamelles",
      "Mont Buxton",
      "Mont Fleuri",
      "Plaisance",
      "Pointe La Rue",
      "Port Glaud",
      "Roche Caiman",
      "Saint Louis",
      "Takamaka"
    ]
  },
  "Sierra Leone": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Eastern Province",
      "Northern Province",
      "Southern Province",
      "Western Area"
    ]
  },
  "Somalia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Awdal Region",
      "Bakool",
      "Banaadir",
      "Bari",
      "Bay",
      "Galguduud",
      "Gedo",
      "Hiran",
      "Lower Juba",
      "Lower Shebelle",
      "Middle Juba",
      "Middle Shebelle",
      "Mudug",
      "Nugal",
      "Sanaag Region",
      "Togdheer Region"
    ]
  },
  "South Africa": {
    "label": "Province",
    "placeholder": "Select Province",
    "options": [
      "Gauteng",
      "Western Cape",
      "KwaZulu-Natal",
      "Eastern Cape",
      "Free State",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape"
    ]
  },
  "South Sudan": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Central Equatoria",
      "Eastern Equatoria",
      "Jonglei State",
      "Lakes",
      "Northern Bahr el Ghazal",
      "Unity",
      "Upper Nile",
      "Warrap",
      "Western Bahr el Ghazal",
      "Western Equatoria"
    ]
  },
  "Sudan": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Al Jazirah",
      "Al Qadarif",
      "Blue Nile",
      "Central Darfur",
      "East Darfur",
      "Kassala",
      "Khartoum",
      "North Darfur",
      "North Kordofan",
      "Northern",
      "Red Sea",
      "River Nile",
      "Sennar",
      "South Darfur",
      "South Kordofan",
      "West Darfur",
      "West Kordofan",
      "White Nile"
    ]
  },
  "Tanzania": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Arusha",
      "Dar es Salaam",
      "Dodoma",
      "Geita",
      "Iringa",
      "Kagera",
      "Katavi",
      "Kigoma",
      "Kilimanjaro",
      "Lindi",
      "Manyara",
      "Mara",
      "Mbeya",
      "Morogoro",
      "Mtwara",
      "Mwanza",
      "Njombe",
      "Pemba North",
      "Pemba South",
      "Pwani",
      "Rukwa",
      "Ruvuma",
      "Shinyanga",
      "Simiyu",
      "Singida",
      "Songwe",
      "Tabora",
      "Tanga",
      "Zanzibar North",
      "Zanzibar South",
      "Zanzibar West"
    ]
  },
  "Togo": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Centrale Region",
      "Kara Region",
      "Maritime",
      "Plateaux Region",
      "Savanes Region"
    ]
  },
  "Tunisia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Ariana Governorate",
      "Ben Arous Governorate",
      "Bizerte Governorate",
      "Gabès Governorate",
      "Gafsa Governorate",
      "Jendouba Governorate",
      "Kairouan Governorate",
      "Kasserine Governorate",
      "Kassrine",
      "Kebili Governorate",
      "Kef Governorate",
      "Mahdia Governorate",
      "Manouba Governorate",
      "Medenine Governorate",
      "Monastir Governorate",
      "Sfax Governorate",
      "Sidi Bouzid Governorate",
      "Siliana Governorate",
      "Sousse Governorate",
      "Tataouine Governorate",
      "Tozeur Governorate",
      "Tunis Governorate",
      "Zaghouan Governorate"
    ]
  },
  "Uganda": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Abim District",
      "Adjumani District",
      "Agago District",
      "Alebtong District",
      "Amolatar District",
      "Amudat District",
      "Amuria District",
      "Amuru District",
      "Apac District",
      "Arua District",
      "Budaka District",
      "Bududa District",
      "Bugiri District",
      "Buhweju District",
      "Buikwe District",
      "Bukedea District",
      "Bukomansimbi District",
      "Bukwo District",
      "Bulambuli District",
      "Buliisa District",
      "Bundibugyo District",
      "Bunyangabu District",
      "Bushenyi District",
      "Busia District",
      "Butaleja District",
      "Butambala District",
      "Butebo District",
      "Buvuma District",
      "Buyende District",
      "Central Region",
      "Dokolo District",
      "Eastern Region",
      "Gomba District",
      "Gulu District",
      "Ibanda District",
      "Iganga District",
      "Isingiro District",
      "Jinja District",
      "Kaabong District",
      "Kabale District",
      "Kabarole District",
      "Kaberamaido District",
      "Kagadi District",
      "Kakumiro District",
      "Kalangala District",
      "Kaliro District",
      "Kalungu District",
      "Kampala District",
      "Kamuli District",
      "Kamwenge District",
      "Kanungu District",
      "Kapchorwa District",
      "Kasese District",
      "Katakwi District",
      "Kayunga District",
      "Kibaale District",
      "Kiboga District",
      "Kibuku District",
      "Kiruhura District",
      "Kiryandongo District",
      "Kisoro District",
      "Kitgum District",
      "Koboko District",
      "Kole District",
      "Kotido District",
      "Kumi District",
      "Kween District",
      "Kyankwanzi District",
      "Kyegegwa District",
      "Kyenjojo District",
      "Kyotera District",
      "Lamwo District",
      "Lira District",
      "Luuka District",
      "Luwero District",
      "Lwengo District",
      "Lyantonde District",
      "Manafwa District",
      "Maracha District",
      "Masaka District",
      "Masindi District",
      "Mayuge District",
      "Mbale District",
      "Mbarara District",
      "Mitooma District",
      "Mityana District",
      "Moroto District",
      "Moyo District",
      "Mpigi District",
      "Mubende District",
      "Mukono District",
      "Nakapiripirit District",
      "Nakaseke District",
      "Nakasongola District",
      "Namayingo District",
      "Namisindwa District",
      "Namutumba District",
      "Napak District",
      "Nebbi District",
      "Ngora District",
      "Northern Region",
      "Ntoroko District",
      "Ntungamo District",
      "Nwoya District",
      "Omoro District",
      "Otuke District",
      "Oyam District",
      "Pader District",
      "Pakwach District",
      "Pallisa District",
      "Rakai District",
      "Rubanda District",
      "Rubirizi District",
      "Rukiga District",
      "Rukungiri District",
      "Sembabule District",
      "Serere District",
      "Sheema District",
      "Sironko District",
      "Soroti District",
      "Tororo District",
      "Wakiso District",
      "Western Region",
      "Yumbe District",
      "Zombo District"
    ]
  },
  "Zambia": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Central Province",
      "Copperbelt Province",
      "Eastern Province",
      "Luapula Province",
      "Lusaka Province",
      "Muchinga Province",
      "Northern Province",
      "Northwestern Province",
      "Southern Province",
      "Western Province"
    ]
  },
  "Zimbabwe": {
    "label": "State/Region",
    "placeholder": "Select State/Region",
    "options": [
      "Bulawayo Province",
      "Harare Province",
      "Manicaland",
      "Mashonaland Central Province",
      "Mashonaland East Province",
      "Mashonaland West Province",
      "Masvingo Province",
      "Matabeleland North Province",
      "Matabeleland South Province",
      "Midlands Province"
    ]
  },
  "United States": {
    "label": "State",
    "placeholder": "Select State",
    "options": [
      "California",
      "Texas",
      "New York",
      "Florida",
      "Illinois",
      "Georgia",
      "North Carolina",
      "Pennsylvania",
      "Ohio",
      "Michigan",
      "Other State"
    ]
  },
  "Canada": {
    "label": "Province",
    "placeholder": "Select Province",
    "options": [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
      "Other Province"
    ]
  },
  "United Kingdom": {
    "label": "Country/Region",
    "placeholder": "Select Country/Region",
    "options": [
      "England",
      "Scotland",
      "Wales",
      "Northern Ireland",
      "Other Region"
    ]
  }
};

export default function WhatsAppCommunityPage() {
  const { content, submitFormSubmission } = useContent();
  const branding = safeJsonParse(content.brandingSettingsJson, {} as any);
  let tData: any = {};
  try {
    tData = JSON.parse(content.whatsappLandingPageJson || "{}");
  } catch(e) {}

  // Use content URLs if available, otherwise fallback
  const heroBgUrl = content.whatsappHeroBgUrl || "";
  const communityImgUrl = content.whatsappCommunityImgUrl || "";
  const founderImageUrl = content.whatsappFounderImageUrl || content.drFidImageUrl || "";

  // Preferred Logo Values from JSON or Global Config
  const heroLogoUrl = tData.logoUrl || content.whatsappHeroLogoUrl || "";
  const heroLogoHeight = tData.logoHeight || content.whatsappHeroLogoHeight || 150;
  const heroLogoType = tData.logoType || content.whatsappHeroLogoType || "text";
  const heroLogoText = tData.heroHeaderTextLogo || content.whatsappHeroHeaderTextLogo || "The Vagina Room";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    continent: "",
    country: "",
    subdivision: "",
    city: ""
  });
  const [isCustomSubdivision, setIsCustomSubdivision] = useState(false);
  const [customSubdivision, setCustomSubdivision] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // IP detection for country
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryName = data.country_name;
        // Check if country exists in our list
        if (Object.keys(CONTINENT_COUNTRIES).some(continent => CONTINENT_COUNTRIES[continent].includes(countryName))) {
          // Auto-select continent based on country
          const continent = Object.keys(CONTINENT_COUNTRIES).find(c => CONTINENT_COUNTRIES[c].includes(countryName));
          setFormData(prev => ({ ...prev, continent: continent || "", country: countryName }));
        }
      })
      .catch(console.error);
  }, []);

  const validatePhone = (phone: string, country: string) => {
    return true;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      continent: "",
      country: "",
      subdivision: "",
      city: ""
    });
    setIsCustomSubdivision(false);
    setCustomSubdivision("");
    setError("");
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill out your name, email, and WhatsApp number.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.continent) {
      setError("Please select your continent.");
      return;
    }
    if (!formData.country) {
      setError("Please select your country.");
      return;
    }
    if (!formData.subdivision.trim()) {
      const subConfig = SUBDIVISIONS[formData.country];
      const label = subConfig ? subConfig.label : "State / Region / Province";
      setError(`Please select or specify your ${label}.`);
      return;
    }
    if (!formData.city.trim()) {
      setError("Please specify your city.");
      return;
    }

    // Submit the data in the background instantly so the user doesn't experience any lag or spinner
    setIsSubmitting(true);
    setIsSuccess(true);
    submitFormSubmission("whatsapp_community", formData).catch((err) => {
      console.warn("Background form submission error:", err);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Close the modal and navigate to the thank you page immediately for an instantaneous, seamless experience
    setIsModalOpen(false);
    navigate("/whatsapp/thank-you");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  // Section Individual Rendering Helpers
  const renderHeroSection = () => (
    <section key="whatsapp_hero" className="relative px-6 pt-40 pb-32 lg:pt-48 lg:pb-32 flex flex-col items-center text-center min-h-[90vh] justify-center overflow-hidden">
      {heroBgUrl && (
        <img src={heroBgUrl} alt="Hero Background" referrerPolicy="no-referrer" className="absolute inset-x-0 top-0 w-full h-[120%] object-cover object-top opacity-30 select-none pointer-events-none mix-blend-screen" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-full max-w-2xl h-[500px] bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-full max-w-xl h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8 relative z-10 flex flex-col items-center"
      >
        {heroLogoType === 'image' && heroLogoUrl && heroLogoUrl.trim() !== "" ? (
          <motion.div variants={itemVariants} className="mb-2">
            <img 
              src={heroLogoUrl} 
              alt="The Vagina Room Logo" 
              style={{ height: `${heroLogoHeight}px` }}
              className="w-auto object-contain mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="mb-6 font-sans text-3xl md:text-4xl font-black tracking-tighter text-white uppercase group flex items-center gap-2 justify-center">
            <span className="tracking-tighter uppercase">
              The <span className="text-brand-gold italic font-light lowercase transition-transform group-hover:scale-110 inline-block">Vagina</span> Room
            </span>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-gold text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md font-bold">
          <Sparkles size={14} /> {tData.heroBadge || "Welcome to the safe space"}
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight"
          dangerouslySetInnerHTML={{ __html: tData.heroTitle || "Welcome To <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic pr-2'>The Vagina Room</span><br/>Free WhatsApp Community" }}
        />
        
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
          {tData.heroSubtitle || "A private, judgment-free collective dedicated to women's health, healing, and holistic empowerment."}
        </motion.p>

        <motion.div variants={itemVariants} className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center px-8 py-5 bg-zinc-100 text-zinc-950 font-bold text-base md:text-lg hover:bg-white transition-all duration-300 rounded-full shadow-xl shadow-white/5 active:scale-95 gap-3 w-full sm:w-auto cursor-pointer"
          >
            {tData.heroBtnText || "Join Our Free Community"}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest"
      >
        <span>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </section>
  );

  const renderPurposePainSection = () => (
    <section key="whatsapp_purpose_pain" className="py-24 px-6 md:py-32 relative border-t border-white/5 bg-zinc-950">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen translate-x-1/3 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-widest font-bold">
            {tData.purposeLabel || "Our Purpose"}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight" dangerouslySetInnerHTML={{ __html: tData.purposeTitle || "Why The Vagina Room <span class='italic text-brand-gold'>Exists</span>" }} />
          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
            <p className="text-xl text-zinc-200">{tData.purposeP1 || "Too many women suffer in silence."}</p>
            <p>{tData.purposeP2 || "Many women struggle with questions about fertility, menstrual health, hormonal changes, intimate wellness, pregnancy preparation, emotional wellbeing, and reproductive health without access to reliable information or supportive communities."}</p>
            <p>{tData.purposeP3 || "The Vagina Room was created to bridge that gap by providing a safe, supportive environment where women can learn, ask questions, access expert guidance, and gain the confidence to make informed decisions about their health."}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative"
        >
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center rotate-[-10deg]">
            <Heart className="text-rose-400" size={28} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-8 mt-2">{tData.painLabel || "Are You Experiencing Any of These?"}</h3>
          <ul className="space-y-4">
            {(tData.painItems || [
              "Irregular menstrual cycles",
              "Fertility concerns or difficulty conceiving",
              "Hormonal imbalances",
              "Recurrent vaginal infections",
              "Pregnancy-related questions",
              "Emotional stress related to reproductive health",
              "Lack of clarity about your reproductive system",
              "Confusion from conflicting online health information",
              "Feelings of isolation during your fertility journey"
            ]).map((item: string, i: number) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 + 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="text-rose-400/80 mt-1 shrink-0"><X size={16} /></div>
                <span className="text-zinc-300 font-light">{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-white/5 text-brand-gold italic text-lg"
          >
            {tData.painFooter || "If any of these sound familiar, you are not alone."}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

  const renderBentoSection = () => (
    <section key="whatsapp_bento" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <motion.div variants={itemVariants} className="lg:col-span-8 bg-zinc-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full group-hover:bg-brand-gold/10 transition-colors duration-700" />
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <Heart className="text-brand-gold/50" size={40} />
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif text-white">{tData.bentoTitle || "What is The Vagina Room?"}</h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
                <strong className="text-zinc-200 font-medium">{tData.bentoSubtitle || "The Vagina Room is more than a community."}</strong>
              </p>
              <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
                {tData.bentoText1 || "It is a safe, confidential, and empowering space where women gain access to practical knowledge, expert guidance, meaningful conversations, and supportive resources that help them make informed decisions about their health and wellbeing."}
              </p>
              <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
                {tData.bentoText2 || "Whether you are navigating fertility challenges, hormonal changes, menstrual concerns, pregnancy preparation, emotional healing, intimate health questions, or simply seeking a deeper understanding of your body, you belong here."}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-4 bg-zinc-900/50 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm overflow-hidden group">
          <div className="flex flex-col h-full">
            <div className="mb-0 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{tData.bentoDiffTitle || "What Makes Us Different?"}</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                {tData.bentoDiffDesc || "Unlike random social media advice or unverified online discussions, we provide:"}
              </p>
            </div>
            
            <ul className="space-y-4 flex-1">
              {(tData.bentoDiffItems || [
                "Structured wellness education",
                "Evidence-informed insights",
                "Expert-led discussions",
                "Safe & respectful environment",
                "Holistic wellness approaches"
              ]).map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );

  const renderShowcaseSection = () => (
    <section key="whatsapp_showcase" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-white">{tData.showcaseTitle || "Inside The Community"}</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{tData.showcaseSubtitle || "Everything you need to learn, heal, and thrive."}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl backdrop-blur-sm group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${topic.bg}`}>
                <topic.icon className={topic.color} size={24} />
              </div>
              <h3 className="text-zinc-200 font-medium text-lg leading-tight">{topic.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderBenefitsSection = () => (
    <section key="whatsapp_benefits" className="py-24 px-6 md:py-32 relative border-t border-white/5 bg-zinc-950">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-white">{tData.benefitsTitle || "What You Get When You Join"}</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{tData.benefitsSubtitle || "As a member of our free WhatsApp community, you will receive:"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(tData.benefitsItems || [
            { title: "Weekly Tips", desc: "Fertility and reproductive wellness tips", icon: "Heart", color: "text-rose-400" },
            { title: "Health Sessions", desc: "Women's health education sessions", icon: "BookOpen", color: "text-blue-400" },
            { title: "Wellness Challenges", desc: "Access to wellness challenges and activities", icon: "Activity", color: "text-emerald-400" },
            { title: "Guides & Resources", desc: "Educational resources and guides", icon: "BookOpen", color: "text-amber-400" },
            { title: "Community Support", desc: "Community discussions and support", icon: "Users", color: "text-brand-gold" },
            { title: "Program Updates", desc: "Updates on upcoming trainings & programs", icon: "Sparkles", color: "text-indigo-400" },
            { title: "Expert Q&A", desc: "Opportunities to ask questions from experts", icon: "Brain", color: "text-pink-400" },
            { title: "Live Sessions", desc: "Exclusive invitations to webinars & lives", icon: "Activity", color: "text-red-400" }
          ]).map((item: any, i: number) => {
            const iconMap: Record<string, any> = { Heart, BookOpen, Activity, Users, Sparkles, Brain };
            const IconComp = iconMap[item.icon] || Sparkles;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-zinc-900/60 transition-colors"
              >
                <div className={`p-3 rounded-xl bg-white/5 inline-flex mb-4 ${item.color || "text-brand-gold"}`}>
                  <IconComp size={24} />
                </div>
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderWhoShouldJoinSection = () => {
    const defaultWhoJoinItems = [
      { emoji: "🌸", text: "Women who want to better understand their bodies and reproductive health." },
      { emoji: "🩸", text: "Women experiencing irregular menstrual cycles or hormonal changes." },
      { emoji: "🤰", text: "Women navigating fertility challenges or trying to conceive." },
      { emoji: "👶", text: "Women preparing for pregnancy or planning to start a family." },
      { emoji: "🤱", text: "Expectant mothers seeking reliable pregnancy wellness information." },
      { emoji: "💖", text: "Women recovering after childbirth and looking to restore their reproductive and overall wellbeing." },
      { emoji: "🦋", text: "Women dealing with recurrent vaginal infections, discomfort, or intimate health concerns." },
      { emoji: "🌼", text: "Women approaching or experiencing perimenopause and menopause." },
      { emoji: "📚", text: "Women seeking evidence-informed education instead of confusing online advice." },
      { emoji: "🧠", text: "Women who want to improve their emotional, mental, and hormonal wellbeing." },
      { emoji: "🌿", text: "Women interested in natural and holistic approaches to women's wellness." },
      { emoji: "🛡️", text: "Women who value preventive healthcare and healthy lifestyle practices." },
      { emoji: "💍", text: "Married women and couples seeking fertility and reproductive wellness education." },
      { emoji: "🎓", text: "Young adult women who want to build healthy lifelong wellness habits." },
      { emoji: "🤝", text: "Women looking for a confidential, respectful, and judgment-free community." },
      { emoji: "🎙️", text: "Women who want access to expert-led discussions, live sessions, and practical wellness resources." },
      { emoji: "✨", text: "Women committed to learning, healing, growing, and empowering other women along the journey." }
    ];

    const items = tData.whoJoinItems ? tData.whoJoinItems.map((item: string) => {
      const emojiMatch = item.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}|\p{Emoji})/u);
      if (emojiMatch) {
        const emoji = emojiMatch[0];
        const text = item.slice(emoji.length).trim();
        return { emoji, text };
      }
      return { emoji: "🌸", text: item };
    }) : defaultWhoJoinItems;

    const title = tData.whoJoinTitle || "Who Should Join The Vagina Room Community?";
    const subtitle = tData.whoJoinSubtitle || "The Vagina Room is open to every woman seeking trusted guidance, practical education, and a supportive community focused on holistic wellness.";

    return (
      <section key="whatsapp_who_should_join" className="py-24 px-6 bg-zinc-900/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-white">{title}</h2>
            <p className="text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed">{subtitle}</p>
            <div className="pt-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-wider font-semibold">
                This Community Is Perfect For:
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
                className="flex items-start gap-4 p-5 bg-zinc-950/40 border border-white/5 rounded-2xl backdrop-blur-md group hover:border-brand-gold/20 hover:bg-zinc-950/70 transition-all duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-gold/5 text-xl shrink-0 border border-brand-gold/10 group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-300">
                  {item.emoji}
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-300 text-base md:text-lg leading-relaxed group-hover:text-zinc-100 transition-colors">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey Card Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-3xl shrink-0 border border-brand-gold/20 shadow-lg shadow-brand-gold/5">
                💬
              </div>
              <div className="space-y-3">
                <h4 className="text-xl md:text-2xl font-serif text-white font-medium">No Matter Where You Are in Your Journey...</h4>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                  Whether you're simply curious about your body, managing a health concern, preparing for motherhood, recovering after childbirth, navigating hormonal changes, or looking for a trusted community that understands your experiences, <span className="text-brand-gold font-medium">The Vagina Room</span> is a safe place to learn, ask questions, receive guidance, and grow with confidence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const renderFounderSection = () => (
    <section key="whatsapp_founder" className="py-24 px-6 md:py-32 relative border-t border-white/5 bg-black">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[4/5] bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden relative">
            {founderImageUrl ? (
              <img src={founderImageUrl} alt="Founder" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent z-10 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Star className="text-white w-32 h-32" />
                </div>
              </>
            )}
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                <Star size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif text-lg">{tData.founderName ? tData.founderName.split('(').pop()?.replace(')', '') || "Dr. FID" : "Dr. FID"}</h4>
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{tData.founderBadge || "Founder"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-widest font-bold">
            {tData.founderBadge || "Our Founder"}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
            {tData.founderTitle || "Meet Your Community Founder"}
          </h2>
          
          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
            <p>
              <strong className="text-white font-medium">{tData.founderName || "Ambassador Dr. Damilola Awoyemi (Dr. FID)"}</strong>
            </p>
            <p>
              {tData.founderText1 || "Ambassador Dr. Damilola Awoyemi (Dr. FID) is a Holistic Wellness Expert, Women's Wellness Advocate, Fertility & Reproductive Wellness Educator, SPA Business Consultant, and Founder of FID SPA Aesthetic & Chiropractic Clinic."}
            </p>
            <p>
              {tData.founderText2 || "Through The Vagina Room, she is committed to helping women replace confusion with clarity, fear with understanding, and silence with informed conversations about their health and wellbeing."}
            </p>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8">
            <p className="text-xl font-serif text-white italic">
              "{tData.founderQuote || "Replacing confusion with clarity, fear with understanding, and silence with informed conversations."}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderPromiseSection = () => (
    <section key="whatsapp_promise" className="py-24 px-6 md:py-32 relative bg-zinc-900/20 border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-widest font-bold">
            {tData.promiseLabel || "Our Commitment"}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight" dangerouslySetInnerHTML={{ __html: tData.promiseTitle || "Our Promise <span class='italic text-brand-gold'>To You</span>" }} />
          <p className="text-lg text-zinc-400 font-light leading-relaxed">
            {tData.promiseP1 || "We promise to create a safe, respectful, and empowering environment where women can:"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {(tData.promiseItems || [
            { text: "Learn without shame.", icon: "BookOpen" },
            { text: "Ask questions without fear.", icon: "MessageCircleHeart" },
            { text: "Grow without limitations.", icon: "Flower2" },
            { text: "Heal without stigma.", icon: "Heart" },
            { text: "Connect without judgment.", icon: "Users" },
            { text: "And thrive with confidence.", icon: "Sparkles" }
          ]).map((item: any, i: number) => {
            const IconNames: any = { BookOpen, MessageCircleHeart, Flower2, Heart, Users, Sparkles };
            const IconComp = IconNames[item.icon] || Sparkles;
            return (
              <div key={i} className="flex items-center gap-4 bg-zinc-950/50 p-6 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <IconComp size={18} className="text-brand-gold" />
                </div>
                <span className="text-zinc-200 font-medium">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );

  const renderSisterhoodSection = () => (
    <section key="whatsapp_community_sisterhood" className="py-24 px-6 md:py-32 relative border-t border-white/5 bg-zinc-950">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 relative shadow-2xl bg-zinc-900 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
            {communityImgUrl ? (
              <>
                <img src={communityImgUrl} alt="Women Community" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent mix-blend-multiply" />
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto">
                  <Users size={32} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-serif text-white">The Vagina Room Community</h3>
                <p className="text-sm text-zinc-400 max-w-xs mx-auto">A sacred, private, and non-judgmental space for women worldwide.</p>
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-[40px] pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-widest font-bold">
            {tData.ctaCommunityLabel || "Our Community"}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight" dangerouslySetInnerHTML={{ __html: tData.ctaCommunityTitle || "Join a Growing <br /> <span class='italic text-brand-gold'>Community</span> of Women" }} />
          
          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
            <p>
              <strong className="text-white font-medium">{tData.ctaCommunityP1 || "You do not have to navigate your health journey alone."}</strong>
            </p>
            <p>{tData.ctaCommunityP2 || "Inside The Vagina Room, you will find a community of women committed to learning, healing, supporting one another, and becoming healthier versions of themselves."}</p>
            <p>{tData.ctaCommunityP3 || "Together, we are building stronger women, healthier families, and more informed communities."}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderCtaSection = () => (
    <section key="whatsapp_cta" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl text-center"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen" />
          
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-mono uppercase tracking-widest mb-2 font-bold">
              {tData.ctaFinalLabel || "Your Next Step"}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: tData.ctaFinalTitle || "Take the first step toward better understanding your <span class='text-brand-gold italic'>body.</span>" }} />
            
            <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              <p>{tData.ctaFinalDesc || "Improve your wellness and join a supportive community that truly cares. Join The Vagina Room Free WhatsApp Community Today."}</p>
            </div>

            <div className="pt-4 max-w-md mx-auto">
              <button
                onClick={openModal}
                className="w-full inline-flex items-center justify-center px-8 py-5 bg-[#25D366] text-white font-bold text-lg hover:bg-[#1DA851] transition-all duration-300 rounded-xl shadow-lg shadow-[#25D366]/20 gap-3 active:scale-95 group cursor-pointer border-none"
              >
                {tData.ctaFinalBtnText || "Join WhatsApp Group"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 pt-6 border-t border-white/5 text-brand-gold font-serif italic text-xl flex items-center justify-center gap-2">
                {tData.ctaFinalFooterText || "Learn. Heal. Thrive."}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderSection = (id: string) => {
    switch (id) {
      case "whatsapp_hero":
        return renderHeroSection();
      case "whatsapp_purpose_pain":
        return renderPurposePainSection();
      case "whatsapp_bento":
        return renderBentoSection();
      case "whatsapp_showcase":
        return renderShowcaseSection();
      case "whatsapp_benefits":
        return renderBenefitsSection();
      case "whatsapp_who_should_join":
        return renderWhoShouldJoinSection();
      case "whatsapp_founder":
        return renderFounderSection();
      case "whatsapp_promise":
        return renderPromiseSection();
      case "whatsapp_community_sisterhood":
        return renderSisterhoodSection();
      case "whatsapp_cta":
        return renderCtaSection();
      default:
        return null;
    }
  };

  let sectionIds = [
    "whatsapp_hero",
    "whatsapp_purpose_pain",
    "whatsapp_bento",
    "whatsapp_showcase",
    "whatsapp_benefits",
    "whatsapp_who_should_join",
    "whatsapp_founder",
    "whatsapp_promise",
    "whatsapp_community_sisterhood",
    "whatsapp_cta"
  ];

  if (content.whatsappPageSectionsOrder) {
    try {
      const parsed = JSON.parse(content.whatsappPageSectionsOrder);
      if (Array.isArray(parsed)) {
        sectionIds = parsed;
      }
    } catch (e) {
      console.warn("Error parsing whatsappPageSectionsOrder", e);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-brand-gold/30 relative">
      <SEO 
        title="Welcome to The Vagina Room | Join Our WhatsApp Community" 
        description="A Safe Space for Women's Health, Healing & Empowerment. Join our free WhatsApp community today." 
      />


      <main className="flex-grow">
        {sectionIds.map(id => renderSection(id))}
      </main>

      <footer className="py-12 border-t border-white/5 text-center space-y-4 bg-zinc-950">
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          &copy; {new Date().getFullYear()} The Vagina Room
        </p>
        <p className="text-zinc-600 text-[11px] font-mono italic max-w-sm mx-auto px-6">
          A Safe Space for Women's Wellness, Reproductive Health & Empowerment.
        </p>
      </footer>

      {/* Modern Glassmorphic Location Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-fade-in"
              onClick={() => !isSubmitting && setIsModalOpen(false)}
            />
        )}
        {isModalOpen && (
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-50 transition-all duration-300 ${step === 2 ? "overflow-y-auto max-h-[90vh]" : ""}`}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-mono uppercase tracking-widest mb-6 font-bold">
                Step {step} of 2
              </div>

              <h2 className="text-3xl font-serif text-white mb-2">
                {step === 1 ? "Join Our Community" : "Your Location"}
              </h2>
              <p className="text-zinc-400 text-sm mb-8 font-light leading-relaxed">
                {step === 1 
                  ? "Provide your details below to receive the exclusive invite link."
                  : "We track where our global sisterhood footprint is registering from."}
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                      placeholder="+234 802 729 4320"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-zinc-100 text-zinc-950 rounded-xl px-6 py-4 font-bold text-sm hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    Continue to Location <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 rounded-none">
                    <label htmlFor="continent" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                      Continent
                    </label>
                    <div className="relative">
                      <select
                        id="continent"
                        name="continent"
                        required
                        value={formData.continent}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            continent: val,
                            country: "",
                            subdivision: "",
                            city: ""
                          });
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 pr-10 text-white focus:outline-none focus:border-brand-gold/50 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-900 text-zinc-400">Select Continent</option>
                        {Object.keys(CONTINENT_COUNTRIES).map((cont) => (
                          <option key={cont} value={cont} className="bg-zinc-900 text-white font-sans">{cont}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs">▼</div>
                    </div>
                  </div>

                  <SearchableDropdown
                    label="Country"
                    placeholder="Select Country"
                    disabled={!formData.continent}
                    value={formData.country}
                    options={formData.continent ? CONTINENT_COUNTRIES[formData.continent].map(c => ({
                      label: c.includes("Other") ? c : c,
                      icon: getCountryInfo(c).flag
                    })) : []}
                    onChange={(val) => {
                      setFormData({
                        ...formData,
                        country: val,
                        subdivision: "",
                        city: ""
                      });
                      setIsCustomSubdivision(false);
                      setCustomSubdivision("");
                    }}
                  />
                  
                  {formData.country && !validatePhone(formData.phone, formData.country) && formData.phone && (
                    <p className="text-red-500 text-xs mt-1">Invalid phone length for {formData.country}</p>
                  )}

                  {formData.country && (
                    <>
                      <div className="space-y-1">
                        <label htmlFor="subdivision" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                          {SUBDIVISIONS[formData.country] ? SUBDIVISIONS[formData.country].label : "State / Region / Province"}
                        </label>
                        {SUBDIVISIONS[formData.country]?.options ? (
                          <div className="relative">
                            <select
                              id="subdivision"
                              name="subdivision"
                              required
                              value={isCustomSubdivision ? "Other" : formData.subdivision}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "Other") {
                                  setIsCustomSubdivision(true);
                                  setFormData({ ...formData, subdivision: customSubdivision });
                                } else {
                                  setIsCustomSubdivision(false);
                                  setFormData({ ...formData, subdivision: val });
                                }
                              }}
                              className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 pr-10 text-white focus:outline-none focus:border-brand-gold/50 transition-all text-sm appearance-none cursor-pointer"
                            >
                              <option value="" disabled className="bg-zinc-900 text-zinc-400">Select Option</option>
                              {SUBDIVISIONS[formData.country].options.map((opt) => (
                                <option key={opt} value={opt} className="bg-zinc-900 text-white font-sans">{opt}</option>
                              ))}
                              <option value="Other" className="bg-zinc-900 text-white font-sans">Other / Custom</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs">▼</div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            id="subdivision"
                            name="subdivision"
                            required
                            value={formData.subdivision}
                            onChange={(e) => setFormData({ ...formData, subdivision: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                            placeholder={SUBDIVISIONS[formData.country] ? SUBDIVISIONS[formData.country].placeholder : "e.g., Delta / California"}
                          />
                        )}
                      </div>

                      {isCustomSubdivision && (
                        <div className="space-y-1.5">
                          <label htmlFor="customSubdivision" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                            Specify {SUBDIVISIONS[formData.country] ? SUBDIVISIONS[formData.country].label : "Local Area"}
                          </label>
                          <input
                            type="text"
                            id="customSubdivision"
                            name="customSubdivision"
                            required
                            value={customSubdivision}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomSubdivision(val);
                              setFormData({ ...formData, subdivision: val });
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                            placeholder="Specify custom location name"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label htmlFor="city" className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-gold/50 focus:bg-white/5 transition-all text-sm"
                          placeholder="e.g. Asaba, Los Angeles"
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => { setError(""); setStep(1); }}
                      className="px-5 py-4 border border-white/10 text-zinc-400 font-bold text-sm hover:text-white hover:bg-white/5 transition-all rounded-xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer bg-white/5"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`flex-1 rounded-xl px-6 py-4 font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border-none ${isSuccess ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-950 hover:bg-white"}`}
                    >
                      {isSuccess ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                          <CheckCircle2 size={16} /> Success!
                        </motion.div>
                      ) : isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                      ) : (
                        <>Submit & Get Link <MapPin size={16} className="text-zinc-950" /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
