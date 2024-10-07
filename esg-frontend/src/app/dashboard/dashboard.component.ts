import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EsgDataService } from '../esg-data.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../settings.service';
import { ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto'
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, HeaderComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  esgData: any;
  companyName: string = "Intel Corporation";
  showDetails: boolean = false;
  sidebarActive: boolean = false;

  // Chart configuration
  public chartOptions: ChartOptions = { responsive: true };
  public chartLabels: string[] = ['Environmental', 'Social', 'Governance'];
  public chartData: any[] = [
    {
      data: [],
      label: this.companyName,
      backgroundColor: '#105e72'
    }
  ];
  public chartType: ChartType = 'bar';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private esgDataService: EsgDataService, private settingsService: SettingsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchEsgData(this.companyName);
  }

  fetchEsgData(companyName: string): void {
    console.log(this.companyName)
    this.esgDataService.getESGScores(companyName).subscribe({
      next: (data) => {
        this.esgData = data[0];
        this.chartData = [
          { data: [this.esgData['Environmental Pillar Score'], this.esgData['Social Pillar Score'], this.esgData['Governance Pillar Score']], label: companyName, backgroundColor: '#105e72' }
        ];
        console.log(this.esgData);
      },
      error: (err) => {
        console.error('Error fetching ESG data:', err);
      }
    });
  }

  showCompanyDetails() {
    if (this.esgData) {
      this.dialog.open(SettingsComponent, {
        width: '400px',
        data: {
          companyName: this.companyName,
          esgData: this.esgData
        }
      });
      panelClass: 'custom-dialog-container'
    } else {
      console.error('ESG data not available');
    }
  }

  onCompanySelected(companyName: string): void {
    this.companyName = companyName;
    this.fetchEsgData(companyName);
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  exportToCsv() {
    if (this.esgData) {
      const csvContent = this.convertToCSV(this.esgData);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${this.companyName}_ESG_Data.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      console.error('No ESG data available to export');
    }
  }

  private convertToCSV(data: any): string {
    const items = [
      { label: 'Company Name', value: this.companyName },
      { label: 'Environmental Pillar Score', value: data['Environmental Pillar Score'] },
      { label: 'Social Pillar Score', value: data['Social Pillar Score'] },
      { label: 'Governance Pillar Score', value: data['Governance Pillar Score'] },
      { label: 'Overall Score', value: data['Overall Score'] },
      { label: 'Latest Score Date', value: data['Latest Score Date'] },
      { label: 'Ticker Symbol', value: data['tickersymbol'] },
      { label: 'Overall Industry Rank', value: data['Overall Industry Rank'] },
      { label: 'Overall Region Rank', value: data['Overall Region Rank'] },
      { label: 'Overall Score Global Rank', value: data['Overall Score Global Rank'] },
      { label: 'Industry', value: data['industry'] },
      { label: 'Country', value: data['country'] },
    ];

    const csvRows = items.map(item => `${item.label},${item.value}`);
    return csvRows.join('\n');
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.type === 'text/csv') {
        this.readCSVFile(file);
      } else {
        this.snackBar.open('Please upload a CSV file', 'Close', { duration: 3000 });
      }
    }
  }

  readCSVFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result as string;
      const parsedData = this.parseCSV(contents);
      if (parsedData) {
        this.updateChartWithImportedData(parsedData);
      } else {
        this.snackBar.open('Invalid CSV format', 'Close', { duration: 3000 });
      }
    };
    reader.readAsText(file);
  }

  parseCSV(contents: string): any | null {
    const lines = contents.split('\n');
    const headers = lines[0].split(',');
    const data: any = {};

    const requiredFields = ['Company Name', 'Environmental Pillar Score', 'Social Pillar Score', 'Governance Pillar Score'];
    const missingFields = requiredFields.filter(field => !headers.includes(field));

    if (missingFields.length > 0) {
      this.snackBar.open(`Missing required fields: ${missingFields.join(', ')}`, 'Close', { duration: 5000 });
      return null;
    }

    lines[1].split(',').forEach((value, index) => {
      data[headers[index]] = value.trim() || 'N/A';
    });

    return data;
  }

  updateChartWithImportedData(data: any) {
    this.companyName = data['Company Name'];
    this.chartData = [{
      data: [
        parseFloat(data['Environmental Pillar Score']) || 0,
        parseFloat(data['Social Pillar Score']) || 0,
        parseFloat(data['Governance Pillar Score']) || 0
      ],
      label: this.companyName,
      backgroundColor: '#105e72'
    }];
    this.esgData = data;
    this.snackBar.open('Data imported successfully', 'Close', { duration: 3000 });
  }

}
