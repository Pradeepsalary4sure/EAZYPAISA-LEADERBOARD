const fs = require('fs');
const path = 'c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/App.css';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
    // Darken Pinks
    '#f472b6': '#db2777', // Pink 400 -> Pink 600
    '#ec4899': '#be185d', // Pink 500 -> Pink 700
    '#db2777': '#9d174d', // Pink 600 -> Pink 800
    '#be185d': '#831843', // Pink 700 -> Pink 900
    '#fdf2f8': '#fbcfe8', // Pink 50 -> Pink 200
    '244, 114, 182': '219, 39, 119', // rgba Pink 400 -> Pink 600
    '236, 72, 153': '190, 24, 93', // rgba Pink 500 -> Pink 700
    
    // Darken Light Navy Blues
    '#eff6ff': '#bfdbfe', // Blue 50 -> Blue 200
    '#f8fafc': '#cbd5e1', // Slate 50 -> Slate 300
    '#dbeafe': '#93c5fd', // Blue 100 -> Blue 300
    '#bfdbfe': '#60a5fa', // Blue 200 -> Blue 400
    '239, 246, 255': '191, 219, 254' // rgba Blue 50 -> Blue 200
};

// Replace exact strings safely
for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/([, ])/g, '\\$1'), 'gi');
    content = content.replace(regex, value);
}

fs.writeFileSync(path, content);

// Do the same for index.css if any pinks exist there
const indexPath = 'c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/index.css';
let indexContent = fs.readFileSync(indexPath, 'utf8');
for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/([, ])/g, '\\$1'), 'gi');
    indexContent = indexContent.replace(regex, value);
}
fs.writeFileSync(indexPath, indexContent);

console.log("Colors darkened successfully.");
