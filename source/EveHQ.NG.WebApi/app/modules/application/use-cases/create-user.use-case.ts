import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
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
	AddProfile = '[CREATE USER USE CASE] Add Profile',
	RemoveProfile = '[CREATE USER USE CASE] Remove Profile',
}

export class CreateUser implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUser;
}

export class CreateUserRedirect implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUserRedirect;
}

export class CreateUserSuccess implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.CreateUserSuccess;

	constructor(public readonly payload: { userData: CreateUserModel }) {}
}

export class AddProfile implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.AddProfile;

	constructor(public readonly payload: { profileToAdd: MetaGameProfile }) {}
}

export class RemoveProfile implements Action {
	public readonly type: string = CreateUserUseCaseActionTypes.RemoveProfile;

	constructor(public readonly payload: { profileId: string }) {}
}

export type CreateUserUseCaseActions =
	| CreateUser
	| CreateUserRedirect
	| CreateUserSuccess
	| AddProfile
	| AddProfile

export interface CreateUserUseCaseState {
	user: ApplicationUser;
	password: string;
	profiles: MetaGameProfile[];
}

const initialState: CreateUserUseCaseState = {
	user: { isAuthenticationRequired: false, name: '', email: '' },
	password: '',
	profiles: [{ id: uuid(), name: 'Default profile' }]
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

@Injectable()
export class CreateUserUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router) {}

	@Effect()
	public createUser$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUser),
		map(() => new CreateUserRedirect()));

	@Effect({ dispatch: false })
	public createUserRedirect$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUserRedirect),
		tap(() => this.router.navigate(['/users/create'])));
}
