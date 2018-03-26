import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'modules/backend/application/user.service';
import {
	ShellActionTypes,
	CreateUser,
	LoginUser,
	LoginPageRedirect,
	LoginUserSuccess,
	SelectProfile,
	SelectProfileSuccess,
	SelectProfileRedirect,
	OpenCharacterDashboard,
	ApplicationError
	} from 'modules/application/stores/shell.actions';
import { User } from 'modules/application/models/user';
import { AuthenticatedUser } from 'modules/application/models/authenticated-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

@Injectable()
export class ShellEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService,
		private readonly router: Router) {
	}

	@Effect()
	public initializeShell$ = this.actions$.pipe(
		ofType(ShellActionTypes.InitializeApplication),
		mergeMap(() =>
			// TODO: Remember to return user object with an empty password field.
			this.userService.getUser().pipe(
				map((user: User | undefined) =>
					user === undefined
					? new CreateUser()
					: new LoginUser(user)),
				// TODO: Define application error logic.
				catchError(error => of(new ApplicationError(error)))
			)
		)
	);

	@Effect({ dispatch: false })
	public createUser$ = this.actions$.pipe(
		ofType(ShellActionTypes.CreateUser),
		tap(() => this.router.navigate(['/users/create']))
	);

	@Effect()
	public loginUser$ = this.actions$.pipe(
		ofType(ShellActionTypes.LoginUser),
		map((action: LoginUser) => action.payload),
		map((user: User) => {
				const authenticatedUser = { name: user.name, email: user.email };
				return user.isLogInRequired
							? new LoginPageRedirect(authenticatedUser)
							: new LoginUserSuccess(authenticatedUser);
			}
		)
	);

	@Effect({ dispatch: false })
	public loginPageRedirect$ = this.actions$.pipe(
		ofType(ShellActionTypes.LoginPageRedirect),
		map((action: LoginPageRedirect) => action.payload),
		tap((user: AuthenticatedUser) =>
			this.router.navigate(['/authentication/login'], { queryParams: { name: user.name, email: user.email } }))
	);

	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(ShellActionTypes.LoginUserSuccess),
		mergeMap(() =>
			this.userService.getUserProfiles().pipe(
				map((profiles: MetaGameProfile[]) => new SelectProfile(profiles)),
				catchError(error => of(new ApplicationError(error)))
			)
		)
	);

	@Effect()
	public selectProfile$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfile),
		map((action: SelectProfile) => action.payload),
		map((profiles: MetaGameProfile[]) =>
			profiles.length > 1
			? new SelectProfileRedirect(profiles)
			: new SelectProfileSuccess(profiles[0]))
	);

	@Effect()
	public selectProfileSuccess$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfileSuccess),
		map(() => new OpenCharacterDashboard())
	);

	@Effect()
	public selectProfileRedirect$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfileRedirect),
		map((action: SelectProfile) => action.payload),
		tap((profiles: MetaGameProfile[]) => {
			return this.router.navigate(['/authentication/select-profile'], { queryParams: { profiles: JSON.stringify(profiles) } });
		})
	);

	@Effect({ dispatch: false })
	public openCharacterDashboard$ = this.actions$.pipe(
		ofType(ShellActionTypes.OpenCharacterDashboard),
		tap(() => this.router.navigate(['/characters/dashboard']))
	);
}
