import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('state_archive_mock')
export class StateArchiveMock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  egn: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

}
