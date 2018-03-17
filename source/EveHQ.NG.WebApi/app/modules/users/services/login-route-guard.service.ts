import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class LoginRouteGuard implements CanActivate {

	constructor(private readonly router: Router) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let routeToNavigate = '/characters/dashboard';

		if (this.isUserCreated()) {
			if (this.isLoginRequired() && !this.isLoggedIn()) {
				return true;
			}
		}
		else {
			routeToNavigate = '/users/create';
		}

		this.router.navigate([routeToNavigate]);
		return false;
	}

	private isUserCreated(): boolean {
		return true;
	}

	private isLoginRequired(): boolean {
		return false;
	}

	private isLoggedIn(): boolean {
		return false;
	}
}
