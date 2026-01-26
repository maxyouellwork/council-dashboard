import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname } from 'path';

// Generate config.js from environment variables
const configContent = `// Auto-generated config - DO NOT EDIT
window.CONFIG = {
  AIRTABLE_API_KEY: "${process.env.AIRTABLE_API_KEY || ''}",
  AIRTABLE_BASE_ID: "${process.env.AIRTABLE_BASE_ID || 'app5iqmIuu0sOTocu'}"
};
`;

// Write config.js to root
writeFileSync('config.js', configContent);
console.log('Generated config.js');

// Run Vite build
execSync('npx vite build', { stdio: 'inherit' });

// Copy config.js to dist
writeFileSync('dist/config.js', configContent);
console.log('Copied config.js to dist/');
