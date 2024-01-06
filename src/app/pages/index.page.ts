import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
	faBrandGithub,
	faBrandLinkedin,
	faBrandXTwitter,
} from '@ng-icons/font-awesome/brands';
import NavigationComponent from '../components/navigation/navigation.component';
import AboutMeComponent from '../content/about-me.component';
import ExperienceComponent from '../content/experience.component';
import SkillsComponent from '../content/skills.component';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		NavigationComponent,
		AboutMeComponent,
		SkillsComponent,
		ExperienceComponent,
		NgIconComponent,
		NgOptimizedImage,
	],
	providers: [
		provideIcons({ faBrandGithub, faBrandLinkedin, faBrandXTwitter }),
	],
	template: `
		<main>
			<section
				class="flex min-h-screen flex-col items-center justify-center"
				id="home"
			>
				<div>
					<h1
						class="text-3xl leading-7 tracking-wide text-white md:text-6xl md:tracking-widest"
					>
						Sammy Mohamed
					</h1>
					<p class="text-center text-3xl italic tracking-wide text-ocean-blue">
						Just a Dev
					</p>
				</div>
				<app-navigation></app-navigation>
			</section>

			<section
				id="about"
				class="max-content-width mx-auto mb-20 min-h-screen px-5 md:px-12"
			>
				<about-me></about-me>
			</section>
			<section
				id="professional"
				class="max-content-width mx-auto min-h-screen px-5 md:px-12"
			>
				<app-exp></app-exp>
			</section>
			<section
				id="skills"
				class="max-content-width mx-auto my-20 min-h-screen px-5 md:px-12"
			>
				<app-skills></app-skills>
			</section>
			<section id="contact" class="max-content-width mx-auto mb-40 mt-20 px-3">
				<div class="flex flex-col md:flex-row">
					<div class="mx-4 flex-1">
						<h1 class="mb-6 text-center text-3xl font-bold md:text-5xl">
							Get In Touch!
						</h1>
						<div class="mt-12 text-center">
							<ul class="mb-4 inline-block space-y-2 text-center md:space-y-4">
								<li>
									<a
										class="flex items-center hover:underline md:text-xl"
										href="https://www.linkedin.com/in/sammymohamed12/"
									>
										<ng-icon
											class="mr-2 mt-1 inline-block w-[13.5px] md:w-[16.5px]"
											name="faBrandLinkedin"
										></ng-icon>
										<span>Connect with me on LinkedIn</span>
									</a>
								</li>
								<li>
									<a
										class="flex items-center hover:underline md:text-xl"
										href="https://twitter.com/SammyMohamed_"
									>
										<ng-icon
											class="mr-2  inline-block w-[13.5px] md:w-[16.5px]"
											name="faBrandXTwitter"
										></ng-icon>
										<span>Follow me on X</span>
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="flex-1">
						<div class="md:mt-12">
							<img
								class="mx-auto my-0 h-[186px] w-[364px]"
								ngSrc="/images/SAM_1.svg"
								width="364"
								height="186"
								priority
								alt="Quetzal Bird Flying over the the Pyramids of Egypt illustrated to refer to Sammy's background"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	`,
})
export default class HomeComponent {}
