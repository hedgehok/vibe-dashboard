import React from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import { LocationInfo } from '../../types/UserInfo';

interface LocationInfoCardProps {
  locationInfo: LocationInfo;
}

const LocationInfoCard: React.FC<LocationInfoCardProps> = ({ locationInfo }) => {
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
          Информация о местоположении
        </Typography>
        <Typography>Часовой пояс: {locationInfo.timezone}</Typography>
        <Typography>Основной язык: {locationInfo.language}</Typography>
        {locationInfo.region && (
          <Typography>Регион: {locationInfo.region}</Typography>
        )}
        {locationInfo.languages.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Доступные языки:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {locationInfo.languages.map((lang, index) => (
                <Chip key={index} label={lang} size="small" />
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationInfoCard; 