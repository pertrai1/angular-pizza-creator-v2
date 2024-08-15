import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PizzaValidators } from './validators/pizza.validator';

import { PizzaViewerComponent } from './components/pizza-viewer/pizza-viewer.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';

@Component({
  selector: 'app-pizza-app',
  standalone: true,
  imports: [PizzaViewerComponent, PizzaFormComponent],
  templateUrl: './pizza-app.component.html',
  styleUrl: './pizza-app.component.css',
})
export class PizzaAppComponent implements OnInit {
  private fb = inject(FormBuilder);
  activePizza = 0;
  total = '0';

  prices: { [key: string]: { base: number; toppings: number } } = {
    small: { base: 9.99, toppings: 0.69 },
    medium: { base: 12.99, toppings: 0.99 },
    large: { base: 16.99, toppings: 1.29 },
  };

  form = this.fb.group({
    details: this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        confirm: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
        postcode: ['', [Validators.required, Validators.minLength(3)]],
      },
      { validator: PizzaValidators.checkEmailsMatch }
    ),
    pizzas: this.fb.array([this.createPizza()]),
  });

  ngOnInit() {
    const pizzas = this.form.get('pizzas');
    if (pizzas) {
      this.calculateTotal(pizzas.value);
    }
    this.form
      .get('pizzas')!
      .valueChanges.subscribe((value) => this.calculateTotal(value));
  }

  createPizza() {
    return this.fb.group({
      size: ['small', Validators.required],
      toppings: [[]],
    });
  }

  addPizza() {
    const control = this.form.get('pizzas') as FormArray;
    control.push(this.createPizza());
  }

  removePizza(index: number) {
    const control = this.form.get('pizzas') as FormArray;
    control.removeAt(index);
  }

  togglePizza(index: number) {
    this.activePizza = index;
  }

  calculateTotal(value: any) {
    const price = value.reduce((prev: number, next: any) => {
      const price = this.prices[next.size];
      return prev + price.base + price.toppings * next.toppings.length;
    }, 0);
    this.total = price.toFixed(2);
  }

  createOrder(order: FormGroup) {
    console.log(order.value);
  }

  getPizzas(): FormArray {
    return this.form.get('pizzas') as FormArray;
  }
}
