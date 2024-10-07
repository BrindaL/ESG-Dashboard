import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ESG-Dashboard';
  isDarkTheme: boolean = false;

  // toggleTheme() {
  //   this.isDarkTheme = !this.isDarkTheme;
  //   const themeClass = this.isDarkTheme ? 'dark-theme' : '';
  //   document.body.className = themeClass; // Apply the theme class to body
  // }
}
