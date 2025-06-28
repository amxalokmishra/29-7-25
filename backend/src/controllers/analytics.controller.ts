import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Expense } from '../entities/Expense';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserRole } from '../entities/User';

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const result = await AppDataSource.getRepository(Expense)
    .createQueryBuilder('expense')
    .select('expense.category', 'category')
    .addSelect('SUM(expense.amount)', 'total')
    .groupBy('expense.category')
    .getRawMany();

  res.json(result);
};