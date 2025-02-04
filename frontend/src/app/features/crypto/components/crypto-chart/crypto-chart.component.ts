import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js'; 
import { CryptoPrice } from '../../types/crypto.types';

Chart.register(...registerables);

@Component({
  selector: 'app-crypto-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`
})
export class CryptoChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: CryptoPrice[] = [];
  
  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange && this.chart) {
      this.updateChartData();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.data.map(item => new Date(item.timestamp).toLocaleDateString()),
        datasets: [{
          label: 'Preço em USD',
          data: this.data.map(item => item.price),
          borderColor: '#4CAF50',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Histórico de preço crypto'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChartData(): void {
    if (!this.chart) return;

    const labels = this.data.map(item => 
      new Date(item.timestamp).toLocaleDateString()
    );
    const prices = this.data.map(item => item.price);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = prices;
    this.chart.update();
  }
}