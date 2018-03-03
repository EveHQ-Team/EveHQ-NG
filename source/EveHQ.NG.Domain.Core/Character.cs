// Проект: EveHQ.NG.WebApi
// Имя файла: Character.cs
// GUID файла: 320B2EF5-75FF-46E3-BFBA-9C5AD3BED62C
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.Domain.Core
{
	public sealed class Character
	{
		[JsonProperty("information")]
		public CharacterInfo Information { get; set; } = new CharacterInfo();

		[JsonProperty("tokens")]
		public CharacterTokens Tokens { get; set; } = new CharacterTokens();
	}
}