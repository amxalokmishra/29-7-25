// src/entities/Expense.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

export enum ExpenseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal')
  amount!: number;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @Column()
  date!: Date;

  @Column({ type: 'enum', enum: ExpenseStatus, default: ExpenseStatus.PENDING })
  status!: ExpenseStatus;

  @ManyToOne(() => User, (user) => user.expenses)
  user!: User;
}