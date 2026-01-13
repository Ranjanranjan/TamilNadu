import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@/stores/languageStore';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">✝️</span>
          <span className="font-heading text-xl font-bold text-foreground">TamilNadu Gospel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">{t('home')}</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">{t('about')}</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">{t('contact')}</Link>
        </nav>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <span>{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
          <span className="text-sm font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
