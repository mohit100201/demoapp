
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight, Sparkles } from "lucide-react";
import type { CtaSection as CtaData } from "@/types/content";
import Link from "next/link";

const CtaSection = ({ data }: { data: CtaData["data"] }) => (
  <section className="section-padding">
    <div className="container-tight">
      <AnimatedSection scale>
        <div className="relative rounded-3xl bg-gradient-primary p-10 md:p-16 text-center overflow-hidden">
          {/* Animated background shapes */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-background rounded-full blur-3xl" />
          </motion.div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary-foreground/30 rounded-full"
              style={{ top: `${15 + i * 10}%`, left: `${5 + i * 12}%` }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-xs font-medium mb-6 border border-primary-foreground/20"
            >
              <Sparkles size={12} />
              Get Started Today
            </motion.div>

            <TextReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                {data.title}
              </h2>
            </TextReveal>
            {data.subtitle && (
              <TextReveal delay={0.15}>
                <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
                  {data.subtitle}
                </p>
              </TextReveal>
            )}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <MagneticButton>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={data.primaryCta.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-background text-foreground font-medium hover:bg-background/90 transition-all relative overflow-hidden group shadow-lg"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">{data.primaryCta.text}</span>
                    <motion.span className="relative" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              </MagneticButton>
              {data.secondaryCta && (
                <MagneticButton>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={data.secondaryCta.link}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
                    >
                      {data.secondaryCta.text}
                    </Link>
                  </motion.div>
                </MagneticButton>
              )}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CtaSection;
