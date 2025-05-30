import React from 'react';
import { Card, CardContent, Typography, Grid, Stack, Chip } from '@mui/material';
import { MarketingInfo } from '../../types/UserInfo';

interface MarketingCardProps {
  marketingInfo: MarketingInfo;
}

const MarketingCard: React.FC<MarketingCardProps> = ({ marketingInfo }) => {
  return (
    <Card sx={{ 
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      }
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Маркетинговая информация
        </Typography>

        <Grid container spacing={3}>
          {/* Device and Browser Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Информация об устройстве
            </Typography>
            <Typography>Категория устройства: {
              marketingInfo.deviceCategory === 'mobile' ? 'Мобильный' :
              marketingInfo.deviceCategory === 'tablet' ? 'Планшет' : 'Компьютер'
            }</Typography>
            <Typography>Категория браузера: {
              marketingInfo.browserCategory === 'modern' ? 'Современный' : 'Устаревший'
            }</Typography>
            <Typography>Платформа: {
              marketingInfo.platform === 'windows' ? 'Windows' :
              marketingInfo.platform === 'mac' ? 'MacOS' :
              marketingInfo.platform === 'linux' ? 'Linux' :
              marketingInfo.platform === 'ios' ? 'iOS' :
              marketingInfo.platform === 'android' ? 'Android' : 'Другая'
            }</Typography>
            <Typography>Размер экрана: {
              marketingInfo.screenCategory === 'small' ? 'Маленький' :
              marketingInfo.screenCategory === 'medium' ? 'Средний' :
              marketingInfo.screenCategory === 'large' ? 'Большой' : 'Очень большой'
            }</Typography>
            <Typography>Производительность: {marketingInfo.performanceScore}%</Typography>
          </Grid>

          {/* User Engagement */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Вовлеченность пользователя
            </Typography>
            <Typography>Время на сайте: {Math.floor(marketingInfo.engagement.timeOnSite / 60)} мин</Typography>
            <Typography>Просмотрено страниц: {marketingInfo.engagement.pageViews}</Typography>
            <Typography>Глубина прокрутки: {marketingInfo.engagement.scrollDepth}%</Typography>
            {marketingInfo.engagement.lastVisit && (
              <Typography>
                Последний визит: {new Date(marketingInfo.engagement.lastVisit).toLocaleString('ru-RU')}
              </Typography>
            )}
            <Typography>Количество визитов: {marketingInfo.engagement.visitCount}</Typography>
            <Typography>
              Тип пользователя: {marketingInfo.engagement.returningVisitor ? 'Вернувшийся' : 'Новый'}
            </Typography>
          </Grid>

          {/* Technical Capabilities */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Технические возможности
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {Object.entries(marketingInfo.capabilities).map(([key, value]) => (
                <Chip
                  key={key}
                  label={
                    key === 'supportsModernWeb' ? 'Современный веб' :
                    key === 'supportsWebPayments' ? 'Веб-платежи' :
                    key === 'supportsProgressiveWebApps' ? 'PWA' :
                    key === 'supportsWebAssembly' ? 'WebAssembly' :
                    key === 'supportsWebWorkers' ? 'Web Workers' :
                    key === 'supportsWebSockets' ? 'WebSockets' : key
                  }
                  color={value ? 'primary' : 'default'}
                  variant={value ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Grid>

          {/* User Preferences */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Предпочтения пользователя
            </Typography>
            <Typography>
              Цветовая схема: {
                marketingInfo.preferences.colorPreference === 'dark' ? 'Тёмная' :
                marketingInfo.preferences.colorPreference === 'light' ? 'Светлая' : 'Авто'
              }
            </Typography>
            <Typography>Масштаб шрифта: {(marketingInfo.preferences.fontScale * 100).toFixed(0)}%</Typography>
            <Typography>
              Уменьшенная анимация: {marketingInfo.preferences.reducedMotion ? 'Да' : 'Нет'}
            </Typography>
            <Typography>
              Поддержка 3D: {marketingInfo.preferences.prefers3D ? 'Да' : 'Нет'}
            </Typography>
            <Typography>
              Минималистичный интерфейс: {marketingInfo.preferences.prefersMinimalUI ? 'Да' : 'Нет'}
            </Typography>
          </Grid>

          {/* User Segment */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Сегмент пользователя
            </Typography>
            <Typography>Ценность устройства: {
              marketingInfo.userSegment.deviceValue === 'high' ? 'Высокая' :
              marketingInfo.userSegment.deviceValue === 'medium' ? 'Средняя' : 'Низкая'
            }</Typography>
            <Typography>Качество соединения: {
              marketingInfo.userSegment.connectionQuality === 'excellent' ? 'Отличное' :
              marketingInfo.userSegment.connectionQuality === 'good' ? 'Хорошее' :
              marketingInfo.userSegment.connectionQuality === 'medium' ? 'Среднее' : 'Плохое'
            }</Typography>
            <Typography>Техническая подготовка: {
              marketingInfo.userSegment.technicalProficiency === 'advanced' ? 'Продвинутая' :
              marketingInfo.userSegment.technicalProficiency === 'intermediate' ? 'Средняя' : 'Базовая'
            }</Typography>
            {marketingInfo.userSegment.accessibilityNeeds.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Особые потребности:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {marketingInfo.userSegment.accessibilityNeeds.map((need, index) => (
                    <Chip
                      key={index}
                      label={
                        need === 'reduced-motion' ? 'Уменьшенная анимация' :
                        need === 'high-contrast' ? 'Высокий контраст' :
                        need === 'reduced-data' ? 'Экономия трафика' : need
                      }
                      size="small"
                    />
                  ))}
                </Stack>
              </>
            )}
          </Grid>

          {/* Session Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Информация о сессии
            </Typography>
            <Typography>Источник перехода: {marketingInfo.session.referrer || 'Прямой переход'}</Typography>
            <Typography>Страница входа: {marketingInfo.session.entryPage}</Typography>
            <Typography>
              Время входа: {new Date(marketingInfo.session.landingTime).toLocaleString('ru-RU')}
            </Typography>
            {marketingInfo.session.utmSource && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  UTM-метки:
                </Typography>
                <Typography>Источник: {marketingInfo.session.utmSource}</Typography>
                {marketingInfo.session.utmMedium && (
                  <Typography>Канал: {marketingInfo.session.utmMedium}</Typography>
                )}
                {marketingInfo.session.utmCampaign && (
                  <Typography>Кампания: {marketingInfo.session.utmCampaign}</Typography>
                )}
                {marketingInfo.session.utmTerm && (
                  <Typography>Ключевое слово: {marketingInfo.session.utmTerm}</Typography>
                )}
                {marketingInfo.session.utmContent && (
                  <Typography>Содержание: {marketingInfo.session.utmContent}</Typography>
                )}
              </>
            )}
          </Grid>

          {/* User Behavior */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Поведение пользователя
            </Typography>
            <Typography>Движения мыши: {marketingInfo.behavior.mouseMovement}</Typography>
            <Typography>Взаимодействия с клавиатурой: {marketingInfo.behavior.keyboardInteraction}</Typography>
            <Typography>Сенсорные взаимодействия: {marketingInfo.behavior.touchInteraction}</Typography>
            <Typography>Взаимодействия с формами: {marketingInfo.behavior.formInteraction}</Typography>
            <Typography>Взаимодействия с медиа: {marketingInfo.behavior.mediaInteraction}</Typography>
            <Typography>Копирование/вставка: {marketingInfo.behavior.copyPasteActions}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MarketingCard; 