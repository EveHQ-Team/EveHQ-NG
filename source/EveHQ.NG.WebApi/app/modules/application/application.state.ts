import {
	ActionReducerMap,
	ActionReducer,
	MetaReducer,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';

import { ShellState, shellReducer, ShellSelector } from 'modules/application/stores/shell.state';
import { CreateUserUseCaseState, createUserUseCaseReducer } from 'modules/application/use-cases/create-user.use-case';
import { LoginUseCaseState, loginUseCaseReducer } from 'modules/application/use-cases/login.use-case';

export interface ApplicationState {
	shell: ShellState;
	createUserUseCase: CreateUserUseCaseState;
	loginUseCase: LoginUseCaseState;
}

export const applicationReducers: ActionReducerMap<ApplicationState> = {
	shell: shellReducer,
	createUserUseCase: createUserUseCaseReducer,
	loginUseCase: loginUseCaseReducer
};

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
	return (state: ApplicationState, action: any): ApplicationState => {
		console.log('state', state);
		console.log('action', action ? JSON.stringify(action) : action);

		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<ApplicationState>[] = [logger];

export const getShellState = createFeatureSelector<ShellState>('shell');
export const getCreateUserUseCaseState = createFeatureSelector<CreateUserUseCaseState>('createUserUseCase');
export const getLoginUseCaseState = createFeatureSelector<LoginUseCaseState>('loginUseCase');

export const getIsMenuShown = createSelector(getShellState, ShellSelector.getIsMenuShown);
export const getHeader = createSelector(getShellState, ShellSelector.getHeader);

export const getUser = createSelector(getCreateUserUseCaseState, (state: CreateUserUseCaseState) => state.user);
export const getPassword = createSelector(getCreateUserUseCaseState, (state: CreateUserUseCaseState) => state.password);
export const getProfiles = createSelector(getCreateUserUseCaseState, (state: CreateUserUseCaseState) => state.profiles);
export const getError = createSelector(getCreateUserUseCaseState, (state: CreateUserUseCaseState) => state.error);

export const getUserToAuthenticate = createSelector(getLoginUseCaseState, (state: LoginUseCaseState) => state.userToAuthenticate);
export const getIsUserAuthenticated = createSelector(getLoginUseCaseState, (state: LoginUseCaseState) => state.isUserAuthenticated);
