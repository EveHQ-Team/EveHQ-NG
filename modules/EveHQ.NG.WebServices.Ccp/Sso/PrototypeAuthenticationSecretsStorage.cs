// Проект: EveHQ.NG.WebApi
// Имя файла: PrototypeAuthenticationSecretsStorage.cs
// GUID файла: F8B125D9-CAD4-4250-8807-5A8D53E42431
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Sso
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class PrototypeAuthenticationSecretsStorage : IAuthenticationSecretsStorage
	{
		public PrototypeAuthenticationSecretsStorage()
		{
			RedirectUri = "eveauth-evehq-ng://sso-auth/";
			ClientId = "9158bdcbc32a49e29044be4266b029dd";
			ClientSecret = "SJb4jaOUHbVm3KSrrPsJKo82cmiYxvoXtlEIgu5R";
			Scopes = "esi-skills.read_skillqueue.v1";
			StateKey = "auth-state-key";
		}

		public string RedirectUri { get; set; }

		public string ClientId { get; set; }

		public string ClientSecret { get; set; }

		public string Scopes { get; }

		public string StateKey { get; }
	}
}