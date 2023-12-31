import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	Subject,
	fromEvent,
	startWith,
	takeUntil,
} from 'rxjs';

interface ScrollEvent {
	x: number;
	y: number;
}

@Injectable()
export class ScrollspyService {
	private scrollSubject = new BehaviorSubject<ScrollEvent>({
		x: 0,
		y: 0,
	});
	private unsubscribe$ = new Subject<void>();
	private document = inject(DOCUMENT);
	constructor() {
		const window = this.document.defaultView;
		const start = {
			x: (window && window.scrollX) || 0,
			y: (window && window.scrollY) || 0,
		};
		fromEvent(window as Window, 'scroll')
			.pipe(startWith(start), takeUntil(this.unsubscribe$))
			// @ts-ignore
			.subscribe((event: Event<any>) => {
				const target = event ? event.target : null;
				if (target) {
					this.scrollSubject.next({
						x: target.scrollingElement.scrollLeft,
						y: target.scrollingElement.scrollTop,
					} as ScrollEvent);
				}
			});
	}

	get scrollObserver(): Observable<ScrollEvent> {
		return this.scrollSubject.asObservable();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
