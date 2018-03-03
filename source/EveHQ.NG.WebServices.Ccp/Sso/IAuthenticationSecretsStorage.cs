// Проект: EveHQ.NG.WebApi
// Имя файла: IAuthenticationSecretsStorage.cs
// GUID файла: BE0B0363-63FA-4546-B8A5-C16AADC63B87
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

namespace EveHQ.NG.WebServices.Ccp.Sso
{
	public interface IAuthenticationSecretsStorage
	{
		string RedirectUri { get; set; }

		string ClientId { get; set; }

		string ClientSecret { get; set; }

		string Scopes { get; }

		string StateKey { get; }
	}
}