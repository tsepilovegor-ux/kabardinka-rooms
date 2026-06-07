/**
 * Настройки сайта — редактируйте этот файл вручную.
 * После изменений сохраните и обновите страницу.
 */

const SITE_CONFIG = {
  // Замените на ваш номер WhatsApp (только цифры, с кодом страны)
  whatsappPhone: "79128003350",

  // URL сайта после публикации (нужен для QR-кода)
  siteUrl: "https://tsepilovegor-ux.github.io/kabardinka-rooms",

  // Фото на главном экране (меняются автоматически)
  heroSlideInterval: 5000,
  heroSlides: [
    "images/hero/01.png",
    "images/hero/02.png",
  ],

  // Общие зоны (карусель перед номерами)
  sharedSlideInterval: 4500,
  sharedSpaces: [
    {
      name: "Общая кухня",
      icon: "🍳",
      description: "Просторная кухня с плитой, холодильником и всем необходимым для приготовления завтрака и ужина.",
    },
    {
      name: "Коридор",
      icon: "🚪",
      description: "Светлый коридор с удобной планировкой — легко добраться до номеров и общих зон.",
    },
    {
      name: "Бассейн",
      icon: "🏊",
      description: "Бассейн на территории — освежиться после пляжа или провести вечер у воды.",
    },
    {
      name: "Мангальная зона",
      icon: "🔥",
      description: "Уютное место для барбекю — мангал, стол и скамейки для отдыха на свежем воздухе.",
    },
  ],

  address: {
    city: "Геленджик",
    village: "село Кабардинка",
    street: "Восточный переулок, д. 6а",
    full: "Геленджик, село Кабардинка, Восточный переулок, д. 6а",
    seaWalk: "15 минут пешком до моря",
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
        "Светлый номер с двуспальной и односпальной кроватью — удобен для семьи из трёх человек. Стильный интерьер в серо-синих тонах, шкаф, кресло, кондиционер. Современная ванная с мраморной плиткой и душем.",
      capacity: "до 3 гостей",
      image: "images/rooms/room-3/01.png",
      images: [
        "images/rooms/room-3/01.png",
        "images/rooms/room-3/02.png",
        "images/rooms/room-3/03.png",
        "images/rooms/room-3/04.png",
        "images/rooms/room-3/05.png",
        "images/rooms/room-3/06.png",
      ],
    },
    {
      id: 4,
      name: "Номер 4",
      description:
        "Двухкомнатный номер для большой семьи. Первая комната — с двумя раздельными кроватями, яркий интерьер с медведем на стене, кондиционер и ТВ. Вторая — с большой двуспальной кроватью, терракотовым изголовьем, шкафом, рабочей зоной и креслом. Общая ванная с душем.",
      capacity: "до 6 гостей",
      image: "images/rooms/room-4-family/01.png",
      images: [
        "images/rooms/room-4-family/01.png",
        "images/rooms/room-4-family/02.png",
        "images/rooms/room-4-family/03.png",
        "images/rooms/room-4-family/04.png",
        "images/rooms/room-4-family/05.png",
        "images/rooms/room-4-family/06.png",
        "images/rooms/room-4-family/07.png",
      ],
    },
    {
      id: 5,
      name: "Номер 5",
      description: "Описание добавите позже.",
      capacity: "2 гостя",
      image: "images/rooms/room-5.jpg",
    },
    {
      id: 6,
      name: "Номер 6",
      description:
        "Уютный номер для двоих с двуспальной кроватью и мягким изголовьем. Стильные обои с птицами, тёмно-зелёные акцентные стены, кондиционер и ТВ. Кресло у панорамного окна. Отдельная ванная с мраморной плиткой и дизайнерским зеркалом.",
      capacity: "2 гостя",
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
      id: 7,
      name: "Номер 7",
      description: "Описание добавите позже.",
      capacity: "2 гостя",
      image: "images/rooms/room-7.jpg",
    },
    {
      id: 8,
      name: "Номер 8",
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
    { name: "Пляж Кабардинки", distance: "15 мин пешком", icon: "🏖" },
    { name: "Сафари-парк", distance: "~2 км", icon: "🦁" },
    { name: "Дельфинарий «Оскар»", distance: "~5 км", icon: "🐬" },
    { name: "Колоннада и набережная", distance: "~6 км", icon: "🌊" },
    { name: "Олимпийский парк", distance: "~6 км", icon: "🏛" },
    { name: "Аквапарк «Золотая бухта»", distance: "~7 км", icon: "💦" },
    { name: "Канатная дорога (гора Маркотх)", distance: "~8 км", icon: "🚡" },
    { name: "Старый парк", distance: "~7 км", icon: "🌳" },
  ],
};
