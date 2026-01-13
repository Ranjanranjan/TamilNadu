import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@/stores/languageStore';
import { useNavigate } from 'react-router-dom';

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: 'en' | 'ta') => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    navigate('/');
  };

  return (
    <div className="min-h-screen hero-gradient glow-overlay flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-6xl">✝️</span>
        </motion.div>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
          TamilNadu Gospel
        </h1>
        <p className="text-lg text-muted-foreground mb-4">தமிழ்நாடு சுவிசேஷம்</p>
        <p className="text-muted-foreground mb-12">Select Your Language / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLanguageSelect('ta')}
            className="language-card group"
          >
            <span className="text-5xl mb-4">🇮🇳</span>
            <span className="font-heading text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">தமிழ்</span>
            <span className="text-muted-foreground mt-1">Tamil</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLanguageSelect('en')}
            className="language-card group"
          >
            <span className="text-5xl mb-4">🇬🇧</span>
            <span className="font-heading text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">English</span>
            <span className="text-muted-foreground mt-1">ஆங்கிலம்</span>
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-sm text-muted-foreground italic font-heading"
        >
          "Come to me, all you who are weary and burdened, and I will give you rest."
          <br />
          <span className="text-primary">— Matthew 11:28</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;
