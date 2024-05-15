import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  abapEstimation = 2000;
  piPoCpiEstimation = 3500;
  basisEstimation = 3300;

  // Hardcoded values for estimation efforts by year
  estimationEffortsByYear: { [year: number]: number[] } = {
    2022: [2000, 2200, 3100], // Sample values for 2022
    2023: [3500, 3300, 3200], // Sample values for 2023
    2024: [2000, 3500, 3300], // Sample values for 2024
  };

  selectedYear: number = 2024; // Default selected year

  availableYears: number[] = [2022, 2023, 2024]; // Available years

  ngAfterViewInit() {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart() {
    const canvas: HTMLCanvasElement | null = this.barChartCanvas.nativeElement;
    if (!canvas) {
      console.error('Bar Chart Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('2D context not supported for Bar Chart.');
      return;
    }

    this.updateBarChart(ctx);
  }

  updateBarChart(ctx: CanvasRenderingContext2D) {
    // Destroy existing chart instance
    Chart.getChart(ctx)?.destroy();
  
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['ABAP', 'PI/PO/CPI', 'Basis'],
        datasets: [{
          label: 'Estimation Effort',
          data: this.estimationEffortsByYear[this.selectedYear], // Use data based on selected year
          backgroundColor: [
            '#004F59',
            '#009A44',
            '#007CB0'
          ],
          borderColor: [
            'rgba(255, 255, 255, 0)', // Transparent border color
            'rgba(255, 255, 255, 0)', // Transparent border color
            'rgba(255, 255, 255, 0)' // Transparent border color
          ],
          borderWidth: 1,
          barPercentage: 0.4
        }]
      },
      options: {
        responsive: true,
        
        scales: {
          y: {
            beginAtZero: true,
            
            grid: {
              display: false, // Remove the grid lines on the y-axis
            },
            ticks: {
              color: '#00000', // Change y-axis tick color to white
            },
          },
          x: {
            grid: {
              display: false, // Remove the grid lines on the x-axis
            },
            ticks: {
              color: '#00000', // Change y-axis tick color to white
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Optionally, remove the legend
          },
        },
      },
    };
  
    new Chart(ctx, chartConfig);
  }
  

  // Method to handle year selection
  selectYear(year: number) {
    this.selectedYear = year;
    const canvas: HTMLCanvasElement | null = this.barChartCanvas.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        this.updateBarChart(ctx); // Update the bar chart with new data
      }
    }
  }

  createPieChart() {
    const canvas: HTMLCanvasElement | null = this.pieChartCanvas.nativeElement;
    if (!canvas) {
      console.error('Pie Chart Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('2D context not supported for Pie Chart.');
      return;
    }

    const estimationEffortsFor2024 = this.estimationEffortsByYear[2024];
    if (!estimationEffortsFor2024) {
      console.error('Estimation efforts for 2024 not found.');
      return;
    }

    const chartConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['ABAP', 'PI/PO/CPI', 'Basis'],
        datasets: [{
          label: 'Estimation Effort',
          data: estimationEffortsFor2024, // Use estimation efforts for 2024
          backgroundColor: [
            '#004F59',
            '#009A44',
            '#007CB0'
          ],
          borderColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                let label = context.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed && context.parsed !== 0) {
                    const percentage = ((context.parsed / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(2);
                    label += `${context.parsed} (${percentage}%)`;
                }
                return label;
            }
            }
          }
        }
      }
    };

    new Chart(ctx, chartConfig);
  }
}