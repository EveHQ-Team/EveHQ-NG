import {createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthenticationState } from 'modules/authentication/stores/authentication.state';
import { authenticationReducer } from 'modules/authentication/stores/authentication.reducers';
import { AuthenticationSelector } from 'modules/authentication/stores/authentication.selectors';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export interface AuthenticationModuleState {
	authentication: AuthenticationState;
}

export interface State extends ApplicationState {
	authentication: AuthenticationModuleState;
}

export const authenticationModuleReducers =
{
	authentication: authenticationReducer,
};

export const selectAuthenticationModuleState = createFeatureSelector<AuthenticationModuleState>('authentication');

export const selectAuthenticationState = createSelector(
	selectAuthenticationModuleState,
	(state: AuthenticationModuleState) => state.authentication);

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
