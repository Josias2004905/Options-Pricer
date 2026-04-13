import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { blackScholes, BlackScholesParams } from '../lib/math';
import { Info, TrendingUp, Clock, Percent, Target } from 'lucide-react';
import { motion } from 'motion/react';

export const BlackScholesCalculator: React.FC = () => {
  const [params, setParams] = useState<BlackScholesParams>({
    S: 100,
    K: 100,
    T: 1,
    r: 0.05,
    sigma: 0.2,
  });

  const results = useMemo(() => blackScholes(params), [params]);

  const chartData = useMemo(() => {
    const data = [];
    const minS = Math.max(0, params.K * 0.5);
    const maxS = params.K * 1.5;
    const step = (maxS - minS) / 40;

    for (let s = minS; s <= maxS; s += step) {
      const res = blackScholes({ ...params, S: s });
      data.push({
        S: Math.round(s * 100) / 100,
        Call: Math.round(res.call * 100) / 100,
        Put: Math.round(res.put * 100) / 100,
        PayoffCall: Math.max(0, s - params.K),
      });
    }
    return data;
  }, [params]);

  const handleParamChange = (key: keyof BlackScholesParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Target size={20} className="text-blue-600" />
            Paramètres
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-600 flex items-center gap-2">
                  <TrendingUp size={14} /> Prix de l'actif (S)
                </label>
                <span className="font-mono font-medium">{params.S}</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="1"
                value={params.S}
                onChange={(e) => handleParamChange('S', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-600 flex items-center gap-2">
                  <Target size={14} /> Prix d'exercice (K)
                </label>
                <span className="font-mono font-medium">{params.K}</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="1"
                value={params.K}
                onChange={(e) => handleParamChange('K', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-600 flex items-center gap-2">
                  <Clock size={14} /> Temps (T en années)
                </label>
                <span className="font-mono font-medium">{params.T}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={params.T}
                onChange={(e) => handleParamChange('T', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-600 flex items-center gap-2">
                  <Percent size={14} /> Taux sans risque (r)
                </label>
                <span className="font-mono font-medium">{(params.r * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={params.r}
                onChange={(e) => handleParamChange('r', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-600 flex items-center gap-2">
                  <Info size={14} /> Volatilité (σ)
                </label>
                <span className="font-mono font-medium">{(params.sigma * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.01"
                value={params.sigma}
                onChange={(e) => handleParamChange('sigma', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white space-y-4">
          <h3 className="text-lg font-semibold opacity-90">Résultats (Prix de l'Option)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Call</p>
              <p className="text-2xl font-bold font-mono">{results.call.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Put</p>
              <p className="text-2xl font-bold font-mono">{results.put.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Courbe de prix vs Actif sous-jacent</h3>
          <div className="flex gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-full" /> Call</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full" /> Put</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded-full" /> Payoff</span>
          </div>
        </div>
        
        <div className="flex-grow min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="S" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Prix de l\'actif (S)', position: 'insideBottom', offset: -5, fontSize: 12 }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Prix de l\'option', angle: -90, position: 'insideLeft', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="Call" stroke="#2563eb" strokeWidth={3} dot={false} animationDuration={500} />
              <Line type="monotone" dataKey="Put" stroke="#ef4444" strokeWidth={3} dot={false} animationDuration={500} />
              <Line type="monotone" dataKey="PayoffCall" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
