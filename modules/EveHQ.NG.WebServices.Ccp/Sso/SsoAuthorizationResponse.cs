// Проект: EveHQ.NG.WebApi
// Имя файла: SsoAuthorizationResponse.cs
// GUID файла: D056A830-0263-49BD-BAEA-6D0C254B1030
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 03.01.2018

#region Usings

using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Sso
{
	public sealed class SsoAuthorizationResponse
	{
		[JsonProperty("access_token")]
		public string AccessToken { get; set; }

		[JsonProperty("refresh_token")]
		public string RefreshToken { get; set; }

		[JsonProperty("token_type")]
		public string TokenType { get; set; }

		[JsonProperty("expires_in")]
		public int ExpirationTimeInSeconds { get; set; }
	}
}