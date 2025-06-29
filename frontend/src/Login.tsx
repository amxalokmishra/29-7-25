import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from './slices/authSlice';
import { login } from './api';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await login(email, password);
    dispatch(setCredentials(res.data));
    window.location.href = '/dashboard';
  };

  return (
    <Container>
      <Typography variant="h5">Login</Typography>
      <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;