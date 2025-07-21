// src/auth/password-reset.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity({ name: 'password_reset_tokens' })
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'token_hash' })
  tokenHash: string;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;

  @ManyToOne(() => Company, (c) => c.resetTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  company: Company;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}