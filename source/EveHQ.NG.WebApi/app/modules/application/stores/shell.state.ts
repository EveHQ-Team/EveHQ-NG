import { AuthenticatedUser } from 'modules/application/models/authenticated-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

export class ShellState {
	public isMenuShown: boolean;
	public header: string;
	public user: AuthenticatedUser | undefined;
	public profile: MetaGameProfile | undefined;
}
