"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Input,
  Spinner,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { CryptoCurrency } from "@/types/crypto";
import CryptoCard from "@/components/CryptoCard";
import PortfolioCard from "@/components/PortfolioCard";
import ThemeToggle from "@/components/ThemeToggle";
import AddToPortfolioModal from "@/components/AddToPortfolioModal";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Home() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoCurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("market");

  const {
    portfolio,
    isLoading: portfolioLoading,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioPrices,
    calculatePortfolio,
  } = usePortfolio();

  const portfolioData = calculatePortfolio();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/crypto");
        if (response.ok) {
          const data = await response.json();
          setCryptos(data);
          setFilteredCryptos(data);
        }
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptos();
    const interval = setInterval(fetchCryptos, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (portfolio.length === 0) return;

    const fetchPortfolioPrices = async () => {
      try {
        const ids = portfolio.map((item) => item.id);
        const response = await fetch("/api/crypto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        });

        if (response.ok) {
          const data = await response.json();
          const priceMap: Record<string, number> = {};
          data.forEach((crypto: CryptoCurrency) => {
            if (crypto.current_price !== null) {
              priceMap[crypto.id] = crypto.current_price;
            }
          });
          updatePortfolioPrices(priceMap);
        }
      } catch (error) {
        console.error("Error fetching portfolio prices:", error);
      }
    };

    fetchPortfolioPrices();
    const interval = setInterval(fetchPortfolioPrices, 60000);

    return () => clearInterval(interval);
  }, [portfolio.length, updatePortfolioPrices]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCryptos(cryptos);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(query) ||
        crypto.symbol.toLowerCase().includes(query)
    );
    setFilteredCryptos(filtered);
  }, [searchQuery, cryptos]);

  const handleAddToPortfolio = (crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (amount: number, price: number) => {
    if (selectedCrypto && price > 0 && amount > 0) {
      addToPortfolio({
        id: selectedCrypto.id,
        symbol: selectedCrypto.symbol,
        name: selectedCrypto.name,
        image: selectedCrypto.image || "",
        amount,
        priceAtPurchase: price,
        currentPrice: price,
      });
      setSelectedCrypto(null);
      setIsModalOpen(false);
    }
  };

  const portfolioIds = new Set(portfolio.map((item) => item.id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { key: "market", label: "Рынок" },
    { key: "portfolio", label: "Портфель" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        isBlurred
        maxWidth="full"
        className="sticky top-0 z-50 bg-[var(--card-bg)]/80 backdrop-blur-xl border-b border-[var(--card-border)] shadow-sm"
        height="6rem"
      >
        <div className="max-w-7xl mx-auto w-full h-[80px] flex items-center justify-between px-4">
          <NavbarContent className="flex items-center gap-4">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand className="flex items-center">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTab("market")}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">CT</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent leading-tight">
                    Crypto Trenches
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">
                    Track & Trade
                  </span>
                </div>
              </motion.div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden md:flex gap-2 items-center" justify="center">
            <NavbarItem className="flex items-center">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Button
                  variant={selectedTab === "market" ? "solid" : "flat"}
                  color="primary"
                  onPress={() => setSelectedTab("market")}
                  className={`flex flex-row font-semibold transition-all ${
                    selectedTab === "market"
                      ? "shadow-lg shadow-[var(--primary)]/30"
                      : "hover:bg-[var(--hover)]"
                  }`}
                  size="md"
                  startContent={
                    selectedTab === "market" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  }
                >
                  Рынок
                </Button>
              </motion.div>
            </NavbarItem>
            <NavbarItem className="flex items-center">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Button
                  variant={selectedTab === "portfolio" ? "solid" : "flat"}
                  color="primary"
                  onPress={() => setSelectedTab("portfolio")}
                  className={`flex flex-row font-semibold transition-all ${
                    selectedTab === "portfolio"
                      ? "shadow-lg shadow-[var(--primary)]/30"
                      : "hover:bg-[var(--hover)]"
                  }`}
                  size="md"
                  startContent={
                    selectedTab === "portfolio" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2v-5zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  }
                >
                  Портфель
                  {portfolio.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold rounded-full bg-[var(--accent)] text-white">
                      {portfolio.length}
                    </span>
                  )}
                </Button>
              </motion.div>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end" className="flex justify-center flex-row gap-3 items-center">
            <NavbarItem className="flex flex-row hidden lg:flex items-center">
              <Input
                placeholder="Найти криптовалюту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full flex flex-row"
                size="md"
                variant="bordered"
                classNames={{
                  input: "text-sm",
                  inputWrapper: "border-[var(--card-border)] hover:border-[var(--primary)] transition-colors",
                }}
                endContent={
                  searchQuery && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => setSearchQuery("")}
                      className="min-w-0 w-5 h-5"
                    >
                    </Button>
                  )
                }
              />
            </NavbarItem>
            <NavbarItem className="flex items-center">
              <ThemeToggle />
            </NavbarItem>
          </NavbarContent>
        </div>

        <NavbarMenu className="bg-[var(--card-bg)]/95 backdrop-blur-xl">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.key}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedTab === item.key ? "solid" : "flat"}
                  color="primary"
                  onPress={() => {
                    setSelectedTab(item.key);
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start font-semibold"
                  size="lg"
                  startContent={
                    selectedTab === item.key && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  }
                >
                  {item.label}
                  {item.key === "portfolio" && portfolio.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--accent)] text-white">
                      {portfolio.length}
                    </span>
                  )}
                </Button>
              </motion.div>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Input
              placeholder="Найти криптовалюту..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mt-4"
              size="md"
              variant="bordered"
              classNames={{
                inputWrapper: "border-[var(--card-border)]",
              }}
              startContent={
                <svg
                  className="w-4 h-4 text-[var(--text-secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {portfolio.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <Card className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-none shadow-lg">
              <CardBody className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm opacity-90 mb-1">Общая стоимость</p>
                    <p className="text-2xl sm:text-3xl font-bold">
                      ${portfolioData.totalValue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-90 mb-1">Прибыль/Убыток</p>
                    <p
                      className={`text-2xl sm:text-3xl font-bold ${
                        portfolioData.totalProfit >= 0
                          ? "text-green-200"
                          : "text-red-200"
                      }`}
                    >
                      {portfolioData.totalProfit >= 0 ? "+" : ""}
                      ${portfolioData.totalProfit.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-90 mb-1">Процент изменения</p>
                    <p
                      className={`text-2xl sm:text-3xl font-bold ${
                        portfolioData.totalProfitPercent >= 0
                          ? "text-green-200"
                          : "text-red-200"
                      }`}
                    >
                      {portfolioData.totalProfitPercent >= 0 ? "+" : ""}
                      {portfolioData.totalProfitPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}

        {selectedTab === "market" && (
          <div className="lg:hidden mb-6">
            <Input
              placeholder="Поиск криптовалют..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              size="lg"
            />
          </div>
        )}

        {selectedTab === "market" && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" color="primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredCryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  >
                    <CryptoCard
                      crypto={crypto}
                      onAddToPortfolio={handleAddToPortfolio}
                      isInPortfolio={portfolioIds.has(crypto.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && filteredCryptos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[var(--text-secondary)] text-lg">
                  Криптовалюты не найдены
                </p>
              </div>
            )}
          </div>
        )}

        {selectedTab === "portfolio" && (
          <div className="space-y-6">
            {portfolioLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" color="primary" />
              </div>
            ) : portfolio.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[var(--text-secondary)] text-lg mb-4">
                  Ваш портфель пуст
                </p>
                <p className="text-[var(--text-secondary)] text-sm">
                  Добавьте криптовалюты из раздела "Рынок"
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {portfolio.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(index * 0.1, 0.5) }}
                  >
                    <PortfolioCard
                      item={item}
                      onRemove={removeFromPortfolio}
                      onUpdate={(id, amount) => {}}
                    />
                  </motion.div>
                ))}
              </div>
            )}
        </div>
        )}
      </main>

      <AddToPortfolioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCrypto(null);
        }}
        onAdd={handleConfirmAdd}
        crypto={selectedCrypto}
      />
    </div>
  );
}
