import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProblemBySlug } from '@/data/problems';
import { useLanguageStore } from '@/stores/languageStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactFooter from '@/components/ContactFooter';
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


  // Form state for prayer request (must be before any early return)
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const content = problem.content[language || 'en'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://tamilnadu.onrender.com/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, ageRange, phoneNumber, location }),
      });
      if (!res.ok) throw new Error("Failed to submit prayer");
      setSubmitted(true);
      setMessage("");
      setName("");
      setAgeRange("");
      setPhoneNumber("");
      setLocation("");
    } catch (err) {
      setError("Failed to submit prayer request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
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




          {/* Dynamically render all custom content keys except spiritualGuidance */}
          {Object.keys(content)
            .filter(key => key !== 'spiritualGuidance')
            .map((key, idx) => (
              <motion.section
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="mb-12"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t(key)}</h2>
                <ul className="space-y-3">
                  {content[key].map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}

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


          {/* Centered Verse for Financial Distress (id 1) */}
          {problem.id === '1' && (
            <div className="text-center my-8">
              {(language || 'en') === 'ta' ? (
                <>
                  <p className="font-semibold text-lg mb-2 italic text-yellow-500">என் தேவன் தமது மகிமையுள்ள ஐசுவரியத்தின் படி<br />உங்கள் எல்லா தேவைகளையும் நிறைவேற்றுவார்.</p>
                  <p className="text-yellow-500 italic">பிலிப்பியர் 4:19</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg mb-2 italic text-yellow-500">And my God will meet all your needs according to His glorious riches in Christ Jesus.</p>
                  <p className="text-yellow-500 italic">Philippians 4:19</p>
                </>
              )}
            </div>
          )}

          {/* Centered Verse for Anxiety & Fear (id 2) */}
          {problem.id === '2' && (
            <div className="text-center my-8">
              {(language || 'en') === 'ta' ? (
                <>
                  <p className="font-semibold text-lg mb-2 italic text-yellow-500">“நீ பயப்படாதே, நான் உன்னோடு இருக்கிறேன்; திகையாதே, நான் உன் தேவன்; நான் உன்னை பலப்படுத்தி உனக்குச் சகாயம்பண்ணுவேன்; என் நீதியுடைய வலதுகரத்தினாலே உன்னைத்தாங்குவேன்.”</p>
                  <p className="text-yellow-500 italic">ஏசாயா 41:10</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg mb-2 italic text-yellow-500">So do not fear, for I am with you; do not be dismayed, for I am your God.<br />I will strengthen you and help you; I will uphold you with my righteous right hand.</p>
                  <p className="text-yellow-500 italic">Isaiah 41:10</p>
                </>
              )}
            </div>
          )}

          {/* Contact Form - show after verse and spiritual guidance, no social section */}
          <div className="bg-card rounded-2xl p-8 shadow-card mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 text-center">{t("contactTitle")}</h2>
            <p className="text-muted-foreground text-center mb-6">{t("contactSubtitle")}</p>
            {submitted ? (
              <div className="text-center text-green-600 font-semibold py-8">{t("prayerSubmitted")}</div>
            ) : (
              <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
                {error && <div className="text-red-600 text-center">{error}</div>}
                <div>
                  <label className="block text-foreground font-medium mb-2">{t("prayerMessage")} *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary resize-none"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-2">{t("yourName")}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-2">{t("ageRange")}</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                    value={ageRange}
                    onChange={e => setAgeRange(e.target.value)}
                  >
                    <option value="">--</option>
                    <option value="10-15">{t("age10to15")}</option>
                    <option value="16-19">{t("age16to19")}</option>
                    <option value="20-30">{t("age20to30")}</option>
                    <option value="30-45">{t("age30to45")}</option>
                    <option value="45+">{t("age45plus")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-foreground font-medium mb-2">Location (Required) - Tamil Nadu District</label>
                  <input
                    type="text"
                    placeholder="Type district name..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
                <button type="submit" className="divine-button w-full" disabled={loading}>
                  {loading ? t("submitting") : t("submitPrayer")}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer removed as requested */}
    </div>
  );
};

export default ProblemDetail;
