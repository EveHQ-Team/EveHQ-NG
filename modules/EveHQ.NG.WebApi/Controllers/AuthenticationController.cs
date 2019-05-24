// Проект: EveHQ.NG.WebApi
// Имя файла: AuthenticationController.cs
// GUID файла: C1B3CE30-1AB6-41FA-A66F-DCA1BA8E8C47
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 30.11.2017

#region Usings

using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;
using EveHQ.NG.Infrastructure;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.WebServices.Ccp.Characters;
using EveHQ.NG.WebServices.Ccp.Sso;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class AuthenticationController : ApiControllerBase
	{
		public AuthenticationController(
			IOAuthAuthenticator authenticator,
			ICharactersApi charactersApi,
			ILoggedInCharacterRepository loggedInCharacterRepository,
			IHttpService httpService,
			ILogger<AuthenticationController> logger)
		{
			_authenticator = authenticator;
			_charactersApi = charactersApi;
			_loggedInCharacterRepository = loggedInCharacterRepository;
			_httpService = httpService;
			_logger = logger;
		}

		[HttpGet("GetAuthenticationUri")]
		public IActionResult GetAuthenticationUri() => Json(_authenticator.GetAuthenticationUri());

		[HttpPost("AuthenticateWithCode")]
		public async Task<IActionResult> AuthenticateCharacterWithAutharizationCode([FromQuery] string codeUri, [FromQuery] string state)
		{
			var tokens = await _authenticator.AuthenticateCharacterWithAuthorizationCode(codeUri, state);
			var information = await GetCharacterInfo(tokens.AccessToken);
			var character = new Character { Information = information, Tokens = tokens };
			await _charactersApi.GetPortraits(character);

			_loggedInCharacterRepository.AddOrReplaceCharacter(character);
			_logger.LogInformation($"Gotten tokens for character '{character.Information.Name}' with ID {character.Information.Id}.");

			return Ok();
		}

		[HttpPost("{characterId}/logout")]
		public IActionResult Logout([FromRoute] uint characterId)
		{
			_authenticator.Logout(characterId);
			return Ok();
		}

		private async Task<CharacterInfo> GetCharacterInfo(string accessToken)
		{
			HttpRequestMessage CreateGetCharacterIdRequest()
			{
				var message = new HttpRequestMessage(HttpMethod.Get, "https://login.eveonline.com/oauth/verify");
				message.Headers.Authorization = AuthenticationHeaderValue.Parse($"Bearer {accessToken}");
				message.Headers.Host = HostUri;

				return message;
			}

			var characterId = await _httpService.CallAsync(
				CreateGetCharacterIdRequest,
				response => response.Content
									.ReadAsStringAsync()
									.ContinueWith(task => JsonConvert.DeserializeObject<SsoAuthenticatedCharacterInfo>(task.Result).CharacterId));
			_logger.LogInformation("Verified authenticated character with ID {id}.", characterId);

			return await _charactersApi.GetInfo(characterId);
		}

		private readonly IOAuthAuthenticator _authenticator;
		private readonly ICharactersApi _charactersApi;
		private readonly ILoggedInCharacterRepository _loggedInCharacterRepository;
		private readonly IHttpService _httpService;
		private readonly ILogger<AuthenticationController> _logger;
		private const string HostUri = "login.eveonline.com";
	}
}
