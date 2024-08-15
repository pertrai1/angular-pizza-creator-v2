import { Component, input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'app-pizza-viewer',
  standalone: true,
  imports: [],
  templateUrl: './pizza-viewer.component.html',
  styleUrl: './pizza-viewer.component.css',
})
export class PizzaViewerComponent {
  pizzas = input.required<FormArray>();
  activePizza = input.required<number>();
}
