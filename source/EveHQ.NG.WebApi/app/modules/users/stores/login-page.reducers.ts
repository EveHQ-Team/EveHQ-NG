import { LoginPageState, initialState } from 'modules/users/stores/login-page.state';
import { UsersActionTypes, UsersActions } from 'modules/users/stores/users.actions';

export function loginPageReducer(state = initialState, action: UsersActions): LoginPageState {
	switch (action.type) {
		case UsersActionTypes.Login:
		{
			return {
				...state,
				error: undefined,
				pending: true,
			};
		}

		case UsersActionTypes.LoginSuccess:
		{
			return {
				...state,
				error: undefined,
				pending: false,
			};
		}

		case UsersActionTypes.LoginFailure:
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
