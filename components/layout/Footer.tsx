"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const footerLinks = [
  {
    title: "Company",
    items: [
      { href: "/about", l: "About" },
      { href: "/services", l: "Services" },
      { href: "/blog", l: "Blog" },
      { href: "/contact", l: "Contact" },
    ],
  },
  {
    title: "Work",
    items: [
      { href: "/portfolio", l: "Portfolio" },
      { href: "/case-studies", l: "Case Studies" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card relative overflow-hidden">
    {/* Subtle gradient */}
    <motion.div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/3 rounded-full blur-3xl"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <div className="container-wide py-12 md:py-16 relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-2 md:col-span-1"
        >
          <Link href="/" className="text-xl font-bold text-foreground inline-block">
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
              Apex<span className="text-gradient">.</span>
            </motion.span>
          </Link>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Building premium digital experiences for ambitious teams worldwide.
          </p>
        </motion.div>

        {/* Links */}
        {footerLinks.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (gi + 1) * 0.1 }}
          >
            <h4 className="font-semibold text-sm text-foreground mb-3">
              {group.title}
            </h4>

            <div className="flex flex-col gap-2">
              {group.items.map((i) => (
                <MagneticButton key={i.href} strength={0.2}>
                  <Link
                    href={i.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block story-link"
                  >
                    <span>{i.l}</span>
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-semibold text-sm text-foreground mb-3">
            Connect
          </h4>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["hello@apex.dev", "Twitter / X", "LinkedIn"].map((item) => (
              <motion.span
                key={item}
                className="cursor-pointer hover:text-primary transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-border pt-6 text-center text-xs text-muted-foreground"
      >
        © {new Date().getFullYear()} Apex. All rights reserved.
      </motion.div>
    </div>
  </footer>
);

export default Footer;