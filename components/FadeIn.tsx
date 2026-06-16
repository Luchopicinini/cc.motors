'use client'
import { motion } from 'framer-motion'

export default function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  )
}