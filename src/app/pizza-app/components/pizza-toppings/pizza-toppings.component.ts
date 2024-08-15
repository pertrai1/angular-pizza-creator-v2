import { Component, forwardRef } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true,
};

@Component({
  selector: 'app-pizza-toppings',
  standalone: true,
  imports: [TitleCasePipe],
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  templateUrl: './pizza-toppings.component.html',
  styleUrl: './pizza-toppings.component.css',
})
export class PizzaToppingsComponent {
  toppings = [
    'anchovy',
    'bacon',
    'basil',
    'chili',
    'mozzarella',
    'mushroom',
    'olive',
    'onion',
    'pepper',
    'pepperoni',
    'sweetcorn',
    'tomato',
  ];

  value: string[] = [];
  focused: string = '';

  private onTouch?: Function;
  private onModelChange?: Function;

  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  updateTopping(topping: string) {
    if (this.value.includes(topping)) {
      this.value = this.value.filter((x: string) => topping !== x);
    } else {
      this.value = this.value.concat([topping]);
    }
    if (this.onModelChange) {
      this.onModelChange(this.value);
    }
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    if (this.onTouch) {
      this.onTouch();
    }
  }
}
