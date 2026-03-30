export interface ProductImage {
  url: string
  filename: string
  alt?: string
}

export interface KeySpec {
  label: string
  value: string
}

export interface SpecSection {
  id: string
  label_ru: string
  params: string[]
}

export interface SpecSchema {
  label: string
  sections: SpecSection[]
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  wholeSalePrice?: number
  vipPrice?: number
  article: string
  xmlId?: string
  specType: string
  formFactor?: string
  productLine?: string
  specs: Record<string, string>
  images: ProductImage[]
  shortDescription?: string
  description?: string
  specSchema?: Record<string, SpecSchema>
  keySpecs?: KeySpec[]
}

export const SPEC_LABELS: Record<string, string> = {
  sensor_type: 'Тип сенсора',
  sensor_resolution: 'Разрешение сенсора',
  sensor_pixel_pitch: 'Размер пикселя',
  sensor_netd: 'NETD',
  sensor_spectral_range: 'Спектральный диапазон',
  sensor_frame_rate: 'Частота кадров',
  detection_range: 'Дальность обнаружения',
  optics_objective_lens: 'Объектив',
  optics_fov: 'Поле зрения',
  optics_fov_m100: 'Поле зрения на 100 м',
  optics_magnification: 'Оптическое увеличение',
  optics_digital_zoom: 'Цифровой зум',
  optics_eye_relief: 'Вынос выходного зрачка',
  optics_exit_pupil: 'Диаметр выходного зрачка',
  optics_diopter: 'Диоптрийная коррекция',
  reticle_count: 'Количество сеток',
  reticle_color: 'Цвет сетки',
  display_type: 'Тип дисплея',
  display_resolution: 'Разрешение дисплея',
  display_size: 'Размер дисплея',
  display_color_palette: 'Цветовые палитры',
  image_mode: 'Режимы изображения',
  lrf_safety_class: 'Класс безопасности',
  lrf_wavelength: 'Длина волны',
  lrf_range: 'Дальность',
  lrf_accuracy: 'Точность',
  max_recoil_power: 'Макс. отдача',
  mounting_brackets: 'Крепление',
  rav: 'RAV (запись)',
  manual_zeroing: 'Ручная пристрелка',
  zeroing_profiles: 'Профили пристрелки',
  pip: 'Картинка в картинке',
  ballistic_calculator: 'Баллистический калькулятор',
  image_calibration: 'Калибровка',
  photo_video_playback: 'Фото/видео',
  language: 'Язык',
  inbuilt_memory: 'Встроенная память',
  audio: 'Аудио',
  heat_track: 'Тепловой трек',
  osd_recording: 'OSD-запись',
  burn_prevention: 'Защита от прожига',
  azimuth: 'Азимут',
  local_album: 'Локальный альбом',
  battery_internal: 'Аккумулятор',
  battery_reverse_protection: 'Защита от переполюсовки',
  battery_life: 'Время работы',
  interface_usb_typec: 'USB Type-C',
  interface_wifi: 'Wi-Fi',
  interface_hotspot: 'Точка доступа',
  working_temperature: 'Рабочая температура',
  protection_level: 'Защита',
  weight: 'Вес',
  dimensions: 'Размеры',
  external_cable: 'Внешний кабель',
  other_accessories: 'Аксессуары',
}
