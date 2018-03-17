import { User } from 'modules/users/models/user';

export interface AuthenticationState {
	user: User | undefined;
	isLoggedIn: boolean;
}
