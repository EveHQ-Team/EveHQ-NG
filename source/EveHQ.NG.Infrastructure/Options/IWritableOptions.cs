// Проект: EveHQ.NG.WebApi
// Имя файла: IWritableOptions.cs
// GUID файла: 593674FD-1B09-44AD-96B8-02F29B45CBDC
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 29.01.2018

#region Usings

using System;
using Microsoft.Extensions.Options;

#endregion


namespace EveHQ.NG.Infrastructure.Options
{
	public interface IWritableOptions<out T> : IOptionsSnapshot<T> where T : class, new()
	{
		void Update(Action<T> applyChanges);
	}
}