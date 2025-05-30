import React from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { BrowserInfo } from '../../types/UserInfo';

interface BrowserInfoCardProps {
  browserInfo: BrowserInfo;
}

const BrowserInfoCard: React.FC<BrowserInfoCardProps> = ({ browserInfo }) => {
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
          Информация о браузере
        </Typography>
        <Typography>Название: {browserInfo.name}</Typography>
        <Typography>Версия: {browserInfo.version}</Typography>
        <Typography>Язык: {browserInfo.language}</Typography>
        <Typography>
          Cookies включены: {browserInfo.cookiesEnabled ? 'Да' : 'Нет'}
        </Typography>
        <Typography>Do Not Track: {browserInfo.doNotTrack ? 'Включено' : 'Выключено'}</Typography>
        <Typography>Точек касания: {browserInfo.maxTouchPoints}</Typography>
        <Typography>PDF просмотр: {browserInfo.pdfViewerEnabled ? 'Доступен' : 'Недоступен'}</Typography>
        {browserInfo.plugins.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Плагины:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {browserInfo.plugins.map((plugin, index) => (
                <Chip key={index} label={plugin} size="small" />
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BrowserInfoCard; 