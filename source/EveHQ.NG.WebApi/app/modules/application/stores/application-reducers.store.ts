import {
	ActionReducerMap,
	ActionReducer,
	MetaReducer,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';

import * as fromShell from 'modules/application/stores/shell-reducers.store';

export interface ApplicationState {
	shell: fromShell.ShellState
};

export const reducers: ActionReducerMap<ApplicationState> = {
	shell: fromShell.reducer
};

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
	return (state: ApplicationState, action: any): ApplicationState => {
		console.log('state', state);
		console.log('action', action);

		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<ApplicationState>[] = [logger];

export const getShellState = createFeatureSelector<fromShell.ShellState>('shell');

export const getIsMenuShown = createSelector(getShellState, fromShell.getIsMenuShown);

export const getHeader = createSelector(getShellState, fromShell.getHeader);
