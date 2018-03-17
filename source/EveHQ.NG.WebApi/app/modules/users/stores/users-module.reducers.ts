import {
	createSelector,
	createFeatureSelector, compose,
	ActionReducerMap,
	} from '@ngrx/store';
import { AuthenticationState } from 'modules/users/stores/users.state';
import { LoginPageState } from 'modules/users/stores/login-page.state';
import { authenticationReducer } from 'modules/users/stores/users.reducers';
import { AuthenticationSelector } from 'modules/users/stores/users.selectors';
import { loginPageReducer } from 'modules/users/stores/login-page.reducers';
import { LoginPageSelectors } from 'modules/users/stores/login-page.selectors';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export interface UsersModuleState {
	authentication: AuthenticationState;
	loginPage: LoginPageState;
}

export interface State extends ApplicationState {
	users: UsersModuleState;
}

export const usersModuleReducers =
{
	authentication: authenticationReducer,
	loginPage: loginPageReducer
};

export const selectUsersModuleState = createFeatureSelector<UsersModuleState>('users');

export const selectAuthenticationState = createSelector(
	selectUsersModuleState,
	(state: UsersModuleState) => state.authentication);

export const getUser = createSelector(
	selectAuthenticationState,
	AuthenticationSelector.getUser);

export const getIsUserCreated = createSelector(
	selectAuthenticationState,
	AuthenticationSelector.getIsUserCreated);

export const getIsLogInRequired = createSelector(
	selectAuthenticationState,
	AuthenticationSelector.getIsLogInRequired);

export const getIsLoggedIn = createSelector(
	selectAuthenticationState,
	AuthenticationSelector.getIsLoggedIn);

export const selectLoginPageState = createSelector(
	selectUsersModuleState,
	(state: UsersModuleState) => state.loginPage);

export const getError = createSelector(
	selectLoginPageState,
	LoginPageSelectors.getError);

export const getPending = createSelector(
	selectLoginPageState,
	LoginPageSelectors.getPending);
