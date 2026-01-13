import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
  language: 'en' | 'ta' | null;
  hasSelectedLanguage: boolean;
  setLanguage: (lang: 'en' | 'ta') => void;
  resetLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: null,
      hasSelectedLanguage: false,
      setLanguage: (lang) => set({ language: lang, hasSelectedLanguage: true }),
      resetLanguage: () => set({ language: null, hasSelectedLanguage: false }),
    }),
    {
      name: 'tamilnadu-language',
    }
  )
);
