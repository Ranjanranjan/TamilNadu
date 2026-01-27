import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { problems } from '@/data/problems';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import WisdomQuote from '@/components/WisdomQuote';

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient glow-overlay relative min-h-[80vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-7xl mb-6 block animate-float">🌟</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <motion.a
              href="#problems"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="divine-button inline-block"
            >
              {t('heroButton')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Wisdom Quote */}
      <WisdomQuote verseKey="home" />

      {/* Problems Section */}
      <section id="problems" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('problemsTitle')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('problemsSubtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/problem/${problem.slug}`}>
                  <div className="problem-box text-center h-full">
                    <span className="text-4xl mb-4 block">{problem.icon}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {t(problem.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(problem.descKey)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer removed as requested */}
    </div>
  );
};

export default Home;
