import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, tap } from 'rxjs/operators';
import { LoginRedirect, CreateUserRedirect } from 'modules/users/stores/users.actions';
import * as fromUsers from 'modules/users/stores/users-module.reducers';

@Injectable()
export class AuthenticationGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private readonly store: Store<fromUsers.State>) {
	}

	public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
		// TODO: Remove logging.
		console.warn('AuthenticationGuard.canActivate');

		return this.store.combineLatest(
			this.isUserCreated(),
			this.isLoginRequired(),
			this.isLoggedIn(),
			(state, isUserCreated, isLoginRequired, isLoggedIn) => {
				if (isUserCreated) {
					if (isLoginRequired && !isLoggedIn) {
						this.store.dispatch(new LoginRedirect());
						return false;
					}
					else {
						return true;
					}
				}
				else {
					this.store.dispatch(new CreateUserRedirect());
					return false;
				}
			});
	}

	private isUserCreated(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsUserCreated),
			tap(value => console.log('AuthenticationGuard.isUserCreated: ', value)),
			take(1));
	}

	private isLoginRequired(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLogInRequired),
			tap(value => console.log('AuthenticationGuard.isLoginRequired: ', value)),
			take(1));
	}

	private isLoggedIn(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLoggedIn),
			tap(value => console.log('AuthenticationGuard.isLoggedIn: ', value)),
			take(1));
	}
}
