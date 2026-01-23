import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { getProblemBySlug } from '@/data/problems';
import { useLanguageStore } from '@/stores/languageStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BibleVerse from '@/components/BibleVerse';
import { ArrowLeft } from 'lucide-react';

const ProblemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const problem = getProblemBySlug(slug || '');

  // Scroll to top when component loads or slug changes
  useEffect(() => {
    // Scroll immediately
    window.scrollTo(0, 0);
    // Also scroll after a small delay to ensure DOM is fully rendered
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, 100);
    return () => clearTimeout(scrollTimer);
  }, [slug]);

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const content = problem.content[language || 'en'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('backToHome')}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-6xl mb-4 block">{problem.icon}</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t(problem.titleKey)}</h1>
          </motion.div>

          {/* Why It Happens */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t('whyItHappens')}</h2>
            <ul className="space-y-3">
              {content.whyItHappens.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Practical Solutions */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t('practicalSolutions')}</h2>
            <ul className="space-y-3">
              {content.practicalSolutions.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-hope">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Spiritual Guidance */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t('spiritualGuidance')}</h2>
            <ul className="space-y-3">
              {content.spiritualGuidance.map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="text-primary">✝</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </main>

      <BibleVerse verseKey={problem.slug} />
      <Footer />
    </div>
  );
};

export default ProblemDetail;
