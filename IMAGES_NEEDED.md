# Необходимые изображения для Dragonia Casino

## Критически важные (обязательно заменить):

1. **logo.png** - Логотип Dragonia Casino (для левой боковой панели и header)
   - Путь: `assets/images/logo.png`
   - Размер: рекомендуется ~200x60px

2. **hero.webp** или **welcome-banner.webp** - Главное изображение для Welcome Bonus баннера
   - Путь: `assets/images/hero.webp`
   - Размер: рекомендуется ~1200x400px

## Иконки для боковой панели:

3. **promotions.png** - Иконка для PROMOTIONS
4. **tournaments.png** - Иконка для TOURNAMENTS  
5. **spin-rally.png** - Иконка для SPIN RALLY
6. **live-casino.png** - Иконка для LIVE CASINO

## Изображения игр (можно оставить или заменить):

7. **game-*.webp** - Изображения игр для секции Popular Games
   - game-gates-of-olympus.webp
   - game-new-years-eve-fortune.webp
   - game-crack-smash-piggy-bank.webp
   - game-wild-hot-40.webp
   - game-madame-veyra.webp
   - game-cash-connection-golden.webp

## Изображения для секций:

8. **advantage-*.png** - Иконки преимуществ
   - advantage-licensed.png
   - advantage-fair.png
   - advantage-mobile.png
   - advantage-payouts.png

9. **step-*.webp** - Изображения для шагов регистрации
   - step-play.webp
   - step-track-progress.webp
   - step-cash-out.webp
   - step-enjoy-rewards.webp

## Как скачать с dragonia.com:

### Способ 1: Через браузер (рекомендуется)

1. Откройте https://dragonia.com/en/ или https://dragonia2.com/
2. Нажмите F12 → вкладка **Network** → фильтр **Img**
3. Обновите страницу (F5)
4. Найдите нужные изображения:
   - Логотип: ищите файлы с "logo" в названии
   - Иконки: ищите файлы с названиями секций (promotions, tournaments, etc.)
   - Игры: ищите превью игр
5. ПКМ на изображении → "Open in new tab" → Сохранить как...

### Способ 2: Через консоль браузера

```javascript
// Найти все изображения
const images = document.querySelectorAll('img');
images.forEach((img, i) => {
    console.log(`${i+1}. ${img.src} - ${img.alt || 'no alt'}`);
});

// Скачать логотип
const logo = document.querySelector('img[alt*="logo" i], img[src*="logo" i]');
if (logo) console.log('Logo:', logo.src);
```

### Способ 3: Прямые ссылки (если известны)

Можно попробовать прямые ссылки на изображения:
- `https://dragonia.com/assets/images/logo.png`
- `https://dragonia.com/images/promotions.png`
- и т.д.

## После скачивания:

1. Сохраните все изображения в `assets/images/`
2. Убедитесь, что имена файлов совпадают с теми, что используются в HTML
3. Проверьте сайт в браузере

## Временное решение:

Пока изображения не скачаны, можно оставить текущие как временные - сайт будет работать, но с изображениями из оригинального проекта.
