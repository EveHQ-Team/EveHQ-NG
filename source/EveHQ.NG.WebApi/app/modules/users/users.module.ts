import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // TODO: Remove?
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { usersRoutes } from 'modules/users/users-routing.module';
import { CreateUserComponent } from 'modules/users/create-user/create-user.component';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
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
		RouterModule.forChild(usersRoutes)
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
