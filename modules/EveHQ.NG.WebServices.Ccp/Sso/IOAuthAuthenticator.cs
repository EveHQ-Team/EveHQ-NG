// Проект: EveHQ.NG.WebApi
// Имя файла: IOAuthAuthenticator.cs
// GUID файла: 53225B93-0798-4F5D-8D97-6BB6F3E14A72
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Sso
{
	public interface IOAuthAuthenticator
	{
		string GetAuthenticationUri();

		Task<CharacterTokens> AuthenticateCharacterWithAuthorizationCode(string codeUri, string state);

		Task RefreshTokens(CharacterTokens tokens);

		void Logout(uint characterId);
	}
}