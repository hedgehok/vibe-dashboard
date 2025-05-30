import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, useTheme, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserInfo } from '../types/UserInfo';
import { collectUserInfo } from '../utils/userInfoCollector';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await collectUserInfo();
      setUserInfo(data);
    };
    fetchData();
  }, []);

  if (!userInfo) return <Typography>Загрузка...</Typography>;

  const featureData = {
    labels: [
      'Сенсорный экран', 'WebGL', 'Canvas', 'WebRTC', 'WebGPU',
      'Bluetooth', 'Геолокация', 'Уведомления', 'Камера',
      'Микрофон', 'Акселерометр', 'Гироскоп'
    ],
    datasets: [
      {
        data: Object.values(userInfo.features).map(value => value ? 1 : 0),
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

  const performanceData = {
    labels: ['DOM Interactive', 'DOM Complete', 'Время загрузки'],
    datasets: [
      {
        label: 'Метрики производительности (мс)',
        data: [
          userInfo.performance.domInteractive,
          userInfo.performance.domComplete,
          userInfo.performance.loadTime,
        ],
        borderColor: theme.palette.primary.main,
        tension: 0.4,
      },
    ],
  };

  const memoryData = userInfo.performance.memoryUsage ? {
    labels: ['Использовано', 'Свободно', 'Лимит'],
    datasets: [
      {
        label: 'Использование памяти (МБ)',
        data: [
          userInfo.performance.memoryUsage.usedJSHeapSize / 1048576,
          (userInfo.performance.memoryUsage.totalJSHeapSize - userInfo.performance.memoryUsage.usedJSHeapSize) / 1048576,
          userInfo.performance.memoryUsage.jsHeapSizeLimit / 1048576,
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
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Информация о пользователе
      </Typography>

      <Grid container spacing={3}>
        {/* Browser Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация о браузере
              </Typography>
              <Typography>Название: {userInfo.browser.name}</Typography>
              <Typography>Версия: {userInfo.browser.version}</Typography>
              <Typography>Язык: {userInfo.browser.language}</Typography>
              <Typography>
                Cookies включены: {userInfo.browser.cookiesEnabled ? 'Да' : 'Нет'}
              </Typography>
              <Typography>Do Not Track: {userInfo.browser.doNotTrack ? 'Включено' : 'Выключено'}</Typography>
              <Typography>Точек касания: {userInfo.browser.maxTouchPoints}</Typography>
              <Typography>PDF просмотр: {userInfo.browser.pdfViewerEnabled ? 'Доступен' : 'Недоступен'}</Typography>
              {userInfo.browser.plugins.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Плагины:</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {userInfo.browser.plugins.map((plugin, index) => (
                      <Chip key={index} label={plugin} size="small" />
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* System Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Системная информация
              </Typography>
              <Typography>Операционная система: {userInfo.system.os}</Typography>
              <Typography>Платформа: {userInfo.system.platform}</Typography>
              <Typography>Разрешение экрана: {userInfo.system.screenResolution}</Typography>
              <Typography>Тип устройства: {userInfo.system.deviceType === 'desktop' ? 'Компьютер' : userInfo.system.deviceType}</Typography>
              {userInfo.system.deviceMemory && (
                <Typography>Память устройства: {userInfo.system.deviceMemory} ГБ</Typography>
              )}
              {userInfo.system.cpuCores && (
                <Typography>Количество ядер CPU: {userInfo.system.cpuCores}</Typography>
              )}
              <Typography>Глубина цвета: {userInfo.system.colorDepth} бит</Typography>
              <Typography>Pixel Ratio: {userInfo.system.pixelRatio}</Typography>
              {userInfo.system.maxTextureSize && (
                <Typography>Макс. размер текстуры: {userInfo.system.maxTextureSize}px</Typography>
              )}
              {userInfo.system.battery && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Батарея:</Typography>
                  <Typography>Уровень заряда: {userInfo.system.battery.level.toFixed(1)}%</Typography>
                  <Typography>Статус: {userInfo.system.battery.charging ? 'Заряжается' : 'Разряжается'}</Typography>
                  {userInfo.system.battery.charging ? (
                    <Typography>Время до полной зарядки: {Math.floor(userInfo.system.battery.chargingTime / 60)} мин</Typography>
                  ) : (
                    <Typography>Время до разрядки: {Math.floor(userInfo.system.battery.dischargingTime / 60)} мин</Typography>
                  )}
                </>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Network Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация о сети
              </Typography>
              <Typography>Статус: {userInfo.network.online ? 'В сети' : 'Не в сети'}</Typography>
              {userInfo.network.connectionType && (
                <Typography>Тип подключения: {userInfo.network.connectionType}</Typography>
              )}
              {userInfo.network.effectiveType && (
                <Typography>
                  Эффективный тип: {userInfo.network.effectiveType}
                </Typography>
              )}
              {userInfo.network.downlink && (
                <Typography>Скорость загрузки: {userInfo.network.downlink} Мбит/с</Typography>
              )}
              {userInfo.network.rtt && (
                <Typography>Время отклика: {userInfo.network.rtt} мс</Typography>
              )}
              {userInfo.network.saveData !== undefined && (
                <Typography>Режим экономии трафика: {userInfo.network.saveData ? 'Включен' : 'Выключен'}</Typography>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Location Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация о местоположении
              </Typography>
              <Typography>Часовой пояс: {userInfo.location.timezone}</Typography>
              <Typography>Основной язык: {userInfo.location.language}</Typography>
              {userInfo.location.region && (
                <Typography>Регион: {userInfo.location.region}</Typography>
              )}
              {userInfo.location.languages.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Доступные языки:</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {userInfo.location.languages.map((lang, index) => (
                      <Chip key={index} label={lang} size="small" />
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Media Preferences */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Предпочтения пользователя
              </Typography>
              <Typography>Тёмная тема: {userInfo.media.prefersDarkMode ? 'Предпочитает' : 'Не предпочитает'}</Typography>
              <Typography>Уменьшенное движение: {userInfo.media.prefersReducedMotion ? 'Да' : 'Нет'}</Typography>
              <Typography>Экономия трафика: {userInfo.media.prefersReducedData ? 'Да' : 'Нет'}</Typography>
              <Typography>Контрастность: {
                userInfo.media.prefersContrast === 'high' ? 'Высокая' :
                userInfo.media.prefersContrast === 'low' ? 'Низкая' : 'Стандартная'
              }</Typography>
              <Typography>Цветовая схема: {
                userInfo.media.colorScheme === 'dark' ? 'Тёмная' :
                userInfo.media.colorScheme === 'light' ? 'Светлая' : 'Не указана'
              }</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Features Chart */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Поддерживаемые функции
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={featureData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Метрики производительности
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={performanceData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Memory Usage */}
        {memoryData && (
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Использование памяти
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Bar data={memoryData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        )}

        {/* Marketing Information */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Маркетинговая информация
          </Typography>
        </Grid>

        {/* Device and Browser Info */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация об устройстве
              </Typography>
              <Typography>Категория устройства: {
                userInfo.marketing.deviceCategory === 'mobile' ? 'Мобильный' :
                userInfo.marketing.deviceCategory === 'tablet' ? 'Планшет' : 'Компьютер'
              }</Typography>
              <Typography>Категория браузера: {
                userInfo.marketing.browserCategory === 'modern' ? 'Современный' : 'Устаревший'
              }</Typography>
              <Typography>Платформа: {
                userInfo.marketing.platform === 'windows' ? 'Windows' :
                userInfo.marketing.platform === 'mac' ? 'MacOS' :
                userInfo.marketing.platform === 'linux' ? 'Linux' :
                userInfo.marketing.platform === 'ios' ? 'iOS' :
                userInfo.marketing.platform === 'android' ? 'Android' : 'Другая'
              }</Typography>
              <Typography>Размер экрана: {
                userInfo.marketing.screenCategory === 'small' ? 'Маленький' :
                userInfo.marketing.screenCategory === 'medium' ? 'Средний' :
                userInfo.marketing.screenCategory === 'large' ? 'Большой' : 'Очень большой'
              }</Typography>
              <Typography>Производительность: {userInfo.marketing.performanceScore}%</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* User Engagement */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Вовлеченность пользователя
              </Typography>
              <Typography>Время на сайте: {Math.floor(userInfo.marketing.engagement.timeOnSite / 60)} мин</Typography>
              <Typography>Просмотрено страниц: {userInfo.marketing.engagement.pageViews}</Typography>
              <Typography>Глубина прокрутки: {userInfo.marketing.engagement.scrollDepth}%</Typography>
              {userInfo.marketing.engagement.lastVisit && (
                <Typography>
                  Последний визит: {new Date(userInfo.marketing.engagement.lastVisit).toLocaleString('ru-RU')}
                </Typography>
              )}
              <Typography>Количество визитов: {userInfo.marketing.engagement.visitCount}</Typography>
              <Typography>
                Тип пользователя: {userInfo.marketing.engagement.returningVisitor ? 'Вернувшийся' : 'Новый'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Technical Capabilities */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Технические возможности
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {Object.entries(userInfo.marketing.capabilities).map(([key, value]) => (
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
            </CardContent>
          </StyledCard>
        </Grid>

        {/* User Preferences */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Предпочтения пользователя
              </Typography>
              <Typography>
                Цветовая схема: {
                  userInfo.marketing.preferences.colorPreference === 'dark' ? 'Тёмная' :
                  userInfo.marketing.preferences.colorPreference === 'light' ? 'Светлая' : 'Авто'
                }
              </Typography>
              <Typography>Масштаб шрифта: {(userInfo.marketing.preferences.fontScale * 100).toFixed(0)}%</Typography>
              <Typography>
                Уменьшенная анимация: {userInfo.marketing.preferences.reducedMotion ? 'Да' : 'Нет'}
              </Typography>
              <Typography>
                Поддержка 3D: {userInfo.marketing.preferences.prefers3D ? 'Да' : 'Нет'}
              </Typography>
              <Typography>
                Минималистичный интерфейс: {userInfo.marketing.preferences.prefersMinimalUI ? 'Да' : 'Нет'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* User Segment */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Сегмент пользователя
              </Typography>
              <Typography>Ценность устройства: {
                userInfo.marketing.userSegment.deviceValue === 'high' ? 'Высокая' :
                userInfo.marketing.userSegment.deviceValue === 'medium' ? 'Средняя' : 'Низкая'
              }</Typography>
              <Typography>Качество соединения: {
                userInfo.marketing.userSegment.connectionQuality === 'excellent' ? 'Отличное' :
                userInfo.marketing.userSegment.connectionQuality === 'good' ? 'Хорошее' :
                userInfo.marketing.userSegment.connectionQuality === 'medium' ? 'Среднее' : 'Плохое'
              }</Typography>
              <Typography>Техническая подготовка: {
                userInfo.marketing.userSegment.technicalProficiency === 'advanced' ? 'Продвинутая' :
                userInfo.marketing.userSegment.technicalProficiency === 'intermediate' ? 'Средняя' : 'Базовая'
              }</Typography>
              {userInfo.marketing.userSegment.accessibilityNeeds.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Особые потребности:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {userInfo.marketing.userSegment.accessibilityNeeds.map((need, index) => (
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
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Session Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Информация о сессии
              </Typography>
              <Typography>Источник перехода: {userInfo.marketing.session.referrer || 'Прямой переход'}</Typography>
              <Typography>Страница входа: {userInfo.marketing.session.entryPage}</Typography>
              <Typography>
                Время входа: {userInfo.marketing.session.landingTime.toLocaleString('ru-RU')}
              </Typography>
              {userInfo.marketing.session.utmSource && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    UTM-метки:
                  </Typography>
                  <Typography>Источник: {userInfo.marketing.session.utmSource}</Typography>
                  {userInfo.marketing.session.utmMedium && (
                    <Typography>Канал: {userInfo.marketing.session.utmMedium}</Typography>
                  )}
                  {userInfo.marketing.session.utmCampaign && (
                    <Typography>Кампания: {userInfo.marketing.session.utmCampaign}</Typography>
                  )}
                  {userInfo.marketing.session.utmTerm && (
                    <Typography>Ключевое слово: {userInfo.marketing.session.utmTerm}</Typography>
                  )}
                  {userInfo.marketing.session.utmContent && (
                    <Typography>Содержание: {userInfo.marketing.session.utmContent}</Typography>
                  )}
                </>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {/* User Behavior */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Поведение пользователя
              </Typography>
              <Typography>Движения мыши: {userInfo.marketing.behavior.mouseMovement}</Typography>
              <Typography>Взаимодействия с клавиатурой: {userInfo.marketing.behavior.keyboardInteraction}</Typography>
              <Typography>Сенсорные взаимодействия: {userInfo.marketing.behavior.touchInteraction}</Typography>
              <Typography>Взаимодействия с формами: {userInfo.marketing.behavior.formInteraction}</Typography>
              <Typography>Взаимодействия с медиа: {userInfo.marketing.behavior.mediaInteraction}</Typography>
              <Typography>Копирование/вставка: {userInfo.marketing.behavior.copyPasteActions}</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 