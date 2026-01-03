import { DataSource } from 'typeorm';
import { StateArchiveMock } from './state-archive-mock/entities/state-archive-mock.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'state_archive_mock',
  entities: [StateArchiveMock],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
});

