import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  currency: string;
  rates: Record<string, number>;
  loading: boolean;
  formatPrice: (usdAmount: number, decimals?: number) => string;
}

const DEFAULT_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  BRL: 5.50,
  MXN: 18.20,
  COP: 4100,
  ARS: 900,
  CLP: 950,
  PEN: 3.75,
  UYU: 39.50,
  BOB: 6.90,
  PYG: 7500,
  CRC: 515,
  DOP: 59.0,
  GTQ: 7.75,
  HNL: 24.6,
  NIO: 36.7,
  PAB: 1.0,
  GBP: 0.79,
  CAD: 1.37,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<string>('USD');
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initCurrency() {
      let detectedCurrency = 'USD';
      
      // 1. Detect currency from IP API or fallback to browser locale / timezone
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          if (ipData.currency) {
            detectedCurrency = ipData.currency;
          }
        } else {
          detectedCurrency = detectFallbackCurrency();
        }
      } catch (err) {
        console.warn("Failed to fetch IP geolocation currency, using browser heuristic:", err);
        detectedCurrency = detectFallbackCurrency();
      }

      // 2. Fetch live exchange rates
      try {
        const rateResponse = await fetch('https://open.er-api.com/v6/latest/USD');
        if (rateResponse.ok) {
          const rateData = await rateResponse.json();
          if (rateData && rateData.rates) {
            setRates(rateData.rates);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live exchange rates, using robust static fallbacks:", err);
      }

      setCurrency(detectedCurrency);
      setLoading(false);
    }

    initCurrency();
  }, []);

  function detectFallbackCurrency(): string {
    const locale = navigator.language || '';
    if (locale.startsWith('es-')) {
      if (locale === 'es-ES') return 'EUR';
      if (locale === 'es-MX') return 'MXN';
      if (locale === 'es-AR') return 'ARS';
      if (locale === 'es-CO') return 'COP';
      if (locale === 'es-CL') return 'CLP';
      if (locale === 'es-PE') return 'PEN';
      if (locale === 'es-UY') return 'UYU';
    } else if (locale.startsWith('pt-')) {
      return 'BRL';
    } else if (locale.startsWith('fr-')) {
      if (locale === 'fr-FR' || locale === 'fr-BE') return 'EUR';
      if (locale === 'fr-CA') return 'CAD';
    } else if (locale.startsWith('de-') || locale.startsWith('it-')) {
      return 'EUR';
    }
    
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Sao_Paulo') || tz.includes('Rio_de_Janeiro') || tz.includes('Fortaleza')) return 'BRL';
      if (tz.includes('Europe/')) return 'EUR';
      if (tz.includes('Mexico/')) return 'MXN';
      if (tz.includes('Bogota')) return 'COP';
      if (tz.includes('Argentina/')) return 'ARS';
      if (tz.includes('Santiago')) return 'CLP';
      if (tz.includes('Lima')) return 'PEN';
      if (tz.includes('Montevideo')) return 'UYU';
      if (tz.includes('Caracas')) return 'VES';
    } catch (_) {}

    return 'USD';
  }

  function formatPrice(usdAmount: number, decimals?: number): string {
    const rate = rates[currency] || 1;
    const localValue = usdAmount * rate;
    
    try {
      const formatter = new Intl.NumberFormat(navigator.language || 'es-ES', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals !== undefined ? decimals : (localValue % 1 === 0 ? 0 : 2),
        maximumFractionDigits: decimals !== undefined ? decimals : 2,
      });
      return formatter.format(localValue);
    } catch (e) {
      const formattedNum = localValue.toFixed(decimals !== undefined ? decimals : 2);
      return `${currency} ${formattedNum}`;
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, rates, loading, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export function LocalPrice({ usd, decimals }: { usd: number; decimals?: number }) {
  const { formatPrice } = useCurrency();
  return <>{formatPrice(usd, decimals)}</>;
}
