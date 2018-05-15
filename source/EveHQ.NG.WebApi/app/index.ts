import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ApplicationModule } from 'modules/application/application.module';
import { environment } from 'environments';
import { create } from 'rxjs-spy';
import { SnapshotPlugin, GraphPlugin } from 'rxjs-spy/plugin';

if (environment.production) {
	enableProdMode();
}

const spy = create({ defaultPlugins: false });
spy.plug(
	new GraphPlugin(),
	new SnapshotPlugin(spy));

platformBrowserDynamic().bootstrapModule(ApplicationModule);

