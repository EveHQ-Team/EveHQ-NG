import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthenticationActionTypes, Login, LoginSuccess, LoginFailure } from 'modules/authentication/stores/authentication.actions';
import { AuthenticationService } from 'modules/authentication/services/authentication.service';
import { Authenticate } from 'modules/authentication/models/authenticate';

@Injectable()
export class UserBasedStatusEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router) {
	}

	@Effect()
	public login$ = this.actions$.pipe(
		ofType(AuthenticationActionTypes.Login),
		map((action: Login) => action.payload),
		exhaustMap((auth: Authenticate) =>
			this.authenticationService
			.login(auth)
			.pipe(
				map(user => new LoginSuccess({ user })),
				catchError(error => of(new LoginFailure(error)))
			)
		)
	);

	@Effect({ dispatch: false })
	public loginSuccess$ = this.actions$.pipe(
		ofType(AuthenticationActionTypes.LoginSuccess),
		tap(() => this.router.navigate(['/users/dashboard']))
	);

	@Effect({ dispatch: false })
	public loginRedirect$ = this.actions$.pipe(
		ofType(AuthenticationActionTypes.LoginRedirect, AuthenticationActionTypes.Logout),
		tap(_ => {
			this.router.navigate(['/users/login']);
		})
	);

	@Effect({ dispatch: false })
	public createUserRedirect$ = this.actions$.pipe(
		ofType(AuthenticationActionTypes.CreateUserRedirect),
		tap(_ => this.router.navigate(['/users/create']))
	);

	@Effect({ dispatch: false })
	public homeRedirect$ = this.actions$.pipe(
		ofType(AuthenticationActionTypes.HomeRedirect),
		tap(_ => this.router.navigate(['/users/dashboard'])) // TODO: Redirect to default characters dashboard when it is ready.
	);
}
