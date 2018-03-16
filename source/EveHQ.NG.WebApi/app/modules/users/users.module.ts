import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from 'modules/users/users-routing.module';
import { CommonServicesModule } from 'modules/common/common-services.module';
import { NewUserComponent } from 'modules/users/new-user/new-user.component';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { MetaGameProfileManagerComponent } from 'modules/users/meta-game-profile-manager/meta-game-profile-manager.component';
import { MetaGameProfileSelectorComponent } from 'modules/users/meta-game-profile-selector/meta-game-profile-selector.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginRouteGuard } from 'modules/users/services/login-route-guard.service';
import { CreateUserRouteGuard } from 'modules/users/services/create-user-route-guard.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		CommonServicesModule,
		UsersRoutingModule
	],
	declarations: [
		UserDashboardComponent,
		NewUserComponent,
		UserLoginComponent,
		MetaGameProfileSelectorComponent,
		MetaGameProfileManagerComponent
	],
	providers: [
		LoginRouteGuard,
		CreateUserRouteGuard
	]
})
export class UsersModule {
}
