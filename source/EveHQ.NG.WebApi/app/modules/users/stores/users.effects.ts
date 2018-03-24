import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from 'modules/users/models/user';
import { UserService } from 'modules/users/services/user.service';
import { UsersActionTypes, UsersActions, LoadSuccess, LoadFail, SetUser, SetUserSuccess, SetUserFail } from
	'modules/users/stores/users.actions';

@Injectable()
export class UsersEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService) {
	}

	@Effect()
	public loadUser$: Observable<LoadSuccess | LoadFail> = this.actions$.pipe(
		ofType(UsersActionTypes.Load),
		switchMap(() => this.userService.getUser().pipe(
				map((user: User | undefined) => new LoadSuccess(user)),
				catchError(error => of(new LoadFail(error)))
			)
		));

	@Effect()
	public setUser$: Observable<SetUserSuccess | SetUserFail> = this.actions$.pipe(
		ofType(UsersActionTypes.SetUser),
		map((action: SetUser) => action.payload),
		mergeMap((user: User) => this.userService.setUser(user).pipe(
			map(() => new SetUserSuccess(user)),
			catchError(error => of(new SetUserFail(error)))
		)));
}
