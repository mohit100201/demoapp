import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import { Star, Quote } from "lucide-react";
import type { TestimonialSection as TestimonialData } from "@/types/content";

const TestimonialSection = ({ data }: { data: TestimonialData["data"] }) => (
  <section className="section-padding bg-muted/50 overflow-hidden relative">
    {/* Decorative floating quotes */}
    <motion.div
      className="absolute top-20 left-10 text-primary/5"
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    >
      <Quote size={120} />
    </motion.div>
    <motion.div
      className="absolute bottom-20 right-10 text-primary/5"
      animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 10, repeat: Infinity }}
    >
      <Quote size={80} />
    </motion.div>

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
      <div className="grid md:grid-cols-3 gap-6">
        {data.testimonials.map((t, i) => (
          <AnimatedSection key={i} delay={i * 0.15} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
            <motion.div
              whileHover={{ y: -10, rotateY: 2, boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-xl bg-card border border-border h-full flex flex-col hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient border on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))" }}
              />

              <div className="relative z-10">
                {t.rating && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1, type: "spring", stiffness: 500 }}
                      >
                        <Star size={14} className="fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>
                )}
                <blockquote className="text-foreground leading-relaxed flex-1 italic">"{t.quote}"</blockquote>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t.author.charAt(0)}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
