// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabaseStructureValidatorCommandFactory.cs
// GUID файла: AF28B147-CE32-4278-B26C-E1E02C814495
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase.Sqlite
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabaseStructureValidatorCommandFactory
		: IApplicationDatabaseStructureValidatorCommandFactory<SqliteConnection>
	{
		public IDbCommand GetTableNamesCommand(SqliteConnection connection)
		{
			const string CommandText = "select name from sqlite_master where type='table'";
			return new SqliteCommand(CommandText, connection);
		}
	}
}