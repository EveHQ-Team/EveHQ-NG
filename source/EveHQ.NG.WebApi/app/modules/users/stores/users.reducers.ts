import { UsersState, initialState} from 'modules/users/stores/users.state';
import { UsersActionTypes, UsersActions } from 'modules/users/stores/users.actions';

export function usersReducer(state = initialState, action: UsersActions): UsersState {
	switch (action.type) {
		case UsersActionTypes.Load:
		{
			return {
				...state,
				isLoading: true
			};
		}

		case UsersActionTypes.LoadSuccess:
		{
			return {
				...state,
				user: action.payload,
				isLoading: false,
				isLoaded: true
			};
		}

		case UsersActionTypes.LoadFail:
			return {
				...state,
				user: undefined,
				isLoading: false,
				isLoaded: false
			};

		case UsersActionTypes.SetUserSuccess:
			console.warn('user to set: ', action.payload);
			return {
				...state,
				user: action.payload
			};

		default:
		{
			return state;
		}
	}
}
