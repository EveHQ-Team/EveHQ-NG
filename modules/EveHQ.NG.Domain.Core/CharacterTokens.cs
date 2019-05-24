// Проект: EveHQ.NG.WebApi
// Имя файла: CharacterTokens.cs
// GUID файла: 05C9DDDC-1AB8-4767-86A7-EDC07255A144
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 15.01.2018

#region Usings

using System;

#endregion


namespace EveHQ.NG.Domain.Core
{
	public sealed class CharacterTokens
	{
		public string AccessToken { get; set; } = "";

		public string RefreshToken { get; set; } = "";

		public DateTimeOffset AccessTokenValidTill { get; set; }
	}
}