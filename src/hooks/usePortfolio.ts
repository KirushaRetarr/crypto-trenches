"use client";

import { useState, useEffect } from "react";
import { PortfolioItem, Portfolio } from "@/types/crypto";

const PORTFOLIO_STORAGE_KEY = "crypto-trenches-portfolio";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем портфель из localStorage при монтировании
    const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPortfolio(parsed);
      } catch (error) {
        console.error("Error parsing portfolio from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const addToPortfolio = (item: Omit<PortfolioItem, "currentPrice"> & { currentPrice?: number }) => {
    const newItem: PortfolioItem = {
      ...item,
      currentPrice: item.currentPrice || item.priceAtPurchase,
      image: item.image || "",
    };
    const updated = [...portfolio, newItem];
    setPortfolio(updated);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFromPortfolio = (id: string) => {
    const updated = portfolio.filter((item) => item.id !== id);
    setPortfolio(updated);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    const updated = portfolio.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    setPortfolio(updated);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
  };

  const updatePortfolioPrices = (prices: Record<string, number>) => {
    const updated = portfolio.map((item) => ({
      ...item,
      currentPrice: prices[item.id] || item.currentPrice,
    }));
    setPortfolio(updated);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
  };

  const calculatePortfolio = (): Portfolio => {
    if (portfolio.length === 0) {
      return {
        items: [],
        totalValue: 0,
        totalProfit: 0,
        totalProfitPercent: 0,
      };
    }

    const totalValue = portfolio.reduce(
      (sum, item) => sum + item.amount * item.currentPrice,
      0
    );

    const totalCost = portfolio.reduce(
      (sum, item) => sum + item.amount * item.priceAtPurchase,
      0
    );

    const totalProfit = totalValue - totalCost;
    const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    return {
      items: portfolio,
      totalValue,
      totalProfit,
      totalProfitPercent,
    };
  };

  return {
    portfolio,
    isLoading,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioItem,
    updatePortfolioPrices,
    calculatePortfolio,
  };
}


