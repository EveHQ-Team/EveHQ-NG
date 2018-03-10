import { Character } from 'character-module/models/character';

export class MetaGameProfile {
	public characters: Character[] = [];
	public defaultCharacter: Character = new Character();
}
