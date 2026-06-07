# Номера в Кабардинке — сайт для гостей

Статический сайт для сдачи 6 номеров. Без сборки, без зависимостей — легко править вручную.

## Быстрый старт

1. Откройте `js/config.js` и укажите:
   - `whatsappPhone` — ваш номер (например `"79001234567"`)
   - `siteUrl` — адрес сайта после публикации (для QR-кода)
   - описания номеров, достопримечательности

2. Добавьте фото номеров в `images/rooms/`:
   - `room-1.jpg` … `room-6.jpg`

3. Откройте `index.html` в браузере для проверки.

## Бесплатный хостинг (GitHub Pages)

```bash
# Создайте репозиторий на github.com, затем:
git remote add origin https://github.com/ВАШ-ЛОГИН/kabardinka-rooms.git
git add .
git commit -m "Initial site"
git push -u origin main
```

В GitHub: **Settings → Pages → Source: Deploy from branch → main / (root)**.

Сайт будет доступен по адресу:
`https://ВАШ-ЛОГИН.github.io/kabardinka-rooms`

Обновите `siteUrl` в `config.js` этим адресом и запушьте снова — QR-код обновится автоматически.

## QR-код

После публикации QR-код генерируется на странице сайта (секция «Доступ по QR-коду»).
Распечатайте его и повесьте на входе или в номерах.

## Структура

```
index.html       — главная страница
css/style.css    — стили
js/config.js     — все тексты, номера, WhatsApp (редактируйте здесь)
js/main.js       — логика (обычно не трогать)
images/rooms/    — фото номеров
```

## Альтернативный хостинг

- [Netlify Drop](https://app.netlify.com/drop) — перетащите папку проекта
- [Cloudflare Pages](https://pages.cloudflare.com/) — бесплатно, быстро
