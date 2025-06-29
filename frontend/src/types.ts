export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  status?: 'pending' | 'approved' | 'rejected';
  userId: number;
}

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'employee';
  token: string;
}