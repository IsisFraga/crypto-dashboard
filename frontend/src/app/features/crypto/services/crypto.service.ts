import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError } from 'rxjs';
import { CryptoPrice } from '../types/crypto.types';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly API_URL = 'https://api.coingecko.com/api/v3';
  private selectedCryptoSubject = new BehaviorSubject<string>('bitcoin');
  selectedCrypto$ = this.selectedCryptoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCryptoPrice(id: string, days: number = 7): Observable<CryptoPrice[]> {
    return this.http.get<any>(`${this.API_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days.toString()
      }
    }).pipe(
      map(response => response.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price
      }))),
      catchError(error => {
        console.error('Error fetching crypto data:', error);
        throw error;
      })
    );
  }

  setSelectedCrypto(cryptoId: string): void {
    this.selectedCryptoSubject.next(cryptoId);
  }
}