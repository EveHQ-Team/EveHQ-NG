// Проект: EveHQ.NG.WebApi
// Имя файла: HubRouterBuilderExtensions.cs
// GUID файла: 657A27EC-AB72-4919-9462-1E5A4D91F419
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 07.09.2018

using EveHQ.NG.Infrastructure.UiNotification;
using Microsoft.AspNetCore.SignalR;


namespace EveHQ.NG.WebApi.Infrastructure
{
	public static class HubRouteBuilderExtensions
	{
		public static void MapHubs(this HubRouteBuilder routeBuilder)
		{
			routeBuilder.MapHub<AuthenticationNotificationHub>(SignalREndpoints.AuthenticationNotificationHubName);
		}
	}
}
