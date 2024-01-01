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
		<div
			class="fixed bottom-5 right-5 flex-col overflow-hidden rounded-3xl data-[expanded=true]:bg-black/80 md:hidden"
			[attr.data-expanded]="expanded()"
		>
			<ul
				class="relative top-3 h-0 opacity-0 data-[expanded=true]:h-[300px] data-[expanded=true]:opacity-100"
				id="menu"
				role="menu"
				aria-labelledby="menubutton"
				[attr.data-expanded]="expanded()"
				style="transition: height .3s ease,opacity .3s ease;"
			>
				@for (link of navLinks; track link.link) {
					<li>
						<app-nav-item [link]="link.link" [type]="link.type">
							{{ link.altText }}
						</app-nav-item>
					</li>
				}
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
				class="sticky z-20 inline-flex h-[45px] min-h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border-0 bg-black px-2 opacity-75 hover:focus:opacity-100 md:hidden"
				(click)="toggleNav()"
			>
				<div class="relative left-0 right-0 block h-6 w-full cursor-pointer">
					<!-- top: 1px; left: 3px; width: 25px; transform: rotate(45deg); -->

					<div
						class="bg-ocean-blue relative top-0 mb-[6px] h-1 w-full rounded-sm data-[expanded=true]:left-[6px] data-[expanded=true]:top-[2px] data-[expanded=true]:w-6 data-[expanded=true]:rotate-45"
						style="transform-origin: 0;transition: transform .3s ease,top .3s ease,width .3s ease,right .3s ease;"
						[attr.data-expanded]="expanded()"
					></div>
					<div
						class="bg-ocean-blue relative top-0 mb-[6px] h-1 w-full rounded-sm data-[expanded=true]:right-[-6px] data-[expanded=true]:top-[9px] data-[expanded=true]:w-6 data-[expanded=true]:-rotate-45"
						style="transform-origin: 0;transition: transform .3s ease,top .3s ease,width .3s ease,right .3s ease;"
						[attr.data-expanded]="expanded()"
					></div>
					<div
						class="bg-ocean-blue relative top-0 mb-[6px] h-1 w-full rounded-sm data-[expanded=true]:-top-[1px] data-[expanded=true]:right-[1px] data-[expanded=true]:w-6 data-[expanded=true]:rotate-45"
						style="transform-origin: right;transition: transform .3s ease,top .3s ease,width .3s ease,right .3s ease;"
						[attr.data-expanded]="expanded()"
					></div>
				</div>
			</button>
		</div>
	`,
})
export default class NavigationComponent {
	private scrollObserver = inject(ScrollspyService);
	expanded = signal(false);
	bottomReached = signal(false);

	navLinks = [
		{ altText: 'Back to top', link: '#home', type: 'home' },
		{ altText: 'To about section', link: '#about', type: 'about' },
		{
			altText: 'To professional section',
			link: '#professional',
			type: 'projects',
		},
		{ altText: 'To skils section', link: '#skills', type: 'skills' },
		{ altText: 'To contact section', link: '#contact', type: 'contact' },
	];

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
