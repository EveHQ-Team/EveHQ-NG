import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { v4 as uuid } from 'node-uuid';
import { UserService } from 'modules/backend/application/user.service';
import { Action } from '@ngrx/store';
import { ApplicationUser} from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { CreateUserModel } from 'modules/users/models/create-user-model';
import { InitializeApplication } from 'modules/application/stores/shell.actions';

export interface NewUserPageState {
	user: ApplicationUser;
	profiles: MetaGameProfile[];
	isLoading: boolean;
	isLoaded: boolean;
}

const initialState: NewUserPageState = {
	user: new ApplicationUser(),
	profiles: [{ name: 'All Characters profile', id: uuid() }],
	isLoading: false,
	isLoaded: false
};

export enum UsersActionTypes {
	CreateUser = '[NEW-USER-PAGE] Create User',
	CreateUserSuccess = '[NEW-USER-PAGE] Create User Success',
	CreateUserFail = '[NEW-USER-PAGE] Create User Fail',
	AddProfile = '[NEW-USER-PAGE] Add Profile',
	RemoveProfile = '[NEW-USER-PAGE] Remove Profile'
}

export class CreateUser implements Action {
	constructor(public readonly payload: CreateUserModel) {
	}

	public readonly type: string = UsersActionTypes.CreateUser;
}

export class CreateUserSuccess implements Action {
	constructor(public readonly payload: CreateUserModel) {
	}

	public readonly type: string = UsersActionTypes.CreateUserSuccess;
}

export class CreateUserFail implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = UsersActionTypes.CreateUserFail;
}

export class AddProfile implements Action {
	constructor(public readonly payload: MetaGameProfile) {
	}

	public readonly type: string = UsersActionTypes.AddProfile;
}

export class RemoveProfile implements Action {
	constructor(public readonly payload: string) {
	}

	public readonly type: string = UsersActionTypes.RemoveProfile;
}

export type UsersActions =
	| CreateUser
	| CreateUserSuccess
	| CreateUserSuccess
	| AddProfile
	| RemoveProfile;


export function createUserReducer(state = initialState, action: UsersActions): NewUserPageState {
	switch (action.type) {
		case UsersActionTypes.CreateUserSuccess:
		{
			const model = action.payload as CreateUserModel;
			return {
				...state,
				user: model.user,
				profiles: model.profiles
			};

		}

		case UsersActionTypes.AddProfile:
		{
			const profile = action.payload as MetaGameProfile;
			console.log('add profile ', profile);
			return {
				...state,
				profiles: [...state.profiles, profile]
			};
		}

		case UsersActionTypes.RemoveProfile:
		{
			const profileIdToRemove = action.payload as string;
			return {
				...state,
				profiles: state.profiles.filter(profile => profile.id !== profileIdToRemove)
			};
		}

		default:
		{
			return state;
		}
	}
}


@Injectable()
export class CreateUserEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService) {
	}

	@Effect()
	public createUser$: Observable<CreateUserSuccess | CreateUserFail> = this.actions$.pipe(
		ofType(UsersActionTypes.CreateUser),
		map((action: CreateUser) => action.payload),
		mergeMap((model: CreateUserModel) =>
			forkJoin(
				this.userService.setUser(model.user, model.password),
				this.userService.setUserProfiles(model.profiles))
			.pipe(
				map(() => new CreateUserSuccess(model)),
				catchError(error => of(new CreateUserFail(error))))));

	@Effect()
	public createUserSuccess$: Observable<InitializeApplication> = this.actions$.pipe(
		ofType(UsersActionTypes.CreateUserSuccess),
		map(() => new InitializeApplication()));
}


export class NewUserSelectors {
	public static readonly getIsLoading = (state: NewUserPageState) => state.isLoading;
	public static readonly getIsLoaded = (state: NewUserPageState) => state.isLoaded;
	public static readonly getUser = (state: NewUserPageState) => state.user;
	public static readonly getProfiles = (state: NewUserPageState) => state.profiles;
}
