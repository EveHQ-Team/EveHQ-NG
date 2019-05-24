// Проект: EveHQ.NG.WebApi
// Имя файла: SsoAuthenticator.cs
// GUID файла: 382761A0-3072-4A22-805B-C6D687D4BDCF
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;
using EveHQ.NG.Infrastructure;
using EveHQ.NG.Infrastructure.Core;
using JetBrains.Annotations;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Sso
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SsoAuthenticator : IOAuthAuthenticator
	{
		public SsoAuthenticator(
			IAuthenticationSecretsStorage authenticationSecretsStorage,
			ILoggedInCharacterRepository loggedInCharacterRepository,
			IHttpService httpService,
			IClock clock,
			ILogger<SsoAuthenticator> logger)
		{
			_authenticationSecretsStorage = authenticationSecretsStorage;
			_loggedInCharacterRepository = loggedInCharacterRepository;
			_httpService = httpService;
			_clock = clock;
			_logger = logger;
		}

		public string GetAuthenticationUri()
		{
			_logger.LogInformation("Requested authentication URI.");

			var uriBuilder = new StringBuilder($"https://{HostUri}/oauth/authorize/");
			uriBuilder.Append("?response_type=code")
					.Append($"&redirect_uri={WebUtility.UrlEncode(_authenticationSecretsStorage.RedirectUri)}")
					.Append($"&client_id={_authenticationSecretsStorage.ClientId}")
					.Append($"&scope={WebUtility.UrlEncode(_authenticationSecretsStorage.Scopes)}")
					.Append($"&state={_authenticationSecretsStorage.StateKey}");

			return uriBuilder.ToString();
		}

		public async Task<CharacterTokens> AuthenticateCharacterWithAuthorizationCode(string codeUri, string state)
		{
			string ExtractCodeFromCodeUri()
			{
				var codeExtractionRegex = new Regex($@"^{_authenticationSecretsStorage.RedirectUri}\?code=(?<code>.*)$");
				return codeExtractionRegex.Match(codeUri).Groups["code"].Value;
			}

			HttpRequestMessage CreateAuthorizationRequest() =>
				CreateTokenRequest(
					() => new[]
						{
							new KeyValuePair<string, string>("grant_type", "authorization_code"),
							new KeyValuePair<string, string>("code", ExtractCodeFromCodeUri())
						});

			CharacterTokens PrepareResult(Task<string> task)
			{
				var response = JsonConvert.DeserializeObject<SsoAuthorizationResponse>(task.Result);
				return new CharacterTokens
						{
							AccessToken = response.AccessToken,
							RefreshToken = response.RefreshToken,
							AccessTokenValidTill = _clock.UtcNow.AddSeconds(response.ExpirationTimeInSeconds)
						};
			}

			if (!state.Equals(_authenticationSecretsStorage.StateKey, StringComparison.OrdinalIgnoreCase))
			{
				throw new ApplicationException("Authentication faild because state key was wrong. Seams like someone wants to steal your credentials.");
			}

			_logger.LogInformation("Requested authentication a character with authorization code.");

			return await _httpService.CallAsync(
				CreateAuthorizationRequest,
				response => response.Content.ReadAsStringAsync().ContinueWith(PrepareResult));
		}

		public async Task RefreshTokens(CharacterTokens tokens)
		{
			HttpRequestMessage CreateRefreshTokenRequest() =>
				CreateTokenRequest(
					() => new[]
						{
							new KeyValuePair<string, string>("grant_type", "refresh_token"),
							new KeyValuePair<string, string>("refresh_token", tokens.RefreshToken)
						});

			void PrepareResult(Task<string> task)
			{
				var response = JsonConvert.DeserializeObject<SsoAuthorizationResponse>(task.Result);
				tokens.AccessToken = response.AccessToken;
				tokens.RefreshToken = response.RefreshToken;
				tokens.AccessTokenValidTill = _clock.UtcNow.AddSeconds(response.ExpirationTimeInSeconds);
			}

			_logger.LogInformation("Refreshing tokens for character using SSO.");

			await _httpService.CallAsync(
				CreateRefreshTokenRequest,
				response => response.Content.ReadAsStringAsync().ContinueWith(PrepareResult));
		}

		public void Logout(uint characterId)
		{
			var character = _loggedInCharacterRepository.CharacterInfos.Single(info => info.Id == characterId);

			_logger.LogInformation("Logged out character '{character}' with ID {Id}.", character.Name, character.Id);
			_loggedInCharacterRepository.RemoveCharacter(characterId);
		}

		private HttpRequestMessage CreateTokenRequest(Func<IEnumerable<KeyValuePair<string, string>>> getRequestParameters)
		{
			var requestContent = new FormUrlEncodedContent(getRequestParameters());
			var message = new HttpRequestMessage(HttpMethod.Post, $"https://{HostUri}/oauth/token") { Content = requestContent };
			var authorizationIdAndSecret =
				Base64UrlTextEncoder.Encode(
					Encoding.ASCII.GetBytes($"{_authenticationSecretsStorage.ClientId}:{_authenticationSecretsStorage.ClientSecret}"));
			message.Headers.Authorization = AuthenticationHeaderValue.Parse($"Basic {authorizationIdAndSecret}==");
			message.Headers.Host = HostUri;
			return message;
		}

		private readonly IAuthenticationSecretsStorage _authenticationSecretsStorage;
		private readonly ILoggedInCharacterRepository _loggedInCharacterRepository;
		private readonly IHttpService _httpService;
		private readonly IClock _clock;
		private readonly ILogger<SsoAuthenticator> _logger;
		private const string HostUri = "login.eveonline.com";
	}
}