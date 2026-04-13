/**
 * Black-Scholes Analytical Solution
 */

// Cumulative distribution function for the standard normal distribution
function cdfNormal(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.821256 + t * 1.3302745))));
  return x > 0 ? 1 - p : p;
}

export interface BlackScholesParams {
  S: number; // Stock price
  K: number; // Strike price
  T: number; // Time to maturity (years)
  r: number; // Risk-free rate
  sigma: number; // Volatility
}

export function blackScholes(params: BlackScholesParams) {
  const { S, K, T, r, sigma } = params;
  
  if (T <= 0) {
    return {
      call: Math.max(0, S - K),
      put: Math.max(0, K - S),
      d1: 0,
      d2: 0
    };
  }

  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const call = S * cdfNormal(d1) - K * Math.exp(-r * T) * cdfNormal(d2);
  const put = K * Math.exp(-r * T) * cdfNormal(-d2) - S * cdfNormal(-d1);

  return { call, put, d1, d2 };
}
