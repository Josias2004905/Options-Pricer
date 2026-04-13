import React from 'react';
import { BlackScholesCalculator } from './components/BlackScholesCalculator';
import { Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Black-Scholes <span className="text-blue-600">Explorer</span>
            </h1>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Hero Section */}
        <section className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
              EQUATION DE <span className="text-blue-600">BLACK SCHOLES</span>
            </h1>
          </motion.div>
        </section>

        {/* Interactive Calculator */}
        <section id="calculator" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Calculator className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Calculateur Interactif</h2>
              <p className="text-sm text-slate-500">Modifiez les paramètres pour voir l'impact sur le prix des options.</p>
            </div>
          </div>
          <BlackScholesCalculator />
        </section>





      </main>


    </div>
  );
}
