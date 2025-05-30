import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { NetworkInfo } from '../../types/UserInfo';

interface NetworkInfoCardProps {
  networkInfo: NetworkInfo;
}

const NetworkInfoCard: React.FC<NetworkInfoCardProps> = ({ networkInfo }) => {
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
          Информация о сети
        </Typography>
        <Typography>Статус: {networkInfo.online ? 'В сети' : 'Не в сети'}</Typography>
        {networkInfo.connectionType && (
          <Typography>Тип подключения: {networkInfo.connectionType}</Typography>
        )}
        {networkInfo.effectiveType && (
          <Typography>
            Эффективный тип: {networkInfo.effectiveType}
          </Typography>
        )}
        {networkInfo.downlink && (
          <Typography>Скорость загрузки: {networkInfo.downlink} Мбит/с</Typography>
        )}
        {networkInfo.rtt && (
          <Typography>Время отклика: {networkInfo.rtt} мс</Typography>
        )}
        {networkInfo.saveData !== undefined && (
          <Typography>
            Режим экономии трафика: {networkInfo.saveData ? 'Включен' : 'Выключен'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkInfoCard; 