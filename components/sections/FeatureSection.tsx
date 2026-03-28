import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import * as LucideIcons from "lucide-react";
import type { FeatureSection as FeatureData } from "@/types/content";

const iconMap: Record<string, React.ElementType> = LucideIcons as any;

const FeatureSection = ({ data }: { data: FeatureData["data"] }) => (
  <section className="section-padding relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
      backgroundSize: "40px 40px",
    }} />

    <div className="container-wide relative">
      <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
        {data.badge && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-primary/20"
          >
            {data.badge}
          </motion.span>
        )}
        <TextReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
        </TextReveal>
        {data.subtitle && (
          <TextReveal delay={0.1}>
            <p className="mt-4 text-muted-foreground text-lg">{data.subtitle}</p>
          </TextReveal>
        )}
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.features.map((feat, i) => {
          const Icon = iconMap[feat.icon] || LucideIcons.Star;
          return (
            <AnimatedSection key={i} delay={i * 0.08} direction={i % 2 === 0 ? "up" : "left"} scale>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300 h-full relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300"
                  >
                    <Icon size={22} className="text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                  <motion.div
                    className="h-0.5 bg-gradient-primary rounded-full mt-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeatureSection;
