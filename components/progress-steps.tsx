"use client"

import { motion } from "framer-motion"
import { fadeIn, slideIn } from "@/lib/animations"

interface ProgressStepsProps {
  currentStep: number
  steps: Array<{
    title: string
    description: string
  }>
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <motion.div className="py-6" variants={fadeIn} initial="hidden" animate="visible">
      <div className="overflow-hidden">
        <div className="border-b">
          <nav className="flex justify-between" aria-label="Progress">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={slideIn}
                custom={index}
                transition={{ delay: index * 0.1 }}
                className={`pb-6 relative ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
              >
                <div className="flex items-center">
                  <motion.div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      index <= currentStep ? "bg-primary text-white" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm">{index + 1}</span>
                  </motion.div>
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-sm">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    className={`absolute right-0 top-3 hidden h-0.5 w-full md:block ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  )
}

