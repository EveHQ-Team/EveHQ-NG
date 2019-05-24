// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteDatabaseCommandBase.cs
// GUID файла: E54888D1-4496-4A12-A600-341BEC8A139B
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.09.2018

#region Usings

using EveHQ.NG.Infrastructure.Storage;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Storage.Sqlite
{
	public abstract class SqliteDatabaseCommandBase<TResult> : ICommand<TResult>
	{
		protected SqliteDatabaseCommandBase(SqliteConnection connection)
		{
			Connection = connection;
		}

		public abstract TResult Execute();

		protected SqliteConnection Connection { get; }
	}
}