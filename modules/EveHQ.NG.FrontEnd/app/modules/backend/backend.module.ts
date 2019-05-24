import { NgModule } from '@angular/core';
import { UserService } from 'modules/backend/application/user.service';
import { AuthenticationService } from 'modules/backend/application/authentication.service';

@NgModule({
	providers: [
		UserService,
		AuthenticationService
	]
})
export class BackendModule {
}
