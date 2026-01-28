const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

// Get migration name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Error: Migration name is required');
  console.log('Usage: npm run migration:generate -- <MigrationName>');
  process.exit(1);
}

const migrationPath = path.join('src', 'migrations', migrationName);
const dataSourcePath = path.join('src', 'data-source.ts');

// Use ts-node directly with typeorm CLI
const command = `ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate ${migrationPath} -d ${dataSourcePath}`;

console.log(`Generating migration: ${migrationName}`);
execSync(command, { stdio: 'inherit' });

