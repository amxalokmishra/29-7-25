import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import { Expense, ExpenseStatus } from '../entities/Expense';
import bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();
  console.log('DB connected...');

  const userRepo = AppDataSource.getRepository(User);
  const expenseRepo = AppDataSource.getRepository(Expense);

  await AppDataSource.query(`TRUNCATE TABLE "expense", "user" CASCADE`);

  const admin = userRepo.create({
    name: 'Admin One',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: UserRole.ADMIN,
  });

  const emp1 = userRepo.create({
    name: 'Employee One',
    email: 'emp1@example.com',
    password: await bcrypt.hash('emp123', 10),
    role: UserRole.EMPLOYEE,
  });

  const emp2 = userRepo.create({
    name: 'Employee Two',
    email: 'emp2@example.com',
    password: await bcrypt.hash('emp123', 10),
    role: UserRole.EMPLOYEE,
  });

  await userRepo.save([admin, emp1, emp2]);

  const expenses = expenseRepo.create([
    {
      amount: 1000,
      category: 'Travel',
      description: 'Flight to Mumbai',
      date: new Date('2024-06-01'),
      status: ExpenseStatus.PENDING,
      user: emp1,
    },
    {
      amount: 800,
      category: 'Food',
      description: 'Team lunch',
      date: new Date('2024-06-05'),
      status: ExpenseStatus.APPROVED,
      user: emp1,
    },
    {
      amount: 1200,
      category: 'Accommodation',
      description: 'Hotel stay',
      date: new Date('2024-06-10'),
      status: ExpenseStatus.REJECTED,
      user: emp2,
    },
    {
      amount: 450,
      category: 'Supplies',
      description: 'Stationery purchase',
      date: new Date('2024-06-12'),
      status: ExpenseStatus.PENDING,
      user: emp2,
    },
    {
      amount: 1500,
      category: 'Transport',
      description: 'Cab rides',
      date: new Date('2024-06-15'),
      status: ExpenseStatus.APPROVED,
      user: emp2,
    },
  ]);

  await expenseRepo.save(expenses);

  console.log('✅ Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});