import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ApplicationModule } from 'modules/application/application.module';
import { environment } from 'environments';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ApplicationModule);
