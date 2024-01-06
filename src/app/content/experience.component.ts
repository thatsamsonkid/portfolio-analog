import { AsyncPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
	computed,
	inject,
	signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
	BrnTabsContentDirective,
	BrnTabsDirective,
	BrnTabsListDirective,
	BrnTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-brain';
import { Observable, tap } from 'rxjs';
import { WindowService } from '../core/window.service';
@Component({
	selector: 'app-exp',
	standalone: true,
	imports: [
		BrnTabsDirective,
		BrnTabsContentDirective,
		BrnTabsListDirective,
		BrnTabsTriggerDirective,
		AsyncPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="mb-6 text-left text-5xl font-bold">Professional Experience</h1>
		<div brnTabs="fulltime" class="w-full">
			<div
				brnTabsList
				class="relative grid w-full grid-cols-2"
				aria-label="tabs example"
			>
				<button
					brnTabsTrigger="fulltime"
					class="h-12 data-[state=inactive]:opacity-70"
				>
					Employee
				</button>
				<button
					brnTabsTrigger="contractor"
					class="h-12 data-[state=inactive]:opacity-70"
				>
					Contractor
				</button>

				@if ({
					windowResize: windowResize$ | async,
					tabChange: tabValueChange$ | async
				}) {
					<span
						class="absolute bottom-0 h-[2px] bg-ocean-blue"
						style="left: {{ left() }}px; width: {{
							width()
						}}px;transition: width .3s,left .3s;"
					></span>
				}
			</div>
			<div class="p-3" brnTabsContent="fulltime">
				<div class="mb-6" [attr.data-active]="fullTimeTabActive()">
					<h2 class="mb-1">
						Amtrak -
						<span class="italic text-ocean-blue">Lead Software Engineer</span>
					</h2>
					<p class="mb-3 text-xs">Aug 2018 - Present</p>
					<ul class="list-disc space-y-4">
						<li>
							Leading development for various projects primarily for
							Amtrak.com's booking flow
						</li>
						<li>
							Planning out app features and breaking down business requirements
							into workable stories for the team.
						</li>
						<li>
							Leading Tech workshops to further the team's development and
							knowledge of both our Applications and the underlying technologies
							that they run on
						</li>
						<li>
							Often conduct research and develop Proof of Concept's for new App
							features, libraries or tool integrations within our code base
						</li>
						<li>Leading efforts to improve Amtrak.com site Performance</li>
						<li>
							Developing internal tools to help improve Dev and QA process
						</li>
						<li>
							Working with the team to establish and uphold code quality and
							standards
						</li>
						<li>
							Created technical diagrams to aid visualization of architecture
							and complex flows
						</li>
						<li>
							Co-lead Angular development efforts for Amtrak's Style Guide and
							Component Library
						</li>
						<li>
							Developed and provided support for several Amtrak micro-sites
						</li>
						<li>
							Recommended and executed both design and performance improvements
							on various Amtrak applications
						</li>
					</ul>
				</div>
			</div>
			<div class="p-3 " brnTabsContent="contractor">
				<div class="mb-6" [attr.data-active]="contractorTabActive()">
					<h2 class="mb-1">
						Anheuser-Busch InBev -
						<span class="italic text-ocean-blue">Software Engineer</span>
					</h2>
					<p class="mb-3 text-xs">Sep 2020 - Oct 2021</p>
					<ul class="md:text-md ml-4 list-disc space-y-4 text-sm">
						<li>
							Lead development work to migrate brands sites in single mono-repo
						</li>
						<li>
							Lead development work to improve code base to pass Adobe Security
							testing and Cloud compatibility on Adobe Cloud.
						</li>
						<li>
							Created technical documents and process workflows to define Adobe
							Cloud development
						</li>
						<li>
							Developed several surveys to collect customer feedback and improve
							MyCooler experience for customers. (New Customer and Rewards
							Redemption)
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-1">
						Stantec -
						<span class="italic text-ocean-blue">Software Engineer</span>
					</h2>
					<p class="mb-3 text-xs">Apr 2021 - May 2021</p>
					<ul class="ml-4 list-disc">
						<li>
							Lead development work to resolve over 20k ADA issues site wide to
							up hold ADA compliance in accordance to Canadian regulations
						</li>
					</ul>
				</div>
			</div>
		</div>
	`,
})
export default class ExperienceComponent implements OnInit {
	width = signal(0);
	left = signal(0);

	activeTab = signal('');

	fullTimeTabActive = computed(() => this.activeTab() === 'fulltime');
	contractorTabActive = computed(() => this.activeTab() === 'contractor');

	private windowService = inject(WindowService);

	private injector = inject(Injector);

	windowResize$ = this.windowService.resizeObserver.pipe(
		tap(() => this.activeTab() && this.updateTabHighlight(this.activeTab())),
	);

	tabValueChange$!: Observable<string | undefined>;

	@ViewChild(BrnTabsDirective, { static: true })
	tab!: BrnTabsDirective;

	@ViewChildren(BrnTabsTriggerDirective)
	tabTriggers!: QueryList<BrnTabsTriggerDirective>;

	ngOnInit(): void {
		this.tabValueChange$ = toObservable(this.tab.$value, {
			injector: this.injector,
		}).pipe(
			tap((val) => {
				if (val) {
					this.activeTab.set(val);
					this.updateTabHighlight(val);
				}
			}),
		);
	}

	updateTabHighlight(val: string): void {
		const tabs = this.tabTriggers.toArray();
		// @ts-ignore
		const activeTab = tabs.find((tab) => tab._key === val);
		// @ts-ignore
		this.width.set(activeTab._elementRef.nativeElement.offsetWidth);
		// @ts-ignore
		this.left.set(activeTab._elementRef.nativeElement.offsetLeft);
	}
}
