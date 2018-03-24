import { LoginPageState, initialState } from 'modules/users/stores/login-page.state';
import { AuthenticationActionTypes, AuthenticationActions } from 'modules/authentication/stores/authentication.actions';

export function loginPageReducer(state = initialState, action: AuthenticationActions): LoginPageState {
	switch (action.type) {
		case AuthenticationActionTypes.Login:
		{
			return {
				...state,
				error: undefined,
				pending: true,
			};
		}

		case AuthenticationActionTypes.LoginSuccess:
		{
			return {
				...state,
				error: undefined,
				pending: false,
			};
		}

		case AuthenticationActionTypes.LoginFailure:
		{
			return {
				...state,
				error: action.payload,
				pending: false,
			};
		}

		default:
		{
			return state;
		}
	}
}
