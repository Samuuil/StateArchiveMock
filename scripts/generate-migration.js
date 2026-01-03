const { execSync } = require('child_process');
const path = require('path');

// Get migration name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Error: Migration name is required');
  console.log('Usage: npm run migration:generate -- <MigrationName>');
  process.exit(1);
}

const migrationPath = path.join('src', 'migrations', migrationName);
const dataSourcePath = path.join('src', 'data-source.ts');

const command = `npx typeorm-ts-node-commonjs migration:generate ${migrationPath} -d ${dataSourcePath}`;

console.log(`Generating migration: ${migrationName}`);
execSync(command, { stdio: 'inherit' });

