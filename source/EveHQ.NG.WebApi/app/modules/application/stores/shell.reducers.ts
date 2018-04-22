import { ShellActionTypes, ShellActions } from 'modules/application/stores/shell.actions';
import { ShellState } from 'modules/application/stores/shell.state';

const initialState: ShellState = {
	isMenuShown: false,
	header: 'EveHQ NG'
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
