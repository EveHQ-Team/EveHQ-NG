// Проект: EveHQ.NG.WebApi
// Имя файла: ApiUriProviderBase.cs
// GUID файла: 047BC9B4-D677-4603-AC81-7D3649BE64DF
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.WebServices.Ccp.Sso;

#endregion


namespace EveHQ.NG.WebServices.Ccp
{
	public abstract class ApiUriProviderBase
	{
		protected ApiUriProviderBase(
			IOAuthAuthenticator authenticator,
			IClock clock)
		{
			_authenticator = authenticator;
			_clock = clock;
		}

		protected async Task<string> GetActualAccessTokenForCharacterAsync(CharacterTokens tokens)
		{
			if (tokens.AccessTokenValidTill < _clock.UtcNow)
			{
				await _authenticator.RefreshTokens(tokens);
			}

			return tokens.AccessToken;
		}

		private readonly IOAuthAuthenticator _authenticator;
		private readonly IClock _clock;
	}
}