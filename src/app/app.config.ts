import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
	ApplicationConfig,
	ɵprovideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
	providers: [
		provideFileRouter(),
		provideHttpClient(withFetch()),
		provideClientHydration(),
		ɵprovideZonelessChangeDetection(),
	],
};
