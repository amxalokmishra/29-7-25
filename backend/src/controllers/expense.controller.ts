import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Expense, ExpenseStatus } from '../entities/Expense';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserRole } from '../entities/User';

const expenseRepo = AppDataSource.getRepository(Expense);

export const createExpense = async (req: AuthRequest, res: Response) => {
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !description || !date)
    return res.status(400).json({ message: 'All fields are required' });

  const expense = expenseRepo.create({
    amount,
    category,
    description,
    date,
    user: { id: req.user!.userId },
  });

  await expenseRepo.save(expense);
  res.status(201).json(expense);
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user?.role === UserRole.ADMIN;

  const expenses = await expenseRepo.find({
    where: isAdmin ? {} : { user: { id: req.user!.userId } },
    relations: ['user'],
    order: { date: 'DESC' },
  });

  res.json(expenses);
};

export const approveExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await expenseRepo.update(id, { status: ExpenseStatus.APPROVED });
  res.json({ message: 'Expense approved' });
};

export const rejectExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await expenseRepo.update(id, { status: ExpenseStatus.REJECTED });
  res.json({ message: 'Expense rejected' });
};