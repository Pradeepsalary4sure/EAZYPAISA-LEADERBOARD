const fs = require('fs');
const path = 'c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/App.css';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
    // Greens remaining -> Navy Blues
    '#B8E6B8': '#bfdbfe',
    '#D8F3DC': '#dbeafe',
    '#E8F5E9': '#eff6ff',
    '#06b6d4': '#1e3a8a',
    '#22c55e': '#1d4ed8',
    '#16a34a': '#1e40af'
};

for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key.replace(/([, ])/g, '\\$1'), 'gi');
    content = content.replace(regex, value);
}

fs.writeFileSync(path, content);
console.log("Remaining Greens replaced with Navy Blue in App.css successfully.");
