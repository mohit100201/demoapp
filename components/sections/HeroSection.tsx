
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import CountUp from "@/components/CountUp";
import type { HeroSection as HeroData } from "@/types/content";
import Link from "next/link";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const floatingVariants2 = {
  animate: {
    y: [0, 15, 0],
    x: [0, 10, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const HeroSection = ({ data }: { data: HeroData["data"] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-hero relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y: bgY }}>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants2}
          animate="animate"
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        />
        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Grid dots with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
        }}
      />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full"
            style={{ top: `${30 + i * 20}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
          />
        ))}
      </div>

      <motion.div
        className="container-tight relative z-10 w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ opacity }}
      >
        {data.badge && (
          <motion.div variants={staggerItem}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {data.badge}
            </motion.div>
          </motion.div>
        )}

        <motion.div variants={staggerItem}>
          <TextReveal>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
              {data.title}
            </h1>
          </TextReveal>
          {data.highlightedText && (
            <TextReveal delay={0.1}>
              <motion.span
                className="text-gradient inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {data.highlightedText}
              </motion.span>
            </TextReveal>
          )}
        </motion.div>

        <motion.div variants={staggerItem}>
          <TextReveal delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>
          </TextReveal>
        </motion.div>

        {(data.primaryCta || data.secondaryCta) && (
          <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-4">
            {data.primaryCta && (
              <MagneticButton>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={data.primaryCta.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-all relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%", skewX: "-15deg" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative">{data.primaryCta.text}</span>
                    <motion.span
                      className="relative"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
              </MagneticButton>
            )}
            {data.secondaryCta && (
              <MagneticButton>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={data.secondaryCta.link}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                    {data.secondaryCta.text}
                  </Link>
                </motion.div>
              </MagneticButton>
            )}
          </motion.div>
        )}

        {data.stats && (
          <motion.div
            variants={staggerItem}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
          >
            {data.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group cursor-default"
              >
                <CountUp value={stat.value} className="text-3xl md:text-4xl font-bold text-foreground block" />
                <motion.div
                  className="h-0.5 w-0 bg-primary rounded-full mt-2 group-hover:w-8 transition-all duration-300"
                />
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
