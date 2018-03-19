import { AuthenticationState } from 'modules/authentication/stores/authentication.state';

export class AuthenticationSelector {
	public static readonly getUser = (state: AuthenticationState) => state.user;
	public static readonly getIsUserCreated = (state: AuthenticationState) => {
		console.warn(`user from state: ${state.user}`);
		return state.user !== undefined;
	};
	public static readonly getIsLoggedIn = (state: AuthenticationState) => state.isLoggedIn;
	public static readonly getIsLogInRequired = (state: AuthenticationState) => state.user ? state.user.isLogInRequired : false;

	//public static readonly getIsAuthe
}
