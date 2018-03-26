import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // TODO: Remove?
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersRoutes } from 'modules/users/users-routing.module';
import { CreateUserComponent } from 'modules/users/create-user/create-user.component';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { usersModuleReducers } from 'modules/users/stores/users-module.reducers';
import { CreateUserEffects } from 'modules/users/create-user/create-user.store';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ProfilesEditorComponent } from './profiles-editor/profiles-editor.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		ListboxModule,
		RouterModule.forChild(usersRoutes),
		StoreModule.forFeature('users', usersModuleReducers),
		EffectsModule.forFeature([CreateUserEffects])
	],
	declarations: [
		UserDashboardComponent,
		CreateUserComponent,
		UserEditorComponent,
		ProfilesEditorComponent
	]
})
export class UsersModule {
}
