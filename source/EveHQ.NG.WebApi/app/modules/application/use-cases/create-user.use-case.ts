import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {
	Action, createFeatureSelector, createSelector,
	} from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { v4 as uuid } from 'node-uuid';
import { ApplicationUser } from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { CreateUserModel } from 'modules/application/models/create-user-model';
import { ApplicationStore } from 'modules/application/stores/application.state';


export enum CreateUserUseCaseActionTypes {
	CreateUser = '[CREATE USER USE CASE] Create User',
	CreateUserRedirect = '[CREATE USER USE CASE] Create User Redirect',
	CreateUserSuccess = '[CREATE USER USE CASE] Create User Success',
	CreateUserFail = '[CREATE USER USE CASE] Create User Fail', // TODO: Do I need it?
	AddProfile = '[CREATE USER USE CASE] Add Profile',
	RemoveProfile = '[CREATE USER USE CASE] Remove Profile',
}

export class CreateUser implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUser;

	constructor(public readonly payload: { userData: CreateUserModel }) {}
}

export class CreateUserRedirect implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUserRedirect;
	public payload?: any;
}

export class CreateUserSuccess implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUserSuccess;
	public readonly payload?: any;
}

export class CreateUserFail implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUserFail;

	constructor(public readonly payload: { error: any }) {}
}

export class AddProfile implements Action {
	constructor(public readonly payload: { profileToAdd: MetaGameProfile }) {}

	public readonly type: string = CreateUserUseCaseActionTypes.AddProfile;
}

export class RemoveProfile implements Action {
	constructor(public readonly payload: { profileId: string }) {}

	public readonly type: string = CreateUserUseCaseActionTypes.RemoveProfile;
}

export type CreateUserUseCaseActions =
	| CreateUser
	| CreateUserRedirect
	| CreateUserSuccess
	| CreateUserFail
	| AddProfile
	| AddProfile

export interface CreateUserUseCaseState {
	user: ApplicationUser;
	password: string;
	profiles: MetaGameProfile[];
	error: any;
}

const initialState: CreateUserUseCaseState = {
	user: { isAuthenticationRequired: false, name: '', email: '' },
	password: '',
	profiles: [{ id: uuid(), name: 'Default profile' }],
	error: undefined
};

function createUserUseCaseReducer(state = initialState, action: CreateUserUseCaseActions): CreateUserUseCaseState {
	switch (action.type) {
		case CreateUserUseCaseActionTypes.AddProfile:
			return {
				...state,
				profiles: [...state.profiles, (action as AddProfile).payload.profileToAdd]
			};

		case CreateUserUseCaseActionTypes.RemoveProfile:
			return {
				...state,
				profiles: state.profiles.filter(profile => profile.id !== (action as RemoveProfile).payload.profileId)
			};

		case CreateUserUseCaseActionTypes.CreateUserFail:
			return {
				...state,
				error: (action as CreateUserFail).payload.error
			};

		default:
			return state;
	}
}

export interface CreateUserUseCaseStore extends ApplicationStore {
	useCase: CreateUserUseCaseState
}

export const createUserUseCaseReducers = {
	useCase: createUserUseCaseReducer
};

const getCreateUserUseCaseState = createFeatureSelector<CreateUserUseCaseStore>('createUserUseCase');
const getUseCaseState = createSelector(getCreateUserUseCaseState, state => state.useCase);
export const getUser = createSelector(getUseCaseState, state => state.user);
export const getPassword = createSelector(getUseCaseState, state => state.password);
export const getProfiles = createSelector(getUseCaseState, state => state.profiles);
export const getError = createSelector(getUseCaseState, state => state.error);

@Injectable()
export class CreateUserUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router) {}

/*
	@Effect({ dispatch: false })
	public createUserRedirect$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUserRedirect),
		tap(() => this.router.navigate(['/users/create'])));
*/
}
