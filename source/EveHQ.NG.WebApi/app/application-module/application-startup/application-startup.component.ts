import { Component, OnInit, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { Router } from '@angular/router'
import { ComponentHostDirective } from 'application-module/services/component-host.directive';
import { NewUserComponent } from 'application-module/new-user/new-user.component';
import { UserManagerService } from 'application-module/services/user-manager.service';
import { UserLoginComponent } from 'application-module/user-login/user-login.component';
import { MetaGameProfileSelectorComponent } from
	'application-module/meta-game-profile-selector/meta-game-profile-selector.component';

@Component({
	selector: 'evehq-application-startup',
	templateUrl: './application-startup.component.html',
	styleUrls: ['./application-startup.component.scss']
})
export class ApplicationStartupComponent implements OnInit {

	constructor(
		private readonly componentFactoryResolver: ComponentFactoryResolver,
		private readonly userManagerService: UserManagerService,
		private readonly router: Router) {
	}

	public ngOnInit() {
		const viewContainerRef = this.componentHost.viewContainerRef;
		viewContainerRef.clear();

		const componentType = this.selectStartupPage();
		if (componentType) {
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
			viewContainerRef.createComponent(componentFactory);
		}
		else if (this.userManagerService.user && this.userManagerService.user.defaultMetaGameProfile.characters.length === 0) {
			this.router.navigate(['user-dashboard']);
		}
		else {
			this.router.navigate(['character-dashboard']);
		}
	}

	private selectStartupPage(): Type<any> | undefined {
		if (!this.userManagerService.isUserCreated) {
			return NewUserComponent;
		}
		else if (this.userManagerService.user.isLoginRequired && !this.userManagerService.user.isLoggedIn) {
			return UserLoginComponent;
		}
		else if (this.userManagerService.user.metaGamesProfiles.length > 1) {
			return MetaGameProfileSelectorComponent;
		}

		return undefined;
	}

	@ViewChild(ComponentHostDirective)
	public componentHost: ComponentHostDirective;
}
