export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  price_change_percentage_24h: number | null;
  market_cap: number | null;
  total_volume: number | null;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  amount: number;
  priceAtPurchase: number;
  currentPrice: number;
}

export interface Portfolio {
  items: PortfolioItem[];
  totalValue: number;
  totalProfit: number;
  totalProfitPercent: number;
}


