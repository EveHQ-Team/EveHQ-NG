import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ApplicationModule } from 'modules/application/application.module';
import { environment } from 'environments';
import { create } from 'rxjs-spy';

if (environment.production) {
	enableProdMode();
}

//const spy = create();
//spy.log(/a./);

platformBrowserDynamic().bootstrapModule(ApplicationModule);
