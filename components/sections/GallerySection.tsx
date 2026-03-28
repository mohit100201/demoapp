import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import { ArrowUpRight } from "lucide-react";
import type { GallerySection as GalleryData } from "@/types/content";
import Link from "next/link";

const GallerySection = ({ data }: { data: GalleryData["data"] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? data.items : data.items.filter((i) => i.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide">
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
        {data.categories && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {data.categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                layout
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -10 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-glow transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-4xl font-bold text-muted-foreground/20 relative z-10"
                    >
                      {item.title.charAt(0)}
                    </motion.span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        {item.category && (
                          <motion.span
                            className="text-xs font-medium text-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {item.category}
                          </motion.span>
                        )}
                        <h3 className="font-semibold text-foreground mt-1">{item.title}</h3>
                      </div>
                      {item.link && (
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link href={item.link} className="p-2 rounded-xl hover:bg-muted transition-colors">
                            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
