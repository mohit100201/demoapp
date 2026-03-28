
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { Check, Sparkles } from "lucide-react";
import type { PricingSection as PricingData } from "@/types/content";
import Link from "next/link";

const PricingSection = ({ data }: { data: PricingData["data"] }) => (
  <section className="section-padding relative overflow-hidden">
    {/* Background glow */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <div className="container-wide relative">
      <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
        <TextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
        </TextReveal>
        {data.subtitle && (
          <TextReveal delay={0.1}>
            <p className="mt-4 text-muted-foreground text-lg">{data.subtitle}</p>
          </TextReveal>
        )}
      </AnimatedSection>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {data.plans.map((plan, i) => (
          <AnimatedSection key={i} delay={i * 0.15} scale>
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-6 rounded-2xl border h-full flex flex-col overflow-hidden ${
                plan.highlighted
                  ? "border-primary bg-gradient-card shadow-glow"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1"
                  >
                    <Sparkles size={12} />
                    Most Popular
                  </motion.div>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                </>
              )}
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <motion.span
                    className="text-4xl font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 + i * 0.1 }}
                  >
                    {plan.price}
                  </motion.span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + j * 0.06, type: "spring", stiffness: 500 }}
                      >
                        <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      </motion.div>
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <MagneticButton className="mt-6">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={plan.cta.link}
                      className={`block text-center py-3 rounded-xl font-medium text-sm transition-all relative overflow-hidden group ${
                        plan.highlighted
                          ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                          : "border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative">{plan.cta.text}</span>
                    </Link>
                  </motion.div>
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
