const fs = require('fs');
const path = 'c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/App.css';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
    // Blues/Cyans -> Pinks
    '#00d9ff': '#f472b6',
    '#00b4ff': '#ec4899',
    '#0099cc': '#db2777',
    '#2563eb': '#ec4899',
    '#1d4ed8': '#be185d',
    '#001f3f': '#831843',
    '26, 42, 78': '131, 24, 67',
    '13, 31, 61': '80, 7, 36',
    '30, 58, 95': '157, 23, 77',
    '34, 211, 238': '244, 114, 182',
    '0, 217, 255': '244, 114, 182',
    '40, 163, 255': '244, 114, 182',
    '#E8F5FF': '#fdf2f8',
    '#F0FAFF': '#fdf2f8',
    
    // Oranges/Greens -> Emeralds
    '#ffa500': '#34d399',
    '#ff8c00': '#10b981',
    '#ffb347': '#6ee7b7',
    '#FFE4D6': '#ecfdf5',
    '#FFF5ED': '#f0fdf4',
    '#FFEEE0': '#ecfdf5',
    '#e0ffe0': '#d1fae5',
    '#f0fff0': '#ecfdf5',
    '255, 165, 0': '16, 185, 129',
    '255, 240, 230': '236, 253, 245'
};

for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/([, ])/g, '\\$1'), 'gi');
    content = content.replace(regex, value);
}

fs.writeFileSync(path, content);
console.log("Colors replaced successfully.");
