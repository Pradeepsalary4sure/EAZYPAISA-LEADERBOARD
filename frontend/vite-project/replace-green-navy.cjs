const fs = require('fs');
const path = 'c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/App.css';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
    // Greens -> Navy Blues
    '#10b981': '#1e3a8a', // emerald 500 -> blue 900
    '#059669': '#172554', // emerald 600 -> blue 950
    '#34d399': '#1e40af', // emerald 400 -> blue 800
    '#6ee7b7': '#1d4ed8', // emerald 300 -> blue 700
    '#ecfdf5': '#eff6ff', // emerald 50 -> blue 50
    '#f0fdf4': '#f8fafc', // green 50 -> slate 50
    '#d1fae5': '#dbeafe', // emerald 100 -> blue 100
    '16, 185, 129': '30, 58, 138', // rgba 500
    '236, 253, 245': '239, 246, 255' // rgba 50
};

for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/([, ])/g, '\\$1'), 'gi');
    content = content.replace(regex, value);
}

fs.writeFileSync(path, content);
console.log("Greens replaced with Navy Blue successfully.");
