import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	standalone: true,
	template: `
		<main class="">
			<section class="flex min-h-screen flex-col content-center items-center" id="home">
				<div class="mt-40 pb-40">
					<h1 class="mt-0 text-center text-3xl leading-7 tracking-wide text-white md:text-6xl md:tracking-widest">
						Sammy Mohamed
					</h1>
					<p class="text-ocean-blue mt-0 text-center text-3xl italic tracking-wide">Just a Dev</p>
				</div>
				<!-- <Navigation></Navigation> -->
			</section>

			<section id="about" class="max-content-width mx-auto mb-20 min-h-screen px-5 md:px-12">
				<!-- <AboutMe></AboutMe> -->
			</section>
			<section id="professional" class="max-content-width mx-auto min-h-screen px-5 md:px-12">
				<!-- <Professional></Professional> -->
			</section>
			<section id="skills" class="max-content-width mx-auto my-20 min-h-screen px-5 md:px-12">
				<!-- <Skills></Skills> -->
			</section>
			<section id="contact" class="max-content-width mx-auto mb-40 mt-20 px-3">
				<div class="flex flex-col md:flex-row">
					<div class="mx-4 flex-1">
						<h1 class="mb-6 text-center text-3xl font-bold md:text-5xl">Get In Touch!</h1>
						<div class="mt-12 text-center">
							<ul class="mb-4 inline-block space-y-2 text-center md:space-y-4">
								<li class="flex items-center">
									<a class="link link-hover md:text-xl" href="https://www.linkedin.com/in/sammymohamed12/">
										<!-- <FontAwesomeIcon
                      class="w-[13.5px] md:w-[16.5px]  inline-block mr-2 mb-1 md:mb-2"
                      icon={faLinkedinIn}
                    /> -->
										<span>Connect with me on LinkedIn</span>
									</a>
								</li>
								<li class="flex items-center">
									<a class="link link-hover md:text-xl" href="https://twitter.com/SammyMohamed_">
										<!-- <FontAwesomeIcon
                      class="inline-block w-[13.5px] md:w-[16.5px] mr-2 mb-1"
                      icon={faTwitter}
                    /> -->
										<span>Follow me on Twitter</span>
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="flex-1">
						<div class="md:mt-12">
							<img
								class="mx-auto my-0 h-[186px] w-[364px]"
								src="/images/SAM_1.svg"
								alt="Quetzal Bird Flying over the the Pyramids of Egypt illustrated to refer to Sammy's background"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	`,
})
export default class HomeComponent {
	count = 0;

	increment() {
		this.count++;
	}
}
