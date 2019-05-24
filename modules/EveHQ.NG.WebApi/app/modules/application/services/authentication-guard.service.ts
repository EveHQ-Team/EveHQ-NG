import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { InitializeApplication } from 'modules/application/use-cases/startup.use-case';
import { ApplicationStore} from 'modules/application/stores/application.state';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private readonly store: Store<ApplicationStore>) {
	}

	public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
		return of(true);
//		return this.store.pipe(
//			select(getUser),
//			map(user => {
//				if (user === undefined) {
//					this.store.dispatch(new InitializeApplication());
//					return false;
//				}
//
//				return true;
//			}));
	}
}
