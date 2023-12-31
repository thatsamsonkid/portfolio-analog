import { ChangeDetectionStrategy, Component } from '@angular/core';
import CircleComponent from '../components/circle.component';

@Component({
	selector: 'app-skills',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CircleComponent],
	template: `
		<div class="mx-auto max-w-[900px]">
			<h1 class="mb-20 text-left text-5xl font-bold">Skills</h1>
			<ul class="mb-7 flex list-none flex-wrap justify-evenly gap-10 p-0">
				@for (skill of skills; track skill.title; let i = $index) {
					<li
						class="flex-shrink-1 flex flex-grow-0 basis-[110px] justify-center md:flex-shrink-0 md:flex-grow md:basis-[150px]"
					>
						<app-circle
							class="
				{{ i % 2 === 0 ? 'circle--primary' : 'circle--secondary' }}"
							[title]="skill.title"
						>
							{{ skill.text }}
						</app-circle>
					</li>
				}
			</ul>
		</div>
	`,
})
export default class SkillsComponent {
	skills = [
		{ title: 'Angular', text: 'What I work with everyday' },
		{ title: 'React', text: 'What I use on occasion' },
		{ title: 'Rxjs', text: 'Observing and Reactivity' },
		{ title: 'Redux', text: 'store(y) of my life' },
		{ title: 'NgRx', text: 'Love State Management' },
		{ title: 'AEM', text: 'Manage content the hard way :)' },
		{ title: '.CSS{}', text: 'Giving the Web style' },
		{ title: 'TailwindCSS', text: 'Best thing since CSS' },
		{ title: 'HTML', text: 'Giving the Web structure' },
		{ title: 'JS', text: 'Giving the web interaction' },
		{ title: 'Less', text: 'Making CSS...well...less' },
		{ title: 'Sass', text: 'CSS with superpowers' },
		{
			title: 'Typescript',
			text: 'Less debugging on typos :)',
		},
	];
}
