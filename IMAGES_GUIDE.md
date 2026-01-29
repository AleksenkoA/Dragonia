# Инструкция по получению изображений с dragonia.com

## Способ 1: Через браузер (самый простой)

1. Откройте https://dragonia.com/en/ в браузере
2. Нажмите F12 (или ПКМ → "Просмотреть код")
3. Перейдите на вкладку **Network** (Сеть)
4. Обновите страницу (F5)
5. В фильтре выберите **Img** (изображения)
6. Найдите нужные изображения и сохраните их:
   - ПКМ на изображении → "Open in new tab"
   - ПКМ → "Save image as..."
   - Сохраните в папку `assets/images/`

## Способ 2: Через консоль браузера

Откройте консоль (F12 → Console) и выполните:

```javascript
// Найти все изображения на странице
const images = document.querySelectorAll('img');
images.forEach((img, index) => {
    console.log(`${index + 1}. ${img.src} - ${img.alt || 'no alt'}`);
});

// Скачать все изображения (требует разрешения)
images.forEach((img, index) => {
    if (img.src.startsWith('http')) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = `image-${index}.${img.src.split('.').pop().split('?')[0]}`;
        link.click();
    }
});
```

## Способ 3: Через wget (для терминала)

```bash
# Скачать все изображения со страницы
wget -r -l 1 -H -nd -N -np -A.jpg,jpeg,png,gif,webp,svg -erobots=off https://dragonia.com/en/

# Или только изображения из определенной директории
wget -r -l 1 -H -nd -N -np -A.jpg,jpeg,png,gif,webp,svg https://dragonia.com/en/assets/images/
```

## Необходимые изображения для проекта:

### Обязательные:
- `logo.png` - Логотип Dragonia Casino (для header)
- `hero.webp` - Главное изображение для hero секции

### Рекомендуемые:
- Изображения игр (game-*.webp)
- Иконки преимуществ (advantage-*.png)
- Изображения для шагов регистрации (step-*.webp)
- Фоновые изображения (text*.webp)

## Временное решение:

Пока изображения не скачаны, можно использовать изображения из оригинального проекта `dude-spin-landing/assets/images/` - они уже скопированы в проект.

## Проверка изображений:

После добавления изображений проверьте пути в `index.html`:
- `assets/images/logo.png`
- `assets/images/hero.webp`
- И другие пути к изображениям
