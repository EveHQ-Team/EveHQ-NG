import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NewUserPageState, createUserReducer, NewUserSelectors } from 'modules/users/create-user/create-user.store';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export interface UsersModuleState {
	newUserPage: NewUserPageState;
}

export interface State extends ApplicationState {
	usersModule: UsersModuleState;
}

export const usersModuleReducers =
{
	newUserPage: createUserReducer
};

export const selectUsersModuleState = createFeatureSelector<UsersModuleState>('users');

export const selectUsersState = createSelector(
	selectUsersModuleState,
	(state: UsersModuleState) => state.newUserPage);

export const getIsLoading = createSelector(
	selectUsersState,
	NewUserSelectors.getIsLoading);

export const getIsLoaded = createSelector(
	selectUsersState,
	NewUserSelectors.getIsLoaded);

export const getUser = createSelector(
	selectUsersState,
	NewUserSelectors.getUser);

export const getProfiles = createSelector(
	selectUsersState,
	NewUserSelectors.getProfiles);
