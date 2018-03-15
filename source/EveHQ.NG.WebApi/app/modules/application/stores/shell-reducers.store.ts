import { ShellActionTypes, ShellActions } from 'modules/application/stores/shell-actions.store';

export interface ShellState {
	isMenuShown: boolean;
	header: string;
}

const initialState: ShellState = {
	isMenuShown: false,
	header: 'EveHQ NG'
};

export function reducer(state: ShellState = initialState, action: ShellActions): ShellState {
	switch (action.type) {
		case ShellActionTypes.ShowShellMenu:
			return {
				...state,
				isMenuShown: true
			};
		case ShellActionTypes.HideShellMenu:
			return {
				...state,
				isMenuShown: false
			};
		case ShellActionTypes.SetShellHeader:
			return {
				...state,
				header: action.payload
			};
		default:
			return state;
	}
}

export const getIsMenuShown = (state: ShellState) => state.isMenuShown;

export const getHeader = (state: ShellState) => state.header;
