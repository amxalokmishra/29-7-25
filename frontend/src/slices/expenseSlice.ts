import { createSlice } from '@reduxjs/toolkit';
import type { Expense } from '../types';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: [] as Expense[],
  reducers: {
    setExpenses: (_state, action) => action.payload,
    addExpense: (state, action) => void state.push(action.payload),
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;