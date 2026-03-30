import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const PRODUCT_DATA = {
  name: 'RikaNV Ovod H50 LRF',
  slug: 'ovod-h50-lrf',
  price: 224300,
  wholeSalePrice: 190600,
  vipPrice: 171600,
  article: 'УТ-00001809',
  xmlId: '2c2f0092-9d32-11f0-8117-000c29ef6d0c',
  specType: 'thermal-scope',
  formFactor: 'riflescope',
  productLine: 'Ovod',
  specs: {
    sensor_type: 'Неохлаждаемый',
    sensor_resolution: '640×512',
    sensor_pixel_pitch: '12μm',
    sensor_netd: '≤25mK',
    sensor_spectral_range: '8-14μm',
    sensor_frame_rate: '50Hz',
    detection_range: '2600m',
    optics_objective_lens: '50mm F0.9',
    optics_fov: '8.8°×7.0°',
    optics_fov_m100: '15.4×12.3',
    optics_magnification: '2.8X',
    optics_digital_zoom: '1-4X',
    optics_eye_relief: '45mm',
    optics_exit_pupil: '6mm',
    optics_diopter: '-5~+5',
    reticle_count: '8',
    reticle_color: '5 (Чёрный, Белый, Красный, Зелёный, Синий)',
    display_type: 'AMOLED',
    display_resolution: '1024×768',
    display_size: '0.39 inch',
    display_color_palette: '7',
    image_mode: 'Лес/Дождь',
    lrf_safety_class: 'Класс 1',
    lrf_wavelength: '905nm',
    lrf_range: '1200m',
    lrf_accuracy: '±1m@100m',
    max_recoil_power: '6000J',
    mounting_brackets: 'Планка Пикатинни',
    rav: 'Да',
    manual_zeroing: 'Да',
    zeroing_profiles: '6',
    pip: 'Да',
    ballistic_calculator: 'Да',
    image_calibration: 'Крышка/Шторка',
    photo_video_playback: 'Да',
    language: 'Английский/Русский',
    inbuilt_memory: '64GB',
    audio: 'Да',
    heat_track: 'Да',
    osd_recording: 'Да',
    burn_prevention: 'Да',
    azimuth: 'Да',
    local_album: 'Да',
    battery_internal: '18650×1',
    battery_reverse_protection: 'Да',
    battery_life: '8h',
    interface_usb_typec: 'Да',
    interface_wifi: 'Да',
    interface_hotspot: 'Да',
    working_temperature: '-20℃—+50℃',
    protection_level: 'IP67',
    weight: '675g±5',
    dimensions: '220.1×76.8×70.8mm',
    external_cable: 'USB-кабель',
    other_accessories: 'Планка Пикатинни, наглазник',
  },
  images: [
    { url: 'http://media.rikanv.ru/images/ovod-h50-lrf-01-front.png', filename: 'ovod-h50-lrf-01-front.png', alt: 'RikaNV Ovod H50 LRF — вид спереди' },
    { url: 'http://media.rikanv.ru/images/ovod-h50-lrf-02-side.png', filename: 'ovod-h50-lrf-02-side.png', alt: 'RikaNV Ovod H50 LRF — вид сбоку' },
    { url: 'http://media.rikanv.ru/images/ovod-h50-lrf-03-rear.png', filename: 'ovod-h50-lrf-03-rear.png', alt: 'RikaNV Ovod H50 LRF — вид сзади' },
    { url: 'http://media.rikanv.ru/images/ovod-h50-lrf-04-top.png', filename: 'ovod-h50-lrf-04-top.png', alt: 'RikaNV Ovod H50 LRF — вид сверху' },
    { url: 'http://media.rikanv.ru/images/ovod-h50-lrf-05-detail.png', filename: 'ovod-h50-lrf-05-detail.png', alt: 'RikaNV Ovod H50 LRF — детали' },
  ],
  shortDescription: 'Тепловизионный прицел RikaNV OVOD H50 LRF — флагман линейки OVOD, объединяющий матрицу 640x512 (12 мкм), сверхсветосильный объектив 50mm F0.9 и полноценный баллистический комплекс (дальномер 1200 м + встроенный баллистический калькулятор).',
  description: `# Тепловизионный прицел RikaNV OVOD H50 LRF

## Ключевые особенности

**Сенсор 640x512 @ 12 мкм** — высокая плотность пикселей для точной идентификации цели на больших дистанциях. Дальность обнаружения фигуры человека — до 2600 м.

**Системный NETD менее 15 мК** — флагманская чувствительность для доступного сегмента, результат синергии VOx-сенсора, объектива F0.9 и алгоритмов обработки RikaNV.

**Атермальный объектив 50mm F0.9** — собирает на 23% больше теплового сигнала, чем объективы F1.0, и сохраняет стабильный фокус при температурах от −30 °C до +50 °C без ручной подстройки.

**Баллистический комплекс** — дальномер до 1200 м + баллистический калькулятор с автоматическим сдвигом сетки. Учитывает скорость пули, вес, BC (G1/G7), высоту прицела над стволом, атмосферное давление и температуру пороха. Поддерживает ручной ввод дистанции, угла и готовой поправки в MIL.

**AMOLED-дисплей 1024x768** — идеальный чёрный цвет, высочайшая контрастность, стабильная работа на морозе.

**8 прицельных сеток**, 6 цветов (включая реверс), поддержка FFP — сетка масштабируется с зумом, сохраняя угловые размеры.

**10 часов автономной работы** от одного сменного аккумулятора 18650.

## Баллистический калькулятор

Встроенный баллистический калькулятор автоматически рассчитывает поправки на основе данных дальномера. Поддерживает ввод баллистических коэффициентов G1 и G7, учитывает атмосферные условия, высоту прицела над осью ствола.

6 независимых профилей пристрелки позволяют быстро переключаться между различными боеприпасами или оружием без повторной пристрелки.

## Видеозапись и подключения

Встроенная память 64 ГБ для записи фото и видео. Функция RAV (Recoil Activated Video) автоматически сохраняет момент выстрела. OSD-запись накладывает параметры прицела на видео.

Wi-Fi модуль позволяет транслировать изображение на смартфон и управлять прицелом через мобильное приложение.

## Условия эксплуатации

Прицел сертифицирован по стандарту IP67 (полная пыле- и влагозащита, погружение до 1 м). Рабочий диапазон температур от −20 °C до +50 °C. Выдерживает отдачу до 6000 Дж, что делает его совместимым с любым охотничьим оружием, включая крупнокалиберные магнум-патроны.

## Комплектация

- Тепловизионный прицел RikaNV OVOD H50 LRF
- Аккумулятор 18650
- USB-кабель для зарядки и передачи данных
- Планка Пикатинни
- Наглазник
- Салфетка для оптики
- Руководство пользователя
- Гарантийный талон`,
  specSchema: {
    'thermal-scope': {
      label: 'Тепловизионный прицел',
      sections: [
        { id: 'sensor_section', label_ru: 'Тепловизионный модуль', params: ['sensor_type', 'sensor_resolution', 'sensor_pixel_pitch', 'sensor_netd', 'sensor_spectral_range', 'sensor_frame_rate', 'detection_range'] },
        { id: 'optics_section', label_ru: 'Оптика', params: ['optics_objective_lens', 'optics_fov', 'optics_fov_m100', 'optics_magnification', 'optics_digital_zoom', 'optics_eye_relief', 'optics_exit_pupil', 'optics_diopter'] },
        { id: 'reticle_section', label_ru: 'Прицельная марка', params: ['reticle_count', 'reticle_color'] },
        { id: 'display_section', label_ru: 'Дисплей', params: ['display_type', 'display_resolution', 'display_size', 'display_color_palette', 'image_mode'] },
        { id: 'lrf_section', label_ru: 'Лазерный дальномер', params: ['lrf_safety_class', 'lrf_wavelength', 'lrf_range', 'lrf_accuracy'] },
        { id: 'function_section', label_ru: 'Функции', params: ['max_recoil_power', 'mounting_brackets', 'rav', 'manual_zeroing', 'zeroing_profiles', 'pip', 'ballistic_calculator', 'image_calibration', 'photo_video_playback', 'language', 'inbuilt_memory', 'audio', 'heat_track', 'osd_recording', 'burn_prevention', 'azimuth', 'local_album'] },
        { id: 'battery_section', label_ru: 'Питание', params: ['battery_internal', 'battery_reverse_protection', 'battery_life'] },
        { id: 'interface_section', label_ru: 'Интерфейсы', params: ['interface_usb_typec', 'interface_wifi', 'interface_hotspot'] },
        { id: 'environment_section', label_ru: 'Условия эксплуатации', params: ['working_temperature', 'protection_level', 'weight', 'dimensions'] },
        { id: 'accessories_section', label_ru: 'Комплектация', params: ['external_cable', 'other_accessories'] },
      ],
    },
  },
  keySpecs: [
    { label: 'Сенсор', value: '640×512' },
    { label: 'Обнаружение', value: '2600 м' },
    { label: 'Объектив', value: '50mm F0.9' },
    { label: 'Дальномер', value: 'LRF 1200 м' },
  ],
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  const { totalDocs: existingUsers } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@rikanv.ru',
        password: 'admin123',
      },
    })
    console.log('Created admin user: admin@rikanv.ru / admin123')
  }

  // Check if product already exists
  const { totalDocs: existingProducts } = await payload.find({
    collection: 'products',
    where: { slug: { equals: PRODUCT_DATA.slug } },
    limit: 1,
  })

  if (existingProducts === 0) {
    await payload.create({
      collection: 'products',
      data: PRODUCT_DATA,
    })
    console.log(`Created product: ${PRODUCT_DATA.name}`)
  } else {
    console.log(`Product already exists: ${PRODUCT_DATA.name}`)
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
