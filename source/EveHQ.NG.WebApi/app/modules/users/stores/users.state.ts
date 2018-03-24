import { User } from 'modules/users/models/user';

export interface UsersState {
	user: User | undefined;
	isLoading: boolean;
	isLoaded: boolean;
}

export const initialState: UsersState = {
	user: undefined,
	isLoading: false,
	isLoaded: false
};
