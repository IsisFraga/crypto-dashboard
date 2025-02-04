import { Injectable } from '@angular/core';
import { CryptoPrice } from '../types/crypto.types';

@Injectable({
  providedIn: 'root'
})
export class CryptoCalculatorService {
  getHighestPrice(data: CryptoPrice[]): number {
    return Math.max(...data.map(item => item.price));
  }

  getLowestPrice(data: CryptoPrice[]): number {
    return Math.min(...data.map(item => item.price));
  }

  getPriceChange(data: CryptoPrice[]): number {
    if (data.length < 2) return 0;
    
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    
    return ((lastPrice - firstPrice) / firstPrice) * 100;
  }

  getPriceChangeClass(priceChange: number): string {
    return priceChange >= 0 ? 'positive' : 'negative';
  }
}