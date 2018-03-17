import {
	ActionReducerMap,
	ActionReducer,
	MetaReducer,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';

import { ShellState } from 'modules/application/stores/shell.state';
import { ShellSelector } from 'modules/application/stores/shell.selectors';
import { shellReducer } from 'modules/application/stores/shell.reducers';

export interface ApplicationState {
	shell: ShellState;
};

export const reducers: ActionReducerMap<ApplicationState> = {
	shell: shellReducer
};

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
	return (state: ApplicationState, action: any): ApplicationState => {
		console.log('state', state);
		console.log('action', action);

		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<ApplicationState>[] = [logger];

export const getShellState = createFeatureSelector<ShellState>('shell');
export const getIsMenuShown = createSelector(getShellState, ShellSelector.getIsMenuShown);
export const getHeader = createSelector(getShellState, ShellSelector.getHeader);
