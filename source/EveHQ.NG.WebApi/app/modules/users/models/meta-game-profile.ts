import { Character } from 'modules/character/models/character';

export class MetaGameProfile {
	public characters: Character[] = [];
	public defaultCharacter: Character = new Character();
}
