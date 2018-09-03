// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabase.cs
// GUID файла: 7B34E7FF-ABB6-45F0-8069-7DE06130A8C0
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

#region Usings

using System.IO;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase.Sqlite
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabase : SqliteDatabaseBase, IApplicationDatabase
	{
		public SqliteApplicationDatabase(
			string databasesFolderPath,
			ApplicationDatabaseStructureBuilder<SqliteConnection> structureBuilder,
			ApplicationDatabaseInitialDataPopulator<SqliteConnection> initialDataPopulator,
			ApplicationDatabaseStructureValidator<SqliteConnection> structureValidator)
		{
			_databasesFolderPath = databasesFolderPath;
			_structureBuilder = structureBuilder;
			_initialDataPopulator = initialDataPopulator;
			_structureValidator = structureValidator;
		}

		protected override void BuildDatabaseStructure(SqliteConnection connection) =>
			_structureBuilder.BuildStructure(connection);

		protected override void PopulateDatabaseWithInitialData(SqliteConnection connection) =>
			_initialDataPopulator.PopulateWithInitialData(connection);

		protected override bool ValidateDatabaseStructure(SqliteConnection connection) =>
			_structureValidator.ValidateStructure(connection);

		protected override string GetDatabaseFilePath() =>
			Path.Combine(_databasesFolderPath, $"{DatabaseConstants.Application}.{DatabaseConstants.SqliteFileExtension}");

		private readonly string _databasesFolderPath;
		private readonly ApplicationDatabaseStructureBuilder<SqliteConnection> _structureBuilder;
		private readonly ApplicationDatabaseInitialDataPopulator<SqliteConnection> _initialDataPopulator;
		private readonly ApplicationDatabaseStructureValidator<SqliteConnection> _structureValidator;
	}
}