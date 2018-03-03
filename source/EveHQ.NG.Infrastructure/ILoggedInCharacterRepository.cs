// Проект: EveHQ.NG.WebApi
// Имя файла: ILoggedInCharacterRepository.cs
// GUID файла: C55B52E6-B234-4CFC-AF8F-78FF36CCE5EA
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 14.01.2018

#region Usings

using System.Collections.Generic;
using EveHQ.NG.Domain.Core;

#endregion


namespace EveHQ.NG.Infrastructure
{
	public interface ILoggedInCharacterRepository
	{
		IReadOnlyList<CharacterInfo> CharacterInfos { get; }

		IReadOnlyList<Character> Characters { get; }

		void AddOrReplaceCharacter(Character character);

		void RemoveCharacter(uint characterId);

		Character GetCharacterById(uint characterId);
	}
}