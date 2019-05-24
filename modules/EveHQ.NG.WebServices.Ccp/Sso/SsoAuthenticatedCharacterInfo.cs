// Проект: EveHQ.NG.WebApi
// Имя файла: SsoAuthenticatedCharacterInfo.cs
// GUID файла: CAD9076F-6BC1-420B-9BB2-E04FE5F6AF30
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Sso
{
	public sealed class SsoAuthenticatedCharacterInfo
	{
		[JsonProperty("CharacterID")]
		public uint CharacterId { get; set; }

		public string CharacterName { get; set; }

		public DateTime ExpiresOn { get; set; }

		public string Scopes { get; set; }

		public string TokenType { get; set; }

		public string CharacterOwnerHash { get; set; }
	}
}