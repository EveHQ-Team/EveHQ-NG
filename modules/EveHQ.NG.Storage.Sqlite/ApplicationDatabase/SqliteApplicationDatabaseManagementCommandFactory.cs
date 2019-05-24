// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabaseManagementCommandFactory.cs
// GUID файла: 2667F214-B29F-4216-B5C9-968B02DF72D9
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.09.2018

#region Usings

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.Infrastructure.Storage;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;
using Simplify.Templates;

#endregion


namespace EveHQ.NG.Storage.Sqlite.ApplicationDatabase
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabaseManagementCommandFactory : IApplicationDatabaseManagementCommandFactory<SqliteConnection>
	{
		public SqliteApplicationDatabaseManagementCommandFactory(IEmbeddedResourceFileReaderFactory resourceFileReaderFactory)
		{
			const string SciptsFolder = "EveHQ.NG.Storage.Sqlite.ApplicationDatabase.Scripts";
			_fileReader = resourceFileReaderFactory.CreateResourceReader(Assembly.GetExecutingAssembly(), SciptsFolder);
		}

		public ICommand<Nothing> CreateBuildStructureCommand(SqliteConnection connection)
		{
			return new BuildStructureCommand(_fileReader, connection);
		}

		public ICommand<Nothing> CreatePopulateWithInitialDataCommand(SqliteConnection connection)
		{
			return new PopulateWithInitialDataCommand(_fileReader, connection);
		}

		public ICommand<bool> CreateValidateDatabaseStructureCommand(SqliteConnection connection)
		{
			return new ValidateDatabaseStructureCommand(connection);
		}

		private readonly IFileReader _fileReader;
		private const string CurrentDatabaseVersion = "1.0.0";

		private sealed class BuildStructureCommand : SqliteDatabaseCommandBase<Nothing>
		{
			public BuildStructureCommand(IFileReader fileReader, SqliteConnection connection) : base(connection)
			{
				_fileReader = fileReader;
			}

			public override Nothing Execute()
			{
				var createTablesScript = Template.FromString(_fileReader.ReadTextFile("BuildStructure.tpl")).Get();
				new SqliteCommand(createTablesScript, Connection).ExecuteNonQuery();
				return Nothing.AtAll;
			}

			private readonly IFileReader _fileReader;
		}

		private sealed class PopulateWithInitialDataCommand : SqliteDatabaseCommandBase<Nothing>
		{
			public PopulateWithInitialDataCommand(IFileReader fileReader, SqliteConnection connection) : base(connection)
			{
				_fileReader = fileReader;
			}

			public override Nothing Execute()
			{
				var populateWithInitialDataScript = Template.FromString(_fileReader.ReadTextFile("PopulateWithInitialData.tpl"))
															.Set("DatabaseVersion", CurrentDatabaseVersion)
															.Set("DefaultUserId", SqliteTools.CreateId())
															.Set("DefaultMetaGameProfileId", SqliteTools.CreateId())
															.Set("DefaultProfileName", "Default profile");

				new SqliteCommand(populateWithInitialDataScript.Get(), Connection).ExecuteNonQuery();
				return Nothing.AtAll;
			}

			private readonly IFileReader _fileReader;
		}

		private sealed class ValidateDatabaseStructureCommand : SqliteDatabaseCommandBase<bool>
		{
			public ValidateDatabaseStructureCommand(SqliteConnection connection) : base(connection)
			{
			}

			public override bool Execute() => AreAllRequiredTablesPresent() && IsDatabaseVersionValid();

			private bool IsDatabaseVersionValid()
			{
				const string GetDatabaseCommand = "select Value from DatabaseMetaData where Key = 'DatabaseVersion'";
				var databaseVersion = (string)new SqliteCommand(GetDatabaseCommand, Connection).ExecuteScalar();
				return databaseVersion.Equals(CurrentDatabaseVersion, StringComparison.OrdinalIgnoreCase);
			}

			private bool AreAllRequiredTablesPresent() => !_namesOfRequiredTables.Except(GetPresentTableNames()).Any();

			private IEnumerable<string> GetPresentTableNames()
			{
				const string GetTablesCommand = "select name from sqlite_master where type='table'";
				const int TableNameColumnIndex = 0;
				var tables = new List<string>();
				using (var reader = new SqliteCommand(GetTablesCommand, Connection).ExecuteReader())
				{
					while (reader.Read())
					{
						tables.Add(reader.GetString(TableNameColumnIndex));
					}
				}

				return tables;
			}

			private readonly string[] _namesOfRequiredTables =
			{
				"DatabaseMetaData",
				"Configurations",
				"Users",
				"MetaGameProfiles",
				"Characters",
				"MetaGameProfilesToCharacters"
			};
		}
	}
}