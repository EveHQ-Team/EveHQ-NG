import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CreateUserRouteGuard implements CanActivate {

	constructor(private readonly router: Router) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let routeToNavigate = '/characters/dashboard';

		if (!this.isUserCreated()) {
			return true;
		}
		else if (this.isLoginRequired() && !this.isLoggedIn()) {
			routeToNavigate = '/users/login';
		}

		this.router.navigate([routeToNavigate]);
		return false;
	}

	private isUserCreated(): boolean {
		return true;
	}

	private isLoginRequired(): boolean {
		return true;
	}

	private isLoggedIn(): boolean {
		return false;
	}
}
