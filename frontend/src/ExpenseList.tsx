import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, approveExpense, rejectExpense } from './api';
import { setExpenses } from './slices/expenseSlice';
import type { RootState } from './store';
import { Button } from '@mui/material';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expense);
  const role = useSelector((state: RootState) => state.auth.role);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchExpenses().then(res => dispatch(setExpenses(res.data)));
  }, [dispatch]);

  const handleApprove = async (id: number) => {
    await approveExpense(id);
    fetchExpenses().then(res => dispatch(setExpenses(res.data)));
  };

  const handleReject = async (id: number) => {
    await rejectExpense(id);
    fetchExpenses().then(res => dispatch(setExpenses(res.data)));
  };

  const filtered = expenses.filter(e => e.category.includes(filter));

  return (
    <div>
      <h2>Expense List</h2>
      <input
        placeholder="Filter by category"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <ul>
          {filtered.map(e => (
            <li key={e.id}>
              ₹{e.amount} - {e.category} - {e.date} - {e.status || 'pending'}
              {role === 'admin' && e.status === 'pending' && (
                <>
                  <Button
                    size="small"
                    onClick={() => handleApprove(e.id)}
                    style={{ marginLeft: '1rem' }}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleReject(e.id)}
                    style={{ marginLeft: '0.5rem' }}
                    variant="outlined"
                    color="error"
                  >
                    Reject
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;