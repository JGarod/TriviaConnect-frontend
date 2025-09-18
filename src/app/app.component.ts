import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './pages/shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/shared/spinner/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isDarkMode = false;
  title = 'Frontend';
  constructor(private renderer: Renderer2, public spinnerService: SpinnerService) { }

  ngOnInit() {
    this.loadTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }

  loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.isDarkMode = false;
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }
}
