import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router'
import { ComponentHostDirective } from 'modules/application/services/component-host.directive';
import { NewUserComponent } from 'modules/application/new-user/new-user.component';
import { UserRepository } from 'modules/application/services/user.repository';
import { IUseCaseContext } from 'modules/common/use-case-context';
import { MetaGameProfileManagerComponent } from 'modules/meta-game/meta-game-profile-manager/meta-game-profile-manager.component';

@Injectable()
export class NewInstallationContext implements IUseCaseContext {

	constructor(
		private readonly componentFactoryResolver: ComponentFactoryResolver,
		private readonly router: Router,
		private readonly userRepository: UserRepository) {
	}

	public initialize(componentHost: ComponentHostDirective): void {
		this.componentHost = componentHost;
		this.viewContainerRef = this.componentHost.viewContainerRef;
	}

	public start(): void {
		this.viewContainerRef.clear();
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewUserComponent);
		const component = this.viewContainerRef.createComponent(componentFactory).instance as NewUserComponent;
		component.userDataEntered.subscribe(this.createMetaGameProfiles.bind(this));
	}

	private createMetaGameProfiles(): void {
		this.viewContainerRef.clear();
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MetaGameProfileManagerComponent);
		const component = this.viewContainerRef.createComponent(componentFactory).instance;
		//TODO: Require presence of 'Finish user creating' command or supply it.
	}

	private componentHost: ComponentHostDirective;
	private viewContainerRef: any;
}
