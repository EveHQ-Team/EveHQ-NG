import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersActionTypes, Login, LoginSuccess, LoginFailure } from 'modules/users/stores/users.actions';
import { AuthenticationService } from 'modules/users/services/authentication.service';
import { Authenticate } from 'modules/users/models/authenticate';

@Injectable()
export class UserBasedStatusEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router) {
	}

	@Effect()
	public login$ = this.actions$.pipe(
		ofType(UsersActionTypes.Login),
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
		ofType(UsersActionTypes.LoginSuccess),
		tap(() => this.router.navigate(['/characters/dashboard']))
	);

	@Effect({ dispatch: false })
	public loginRedirect$ = this.actions$.pipe(
		ofType(UsersActionTypes.LoginRedirect, UsersActionTypes.Logout),
		tap(_ => {
			this.router.navigate(['/users/login']);
		})
	);

	@Effect({ dispatch: false })
	public createUserRedirect$ = this.actions$.pipe(
		ofType(UsersActionTypes.CreateUserRedirect),
		tap(_ => this.router.navigate(['/users/create']))
	);
}
