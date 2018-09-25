import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'modules/users/create-user/create-user.component';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ProfilesEditorComponent } from './profiles-editor/profiles-editor.component';

const usersRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users/dashboard'
	},
	{
		path: 'dashboard',
		component: UserDashboardComponent
	},
	{
		path: 'create',
		component: CreateUserComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		ListboxModule,
		CardModule,
		RouterModule.forChild(usersRoutes)
	],
	declarations: [
		UserDashboardComponent,
		CreateUserComponent,
		UserEditorComponent,
		ProfilesEditorComponent
	]
})
export class UsersModule {}
