import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-summary',
  standalone: true,
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './pizza-summary.component.html',
  styleUrl: './pizza-summary.component.css',
})
export class PizzaSummaryComponent {
  parent = input.required<FormGroup>();

  total = input.required<string>();

  prices = input.required<any>();
}
