import { Injectable, ComponentFactoryResolver, Type } from '@angular/core';
import { Router } from '@angular/router'
import { ComponentHostDirective } from 'modules/application/services/component-host.directive';
import { NewUserComponent } from 'modules/application/new-user/new-user.component';
import { UserLoginComponent } from 'modules/application/user-login/user-login.component';
import { MetaGameProfileSelectorComponent } from
	'modules/application/meta-game-profile-selector/meta-game-profile-selector.component';
import { UserRepository } from 'modules/application/services/user.repository';
import { IUseCaseContext } from 'modules/common/use-case-context';

@Injectable()
export class PresentInstallationContext implements IUseCaseContext {

	constructor(
		private readonly componentFactoryResolver: ComponentFactoryResolver,
		private readonly router: Router,
		private readonly userRepository: UserRepository) {
	}

	public initialize(componentHost: ComponentHostDirective): void {
		this.componentHost = componentHost;
	}

	public start(): void {
		const viewContainerRef = this.componentHost.viewContainerRef;
		viewContainerRef.clear();

	}

	private componentHost: ComponentHostDirective;
}
