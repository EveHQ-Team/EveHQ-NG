import {
	ActionReducerMap,
	ActionReducer,
	MetaReducer,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';
import { UsersActionTypes, UsersActions } from 'modules/authentication/stores/authentication.actions';
import { AuthenticationState } from 'modules/authentication/stores/authentication.state';

const initialState: AuthenticationState = {
	user: undefined,
	isLoggedIn: false
};

export function authenticationReducer(state: AuthenticationState = initialState, action: UsersActions): AuthenticationState {
	switch (action.type) {
		case UsersActionTypes.SetUser:
			return {
				...state,
				user: action.payload
			};
		case UsersActionTypes.LoginSuccess:
			return {
				...state,
				isLoggedIn: true,
			};
		case UsersActionTypes.Logout:
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
