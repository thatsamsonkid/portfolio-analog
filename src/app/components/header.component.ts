import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	OnInit,
	ViewChild,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { ScrollspyService } from '../core/scrollspy.service';

@Component({
	selector: 'app-header',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./header.css'],
	template: `
		<header
			#header
			class="global-header fixed z-10 h-[102px] w-full bg-black px-4 py-3 text-white opacity-100 before:hidden after:hidden data-[elevated=true]:h-[60px] data-[elevated=true]:shadow-lg md:before:block md:after:block"
			[attr.data-elevated]="elevated()"
			style="transition: height .4s,transform .4s;"
		>
			<div class="max-content-width d-flex mx-auto">
				<img
					class="z-20 ml-auto h-[80px] w-[80px] data-[elevated=true]:h-[40px] data-[elevated=true]:w-[40px]"
					[attr.data-elevated]="elevated()"
					src="/images/SM-LOGO.png"
					alt="Site Logo"
					style="transition: {{ elevated() ? 'all 0.2s' : 'all 0.6s' }}"
				/>
			</div>
		</header>
	`,
})
export default class HeaderComponent implements OnInit {
	private scrollObserver = inject(ScrollspyService);
	private destroyRef = inject(DestroyRef);
	private lastScrollAboveThreshold = false;

	elevated = signal(false);
	headerOffset = signal(0);

	@ViewChild('header', { static: true })
	headerEl!: ElementRef<HTMLElement>;

	ngOnInit(): void {
		const headerOffset = this.headerEl
			? this.headerEl.nativeElement.clientHeight
			: 0;
		this.scrollObserver.scrollObserver
			.pipe(
				map((val) => val.y),
				distinctUntilChanged(),
				filter((currentScroll) => {
					const isAboveThreshold = currentScroll >= headerOffset;
					const crossedThreshold =
						isAboveThreshold !== this.lastScrollAboveThreshold;
					this.lastScrollAboveThreshold = isAboveThreshold;
					return crossedThreshold;
				}),
				tap((scrollY) =>
					scrollY > headerOffset
						? this.elevated.set(true)
						: this.elevated.set(false),
				),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
