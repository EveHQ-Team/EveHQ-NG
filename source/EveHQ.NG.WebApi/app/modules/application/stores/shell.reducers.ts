import { ShellActionTypes, ShellActions } from 'modules/application/stores/shell.actions';
import { ShellState } from 'modules/application/stores/shell.state';
import { AuthenticatedUser } from 'modules/application/models/authenticated-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

const initialState: ShellState = {
	isMenuShown: false,
	header: 'EveHQ NG',
	user: undefined,
	profile: undefined
};

export function shellReducer(state: ShellState = initialState, action: ShellActions): ShellState {
	switch (action.type) {
		case ShellActionTypes.ShowShellMenu:
		{
			return {
				...state,
				isMenuShown: true
			};
		}

		case ShellActionTypes.LoginUserSuccess:
		{
			const authenticatedUser = action.payload as AuthenticatedUser;
			return {
				...state,
				user: authenticatedUser
			};

		}

		case ShellActionTypes.SelectProfileSuccess:
		{
			const selectedProfile = action.payload as MetaGameProfile;
			return {
				...state,
				profile: selectedProfile
			};

		}

		case ShellActionTypes.HideShellMenu:
		{
			return {
				...state,
				isMenuShown: false
			};
		}

		case ShellActionTypes.SetShellHeader:
		{
			return {
				...state,
				header: action.payload
			};
		}

		default:
		{
			return state;
		}
	}
}
