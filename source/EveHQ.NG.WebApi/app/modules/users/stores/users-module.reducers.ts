import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginPageState } from 'modules/users/stores/login-page.state';
import { loginPageReducer } from 'modules/users/stores/login-page.reducers';
import { LoginPageSelectors } from 'modules/users/stores/login-page.selectors';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export interface UsersModuleState {
	loginPage: LoginPageState;
}

export interface State extends ApplicationState {
	users: UsersModuleState;
}

export const usersModuleReducers =
{
	loginPage: loginPageReducer
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
