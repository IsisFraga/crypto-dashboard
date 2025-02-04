import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CryptoService } from '../../services/crypto.service';
import { CryptoCalculatorService } from '../../services/crypto-calculator.service';
import { CryptoChartComponent } from '../../components/crypto-chart/crypto-chart.component';
import { CryptoPrice } from '../../types/crypto.types';
import { AuthService } from '../../../../core/services/auth.service';

const TIME_PERIODS = {
  Week: '7',
  Month: '30',
  Year: '365'
} as const;

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDividerModule,
    DecimalPipe,
    CryptoChartComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class CryptoDashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  public readonly timePeriods = TIME_PERIODS;
  public priceData: CryptoPrice[] = [];
  public isLoading = false;
  public selectedPeriod = TIME_PERIODS.Week;
  public error: string | null = null;

  public highestPrice = 0;
  public lowestPrice = 0;
  public priceChange = 0;
  public priceChangeClass = 'neutral';

  constructor(
    private cryptoService: CryptoService,
    private calculator: CryptoCalculatorService,
    private authService: AuthService,
    private router: Router
  ) {}

  public updateMetrics(): void {
    this.highestPrice = this.calculator.getHighestPrice(this.priceData);
    this.lowestPrice = this.calculator.getLowestPrice(this.priceData);
    this.priceChange = this.calculator.getPriceChange(this.priceData);
    this.priceChangeClass = this.calculator.getPriceChangeClass(this.priceChange);
  }

  public onPeriodChange(event: MatSelectChange): void {
    this.loadCryptoData(parseInt(event.value));
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadCryptoData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCryptoData(days: number = 7): void {
    this.isLoading = true;
    this.error = null;

    this.cryptoService.getCryptoPrice('bitcoin', days)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.priceData = data;
          this.updateMetrics();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Failed to load crypto data. Please try again later.';
          this.isLoading = false;
        }
      });
  }
}