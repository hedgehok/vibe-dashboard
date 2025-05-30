import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Features } from '../../types/UserInfo';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FeaturesCardProps {
  features: Features;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ features }) => {
  const theme = useTheme();

  const featureLabels = {
    touchScreen: 'Сенсорный экран',
    webGL: 'WebGL',
    canvas: 'Canvas',
    webRTC: 'WebRTC',
    webGPU: 'WebGPU',
    bluetooth: 'Bluetooth',
    geolocation: 'Геолокация',
    notifications: 'Уведомления',
    camera: 'Камера',
    microphone: 'Микрофон',
    accelerometer: 'Акселерометр',
    gyroscope: 'Гироскоп',
  };

  const featureData: ChartData<'doughnut'> = {
    labels: Object.values(featureLabels),
    datasets: [
      {
        data: Object.values(features).map(value => value ? 1 : 0),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
          '#9c27b0',
          '#2196f3',
          '#3f51b5',
          '#009688',
          '#ff5722',
          '#795548',
          '#607d8b',
        ],
      },
    ],
  };

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
          Поддерживаемые функции
        </Typography>
        <Box sx={{ height: 300 }}>
          <Doughnut 
            data={featureData} 
            options={{ 
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: 'right' as const,
                  labels: {
                    generateLabels: (chart) => {
                      const labels = chart.data.labels || [];
                      const dataset = chart.data.datasets[0];
                      const colors = dataset.backgroundColor as string[];
                      return labels.map((label, i) => ({
                        text: label as string,
                        fillStyle: colors[i],
                        strokeStyle: colors[i],
                        lineWidth: 1,
                        hidden: false,
                        index: i,
                      }));
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || '';
                      const value = context.raw === 1 ? 'Поддерживается' : 'Не поддерживается';
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeaturesCard; 