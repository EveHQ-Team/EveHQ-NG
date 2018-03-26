import { User } from 'modules/application/models/user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

export class CreateUserModel {
	public user: User;
	public profiles: MetaGameProfile[];
}
