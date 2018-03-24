import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersRoutes } from 'modules/users/users-routing.module';
import { NewUserComponent } from 'modules/users/new-user/new-user.component';
import { UserService } from 'modules/users/services/user.service';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { MetaGameProfileManagerComponent } from 'modules/users/meta-game-profile-manager/meta-game-profile-manager.component';
import { MetaGameProfileSelectorComponent } from 'modules/users/meta-game-profile-selector/meta-game-profile-selector.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { usersModuleReducers } from 'modules/users/stores/users-module.reducers';
import { UsersEffects } from 'modules/users/stores/users.effects';
import { UserEditorComponent } from './user-editor/user-editor.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		RouterModule.forChild(usersRoutes),
		StoreModule.forFeature('users', usersModuleReducers),
		EffectsModule.forFeature([UsersEffects])
	],
	declarations: [
		UserDashboardComponent,
		NewUserComponent,
		UserLoginComponent,
		MetaGameProfileSelectorComponent,
		MetaGameProfileManagerComponent,
		UserEditorComponent
	],
	providers: [
		UserService
	]
})
export class UsersModule {
}
