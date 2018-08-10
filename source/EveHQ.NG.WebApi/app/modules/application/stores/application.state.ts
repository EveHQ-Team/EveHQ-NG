import { Action, ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationUser } from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { Character } from 'modules/application/models/character';
import { Role } from 'modules/application/models/role';
import { Tool } from 'modules/application/models/tool';
import { SsoConfigurationState, ssoConfigurationStateReducer } from 'modules/application/stores/sso-configuration.state';

export enum ApplicationStateActionTypes {
	SetCurrentUser = '[APPLICATION] Set Current User',
	SetCurrentUserProfiles = '[APPLICATION] Set Current User Profiles',
	SetIsUserAuthenticated = '[APPLICATION] Set User Authenticated',
	SetCurrentProfile = '[APPLICATION] Set Current Profile',
	SetCurrentProfileCharacters = '[APPLICATION] Set Current Profile Character',
	SetCurrentCharacter = '[APPLICATION] Set Current Character',
	SetCurrentCharacterBoundRoles = '[APPLICATION] Set Current Character Bound Roles',
	SetCurrentRole = '[APPLICATION] Set Current Role',
	SetCurrentRoleBoundTools = '[APPLICATION] Set Current Role Bound Tools',
	SetCurrentTool = '[APPLICATION] Set Current Tool',
	SetAllRoles = '[APPLICATION] Set All Roles',
	SetAllTools = '[APPLICATION] Set All Tools',
}

export class SetCurrentUser implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentUser;

	constructor(public readonly payload: { user: ApplicationUser }) {}
}

export class SetCurrentUserProfiles implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentUserProfiles;

	constructor(public readonly payload: { profiles: MetaGameProfile[] }) {}
}

export class SetIsUserAuthenticated implements Action {
	public readonly type = ApplicationStateActionTypes.SetIsUserAuthenticated;

	constructor(public readonly payload: { isUserAuthenticated: boolean }) {}
}

export class SetCurrentProfile implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentProfile;

	constructor(public readonly payload: { profileId: string }) {}
}

export class SetCurrentProfileCharacters implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentProfileCharacters;

	constructor(public readonly payload: { characters: Character[] }) {}
}

export class SetCurrentCharacter implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentCharacter;

	constructor(public readonly payload: { characterId: string }) {}
}

export class SetCurrentCharacterBoundRoles implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentCharacterBoundRoles;

	constructor(public readonly payload: { boundRoleIds: string[] }) {}
}

export class SetCurrentRole implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentRole;

	constructor(public readonly payload: { roleId: Role }) {}
}

export class SetCurrentRoleBoundTools implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentRoleBoundTools;

	constructor(public readonly payload: { boundToolIds: string[] }) {}
}

export class SetCurrentTool implements Action {
	public readonly type = ApplicationStateActionTypes.SetCurrentTool;

	constructor(public readonly payload: { toolId: string }) {}
}

export class SetAllRoles implements Action {
	public readonly type = ApplicationStateActionTypes.SetAllRoles;

	constructor(public readonly payload: { allRoles: Role[] }) {}
}

export class SetAllTools implements Action {
	public readonly type = ApplicationStateActionTypes.SetAllTools;

	constructor(public readonly payload: { allTools: Tool[] }) {}
}

export type ApplicationStateActions =
	| SetCurrentUser
	| SetCurrentUserProfiles
	| SetIsUserAuthenticated
	| SetCurrentProfile
	| SetCurrentProfileCharacters
	| SetCurrentCharacter
	| SetCurrentCharacterBoundRoles
	| SetCurrentRole
	| SetCurrentRoleBoundTools
	| SetCurrentTool
	| SetAllRoles
	| SetAllTools;

export interface ApplicationState {
	currentUser: ApplicationUser | undefined;
	currentUserProfiles: MetaGameProfile[];
	currentProfileId: string | undefined;
	currentProfileCharacters: Character[];
	currentCharacterId: string | undefined;
	currentCharacterBoundRoleIds: string[];
	currentRoleId: Role | undefined;
	currentRoleBoundToolIds: string[];
	currentToolId: string | undefined;
	allRoles: Role[];
	allTools: Tool[];
}

const initialState: ApplicationState = {
	currentUser: undefined,
	currentUserProfiles: [],
	currentProfileId: undefined,
	currentProfileCharacters: [],
	currentCharacterId: undefined,
	currentCharacterBoundRoleIds: [],
	currentRoleId: undefined,
	currentRoleBoundToolIds: [],
	currentToolId: undefined,
	allRoles: [],
	allTools: []
};

function applicationStateReducer(state = initialState, action: ApplicationStateActions): ApplicationState {
	switch (action.type) {
		case ApplicationStateActionTypes.SetCurrentUser:
			return {
				...state,
				currentUser: (action as SetCurrentUser).payload.user
			};
		case ApplicationStateActionTypes.SetCurrentUserProfiles:
			return {
				...state,
				currentUserProfiles: (action as SetCurrentUserProfiles).payload.profiles
			};
		case ApplicationStateActionTypes.SetCurrentProfile:
			return {
				...state,
				currentProfileId: (action as SetCurrentProfile).payload.profileId
			};
		case ApplicationStateActionTypes.SetCurrentProfileCharacters:
			return {
				...state,
				currentProfileCharacters: (action as SetCurrentProfileCharacters).payload.characters
			};
		case ApplicationStateActionTypes.SetCurrentCharacter:
			return {
				...state,
				currentCharacterId: (action as SetCurrentCharacter).payload.characterId
			};
		case ApplicationStateActionTypes.SetCurrentCharacterBoundRoles:
			return {
				...state,
				currentCharacterBoundRoleIds: (action as SetCurrentCharacterBoundRoles).payload.boundRoleIds
			};
		case ApplicationStateActionTypes.SetCurrentRole:
			return {
				...state,
				currentRoleId: (action as SetCurrentRole).payload.roleId
			};
		case ApplicationStateActionTypes.SetCurrentRoleBoundTools:
			return {
				...state,
				currentRoleBoundToolIds: (action as SetCurrentRoleBoundTools).payload.boundToolIds
			};
		case ApplicationStateActionTypes.SetCurrentTool:
			return {
				...state,
				currentToolId: (action as SetCurrentTool).payload.toolId
			};
		case ApplicationStateActionTypes.SetAllRoles:
			return {
				...state,
				allRoles: (action as SetAllRoles).payload.allRoles
			};
		case ApplicationStateActionTypes.SetAllTools:
			return {
				...state,
				allTools: (action as SetAllTools).payload.allTools
			};
		default:
			return state;
	}
}

export interface ApplicationStore {
	application: ApplicationState;
	ssoConfiguration: SsoConfigurationState;
}

export const applicationReducers = {
	application: applicationStateReducer,
	ssoConfiguration: ssoConfigurationStateReducer
};

export function logger(reducer: ActionReducer<ApplicationStore>): ActionReducer<ApplicationStore> {
	return (state: ApplicationStore, action: any): ApplicationStore => {
		console.log('state', state);
		console.log('action', action ? JSON.stringify(action) : action);

		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<ApplicationStore>[] = [logger];

const getApplicationState = createFeatureSelector<ApplicationStore>('application');
const getApplication = createSelector(getApplicationState, state => state.application);
export const getCurrentUser = createSelector(getApplication, state => state.currentUser);
export const getCurrentUserProfiles = createSelector(getApplication, state => state.currentUserProfiles);
export const getCurrentCharacterId = createSelector(getApplication, state => state.currentCharacterId);
