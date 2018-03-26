import { ShellState } from 'modules/application/stores/shell.state';

export class ShellSelector {
	public static readonly getIsMenuShown = (state: ShellState) => state.isMenuShown;
	public static readonly getHeader = (state: ShellState) => state.header;
	public static readonly getUser = (state: ShellState) => state.user;
	public static readonly getProfile = (state: ShellState) => state.profile;
}
