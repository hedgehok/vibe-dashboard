import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Получаем сохраненную тему или используем системные настройки
  const getInitialMode = (): ThemeMode => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode) return savedMode;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  // Создаем тему Material-UI
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#2196f3' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#f50057' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(30, 30, 30, 0.8)',
          },
        },
      },
    },
  }, ruRU); // Добавляем русскую локализацию

  // Сохраняем выбранную тему
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Функция переключения темы
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 