import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

const CountUp = ({ value, className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/^([^0-9]*)(\d+)(.*)$/);

  useEffect(() => {
    if (!isInView || !numericMatch) {
      if (isInView) setDisplay(value);
      return;
    }

    const prefix = numericMatch[1];
    const target = parseInt(numericMatch[2], 10);
    const suffix = numericMatch[3];
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {display}
    </motion.span>
  );
};

export default CountUp;
