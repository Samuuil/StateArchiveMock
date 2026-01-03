import { Injectable } from '@nestjs/common';
import { StateArchiveSeederService } from './state-archive-mock-seeder.service';

@Injectable()
export class SeedingService {
  constructor(
    private readonly stateArchiveSeederService: StateArchiveSeederService,
  ) {}

  async seedAll(): Promise<void> {
    console.log('Starting database seeding...');
    
    try {
      console.log('Seeding state archive entries...');
      await this.stateArchiveSeederService.seed();
      
      console.log('Database seeding completed successfully!');
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    console.log('Clearing seed data...');
    
    try {
      await this.stateArchiveSeederService.clear();
      
      console.log('Seed data cleared successfully!');
    } catch (error) {
      console.error('Error during clearing:', error);
      throw error;
    }
  }
}
