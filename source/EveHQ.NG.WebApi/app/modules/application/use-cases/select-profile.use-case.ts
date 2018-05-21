import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action, Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { ApplicationState, ApplicationStore } from 'modules/application/stores/application.state';

export enum SelectProfileUseCaseActionTypes {
	SelectProfile = '[SELECT PROFILE USE CASE] Select Profile',
	SelectProfileRedirect = '[SELECT PROFILE USE CASE] Select Profile Redirect',
	SelectProfileSuccess = '[SELECT PROFILE USE CASE] Select Profile Success',
	SetProfilesToSelectFrom = '[SELECT PROFILE USE CASE] Set Profiles To Select From',
}

export class SelectProfile implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfile;

	constructor(public readonly payload: { profilesToSelectFrom: MetaGameProfile[] }) {}
}

export class SelectProfileRedirect implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfileRedirect;
}

export class SelectProfileSuccess implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfileSuccess;

	constructor(public payload: { selectedProfileId: string }) {}
}

export class SetProfilesToSelectFrom implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SetProfilesToSelectFrom;

	constructor(public readonly payload: { profilesToSelectFrom: MetaGameProfile[] }) {}
}

export type SelectProfileUseCaseActions =
	| SelectProfile
	| SelectProfileRedirect
	| SelectProfileSuccess
	| SetProfilesToSelectFrom;

export interface SelectProfileUseCaseState {
	profilesToSelectFrom: MetaGameProfile[]
}

const initialState: SelectProfileUseCaseState = {
	profilesToSelectFrom: []
};

function selectProfileUseCaseReducer(state = initialState, action: SelectProfileUseCaseActions): SelectProfileUseCaseState {
	switch (action.type) {
		case SelectProfileUseCaseActionTypes.SelectProfile:
			return {
				...state,
				profilesToSelectFrom: (action as SelectProfile).payload.profilesToSelectFrom
			};
		default:
			return state;
	}
}

export interface SelectProfileUseCaseStore extends ApplicationStore {
	useCase: SelectProfileUseCaseState
}

export const selectProfileUseCaseReducers = {
	useCase: selectProfileUseCaseReducer
};

const getStore = createFeatureSelector<SelectProfileUseCaseStore>('selectProfileUseCase');
const getState = createSelector(getStore, state => state.useCase);
export const getProfilesToSelectFrom = createSelector(getState, state => state.profilesToSelectFrom);

@Injectable()
export class SelectProfileUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationState>,
		private readonly router: Router) {}

	@Effect()
	public selectProfile$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfile),
		map((action: SelectProfile) => action.payload.profilesToSelectFrom),
		mergeMap((profiles: MetaGameProfile[]) =>
			of(profiles.length > 1 ? new SelectProfileRedirect() : new SelectProfileSuccess({ selectedProfileId: profiles[0].id }))));

	@Effect({ dispatch: false })
	public selectProfileRedirect$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfileRedirect),
		tap(() => this.router.navigate(['/authentication/select-profile']))
	);
}
