// Проект: EveHQ.NG.WebApi
// Имя файла: FileLoggedInCharacterRepository.cs
// GUID файла: DDC602DB-D3F0-424A-8843-3621CDB6533A
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 14.01.2018

#region Usings

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using EveHQ.NG.Domain.Core;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.Infrastructure.UiNotification;
using SimpleRepository;

#endregion


namespace EveHQ.NG.Infrastructure
{
	[SuppressMessage("ReSharper", "ClassNeverInstantiated.Global", Justification = "Constructed by ASP.NET Core.")]
	public sealed class FileLoggedInCharacterRepository : ILoggedInCharacterRepository
	{
		public FileLoggedInCharacterRepository(IAuthenticationNotificationService authenticationNotificationService)
		{
			_authenticationNotificationService = authenticationNotificationService;

			RepositoryConfiguration
				.Persist<List<Character>>()
				.WithTypeAlias("LoggedInCharactersWithTokens")
				.FileSystemRepository(new JsonSerializer())
				.UsePlainFileNames("xml")
				.WithStoragePath($"{Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData)}/EveHQ NG/Settings");

			_repository = new Repository();

			lock (_loggedInCharactersSyncRoot)
			{
				_characters = _repository.Read<List<Character>>(LoggedInCharacterListEntityId) ?? new List<Character>();
			}
		}

		public IReadOnlyList<CharacterInfo> CharacterInfos
		{
			get
			{
				lock (_loggedInCharactersSyncRoot)
				{
					return new ReadOnlyCollection<CharacterInfo>(_characters.Select(character => character.Information).ToArray());
				}
			}
		}

		public IReadOnlyList<Character> Characters
		{
			get
			{
				lock (_loggedInCharactersSyncRoot)
				{
					return new ReadOnlyCollection<Character>(_characters);
				}
			}
		}

		public void AddOrReplaceCharacter(Character character)
		{
			lock (_loggedInCharactersSyncRoot)
			{
				var found = _characters.SingleOrDefault(present => present.Information.Id == character.Information.Id);
				if (found != null)
				{
					_characters.Remove(found);
				}

				_characters.Add(character);

				SaveCharacters();
				NotifyLoggedInCharacterListChanged();
			}
		}

		public void RemoveCharacter(uint characterId)
		{
			lock (_loggedInCharactersSyncRoot)
			{
				_characters.Remove(GetCharacterById(characterId));

				SaveCharacters();
				NotifyLoggedInCharacterListChanged();
			}
		}

		public Character GetCharacterById(uint characterId) => _characters.Single(character => character.Information.Id == characterId);

		private void SaveCharacters()
		{
			_repository.Update<List<Character>>(
				LoggedInCharacterListEntityId,
				list =>
				{
					list.Entity.Clear();
					list.Entity.AddRange(_characters);
				});
		}

		private void NotifyLoggedInCharacterListChanged()
		{
			_authenticationNotificationService.NotifyClientsAboutCharacterListChanged(CharacterInfos);
		}

		private readonly Repository _repository;
		private readonly IAuthenticationNotificationService _authenticationNotificationService;
		private readonly IList<Character> _characters;
		private readonly object _loggedInCharactersSyncRoot = new object();
		private const string LoggedInCharacterListEntityId = "LoggedInCharacterList";
	}
}