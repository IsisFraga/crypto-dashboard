export interface CryptoPrice {
  timestamp: number;
  price: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_history: CryptoPrice[];
}