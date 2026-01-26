import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

const ContactFooter = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/9176280304" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/Kuyavan_creations" },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1KEEfAVFz1/" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 px-6 bg-card"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          {t('contactTitle')}
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          {t('contactSubtitle')}
        </p>
        <p className="text-foreground mb-8">
          {t('contactSubtitle')} - Share what you're going through with us.
        </p>
        
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors hover:scale-110"
              >
                <Icon size={36} />
              </a>
            );
          })}
        </div>

        <p className="text-muted-foreground text-sm">
          {t('getInTouchSubtitle')}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactFooter;
