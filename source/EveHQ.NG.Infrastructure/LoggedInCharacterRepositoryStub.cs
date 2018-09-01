// Проект: EveHQ.NG.Infrastructure
// Имя файла: LoggedInCharacterRepositoryStub.cs
// GUID файла: 1D74281D-6067-4AF5-B311-3DE267ACF9A7
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 02.09.2018

using System.Collections.Generic;
using EveHQ.NG.Domain.Core;


namespace EveHQ.NG.Infrastructure
{
	public class LoggedInCharacterRepositoryStub : ILoggedInCharacterRepository
	{
		public IReadOnlyList<CharacterInfo> CharacterInfos { get; }

		public IReadOnlyList<Character> Characters { get; }

		public void AddOrReplaceCharacter(Character character)
		{
		}

		public void RemoveCharacter(uint characterId)
		{
		}

		public Character GetCharacterById(uint characterId)
		{
			return null;
		}
	}
}