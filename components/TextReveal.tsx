import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal = ({ children, className = "", delay = 0 }: Props) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  </div>
);

export default TextReveal;
