import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router'
import { ComponentHostDirective } from 'modules/application/services/component-host.directive';
//import { NewUserComponent } from 'modules/application/new-user/new-user.component';
//import { UserLoginComponent } from 'modules/application/user-login/user-login.component';
//import { MetaGameProfileSelectorComponent } from
//	'modules/application/meta-game-profile-selector/meta-game-profile-selector.component';
import { UserRepository } from 'modules/application/services/user.repository';
import { IUseCaseContext } from 'modules/common/use-case-context';
import { NewInstallationContext } from 'modules/application/startup/new-installation.context';
import { PresentInstallationContext } from 'modules/application/startup/present-installation.context';

@Injectable()
export class StartupContext {

	constructor(
		private readonly componentFactoryResolver: ComponentFactoryResolver,
		private readonly router: Router,
		private readonly userRepository: UserRepository,
		private readonly newInstallationContext: NewInstallationContext,
		private readonly presentInstallationContext: PresentInstallationContext,
		) {
	}

	public initialize(componentHost: ComponentHostDirective): void {
		this.componentHost = componentHost;
	}

	public start(): void {
		const viewContainerRef = this.componentHost.viewContainerRef;
		viewContainerRef.clear();

		const useCaseContext = this.selectStartupContext();
		useCaseContext.start();
		//---------------
/*
		if (useCaseContext) {
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(useCaseContext);
			const componentRef = viewContainerRef.createComponent(componentFactory);
		}
		else if (this.userRepository.user && this.userRepository.user.defaultMetaGameProfile.characters.length === 0) {
			this.router.navigate(['user-dashboard']);
		}
		else {
			this.router.navigate(['character-dashboard']);
		}
*/
	}
/*
	private selectStartupPage(): Type<any> | undefined {
		if (!this.userRepository.isUserCreated) {
			return NewUserComponent;
		}
		else if (this.userRepository.user.isLoginRequired && !this.userRepository.user.isLoggedIn) {
			return UserLoginComponent;
		}
		else if (this.userRepository.user.metaGamesProfiles.length > 1) {
			return MetaGameProfileSelectorComponent;
		}

		return undefined;
	}
*/
	private selectStartupContext(): IUseCaseContext {
		if (!this.userRepository.isUserCreated) {
			this.newInstallationContext.initialize(this.componentHost);
			return this.newInstallationContext;
		}
		else {
			this.presentInstallationContext.initialize(this.componentHost);
			return this.presentInstallationContext;
		}
	}

	private componentHost: ComponentHostDirective;
}
