import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import data from '../../json/page1.json';
import data1 from '../../json/page2.json';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import data2 from '../../json/chartData.json';
import pieChartData from '../../json/pieChartData.json';
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CommonModule, NgxChartsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  boardData: any;
  boardData1: any;
  isBrowser: boolean;
  showPage4: boolean = false;
  showPage1: boolean = true;
  averageRatingPercent: number = 0;
  multi: any[] = data2;
  pieChartData: any[] = pieChartData;
  averageRating: any;
  averageConsensus: any;
  // view: [number, number] = [window.innerWidth, 600];
  // view: [number, number] = [500, 100];  
  // view1: [number, number] = [500, 100]; 
  view: [number, number] = [window.innerWidth, 100];
  customColors = [
    {
      name: 'Average Score',
      value: '#003f63'  // Dark blue like in your image
    },
    {
      name: 'remaining',
      value: '#e0e0e0'  // Light grey for the rest of the bar
    }
  ];
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#003f63', '#e0e0e0'],
  };
  activeEntries: any[] = [];
  colorScheme1: Color = {
    name: 'customScheme1',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#003f63', '#e0e0e0'],
  };
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = false;
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in the browser

  }
  ngOnInit() {
    if (this.isBrowser) {
      this.boardData = data;
      this.boardData1 = data1;
      const series = data2[0].series;
      const total = series.reduce((sum, item) => sum + item.value, 0);
      const maxItem = series.reduce((prev, current) => (prev.value > current.value ? prev : current));
      const percentage = ((maxItem.value / total) * 100).toFixed(2);
      this.averageRating = percentage
      const total1 = pieChartData.reduce((sum, item) => sum + item.value, 0);
      const highest = pieChartData.reduce((max, item) => item.value > max.value ? item : max);
      const roundedPercentage = Math.round((highest.value / total1) * 100);
      this.averageConsensus = roundedPercentage;
      this.updateChartSize();
      window.addEventListener('resize', this.updateChartSize.bind(this));
    }

  }

  updateChartSize() {
    if (this.isBrowser) {
      const width = Math.max(window.innerWidth * 0.3, 300);
      this.view = [width, 100];
    }
  }
  percentCalculate(value: number): string {
    return `${Math.round((value / 5) * 100)}%`;
  }
  scrollTo(id: string): void {
    if (id === 'page-4') {
      this.showPage4 = true;
      this.showPage1 = false;
    }
    if (id === 'page-1') {
      this.showPage4 = false;
      this.showPage1 = true;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}





