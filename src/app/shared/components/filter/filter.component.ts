import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';  // For mat-option
import { ReactiveFormsModule } from '@angular/forms';  // For Reactive Forms
import { CommonModule } from '@angular/common'; 
import { FilterConfig } from '../../../interface/FilterConfig';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  @Input() filterConfig: FilterConfig[] = []; // Configuration for filters (received from parent)
  @Output() filterChanged = new EventEmitter<any>(); // Emits the filter criteria

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.setupDebounce();
  }

  // Dynamically build the filter form based on the filterConfig
  buildForm(): void {
    const group: { [key: string]: FormControl } = {}; // Define the type for 'group'

    this.filterConfig.forEach(config => {
      group[config.field] = new FormControl('');  // Initialize the form control for each field
    });

    this.filterForm = this.fb.group(group);
  }

  //Apply debounce only for text inputs that have `triggerOnChange: true`
  setupDebounce(): void {
    this.filterConfig.forEach(config => {
      if (config.type === 'text' && config.triggerOnChange) {
        this.filterForm.get(config.field)?.valueChanges
          .pipe(debounceTime(300)) //  Wait 300ms after the last input
          .subscribe(() => this.applyFilters());
      }
    });
  }
  
  // Emit the filter values when a field with `triggerOnChange` is modified
  onFilterChange(field: string, triggerOnChange: boolean | undefined): void {
    if (triggerOnChange ?? false) {  // Ensures it's always a boolean
      this.applyFilters();
    }
  } 

  // Apply filters manually (for fields without `triggerOnChange`)
  applyFilters(): void {
    const filterValues = this.filterForm.value;
    this.filterChanged.emit(filterValues);
  }

  // Emit the filter values when the form changes
  // onFilterChange(): void {
  //   const filterValues = this.filterForm.value;
  //   this.filterChanged.emit(filterValues);
  // }

  // Optional: Reset the filter form
  resetFilters(): void {
    this.filterForm.reset();
    this.applyFilters();
  }
}
