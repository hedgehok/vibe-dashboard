import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App; 