import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
	selector: 'app-nav-item',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex h-[45px] w-[45px] flex-col items-center justify-center text-center">
			<a [attr.href]="link" class="link-accent hover:text-blue-jaunts text-2xl" role="menuitem">
				<span class="sr-only"><ng-content /></span>
				<i class="icon icon-{{ _type() }}"></i>
			</a>
		</div>
	`,
})
export default class NavItemComponent {
	@Input()
	set link(link: string) {
		this._link.set(link);
	}
	_link = signal('');

	@Input()
	set type(type: string) {
		this._type.set(type);
	}
	_type = signal('');
}