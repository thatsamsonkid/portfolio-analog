import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	Subject,
	fromEvent,
	startWith,
	takeUntil,
	throttleTime,
} from 'rxjs';

interface ScrollEvent {
	x: number;
	y: number;
}

interface ResizeEvent {
	width: number;
	height: number;
}

@Injectable()
export class WindowService {
	private scrollSubject = new BehaviorSubject<ScrollEvent>({
		x: 0,
		y: 0,
	});
	private resizeSubject = new BehaviorSubject<ResizeEvent>({
		width: 0,
		height: 0,
	});
	private unsubscribe$ = new Subject<void>();
	private document = inject(DOCUMENT);

	constructor() {
		this.instantiateScrollObserver();
		this.instantiateResizeObserver();
	}

	private instantiateResizeObserver(): void {
		const window = this.document.defaultView;
		const start = {
			x: (window && window.scrollX) || 0,
			y: (window && window.scrollY) || 0,
		};
		fromEvent(window as Window, 'resize')
			.pipe(throttleTime(50), startWith(start), takeUntil(this.unsubscribe$))
			// @ts-ignore
			.subscribe((event: Event<any>) => {
				const target = event ? event.target : null;
				if (target) {
					this.resizeSubject.next({
						width: target.innerWidth,
						height: target.innerHeight,
					});
				}
			});
	}

	private instantiateScrollObserver(): void {
		const window = this.document.defaultView;
		const start = {
			x: (window && window.scrollX) || 0,
			y: (window && window.scrollY) || 0,
		};
		fromEvent(window as Window, 'scroll')
			.pipe(startWith(start), throttleTime(50), takeUntil(this.unsubscribe$))
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

	get resizeObserver(): Observable<ScrollEvent> {
		return this.scrollSubject.asObservable();
	}

	get scrollObserver(): Observable<ScrollEvent> {
		return this.scrollSubject.asObservable();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
