import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import type { ContentSection as ContentData } from "@/types/content";

const ContentSection = ({ data }: { data: ContentData["data"] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container-tight">
        <AnimatedSection>
          <div className={`flex flex-col md:flex-row gap-12 items-center ${data.imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
            <div className="flex-1">
              <TextReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.title}</h2>
              </TextReveal>
              {data.subtitle && (
                <TextReveal delay={0.1}>
                  <p className="mt-2 text-lg text-primary font-medium">{data.subtitle}</p>
                </TextReveal>
              )}
              <motion.div
                className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {data.content}
              </motion.div>
              <motion.div
                className="h-1 w-16 bg-gradient-primary rounded-full mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            {data.image !== undefined && (
              <motion.div className="flex-1" style={{ y: imageY }}>
                <motion.div
                  className="aspect-[4/3] rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="text-muted-foreground/40 text-sm relative z-10">Image</span>
                </motion.div>
              </motion.div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContentSection;
