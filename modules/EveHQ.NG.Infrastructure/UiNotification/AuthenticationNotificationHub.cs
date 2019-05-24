// Проект: EveHQ.NG.WebApi
// Имя файла: AuthenticationNotificationHub.cs
// GUID файла: B8FAE79F-A09D-4581-993A-153837A957FD
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.Collections.Generic;
using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;
using JetBrains.Annotations;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.Infrastructure.UiNotification
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class AuthenticationNotificationHub : Hub, IAuthenticationNotificationService
	{
		public AuthenticationNotificationHub(ILogger<AuthenticationNotificationHub> logger)
		{
			_logger = logger;
		}

		public override Task OnConnectedAsync()
		{
			_logger.LogDebug("A user connected to the Authentication Notification Hub.");
			return base.OnConnectedAsync();
		}

		public void NotifyClientsAboutCharacterListChanged(IReadOnlyList<CharacterInfo> characters)
		{
			_logger.LogDebug(
				"Sending notification to clients of the Authentication Notification Hub. " +
				$"Logged in characters: {JsonConvert.SerializeObject(characters)}.");
			Clients.All.SendAsync("LoggedInCharacterListChanged", characters);
		}

		private readonly ILogger<AuthenticationNotificationHub> _logger;
	}
}