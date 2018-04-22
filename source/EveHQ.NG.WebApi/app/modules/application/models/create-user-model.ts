import { ApplicationUser} from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

export class CreateUserModel {
	public user: ApplicationUser;
	public password: string;
	public profiles: MetaGameProfile[];
}
