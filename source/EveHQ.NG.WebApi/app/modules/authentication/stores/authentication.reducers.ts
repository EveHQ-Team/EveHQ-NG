import {
	ActionReducerMap,
	ActionReducer,
	MetaReducer,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';
import { AuthenticationActionTypes, AuthenticationActions } from 'modules/authentication/stores/authentication.actions';
import { AuthenticationState } from 'modules/authentication/stores/authentication.state';

const initialState: AuthenticationState = {
	user: undefined,
	isLoggedIn: false
};

export function authenticationReducer(state: AuthenticationState = initialState, action: AuthenticationActions): AuthenticationState {
	switch (action.type) {
		case AuthenticationActionTypes.SetUser:
			return {
				...state,
				user: action.payload
			};
		case AuthenticationActionTypes.LoginSuccess:
			return {
				...state,
				isLoggedIn: true,
			};
		case AuthenticationActionTypes.Logout:
			return {
				...state,
				isLoggedIn: false,
			};
		default:
			return state;
	}
}

export interface UsersModuleState {
	authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<UsersModuleState> = {
	authentication: authenticationReducer
};
