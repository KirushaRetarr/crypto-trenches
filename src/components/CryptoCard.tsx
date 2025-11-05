"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { CryptoCurrency } from "@/types/crypto";
import { useState } from "react";

interface CryptoCardProps {
  crypto: CryptoCurrency;
  onAddToPortfolio?: (crypto: CryptoCurrency) => void;
  isInPortfolio?: boolean;
}

export default function CryptoCard({ crypto, onAddToPortfolio, isInPortfolio }: CryptoCardProps) {
  const currentPrice = crypto.current_price ?? 0;
  const priceChange = crypto.price_change_percentage_24h ?? 0;
  const totalVolume = crypto.total_volume ?? 0;
  const marketCap = crypto.market_cap ?? 0;
  const isPositive = priceChange >= 0;
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] transition-all duration-300">
        <CardHeader className="flex flex-col gap-2 items-start p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--hover)] flex items-center justify-center">
                {!imageError && crypto.image ? (
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--primary)] text-white text-xs font-bold">
                    {crypto.symbol.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {crypto.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] uppercase">
                  {crypto.symbol}
                </p>
              </div>
            </div>
            {onAddToPortfolio && (
              <Button
                size="sm"
                color={isInPortfolio ? "default" : "primary"}
                variant={isInPortfolio ? "flat" : "solid"}
                onPress={() => {
                  if (!isInPortfolio) {
                    onAddToPortfolio(crypto);
                  }
                }}
                isDisabled={isInPortfolio}
                className="font-medium"
              >
                {isInPortfolio ? "В портфеле" : "Добавить"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-4 pb-4">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                ${currentPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}
              </span>
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"
                }`}
              >
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-[var(--text-secondary)]">
              <span>Объем: ${(totalVolume / 1e9).toFixed(2)}B</span>
              <span>Капитализация: ${(marketCap / 1e9).toFixed(2)}B</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}


