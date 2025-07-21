// src/auth/refresh-token.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenHash: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => Company, (c) => c.refreshTokens, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @CreateDateColumn()
  createdAt: Date;
}