import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, tap } from 'rxjs/operators';
import { LoginRedirect, HomeRedirect } from 'modules/users/stores/users.actions';
import * as fromUsers from 'modules/users/stores/users-module.reducers';

@Injectable()
export class CreateUserRouteGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private readonly store: Store<fromUsers.State>) {
	}

	public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
		console.warn('CreateUserRouteGuard.canActivate');

		return this.store.combineLatest(
			this.isUserCreated(),
			this.isLoginRequired(),
			this.isLoggedIn(),
			(state, isUserCreated, isLoginRequired, isLoggedIn) => {
				if (!isUserCreated) {
					return true;
				}
				else if (isLoginRequired && !isLoggedIn) {
					this.store.dispatch(new LoginRedirect());
					return false;
				}

				this.store.dispatch(new HomeRedirect());
				return false;
			});
	}

	private isUserCreated(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsUserCreated),
			tap(value => console.log('CreateUserRouteGuard.isUserCreated: ', value)),
			take(1));
	}

	private isLoginRequired(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLogInRequired),
			tap(value => console.log('CreateUserRouteGuard.isLoginRequired: ', value)),
			take(1));
	}

	private isLoggedIn(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLoggedIn),
			tap(value => console.log('CreateUserRouteGuard.isLoggedIn: ', value)),
			take(1));
	}
}
