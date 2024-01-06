import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-circle',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="flex w-[125px] h-[125px] shadonw-lg shadow-shadow-black rounded-full justify-center items-center p-4 text-center flex-col {{
				class
			}}"
		>
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
