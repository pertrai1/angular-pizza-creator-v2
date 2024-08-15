import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pizza-size',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './pizza-size.component.html',
  styleUrl: './pizza-size.component.css',
})
export class PizzaSizeComponent {
  private onModelChange?: Function;
  private onTouch?: Function;

  value?: string;
  focused?: string;

  sizes: any[] = [
    { type: 'large', inches: 13 },
    { type: 'medium', inches: 11 },
    { type: 'small', inches: 9 },
  ];

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.value = value;
    if (this.onModelChange) {
      this.onModelChange(value);
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
