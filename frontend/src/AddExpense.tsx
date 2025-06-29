import React, { useState } from 'react';
import { Button, TextField, Container, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addExpense as addExpenseApi } from './api';
import { addExpense } from './slices/expenseSlice';

const AddExpense = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    const res = await addExpenseApi({ amount, category, description, date });
    dispatch(addExpense(res.data));
  };

  return (
    <Container>
      <TextField label="Amount" fullWidth type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
      <TextField select label="Category" fullWidth value={category} onChange={e => setCategory(e.target.value)}>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
        <MenuItem value="Travel">Accommodation</MenuItem>
        <MenuItem value="Travel">Transport</MenuItem>
      </TextField>
      <TextField label="Description" fullWidth value={description} onChange={e => setDescription(e.target.value)} />
      <TextField type="date" fullWidth value={date} onChange={e => setDate(e.target.value)} />
      <Button variant="contained" onClick={handleAdd}>Add Expense</Button>
    </Container>
  );
};

export default AddExpense;