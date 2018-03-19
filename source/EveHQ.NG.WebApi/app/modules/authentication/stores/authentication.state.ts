import { User } from 'modules/authentication/models/user';

export interface AuthenticationState {
	user: User | undefined;
	isLoggedIn: boolean;
}
