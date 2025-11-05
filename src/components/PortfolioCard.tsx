"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types/crypto";

interface PortfolioCardProps {
  item: PortfolioItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, amount: number) => void;
}

export default function PortfolioCard({ item, onRemove, onUpdate }: PortfolioCardProps) {
  const profit = item.currentPrice - item.priceAtPurchase;
  const profitPercent = item.priceAtPurchase > 0 ? ((profit / item.priceAtPurchase) * 100) : 0;
  const isPositive = profit >= 0;
  const currentValue = item.amount * item.currentPrice;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] transition-all duration-300">
        <CardHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--hover)] flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--primary)] text-white text-xs font-bold">${item.symbol.charAt(0).toUpperCase()}</div>`;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--primary)] text-white text-xs font-bold">
                  {item.symbol.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                {item.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] uppercase">
                {item.symbol}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            color="danger"
            variant="light"
            onPress={() => onRemove(item.id)}
          >
            Удалить
          </Button>
        </CardHeader>
        <CardBody className="pt-0 px-4 pb-4 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-secondary)]">Количество</p>
              <p className="font-semibold text-[var(--text-primary)]">
                {item.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                })}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Текущая цена</p>
              <p className="font-semibold text-[var(--text-primary)]">
                ${item.currentPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-secondary)]">Цена покупки</p>
              <p className="font-semibold text-[var(--text-primary)]">
                ${item.priceAtPurchase.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Стоимость</p>
              <p className="font-semibold text-[var(--text-primary)]">
                ${currentValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Прибыль/Убыток</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  ${(profit * item.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"
                  }`}
                >
                  ({isPositive ? "+" : ""}
                  {profitPercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}


