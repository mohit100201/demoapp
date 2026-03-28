import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";

import { Send, CheckCircle } from "lucide-react";
import type { ContactSection as ContactData } from "@/types/content";
import { toast } from "../ui/sonner";

const ContactSection = ({ data }: { data: ContactData["data"] }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({});
    setLoading(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container-tight relative">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
          </TextReveal>
          {data.subtitle && (
            <TextReveal delay={0.1}>
              <p className="mt-4 text-muted-foreground text-lg">{data.subtitle}</p>
            </TextReveal>
          )}
        </AnimatedSection>
        <AnimatedSection direction="up" scale>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
            {data.fields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                {field.type === "textarea" ? (
                  <motion.textarea
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                    rows={5}
                    whileFocus={{ scale: 1.01, borderColor: "hsl(var(--primary))" }}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  >
                    <option value="">{field.placeholder || "Select..."}</option>
                    <option value="5k-15k">$5,000 – $15,000</option>
                    <option value="15k-50k">$15,000 – $50,000</option>
                    <option value="50k-100k">$50,000 – $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                ) : (
                  <motion.input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.name]: e.target.value }))}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                )}
              </motion.div>
            ))}
            <MagneticButton className="w-full">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
                {sent ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 relative"
                  >
                    <CheckCircle size={18} /> Sent!
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-2 relative">
                    {loading ? "Sending..." : data.submitText || "Send Message"}
                    {!loading && <Send size={16} />}
                  </span>
                )}
              </motion.button>
            </MagneticButton>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
