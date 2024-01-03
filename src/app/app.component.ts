import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from './components/footer.component';
import HeaderComponent from './components/header.component';
import { WindowService } from './core/window.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	providers: [WindowService],
	template: `
		<app-header></app-header>
		<router-outlet></router-outlet>
		<app-footer></app-footer>
	`,
})
export class AppComponent {}
