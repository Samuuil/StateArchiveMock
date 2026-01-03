import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateArchiveMock } from '../state-archive-mock/entities/state-archive-mock.entity';

@Injectable()
export class StateArchiveSeederService {
  constructor(
    @InjectRepository(StateArchiveMock)
    private readonly stateArchiveRepository: Repository<StateArchiveMock>,
  ) {}

  async seed(): Promise<StateArchiveMock[]> {
    const seedData = [
      {
        egn: '1111111111',
        fullName: 'Boris Borisov',
        email: process.env.SEED_USER1_EMAIL || 'boris.borisov@example.com',
        phoneNumber: process.env.SEED_USER1_PHONE || '+359888111111',
      },
      {
        egn: '2222222222',
        fullName: 'Stanislav Todorov',
        email: process.env.SEED_USER2_EMAIL || 'stanislav.trifonov@example.com',
        phoneNumber: process.env.SEED_USER2_PHONE || '+359888222222',
      },
      {
        egn: '3333333333',
        fullName: 'Preslav Ivanov',
        email: process.env.SEED_USER3_EMAIL || 'preslav.ivanov@example.com',
        phoneNumber: process.env.SEED_USER3_PHONE || '+359888333333',
      },
      {
        egn: '4444444444',
        fullName: 'Dimitar Petrov',
        email: process.env.SEED_USER4_EMAIL || 'dimitar.petrov@example.com',
        phoneNumber: process.env.SEED_USER4_PHONE || '+359888333333',
      },
    ];

    const existingArchives = await this.stateArchiveRepository.find({
      where: seedData.map(data => ({ egn: data.egn })),
    });

    const existingEgns = existingArchives.map(archive => archive.egn);
    const newArchives = seedData.filter(data => !existingEgns.includes(data.egn));

    if (newArchives.length === 0) {
      console.log('State archive seed data already exists');
      return existingArchives;
    }

    const createdArchives = await this.stateArchiveRepository.save(newArchives);
    console.log(`Created ${createdArchives.length} state archive entries`);
    
    return [...existingArchives, ...createdArchives];
  }

  async clear(): Promise<void> {
    const seedEgns = ['1111111111', '2222222222', '3333333333', '4444444444'];
    await this.stateArchiveRepository.delete(seedEgns.map(egn => ({ egn })));
    console.log('Cleared state archive seed data');
  }
}
