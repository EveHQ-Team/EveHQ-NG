import { MetaGameProfile } from 'application-module/models/meta-game-profile';

export class ApplicationUser {
	public name: string;
	public password: string;
	public isLoginRequired: boolean;
	public isLoggedIn: boolean;
	public metaGamesProfiles: MetaGameProfile[] = [];
	public defaultMetaGameProfile: MetaGameProfile;
}
