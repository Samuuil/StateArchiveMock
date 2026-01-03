const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

// Get the migration command (run or revert) from command line arguments
const command = process.argv[2] || 'run';

// Use ts-node directly with typeorm CLI
const typeormCommand = `ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:${command} -d src/data-source.ts`;

console.log(`Running migration: ${command}`);
execSync(typeormCommand, { stdio: 'inherit' });

