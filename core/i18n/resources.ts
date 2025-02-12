import en from '@/translations/en.json';
import he from '@/translations/he.json';
import ru from '@/translations/ru.json';

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  he: {
    translation: he,
  },
};

export type Language = keyof typeof resources;
