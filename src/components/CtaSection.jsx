import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';

const CtaSection = () => {
  return (
      <section className="relative">
          <div className="w-full max-w-screen-lg mx-auto relative overflow-hidden rounded-lg premium-border">
          {/* Abstract Background */}
          <div
              className="absolute inset-0 filter blur bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4yAUmjUjk3tooLd_1LB3xQlzPAWYwWgXwKQ&s')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 to-neutral-900/60"/>

              {/* Animated Particles */}
              <div className="absolute inset-0">
                  <div
                      className="absolute top-1/4 left-1/4 w-64 h-64 bg-neutral-500/30 rounded-full blur-3xl animate-pulse"/>
                  <div
                      className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"/>
                  <div
                      className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-500"/>
              </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-20">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                      Join the Future of DeFi with $BOLT
                  </h2>
                  <p className="text-xl text-gray-200">
                      Be part of the revolution. Start trading $BOLT today and experience the next generation of
                      decentralized finance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="cyber-button group backdrop-blur-lg !px-8 !py-4 rounded-xl font-semibold
                               transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                          <Rocket className="group-hover:translate-x-1 transition-transform duration-300 text-blue-600" size={20}/>
                          Launch App
                      </button>
                      <button className="bg-gray-900/30 hover:bg-gray-900/40 backdrop-blur-sm text-white !px-8 !py-4 rounded-xl font-semibold
                               transition-all duration-300 flex items-center justify-center gap-2 border border-white/10">
                          Join Community
                          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300"
                                      size={20}/>
                      </button>
                  </div>
              </div>
          </div>
          </div>
      </section>
  )
}

export default CtaSection;