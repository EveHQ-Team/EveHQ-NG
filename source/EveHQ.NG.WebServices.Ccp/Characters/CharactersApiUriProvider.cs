// Проект: EveHQ.NG.WebApi
// Имя файла: CharactersApiUriProvider.cs
// GUID файла: EB0E7503-3253-4FB0-A167-FA6A6FF53200
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.WebServices.Ccp.Sso;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class CharactersApiUriProvider : ApiUriProviderBase, ICharactersApiUriProvider
	{
		public CharactersApiUriProvider(
			IOAuthAuthenticator authenticator,
			IClock clock)
			: base(authenticator, clock)
		{
			// TODO: Extract latest and tranquility as settings.
		}

		public async Task<string> GetInfoUri(uint characterId) =>
			await Task<string>.Factory.StartNew(() => $"{ApiUri}/{characterId}/?datasource=tranquility");

		public async Task<string> GetPortraitsUri(Character character) =>
			await Task<string>.Factory.StartNew(() => $"{ApiUri}/{character.Information.Id}/portrait/?datasource=tranquility");

		public async Task<string> GetSkillQueueUri(Character character)
		{
			var characterId = character.Information.Id;
			var token = await GetActualAccessTokenForCharacterAsync(character.Tokens);
			return $"{ApiUri}/{characterId}/skillqueue/?datasource=tranquility;token={token}";
		}

		private const string ApiUri = "https://esi.tech.ccp.is/latest/characters";
	}
}