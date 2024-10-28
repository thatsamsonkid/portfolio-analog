import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faBrandGithub } from '@ng-icons/font-awesome/brands';
import { faCompass } from '@ng-icons/font-awesome/regular';
import { SpartanIconComponent } from '../components/logos/spartan.component';

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [NgIconComponent, SpartanIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideIcons({ faBrandGithub, faCompass })],
	template: `
		<h1 class="mb-6 text-left text-5xl font-bold">Projects</h1>
		<article
			class="flex flex-col justify-between gap-6 rounded-lg border-2 border-ocean-blue p-8 shadow-2xl md:flex-row md:gap-0"
		>
			<div class="flex-1">
				<h1 class="mb-5 text-2xl">Spartan UI - Maintainer</h1>

				<div class="flex">
					<app-spartan-icon
						class="flex h-[100px] w-[100px] items-center justify-center"
					/>

					<div class="ml-5 flex-1 space-y-3">
						<p class="text-lg underline">Major Contributions</p>
						<ul class="ml-3 list-disc space-y-2">
							<li>Select Component</li>
							<li>Calendar Component</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-between gap-3">
				<a
					class="flex items-center justify-center rounded-full border border-ocean-blue"
					href="https://github.com/goetzrobin/spartan"
					target="_blank"
				>
					<ng-icon class="m-3 inline-block" size="2em" name="faBrandGithub" />
				</a>

				<a
					class="flex items-center justify-center rounded-full border border-ocean-blue"
					href="https://www.spartan.ng/"
					target="_blank"
				>
					<ng-icon class="m-3 inline-block" size="2em" name="faCompass" />
				</a>
			</div>
		</article>
	`,
})
export class ProjectsComponent {}
