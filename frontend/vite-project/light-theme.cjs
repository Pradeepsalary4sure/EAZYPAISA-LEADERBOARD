const fs = require('fs');

function transformToLightTheme(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    const themeReplacements = {
        // --- BACKGROUNDS ---
        // Dark linear gradients -> Light aesthetic pink/navy gradients
        'linear-gradient\\(\\s*135deg,\\s*#020617,\\s*#0f172a\\s*\\)': 'linear-gradient(135deg, #fdf2f8, #eff6ff)',
        'linear-gradient\\(\\s*135deg,\\s*#1a1a2e,\\s*#16213e\\s*\\)': 'linear-gradient(135deg, #fbcfe8, #dbeafe)',
        
        // --- CARDS & GLASSMORPHISM ---
        // Semi-transparent white was good for dark mode, but we want it more opaque for light mode
        'rgba\\(255,\\s*255,\\s*255,\\s*\\.08\\)': 'rgba(255, 255, 255, 0.7)',
        'rgba\\(255,\\s*255,\\s*255,\\s*\\.1\\)': 'rgba(255, 255, 255, 0.8)',
        
        // --- TEXT COLORS ---
        // White text -> Navy Blue text
        'color:\\s*white': 'color: #1e3a8a',
        'color:\\s*#fff': 'color: #1e3a8a',
        'color:\\s*#cbd5e1': 'color: #1d4ed8', // Light slate text -> Lighter navy
        'color:\\s*#94a3b8': 'color: #475569', // Slate 400 -> Slate 600
        'color:\\s*#0f172a': 'color: #1e3a8a', // Dark slate -> Navy blue
        'color:\\s*#64748b': 'color: #be185d', // Slate 500 -> Dark Pink (for accents)
        
        // --- BORDERS ---
        'rgba\\(255,\\s*255,\\s*255,\\s*\\.15\\)': 'rgba(30, 58, 138, 0.15)', // White borders -> Navy borders
        'rgba\\(255,\\s*255,\\s*255,\\s*\\.2\\)': 'rgba(30, 58, 138, 0.2)',
        
        // --- SHADOWS ---
        // Dark mode shadows -> Light mode shadows with a hint of navy
        'rgba\\(0,\\s*0,\\s*0,\\s*\\.25\\)': 'rgba(30, 58, 138, 0.08)',
        'rgba\\(0,\\s*0,\\s*0,\\s*\\.3\\)': 'rgba(30, 58, 138, 0.12)',
        'rgba\\(0,\\s*0,\\s*0,\\s*\\.35\\)': 'rgba(30, 58, 138, 0.15)',
        'rgba\\(0,\\s*0,\\s*0,\\s*\\.5\\)': 'rgba(30, 58, 138, 0.2)',

        // --- SPECIFIC TWEAKS ---
        // Background of tables and panels
        'background:\\s*#16171d': 'background: #ffffff',
        'background:\\s*#1f2028': 'background: #fdf2f8',
        'background:\\s*#2e303a': 'background: #eff6ff',
        'background:\\s*#020617': 'background: #fdf2f8',
        'background-color:\\s*#020617': 'background-color: #fdf2f8',
        'background:\\s*#0f172a': 'background: #ffffff',
        '--bg:\\s*#020617': '--bg: #fdf2f8',
        '--bg:\\s*#16171d': '--bg: #fdf2f8',
        '--card:\\s*#ffffff': '--card: rgba(255,255,255,0.7)',
        '--text:\\s*#0f172a': '--text: #1e3a8a',
        '--text-h:\\s*#08060d': '--text-h: #1e3a8a',
        '--text-h:\\s*#f3f4f6': '--text-h: #1e3a8a',
        '--border:\\s*#e5e4e7': '--border: rgba(30,58,138,0.15)',
        '--border:\\s*#2e303a': '--border: rgba(30,58,138,0.15)',
        
        // Ensure gradients using "transparent" have the right contrast
        // The text color in headers was a gradient clip from white to pink. In light mode, it should be Navy to Pink.
        '#fff,\\s*#db2777': '#1e3a8a, #db2777',
        '#fff,\\s*#be185d': '#1e3a8a, #be185d',
    };

    for (const [regexStr, replacement] of Object.entries(themeReplacements)) {
        const regex = new RegExp(regexStr, 'gi');
        content = content.replace(regex, replacement);
    }

    fs.writeFileSync(filePath, content);
}

try {
    transformToLightTheme('c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/App.css');
    transformToLightTheme('c:/Users/ADMIN/Desktop/eazypaisa Leaderboard/frontend/vite-project/src/index.css');
    console.log("Light Theme transformation completed successfully!");
} catch(e) {
    console.error(e);
}
