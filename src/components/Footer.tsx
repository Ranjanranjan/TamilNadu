import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-heading text-lg text-foreground mb-4">{t('footerText')}</p>
        <p className="text-muted-foreground italic max-w-xl mx-auto mb-2">"{t('footerVerse')}"</p>
        <p className="text-primary font-medium">— {t('footerVerseRef')}</p>
        <p className="text-sm text-muted-foreground mt-8">© 2024 PeaceHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
