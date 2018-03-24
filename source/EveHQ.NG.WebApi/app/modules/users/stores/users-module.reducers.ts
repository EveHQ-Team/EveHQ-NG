import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginPageState } from 'modules/users/stores/login-page.state';
import { loginPageReducer } from 'modules/users/stores/login-page.reducers';
import { LoginPageSelectors } from 'modules/users/stores/login-page.selectors';
import { UsersState } from 'modules/users/stores/users.state';
import { usersReducer } from 'modules/users/stores/users.reducers';
import { UsersSelectors } from 'modules/users/stores/users.selectors';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export interface UsersModuleState {
	loginPage: LoginPageState;
	users: UsersState;
}

export interface State extends ApplicationState {
	usersModule: UsersModuleState;
}

export const usersModuleReducers =
{
	loginPage: loginPageReducer,
	users: usersReducer
};

export const selectUsersModuleState = createFeatureSelector<UsersModuleState>('users');

export const selectLoginPageState = createSelector(
	selectUsersModuleState,
	(state: UsersModuleState) => state.loginPage);

export const getError = createSelector(
	selectLoginPageState,
	LoginPageSelectors.getError);

export const getPending = createSelector(
	selectLoginPageState,
	LoginPageSelectors.getPending);

export const selectUsersState = createSelector(
	selectUsersModuleState,
	(state: UsersModuleState) => state.users);

export const getIsLoading = createSelector(
	selectUsersState,
	UsersSelectors.getIsLoading);

export const getIsLoaded = createSelector(
	selectUsersState,
	UsersSelectors.getIsLoaded);

export const getUser = createSelector(
	selectUsersState,
	UsersSelectors.getUser);
