import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonConfig } from '../../interface/ButtonConfig';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderStateService {
  private titleSubject = new BehaviorSubject<string>('Default Title');
  private buttonsSubject = new BehaviorSubject<ButtonConfig[]>([]);

  // Observable for title and buttons
  title$ = this.titleSubject.asObservable();
  buttons$ = this.buttonsSubject.asObservable();

  // Methods to update header state
  updateTitle(title: string): void {
    this.titleSubject.next(title);
  }

  updateButtons(buttons: ButtonConfig[]): void {
    this.buttonsSubject.next(buttons);
  }
}
