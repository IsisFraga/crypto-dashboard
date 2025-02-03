import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { CryptoPrice, HistoricalData } from './interfaces/crypto.interface';

@Controller('crypto')
@UseGuards(JwtAuthGuard)
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  getTopCryptos(@Query('limit') limit: number): Observable<CryptoPrice[]> {
    return this.cryptoService.getTopCryptos(limit);
  }

  @Get('search')
  searchCrypto(@Query('query') query: string): Observable<any> {
    return this.cryptoService.searchCrypto(query);
  }

  @Get(':id/history')
  getCryptoHistory(
    @Param('id') id: string,
    @Query('days') days: number
  ): Observable<HistoricalData> {
    return this.cryptoService.getCryptoHistory(id, days);
  }
}