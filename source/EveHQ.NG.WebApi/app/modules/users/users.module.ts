import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersRoutes } from 'modules/users/users-routing.module';
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
import { AuthenticationService } from 'modules/users/services/authentication.service';
import { UserBasedStatusEffects } from 'modules/users/stores/users.effects';
import { usersModuleReducers } from 'modules/users/stores/users-module.reducers';
import { AuthenticationGuard } from 'modules/users/services/authentication-guard.service';

const selfComponents =
[
	UserDashboardComponent,
	NewUserComponent,
	UserLoginComponent,
	MetaGameProfileSelectorComponent,
	MetaGameProfileManagerComponent
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule
	],
	declarations: [
		selfComponents
	],
	exports: [
		// TODO: Do I really need to export this internal components?
		selfComponents
	],
	providers: [
		LoginRouteGuard,
		CreateUserRouteGuard
	]
})
export class UsersModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: RootUsersModule,
			providers: [
				AuthenticationService,
				AuthenticationGuard
			]
		};
	}
}

@NgModule({
	imports: [
		UsersModule,
		RouterModule.forChild(usersRoutes),
		StoreModule.forFeature('users', usersModuleReducers),
		EffectsModule.forFeature([UserBasedStatusEffects])
	]
})
export class RootUsersModule {
}
