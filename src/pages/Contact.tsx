import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WisdomQuote from "@/components/WisdomQuote";
import { toast } from "@/hooks/use-toast";
import { API_BASE } from "../config/api";

const tamilNaduDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

const Contact = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value.trim()) {
      let filtered = tamilNaduDistricts.filter(district =>
        district.toLowerCase().includes(value.toLowerCase())
      );
      // Prioritize exact match at the top
      filtered = filtered.sort((a, b) => {
        if (a.toLowerCase() === value.toLowerCase()) return -1;
        if (b.toLowerCase() === value.toLowerCase()) return 1;
        return a.localeCompare(b);
      });
      setFilteredDistricts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredDistricts([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectDistrict = (district: string) => {
    setLocation(district);
    setShowSuggestions(false);
    setFilteredDistricts([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://tamilnadu.onrender.com/api/prayers", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    message,
    ageRange,
    phoneNumber,
    location,
  }),
});

      if (!res.ok) {
        throw new Error("Failed to submit prayer");
      }

      setSubmitted(true);
      setMessage("");
      setName("");
      setAgeRange("");
      setPhoneNumber("");
      setLocation("");

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
    { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/9176280304" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/Kuyavan_creations" },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1KEEfAVFz1/" },
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

              <div>
                <label className="block text-foreground font-medium mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">
                  Location (Required) - Tamil Nadu District
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type district name..."
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={() => location && setShowSuggestions(true)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary"
                    required
                  />
                  {showSuggestions && filteredDistricts.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredDistricts.map((district) => (
                        <div
                          key={district}
                          onClick={() => handleSelectDistrict(district)}
                          className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer"
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                    <Icon size={32} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      <WisdomQuote verseKey="contact" />
      <Footer />
    </div>
  );
};

export default Contact;
