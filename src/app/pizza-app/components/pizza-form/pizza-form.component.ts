import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PizzaCreatorComponent } from '../pizza-creator/pizza-creator.component';
import { PizzaSummaryComponent } from '../pizza-summary/pizza-summary.component';

@Component({
  selector: 'app-pizza-form',
  standalone: true,
  imports: [PizzaCreatorComponent, ReactiveFormsModule, PizzaSummaryComponent],
  templateUrl: './pizza-form.component.html',
  styleUrl: './pizza-form.component.css',
})
export class PizzaFormComponent {
  parent = input.required<FormGroup>();

  total = input.required<string>();

  prices = input.required<any>();

  add = output<any>();

  remove = output<any>();

  toggle = output<any>();

  submit = output<any>();

  onAddPizza(event: any) {
    this.add.emit(event);
  }

  onRemovePizza(event: any) {
    this.remove.emit(event);
  }

  onToggle(event: any) {
    this.toggle.emit(event);
  }

  onSubmit(event: any) {
    event.stopPropagation();
    this.submit.emit(this.parent);
  }

  getPizzas(): FormArray {
    return this.parent().get('pizzas') as FormArray;
  }
}
