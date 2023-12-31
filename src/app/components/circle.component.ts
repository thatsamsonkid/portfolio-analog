import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-circle',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="circle-display p-4 text-center {{ class }}">
			<span class="circle-display__title sm-subtitle-2 mb-3">
				{{ title }}
			</span>
			<span class="circle-display__description">
				<i><ng-content /></i>
			</span>
		</div>
	`,
})
export default class CircleComponent {
	@Input()
	title = '';
	@Input()
	class = '';
}
