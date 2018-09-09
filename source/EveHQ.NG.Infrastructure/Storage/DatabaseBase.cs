// Проект: EveHQ.NG.Infrastructure
// Имя файла: DatabaseBase.cs
// GUID файла: 6A7CBEAB-0202-491B-8CBB-1C16290F6E33
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System;
using System.Data;

#endregion


namespace EveHQ.NG.Infrastructure.Storage
{
	public abstract class DatabaseBase<TConnection> where TConnection : IDbConnection
	{
		protected abstract TConnection CreateConnection();

		protected abstract void PrepareConnection(TConnection connection);

		protected TResult Execute<TResult>(Func<TConnection, TResult> script)
		{
			using (var connection = CreateConnection())
			{
				connection.Open();
				PrepareConnection(connection);
				return script(connection);
			}
		}
	}
}