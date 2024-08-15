import { Component, input, output, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PizzaSizeComponent } from '../pizza-size/pizza-size.component';

@Component({
  selector: 'app-pizza-creator',
  standalone: true,
  imports: [PizzaSizeComponent, ReactiveFormsModule],
  templateUrl: './pizza-creator.component.html',
  styleUrl: './pizza-creator.component.css',
})
export class PizzaCreatorComponent {
  pizzas = input.required<FormArray>();

  add = output<any>();

  remove = output<any>();

  toggle = output<number>();

  private visiblePizza = signal<number>(0);

  get openPizza() {
    return this.visiblePizza();
  }

  set openPizza(index: number) {
    this.visiblePizza.set(index);
    if (~index) {
      this.toggle.emit(index);
    }
  }

  addPizza() {
    this.add.emit(null);
    this.openPizza = this.pizzas.length - 1;
  }

  removePizza(index: number) {
    this.remove.emit(index);
    this.openPizza = this.pizzas.length - 1;
  }

  togglePizza(index: number) {
    if (this.openPizza === index) {
      this.openPizza = -1;
      return;
    }
    this.openPizza = index;
  }

  getPizzaControls(): FormGroup[] {
    return this.pizzas().controls as FormGroup[];
  }

  getPizza(i: number) {
    return this.pizzas().at(i) as FormGroup;
  }
}
