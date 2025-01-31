import { EventEmitter } from '@angular/core';

export interface ButtonConfig {
  label: string;
  color: string;
  icon?: string;
  visible: boolean;
  click: EventEmitter<void>;
}
