import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatToolbarModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  companies = ['Alphabet Inc.', 'Netflix, Inc.', 'Adobe Inc.', 'Intel Corporation', 'Berkshire Hathaway Inc.', 'Visa Inc.'];
  selectedCompany: string = '';

  @Output() companySelected = new EventEmitter<string>();
  @Output() importClicked = new EventEmitter<void>();

  onCompanyChange(event: MatSelectChange): void {
    console.log("Company Selected: ", event.value)
    const companyName = event.value;
    this.companySelected.emit(companyName);
  }

  onCompanyChanges(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCompany = selectElement.value;
  }

  onImportClick() {
    this.importClicked.emit();
  }

}
