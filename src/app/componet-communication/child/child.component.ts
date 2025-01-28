import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-child',
  imports: [FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() childMessage: string = '';
  @Output() productAdded = new EventEmitter<string>();
  childData: string = '';

  addToCart() {
    this.productAdded.emit('Product A'); // Emit product name or object
  }
}
