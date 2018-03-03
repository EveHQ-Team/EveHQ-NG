// Проект: EveHQ.NG.WebApi
// Имя файла: IClock.cs
// GUID файла: A3FFBD50-9D06-4527-A6C1-3788F67DF0D8
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 22.01.2018

#region Usings

using System;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	public interface IClock
	{
		DateTimeOffset UtcNow { get; }
	}
}