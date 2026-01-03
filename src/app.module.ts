import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateArchiveModule } from './state-archive-mock/state-archive-mock.module';
import { StateArchiveMock } from './state-archive-mock/entities/state-archive-mock.entity';
import { SeedingModule } from './seeding/seeding.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'state_archive_mock',
      entities: [StateArchiveMock],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
    }),
    StateArchiveModule,
    SeedingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
