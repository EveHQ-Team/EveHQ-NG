import { LoginPageState } from 'modules/users/stores/login-page.state';

export class LoginPageSelectors {
	public static readonly getError = (state: LoginPageState) => state.error;
	public static readonly getPending = (state: LoginPageState) => state.pending;
}
