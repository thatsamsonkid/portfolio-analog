import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from './components/footer.component';
import HeaderComponent from './components/header.component';
import { ScrollspyService } from './core/scrollspy.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	providers: [ScrollspyService],
	template: `
		<app-header></app-header>
		<router-outlet></router-outlet>
		<app-footer></app-footer>
	`,
})
export class AppComponent {}
