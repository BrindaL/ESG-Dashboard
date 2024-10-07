import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <h2>{{ data.companyName }} ESG Details</h2>
      <div class="content">
        <p *ngIf="!data.esgData">No ESG data available.</p>
        <ng-container *ngIf="data.esgData">
          <p><strong>Environmental Score:</strong> {{ data.esgData['Environmental Pillar Score'] | number:'1.2-2' }}</p>
          <p><strong>Social Score:</strong> {{ data.esgData['Social Pillar Score'] | number:'1.2-2' }}</p>
          <p><strong>Governance Score:</strong> {{ data.esgData['Governance Pillar Score'] | number:'1.2-2' }}</p>
          <p><strong>Overall Score:</strong> {{ data.esgData['Overall Score'] | number:'1.2-2' }}</p>
          <p><strong>Latest Score Date:</strong> {{ data.esgData['Latest Score Date'] }}</p>
          <p><strong>Ticker Symbol:</strong> {{ data.esgData['tickersymbol'] }}</p>
          <p><strong>Overall Industry Rank:</strong> {{ data.esgData['Overall Industry Rank'] }}</p>
          <p><strong>Overall Region Rank:</strong> {{ data.esgData['Overall Region Rank'] }}</p>
          <p><strong>Overall Score Global Rank:</strong> {{ data.esgData['Overall Score Global Rank'] }}</p>
        </ng-container>
      </div>
      <div class="actions">
        <button mat-button (click)="closeDialog()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: white;
      color: black;
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .dialog-container {
      width: 100%;
    }
    h2 {
      margin-bottom: 15px;
    }
    .content {
      max-height: 300px;
      overflow-y: auto;
    }
    p {
      margin: 10px 0;
    }
    .actions {
      margin-top: 20px;
      text-align: right;
    }
  `]
})
export class SettingsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettingsComponent>
  ) { }

  ngOnInit() {
    console.log('SettingsComponent initialized with data:', this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}