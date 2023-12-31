import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-text-image',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-content />
		<ng-content selector="text-image-img" />
	`,
})
export default class TextImageComponent {}
