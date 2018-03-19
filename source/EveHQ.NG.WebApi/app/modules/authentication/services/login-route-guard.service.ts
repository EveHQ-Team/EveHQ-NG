import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, tap } from 'rxjs/operators';
import { HomeRedirect, CreateUserRedirect } from 'modules/authentication/stores/authentication.actions';
import * as fromUsers from 'modules/authentication/stores/authentication-module.reducers';

@Injectable()
export class LoginRouteGuard implements CanActivate {

	constructor(
		private readonly router: Router,
		private readonly store: Store<fromUsers.State>) {
	}

	public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
		// TODO: Remove logging.
		console.warn('LoginRouteGuard.canActivate');
		//this.isUserCreated().subscribe(value => console.log('this.isUserCreated(): ', value));

		return this.store.combineLatest(
			this.isUserCreated(),
			this.isLoginRequired(),
			this.isLoggedIn(),
			(state, isUserCreated, isLoginRequired, isLoggedIn) => {
				if (isUserCreated) {
					if (isLoginRequired && !isLoggedIn) {
						return true;
					}
					else {
						this.store.dispatch(new HomeRedirect());
						return false;
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
			tap(value => console.log('LoginRouteGuard.isUserCreated: ', value)),
			take(1));
	}

	private isLoginRequired(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLogInRequired),
			tap(value => console.log('LoginRouteGuard.isLoginRequired: ', value)),
			take(1));
	}

	private isLoggedIn(): Observable<boolean> {
		return this.store.pipe(
			select(fromUsers.getIsLoggedIn),
			tap(value => console.log('LoginRouteGuard.isLoggedIn: ', value)),
			take(1));
	}
}
