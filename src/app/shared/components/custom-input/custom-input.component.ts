import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl, ValidatorFn } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-custom-input',
  imports: [FormsModule,  
    ReactiveFormsModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatInputModule,
    CommonModule,
    MatCheckbox,
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }
  ]
}) 

export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() config: any = {};   
  @Output() valueChange = new EventEmitter<any>();  
  control: FormControl = new FormControl(); 
  public _value: any;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor() {
    this.control = new FormControl({ value: '', disabled: this.config?.disabled });
    this.control.valueChanges.subscribe(value => {
      this._value = value;
      this.onChange(value);
      this.valueChange.emit(value);
    });
  }

  ngOnInit() {
    this.setupValidation();
  }

  setupValidation() {
    const validators: ValidatorFn[] = [];

    // Dynamic validation rules
    if (this.config?.required) {
      validators.push(this.requiredValidator());
    }
    if (this.config?.type === 'email') {
      validators.push(this.emailValidator());
    }
    if (this.config?.minLength) {
      validators.push(this.minLengthValidator(this.config.minLength));
    }
    if (this.config?.customValidator) {
      validators.push(this.config.customValidator);
    }

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  // Dynamic Validators
  requiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : { required: true };
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\S+@\S+\.\S+$/.test(control.value);
      return isValid ? null : { email: true };
    };
  }

  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value?.length >= minLength ? null : { minlength: { requiredLength: minLength, actualLength: control.value?.length } };
    };
  }

  writeValue(value: any): void {
    this._value = value !== undefined ? value : null;
    this.control.setValue(this._value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.control.errors;
  }

  onBlur(): void {
    this.onTouched();
  }

  getDynamicClass() {
    return this.config?.class || '';
  }

  // Return dynamic error messages
  getErrorMessage(): string {
    const errors = this.control.errors;

    if (errors?.['required']) {
      return 'This field is required.';
    } 
    if (errors?.['email']) {
      return 'Please enter a valid email.';
    }
    if (errors?.['minlength']) {
      return `Minimum length should be ${errors['minlength'].requiredLength}.`;
    }
    if (errors?.['customError']) {
      return errors['customError'];
    }
    return '';
  }
}
