#!/bin/bash
# Публикация сайта на GitHub Pages (бесплатно)
set -e

cd "$(dirname "$0")/.."

echo "→ Проверка входа в GitHub..."
if ! gh auth status >/dev/null 2>&1; then
  echo ""
  echo "Нужно войти в GitHub. Откроется браузер — следуйте инструкциям."
  gh auth login --web --git-protocol https
fi

USERNAME=$(gh api user -q .login)
REPO="kabardinka-rooms"
URL="https://${USERNAME}.github.io/${REPO}/"

echo "→ GitHub: ${USERNAME}"

if gh repo view "${USERNAME}/${REPO}" >/dev/null 2>&1; then
  echo "→ Репозиторий уже существует, отправляю изменения..."
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/${USERNAME}/${REPO}.git"
  git push -u origin main
else
  echo "→ Создаю публичный репозиторий и загружаю сайт..."
  gh repo create "${REPO}" --public --source=. --remote=origin --push
fi

echo "→ Включаю GitHub Pages..."
gh api "repos/${USERNAME}/${REPO}/pages" \
  -X POST \
  -f build_type=workflow \
  -f source[branch]=main \
  -f source[path]=/ 2>/dev/null \
  || gh api "repos/${USERNAME}/${REPO}/pages" \
  -X PUT \
  -f build_type=workflow \
  -f source[branch]=main \
  -f source[path]=/

echo ""
echo "✓ Сайт публикуется. Через 1–2 минуты откроется:"
echo "  ${URL}"
echo ""
echo "Обновите siteUrl в js/config.js на этот адрес и запушьте снова — QR-код обновится."
echo ""
echo "Проверить статус: gh run list --repo ${USERNAME}/${REPO}"
