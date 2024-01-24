import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
	faBrandGithub,
	faBrandLinkedin,
	faBrandXTwitter,
} from '@ng-icons/font-awesome/brands';

@Component({
	selector: 'app-footer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgIconComponent],
	providers: [
		provideIcons({ faBrandGithub, faBrandLinkedin, faBrandXTwitter }),
	],
	template: `
		<div
			class="z-10 min-h-[116px] w-full bg-ocean-blue px-3 pb-3 pt-4 text-black"
		>
			<div class="max-content-width mx-auto">
				<div class="flex flex-col justify-between gap-2 text-center">
					<div>
						<p class="copyright font-semi">
							Built by Sammy Mohamed &amp; designed by
							<a class="link" href="https://alexandralaw.design/">Alex Law</a>
						</p>
					</div>
					<div class="flex max-h-[25px] items-center justify-center gap-5">
						<div class="w-[25px] max-w-[25px]">
							<a
								class="link link-hover"
								href="https://www.linkedin.com/in/sammymohamed12/"
							>
								<ng-icon name="faBrandLinkedin"></ng-icon>
								<span class="sr-only">LinkedIn Profile</span>
							</a>
						</div>
						<div class="w-[25px] max-w-[25px]">
							<a href="https://github.com/thatsamsonkid">
								<ng-icon name="faBrandGithub"></ng-icon>
								<span class="sr-only">Github Profile</span>
							</a>
						</div>
						<div class="w-[25px] max-w-[25px]">
							<a href="https://twitter.com/SammyMohamed_">
								<ng-icon name="faBrandXTwitter"></ng-icon>
								<span class="sr-only">X Profile</span>
							</a>
						</div>
					</div>
					<div>
						<p class="copyright">
							&copy; {{ currentYear }} Sammy Mohamed | All Rights Reserved
						</p>
					</div>
				</div>
			</div>
		</div>
	`,
})
export default class FooterComponent {
	currentDate = new Date();
	currentYear = this.currentDate.getFullYear();
}
