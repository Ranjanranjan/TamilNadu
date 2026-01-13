import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface BibleVerseProps {
  verseKey: string;
}

const BibleVerse = ({ verseKey }: BibleVerseProps) => {
  const { t } = useTranslation();
  const text = t(`verses.${verseKey}.text`);
  const reference = t(`verses.${verseKey}.reference`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 px-6 bg-card"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bible-verse text-xl md:text-2xl text-foreground">
          {text}
        </div>
        <p className="text-center text-primary font-semibold mt-4">— {reference}</p>
      </div>
    </motion.div>
  );
};

export default BibleVerse;
