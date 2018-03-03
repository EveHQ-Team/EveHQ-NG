// Проект: EveHQ.NG.WebApi
// Имя файла: IAuthenticationNotificationService.cs
// GUID файла: B4B63549-AF95-4EC0-B948-DC0E4E5362D7
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.Collections.Generic;
using EveHQ.NG.Domain.Core;

#endregion


namespace EveHQ.NG.Infrastructure.UiNotification
{
	public interface IAuthenticationNotificationService
	{
		void NotifyClientsAboutCharacterListChanged(IReadOnlyList<CharacterInfo> characters);
	}
}