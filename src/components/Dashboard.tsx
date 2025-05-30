import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, Typography, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { collectUserInfo } from '../utils/userInfoCollector';
import { UserInfo } from '../types/UserInfo';
import BrowserInfoCard from './cards/BrowserInfoCard';
import SystemInfoCard from './cards/SystemInfoCard';
import NetworkInfoCard from './cards/NetworkInfoCard';
import LocationInfoCard from './cards/LocationInfoCard';
import PerformanceCard from './cards/PerformanceCard';
import FeaturesCard from './cards/FeaturesCard';
import MarketingCard from './cards/MarketingCard';

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  useEffect(() => {
    const loadUserInfo = async () => {
      const info = await collectUserInfo();
      setUserInfo(info);
    };
    loadUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      transition: muiTheme.transitions.create('background-color')
    }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
            Информация о пользователе
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <BrowserInfoCard browserInfo={userInfo.browser} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SystemInfoCard systemInfo={userInfo.system} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <NetworkInfoCard networkInfo={userInfo.network} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LocationInfoCard locationInfo={userInfo.location} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PerformanceCard performanceInfo={userInfo.performance} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FeaturesCard features={userInfo.features} />
          </Grid>
          <Grid item xs={12}>
            <MarketingCard marketingInfo={userInfo.marketing} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 