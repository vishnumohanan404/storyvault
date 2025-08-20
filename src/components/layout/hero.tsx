'use client';
import type { Transition, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { Badge } from '../ui/badge';
const transition: Transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants: Variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 },
};
const Hero = () => {
  return (
    <motion.div
      className=""
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <section className="lg:py-42 relative overflow-hidden py-20">
        {/* bg animation */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div> */}
        {/* <div className="from-primary/5 to-primary/2 absolute inset-0 bg-gradient-to-br via-transparent" /> */}

        {/* bg animation */}
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="space-y-4">
              <motion.div
                className=""
                transition={transition}
                variants={variants}
              >
                <Badge
                  className="border-primary/20 bg-primary/5 hover:bg-primary/10 mb-9 rounded-3xl transition-all duration-300"
                  variant={'outline'}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Interactive Project Narratives
                </Badge>
                <h1 className="whitespace-nowrap text-4xl font-bold tracking-tight lg:text-6xl">
                  Skip Planning. Master Building.
                  <span className="font-highlight from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    {' '}
                    DIY
                  </span>
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-xl leading-relaxed">
                  DevOps project blueprints so you focus on implementation, not
                  planning.
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/projects">
                <Button className="hover:cursor-pointer">
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/resources">
                <Button
                  className="border-muted-foreground rounded-3xl border hover:cursor-pointer"
                  variant={'secondary'}
                >
                  View Resources
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;
