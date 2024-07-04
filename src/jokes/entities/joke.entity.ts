import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === joke
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: string;

  @Column()
  queryType: string;

  @Column({ nullable: true })
  searchTerm: string;

  @Column()
  timestamp: string;
}
