import { useState, useEffect } from 'react';
import {Container, TextField, Button, Typography} from '@mui/material';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { GetServerSideProps } from 'next';

const LOCAL_STORAGE_KEY = 'admin_token';

export default function AdminLogin() {

  const { isAdmin, logout, login } = useAdmin();
  const [token, setToken] = useState('');

  return (
    isAdmin ? (
    <>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5">Loggen In</Typography>
            <Button variant="contained" color="error" onClick={logout}>
                Logout
            </Button>
        </Container>
    </>
    ) : (
    <>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography variant="h5">Admin Login</Typography>
          <TextField
            label="Enter Admin Token"
            fullWidth
            onChange={(e) => setToken(e.target.value)}
            margin="normal"
            type="password"
          />
          <Button variant="contained" onClick={() => login(token)}>
            Unlock Admin Panel
          </Button>
        </Container>
    </>
    )

  );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: {} }; // disables static generation
  };