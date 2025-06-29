import React, { type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Navbar from './Navbar';

const AppRouter = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const Protected = ({ element }: { element: JSX.Element }) => (
    <>
      <Navbar />
      {element}
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <Protected element={<Dashboard />} /> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <Protected element={<AddExpense />} /> : <Navigate to="/login" />} />
        <Route path="/list" element={token ? <Protected element={<ExpenseList />} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;