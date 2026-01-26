import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { title: 'whoWeAre', text: 'whoWeAreText', icon: '🤝' },
    { title: 'whyWeDoThis', text: 'whyWeDoThisText', icon: '❤️' },
    { title: 'sharingGodsLove', text: 'sharingGodsLoveText', icon: '💡' },
    { title: 'hopeAndSalvation', text: 'hopeAndSalvationText', icon: '🌟' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">{t('aboutTitle')}</h1>
            <p className="text-muted-foreground text-lg">{t('aboutSubtitle')}</p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{section.icon}</span>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t(section.title)}</h2>
                    <p className="text-muted-foreground leading-relaxed">{t(section.text)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
