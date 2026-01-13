import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BibleVerse from "@/components/BibleVerse";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/prayers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Anonymous",
          message,
          ageRange,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit prayer");
      }

      setSubmitted(true);
      setMessage("");
      setName("");
      setAgeRange("");

      toast({
        title: t("prayerSubmitted"),
        description: t("prayerSubmittedText"),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit prayer request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const socialLinks = [
    { name: "WhatsApp", icon: "💬", url: "https://wa.me/9176280304" },
    { name: "Instagram", icon: "📷", url: "https://www.instagram.com/Kuyavan_creations" },
    { name: "Facebook", icon: "📘", url: "https://www.facebook.com/share/1KEEfAVFz1/" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              {t("contactTitle")}
            </h1>
            <p className="text-muted-foreground">{t("contactSubtitle")}</p>
          </motion.div>

          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-card space-y-6"
            >
              <div>
                <label className="block text-foreground font-medium mb-2">
                  {t("prayerMessage")} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">
                  {t("yourName")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">
                  {t("ageRange")}
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                >
                  <option value="">--</option>
                  <option value="10-15">{t("age10to15")}</option>
                  <option value="16-19">{t("age16to19")}</option>
                  <option value="20-30">{t("age20to30")}</option>
                  <option value="30-45">{t("age30to45")}</option>
                  <option value="45+">{t("age45plus")}</option>
                </select>
              </div>

              <button type="submit" className="divine-button w-full">
                {t("submitPrayer")}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl p-8 shadow-card text-center"
            >
              <span className="text-5xl mb-4 block">🙏</span>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {t("prayerSubmitted")}
              </h2>
              <p className="text-muted-foreground">{t("prayerSubmittedText")}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {t("getInTouch")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("getInTouchSubtitle")}
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl hover:scale-110 transition-transform"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <BibleVerse verseKey="contact" />
      <Footer />
    </div>
  );
};

export default Contact;
