export interface LoginPageState {
	error: string | undefined;
	pending: boolean;
}

export const initialState: LoginPageState = {
	error: undefined,
	pending: false,
};
