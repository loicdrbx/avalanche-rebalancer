'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { DEPLOY_URL, siteConfig } from '@/config/site'


export default function Home() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            animate="show"
            className="max-w-3xl px-5 xl:px-0"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <img alt="Turbo ETH" className="mx-auto mb-15 h-30 w-30" src="https://raw.githubusercontent.com/asulpizi-neu/pictures/main/favicon.png" />
            <motion.h1
              className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Rebalance your Portfolio with Total Control</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-xl font-semibold">{siteConfig.description}</Balancer>
            </motion.p>
          </motion.div>
          <div className="mt-10">
            <motion.div
              animate="show"
              className="my-10 grid w-full max-w-screen-2xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"
              initial="hidden"
              viewport={{ once: true }}
              whileInView="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.15,
                  },
                },
              }}>
              {/* The rest of your code */}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
