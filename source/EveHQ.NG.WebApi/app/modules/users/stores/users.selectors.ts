import { UsersState } from 'modules/users/stores/users.state';

export class UsersSelectors {
	public static readonly getIsLoading = (state: UsersState) => state.isLoading;
	public static readonly getIsLoaded = (state: UsersState) => state.isLoaded;
	public static readonly getUser = (state: UsersState) => state.user;
}
