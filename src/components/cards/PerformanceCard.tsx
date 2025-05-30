import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { PerformanceInfo } from '../../types/UserInfo';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceCardProps {
  performanceInfo: PerformanceInfo;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ performanceInfo }) => {
  const theme = useTheme();

  const performanceData = {
    labels: ['DOM Interactive', 'DOM Complete', 'Время загрузки'],
    datasets: [
      {
        label: 'Метрики производительности (мс)',
        data: [
          performanceInfo.domInteractive,
          performanceInfo.domComplete,
          performanceInfo.loadTime,
        ],
        borderColor: theme.palette.primary.main,
        tension: 0.4,
      },
    ],
  };

  const memoryData = performanceInfo.memoryUsage ? {
    labels: ['Использовано', 'Свободно', 'Лимит'],
    datasets: [
      {
        label: 'Использование памяти (МБ)',
        data: [
          performanceInfo.memoryUsage.usedJSHeapSize / 1048576,
          (performanceInfo.memoryUsage.totalJSHeapSize - performanceInfo.memoryUsage.usedJSHeapSize) / 1048576,
          performanceInfo.memoryUsage.jsHeapSizeLimit / 1048576,
        ],
        backgroundColor: [
          theme.palette.error.main,
          theme.palette.success.main,
          theme.palette.primary.main,
        ],
      },
    ],
  } : null;

  return (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      }
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Метрики производительности
        </Typography>
        <Box sx={{ height: 200, mb: 2 }}>
          <Line 
            data={performanceData} 
            options={{ 
              maintainAspectRatio: false,
              responsive: true,
            }} 
          />
        </Box>
        {memoryData && (
          <Box sx={{ height: 200 }}>
            <Bar 
              data={memoryData} 
              options={{ 
                maintainAspectRatio: false,
                responsive: true,
              }} 
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceCard; 