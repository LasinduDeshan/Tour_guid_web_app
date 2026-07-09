"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "LKR" | "CNY";

export const currencyMeta: Record<Currency, { symbol: string; label: string; rate: number }> = {
  USD: { symbol: "$", label: "USD", rate: 1.0 },
  EUR: { symbol: "€", label: "EUR", rate: 0.92 },
  GBP: { symbol: "£", label: "GBP", rate: 0.79 },
  LKR: { symbol: "Rs. ", label: "LKR", rate: 300.0 },
  CNY: { symbol: "¥", label: "CNY", rate: 7.25 }
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (usdAmount: number | string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // Load preferred currency on client mount
  useEffect(() => {
    const savedCur = localStorage.getItem("preferred_currency") as Currency;
    if (savedCur && currencyMeta[savedCur]) {
      setCurrencyState(savedCur);
      document.cookie = `preferred_currency=${savedCur}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    localStorage.setItem("preferred_currency", cur);
    document.cookie = `preferred_currency=${cur}; path=/; max-age=31536000; SameSite=Lax`;
  };

  // Convert and format USD base pricing into target currency format
  const formatPrice = (usdAmount: number | string): string => {
    // Safely extract numeric base
    const numUsd = typeof usdAmount === "string" ? parseFloat(usdAmount.replace(/[^0-9.]/g, "")) : usdAmount;
    if (isNaN(numUsd)) return typeof usdAmount === "string" ? usdAmount : "";

    const meta = currencyMeta[currency];
    const converted = numUsd * meta.rate;

    // High fidelity formatting: round LKR to whole numbers, others to standard or clean formats
    if (currency === "LKR") {
      return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
    }
    
    // For smaller values, keep decimals, for larger tours keep it neat
    if (converted >= 100) {
      return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
    }
    
    return `${meta.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
