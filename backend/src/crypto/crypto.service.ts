import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map, firstValueFrom } from 'rxjs';
import { CryptoPrice, HistoricalData } from './interfaces/crypto.interface';
import { AxiosError } from 'axios';

@Injectable()
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private readonly httpService: HttpService) {}

  getTopCryptos(limit: number = 10): Observable<CryptoPrice[]> {
    return this.httpService
      .get<CryptoPrice[]>(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false
        }
      })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          throw new HttpException(
            'Failed to fetch crypto data',
            HttpStatus.BAD_GATEWAY
          );
        })
      );
  }

  getCryptoHistory(id: string, days: number = 7): Observable<HistoricalData> {
    return this.httpService
      .get<HistoricalData>(`${this.baseUrl}/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days
        }
      })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          throw new HttpException(
            'Failed to fetch historical data',
            HttpStatus.BAD_GATEWAY
          );
        })
      );
  }

  searchCrypto(query: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/search`, {
        params: {
          query: query
        }
      })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          throw new HttpException(
            'Failed to search crypto',
            HttpStatus.BAD_GATEWAY
          );
        })
      );
  }
}