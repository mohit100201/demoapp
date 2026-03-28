import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: boolean;
}

const directionOffset = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const AnimatedSection = ({ children, className = "", delay = 0, direction = "up", scale = false }: Props) => (
  <motion.div
    initial={{
      opacity: 0,
      ...directionOffset[direction],
      ...(scale ? { scale: 0.95 } : {}),
    }}
    whileInView={{
      opacity: 1,
      x: 0,
      y: 0,
      ...(scale ? { scale: 1 } : {}),
    }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
