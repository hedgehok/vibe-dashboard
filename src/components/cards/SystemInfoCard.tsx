import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { SystemInfo } from '../../types/UserInfo';

interface SystemInfoCardProps {
  systemInfo: SystemInfo;
}

const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ systemInfo }) => {
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
          Системная информация
        </Typography>
        <Typography>Операционная система: {systemInfo.os}</Typography>
        <Typography>Платформа: {systemInfo.platform}</Typography>
        <Typography>Разрешение экрана: {systemInfo.screenResolution}</Typography>
        <Typography>
          Тип устройства: {systemInfo.deviceType === 'desktop' ? 'Компьютер' : systemInfo.deviceType}
        </Typography>
        {systemInfo.deviceMemory && (
          <Typography>Память устройства: {systemInfo.deviceMemory} ГБ</Typography>
        )}
        {systemInfo.cpuCores && (
          <Typography>Количество ядер CPU: {systemInfo.cpuCores}</Typography>
        )}
        <Typography>Глубина цвета: {systemInfo.colorDepth} бит</Typography>
        <Typography>Pixel Ratio: {systemInfo.pixelRatio}</Typography>
        {systemInfo.maxTextureSize && (
          <Typography>Макс. размер текстуры: {systemInfo.maxTextureSize}px</Typography>
        )}
        {systemInfo.battery && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Батарея:</Typography>
            <Typography>Уровень заряда: {systemInfo.battery.level.toFixed(1)}%</Typography>
            <Typography>Статус: {systemInfo.battery.charging ? 'Заряжается' : 'Разряжается'}</Typography>
            {systemInfo.battery.charging ? (
              <Typography>
                Время до полной зарядки: {Math.floor(systemInfo.battery.chargingTime / 60)} мин
              </Typography>
            ) : (
              <Typography>
                Время до разрядки: {Math.floor(systemInfo.battery.dischargingTime / 60)} мин
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemInfoCard; 