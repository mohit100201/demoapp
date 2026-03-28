import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqSection as FaqData } from "@/types/content";

const FaqSection = ({ data }: { data: FaqData["data"] }) => (
  <section className="section-padding bg-muted/50 relative overflow-hidden">
    {/* Background decoration */}
    <motion.div
      className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity }}
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
      <AnimatedSection>
        <Accordion type="single" collapsible className="space-y-3">
          {data.faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 hover:border-primary/20 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default FaqSection;
