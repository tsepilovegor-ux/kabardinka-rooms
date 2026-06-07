/**
 * Настройки сайта — редактируйте этот файл вручную.
 * После изменений сохраните и обновите страницу.
 */

const SITE_CONFIG = {
  // Замените на ваш номер WhatsApp (только цифры, с кодом страны)
  whatsappPhone: "79048003360",

  // URL сайта после публикации (нужен для QR-кода)
  siteUrl: "https://ваш-логин.github.io/kabardinka-rooms",

  address: {
    city: "Геленджик",
    village: "село Кабардинка",
    street: "Восточный переулок, д. 6а",
    full: "Геленджик, село Кабардинка, Восточный переулок, д. 6а",
    seaWalk: "10 минут пешком до моря",
    mapUrl:
      "https://yandex.ru/maps/?text=Геленджик%2C%20Кабардинка%2C%20Восточный%20переулок%206а",
  },

  rooms: [
    {
      id: 1,
      name: "Номер 1",
      description:
        "Современный номер с кондиционером, ТВ, шкафом и отдельной ванной с душем. Двуспальная кровать, мини-холодильник.",
      capacity: "2 гостя",
      image: "images/rooms/room-1/01.png",
      images: [
        "images/rooms/room-1/01.png",
        "images/rooms/room-1/02.png",
        "images/rooms/room-1/03.png",
        "images/rooms/room-1/04.png",
        "images/rooms/room-1/05.png",
        "images/rooms/room-1/06.png",
        "images/rooms/room-1/07.png",
        "images/rooms/room-1/08.png",
        "images/rooms/room-1/09.png",
      ],
    },
    {
      id: 2,
      name: "Номер 2",
      description:
        "Светлый номер с двумя раздельными кроватями. Кондиционер, ТВ, мини-холодильник, шкаф и кресло. Отдельная ванная с дизайнерской золотой тумбой и душем.",
      capacity: "2 гостя",
      image: "images/rooms/room-2/01.png",
      images: [
        "images/rooms/room-2/01.png",
        "images/rooms/room-2/02.png",
        "images/rooms/room-2/03.png",
        "images/rooms/room-2/04.png",
        "images/rooms/room-2/05.png",
        "images/rooms/room-2/06.png",
      ],
    },
    {
      id: 3,
      name: "Номер 3",
      description:
        "Два самостоятельных номера в одном блоке. Первая комната — с двумя раздельными кроватями, яркий интерьер с медведем на стене, кондиционер и ТВ. Вторая — с большой двуспальной кроватью, терракотовым изголовьем, шкафом, рабочей зоной и креслом. Современная ванная с душем.",
      capacity: "до 4 гостей",
      image: "images/rooms/room-3/01.png",
      images: [
        "images/rooms/room-3/01.png",
        "images/rooms/room-3/02.png",
        "images/rooms/room-3/03.png",
        "images/rooms/room-3/04.png",
        "images/rooms/room-3/05.png",
        "images/rooms/room-3/06.png",
        "images/rooms/room-3/07.png",
      ],
    },
    {
      id: 4,
      name: "Номер 4",
      description:
        "Просторный номер для семьи с двуспальной кроватью и мягким изголовьем. Стильные обои с птицами, тёмно-зелёные акцентные стены, кондиционер и ТВ. Кресло у панорамного окна. Отдельная ванная с мраморной плиткой и дизайнерским зеркалом.",
      capacity: "3–4 гостя",
      image: "images/rooms/room-4/01.png",
      images: [
        "images/rooms/room-4/01.png",
        "images/rooms/room-4/02.png",
        "images/rooms/room-4/03.png",
        "images/rooms/room-4/04.png",
        "images/rooms/room-4/05.png",
      ],
    },
    {
      id: 5,
      name: "Номер 5",
      description: "Номер с отдельным входом.",
      capacity: "2 гостя",
      image: "images/rooms/room-5.jpg",
    },
    {
      id: 6,
      name: "Номер 6",
      description:
        "Уютный мансардный номер с деревянной отделкой и скошенным потолком. Две раздельные кровати, ТВ, рабочий стол и кресло, мансардное окно. Современная ванная с мраморной плиткой и душем.",
      capacity: "2 гостя",
      image: "images/rooms/room-6/01.png",
      images: [
        "images/rooms/room-6/01.png",
        "images/rooms/room-6/02.png",
        "images/rooms/room-6/03.png",
        "images/rooms/room-6/04.png",
        "images/rooms/room-6/05.png",
        "images/rooms/room-6/06.png",
      ],
    },
  ],

  attractions: [
    { name: "Пляж Кабардинки", distance: "10 мин пешком", icon: "🏖" },
    { name: "Сафари-парк", distance: "~2 км", icon: "🦁" },
    { name: "Дельфинарий «Оскар»", distance: "~5 км", icon: "🐬" },
    { name: "Колоннада и набережная", distance: "~6 км", icon: "🌊" },
    { name: "Олимпийский парк", distance: "~6 км", icon: "🏛" },
    { name: "Аквапарк «Золотая бухта»", distance: "~7 км", icon: "💦" },
    { name: "Канатная дорога (гора Маркотх)", distance: "~8 км", icon: "🚡" },
    { name: "Старый парк", distance: "~7 км", icon: "🌳" },
  ],
};
