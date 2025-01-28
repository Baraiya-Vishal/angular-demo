import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';  // Import ChildComponent
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, FormsModule],  // Add ChildComponent to imports array
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']  // Corrected from styleUrl to styleUrls
})

export class ParentComponent {

  constructor(private notificationService: NotificationService) { }

  parentMessage = 'Hello from Parent!'; // The message passed to the child component
  childData: string = '';
  selectedProduct: string = '';

  onProductAdded(product: string) {
    this.selectedProduct = product;
    console.log(`Product added to cart: ${product}`);
  }

  @ViewChild(ChildComponent) childComponent!: ChildComponent;

  submit() {
    this.childData = this.childComponent.childData;
  }

  triggerNotification() {
    this.notificationService.notify('Settings updated successfully!');
  }

}
