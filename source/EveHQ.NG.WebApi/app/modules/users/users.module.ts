import { NgModule } from '@angular/core';
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
import { usersModuleReducers } from 'modules/users/stores/users-module.reducers';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		RouterModule.forChild(usersRoutes),
		StoreModule.forFeature('users', usersModuleReducers),
		EffectsModule.forFeature([])
	],
	declarations: [
		[
			UserDashboardComponent,
			NewUserComponent,
			UserLoginComponent,
			MetaGameProfileSelectorComponent,
			MetaGameProfileManagerComponent
		]
	]
})
export class UsersModule {
}
