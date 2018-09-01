// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabaseStructureBuilderCommandFactory.cs
// GUID файла: 03156D90-EE67-427E-821D-967B8363791C
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase.Sqlite
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabaseStructureBuilderCommandFactory
		: IApplicationDatabaseStructureBuilderCommandFactory<SqliteConnection>
	{
		public IDbCommand GetCreateDatabaseMetaDataTableCommand(SqliteConnection connection)
		{
			const string CommandText = "create table DatabaseMetaData(Key primary key, Value, ChangedOn default CURRENT_TIMESTAMP)";
			return new SqliteCommand(CommandText, connection);
		}

		public IDbCommand GetCreateMetaGameProfilesTableCommand(SqliteConnection connection)
		{
			const string CommandText = "create table MetaGameProfiles(Id primary key, Name unique, ChangedOn default CURRENT_TIMESTAMP)";
			return new SqliteCommand(CommandText, connection);
		}
	}
}