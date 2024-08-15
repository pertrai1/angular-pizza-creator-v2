import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PizzaAppComponent } from './pizza-app/pizza-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PizzaAppComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
