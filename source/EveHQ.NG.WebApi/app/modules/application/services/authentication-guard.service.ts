import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { InitializeApplication } from 'modules/application/stores/shell.actions';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';
import { getUser } from 'modules/application/stores/application-reducers.store';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private readonly store: Store<ApplicationState>) {
	}

	public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
		return this.store.pipe(
			select(getUser),
			map(user => {
				if (user === undefined) {
					this.store.dispatch(new InitializeApplication());
					return false;
				}

				return true;
			}));
	}
}