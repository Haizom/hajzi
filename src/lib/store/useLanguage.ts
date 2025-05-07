import { create } from 'zustand';
import i18n from '../i18n/config';

type LanguageStore = {
  language: string;
  setLanguage: (lang: string) => void;
};

export const useLanguage = create<LanguageStore>((set) => ({
  language: i18n.language,
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
}));