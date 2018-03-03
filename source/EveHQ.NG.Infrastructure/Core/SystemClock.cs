// Проект: EveHQ.NG.WebApi
// Имя файла: SystemClock.cs
// GUID файла: 931088FC-9D45-4B95-A342-C73F3C7378AD
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 22.01.2018

#region Usings

using System;
using System.Diagnostics.CodeAnalysis;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	[SuppressMessage("ReSharper", "ClassNeverInstantiated.Global", Justification = "Created by IoC-container.")]
	public sealed class SystemClock : IClock
	{
		public DateTimeOffset UtcNow => DateTime.UtcNow;
	}
}