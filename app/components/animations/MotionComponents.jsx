'use client'
import { motion } from 'framer-motion'

// Reusable motion variants
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

export const fadeInDownVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

export const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

export const fadeInRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
}

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: "backOut" } 
  }
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

// Reusable Motion Components
export const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeInUpVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInDown = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeInDownVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInLeft = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeInLeftVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const FadeInRight = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeInRightVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const ScaleUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={scaleUpVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={staggerContainerVariants}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={staggerItemVariants}
    className={className}
  >
    {children}
  </motion.div>
)
