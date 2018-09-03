// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabaseInitialDataPopulatorCommandFactory.cs
// GUID файла: 3B722662-7A31-4C1E-85B2-19A3D3B3AE79
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System;
using System.Data;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase.Sqlite
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabaseInitialDataPopulatorCommandFactory
		: IApplicationDatabaseInitialDataPopulatorCommandFactory<SqliteConnection>
	{
		public IDbCommand GetSetDatabaseVersionCommand(SqliteConnection connection) =>
			new SqliteCommand(
				"insert into DatabaseMetaData(Key, Value) values ('DatabaseVersion', '1.0.0')",
				connection);

		public IDbCommand GetAddDefaultMetaGameProfileCommand(SqliteConnection connection) =>
			new SqliteCommand(
				$"insert into MetaGameProfiles(Id, Name) values ('{Guid.NewGuid():D}', 'Default profile')",
				connection);
	}
}