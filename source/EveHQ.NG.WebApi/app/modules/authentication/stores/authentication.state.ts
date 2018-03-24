import { AuthenticatedUser } from 'modules/authentication/models/authenticated-user';

export interface AuthenticationState {
	user: AuthenticatedUser | undefined;
	isLoggedIn: boolean;
}
