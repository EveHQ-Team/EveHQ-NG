import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

export class ApplicationUser {
	public name: string;
	public password: string;
	public isLoginRequired: boolean;
	public isLoggedIn: boolean;
	public metaGamesProfiles: MetaGameProfile[] = [];
	public defaultMetaGameProfile: MetaGameProfile;
}
