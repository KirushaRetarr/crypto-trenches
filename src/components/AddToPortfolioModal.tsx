"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { CryptoCurrency } from "@/types/crypto";

interface AddToPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number, price: number) => void;
  crypto: CryptoCurrency | null;
}

export default function AddToPortfolioModal({
  isOpen,
  onClose,
  onAdd,
  crypto,
}: AddToPortfolioModalProps) {
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const numAmount = parseFloat(amount);
    const currentPrice = crypto?.current_price ?? 0;
    if (numAmount > 0 && crypto && currentPrice !== null && currentPrice > 0) {
      onAdd(numAmount, currentPrice);
      setAmount("");
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  const currentPrice = crypto?.current_price ?? 0;
  const isValidPrice = currentPrice !== null && currentPrice > 0 && crypto !== null;

  return (
    <Modal
      isOpen={isOpen && crypto !== null}
      onClose={onClose}
      size="md"
      placement="center"
      backdrop="blur"
      classNames={{
        base: "bg-[var(--card-bg)]",
        backdrop: "bg-black/60 backdrop-opacity-40",
        header: "border-b border-[var(--card-border)]",
        body: "py-6",
        footer: "border-t border-[var(--card-border)]",
        closeButton: "hover:bg-[var(--hover)] active:bg-[var(--hover)]",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent className="bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl">
        {(onClose) => {
          if (!crypto) return null;
          
          return (
            <>
              <ModalHeader className="flex flex-col gap-1 px-6 pt-6 pb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Добавить {crypto.name} в портфель
                </h2>
              </ModalHeader>
              <ModalBody className="px-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
                    <p className="text-sm text-[var(--text-secondary)] mb-1">
                      Текущая цена
                    </p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">
                      {isValidPrice ? `$${currentPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}` : "Недоступна"}
                    </p>
                  </div>
                  <Input
                    label="Количество"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.00000001"
                    isDisabled={!isValidPrice}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "border-[var(--card-border)] hover:border-[var(--primary)] transition-colors",
                    }}
                  />
                  {amount && parseFloat(amount) > 0 && isValidPrice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[var(--hover)] rounded-lg border border-[var(--card-border)]"
                    >
                      <p className="text-sm text-[var(--text-secondary)] mb-1">
                        Стоимость
                      </p>
                      <p className="text-xl font-bold text-[var(--text-primary)]">
                        ${(parseFloat(amount) * currentPrice).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </motion.div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="px-6 pb-6 pt-4">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Отмена
                </Button>
                <Button
                  color="primary"
                  onPress={handleAdd}
                  isDisabled={!amount || parseFloat(amount) <= 0 || !isValidPrice}
                  className="font-medium shadow-lg shadow-[var(--primary)]/30"
                >
                  Добавить
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}

