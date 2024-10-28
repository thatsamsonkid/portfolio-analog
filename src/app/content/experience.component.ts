import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
	viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	BrnTabsContentDirective,
	BrnTabsDirective,
	BrnTabsListDirective,
	BrnTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-brain';
import { WindowService } from '../core/window.service';
@Component({
	selector: 'app-exp',
	standalone: true,
	imports: [
		BrnTabsDirective,
		BrnTabsContentDirective,
		BrnTabsListDirective,
		BrnTabsTriggerDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="mb-6 text-left text-5xl font-bold">Professional Experience</h1>
		<div
			[brnTabs]="activeTabId()"
			class="w-full"
			(tabActivated)="updateActivatedTab($any($event))"
		>
			<div
				brnTabsList
				class="relative grid w-full grid-cols-2"
				aria-label="tabs example"
			>
				<button
					#fullTimeTab="brnTabsTrigger"
					brnTabsTrigger="fulltime"
					class="h-12 data-[state=inactive]:opacity-70"
				>
					Employee
				</button>
				<button
					#contractorTab="brnTabsTrigger"
					brnTabsTrigger="contractor"
					class="h-12 data-[state=inactive]:opacity-70"
				>
					Contractor
				</button>
				<span
					class="absolute bottom-0 h-[2px] bg-ocean-blue"
					style="left: {{ left() }}px; width: {{
						width()
					}}px;transition: width .3s,left .3s;"
				></span>
			</div>
			<div class="animate-fade-right p-3" brnTabsContent="fulltime">
				<div class="mb-6">
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
			<div class="animate-fade-left p-3" brnTabsContent="contractor">
				<div class="mb-6">
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
export default class ExperienceComponent {
	protected activeTabId = signal<string>('fulltime');

	private windowService = inject(WindowService);
	private windowSize = toSignal(this.windowService.resizeObserver);
	private tabTriggers = viewChildren(BrnTabsTriggerDirective);

	private activeTabEl = computed(() => {
		if (!this.activeTabId()) {
			return null;
		}
		const activeTab = this.tabTriggers().find(
			(tab) => tab.key === this.activeTabId(),
		);
		return activeTab ?? null;
	});

	protected width = computed(
		() =>
			this.activeTabEl() &&
			this.windowSize() &&
			this.activeTabEl()?.elementRef?.nativeElement?.offsetWidth,
	);
	protected left = computed(
		() =>
			this.activeTabEl() &&
			this.windowSize() &&
			this.activeTabEl()?.elementRef.nativeElement.offsetLeft,
	);

	updateActivatedTab(tabId: string): void {
		this.activeTabId.set(tabId);
	}
}
