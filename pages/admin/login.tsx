import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Seo from '@/components/Seo';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLogin() {
  const { isAdmin, logout, login } = useAdmin();
  const [token, setToken] = useState('');

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Seo title="Admin" noindex />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Admin
      </Typography>
      {isAdmin ? (
        <>
          <Typography color="textSecondary" sx={{ mb: 3 }}>
            You are logged in as admin.
          </Typography>
          <Button variant="outlined" color="error" onClick={logout}>
            Log out
          </Button>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            login(token);
          }}
        >
          <TextField
            label="Admin token"
            type="password"
            fullWidth
            margin="normal"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Unlock admin panel
          </Button>
        </Box>
      )}
    </Box>
  );
}
