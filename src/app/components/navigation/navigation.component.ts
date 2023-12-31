import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { ScrollspyService } from '../../core/scrollspy.service';
import NavItemComponent from './nav-item.component';

@Component({
	selector: 'app-navigation',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NavItemComponent],
	template: `
		<div class="flex rounded-3xl md:hidden">
			<ul class="" id="menu" role="menu" aria-labelledby="menubutton">
				<li role="presentation">
					<app-nav-item link="#home" type="home">Back to Top</app-nav-item>
				</li>
				<li role="presentation">
					<app-nav-item type="about" link="#about">
						To about section
					</app-nav-item>
				</li>
				<li role="presentation">
					<app-nav-item type="projects" link="#professional">
						To professional section
					</app-nav-item>
				</li>
				<li role="presentation">
					<app-nav-item type="skills" link="#skills">
						To skills section
					</app-nav-item>
				</li>
				<li role="presentation">
					<app-nav-item type="contact" link="#contact">
						To contact section
					</app-nav-item>
				</li>
			</ul>
			<div
				class="hidden h-[45px] min-h-[45px] w-[45px] items-center justify-center md:flex"
			>
				<div class="bg-ocean-blue h-[12px] w-[2px]"></div>
			</div>
			<button
				title="Menu Button"
				id="menubutton"
				aria-haspopup="true"
				aria-controls="menu"
				class="btn z-20 h-[45px] min-h-[45px] w-[45px] rounded-full border-0 opacity-75 hover:focus:opacity-100 md:hidden"
			>
				<div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</button>
		</div>
	`,
})
export default class NavigationComponent {
	private scrollObserver = inject(ScrollspyService);
	expanded = signal(false);
	bottomReached = signal(false);

	constructor() {
		this.scrollObserver.scrollObserver.pipe(
			map((val) => val.y),
			tap((scrollY) => {
				const clientHeight =
					document.documentElement.clientHeight || window.innerHeight;
				const footerBuffer = 117;
				if (
					scrollY + footerBuffer + clientHeight >=
					document.body.clientHeight
				) {
					this.bottomReached.set(true);
				} else {
					this.bottomReached.set(false);
				}
			}),
			takeUntilDestroyed(),
		);
	}

	toggleNav() {
		this.expanded.set(!this.expanded());
	}
}
