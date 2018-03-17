import { ShellState } from 'modules/application/stores/shell.state';

export class ShellSelector {
	public static readonly getIsMenuShown = (state: ShellState) => state.isMenuShown;
	public static readonly getHeader = (state: ShellState) => state.header;
}
