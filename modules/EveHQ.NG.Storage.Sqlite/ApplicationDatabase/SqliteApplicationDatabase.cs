// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteApplicationDatabase.cs
// GUID файла: 7B34E7FF-ABB6-45F0-8069-7DE06130A8C0
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

#region Usings

using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.Infrastructure.ErrorHandling;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Storage.Sqlite.ApplicationDatabase
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class SqliteApplicationDatabase : SqliteDatabaseBase, IApplicationDatabase
	{
		public SqliteApplicationDatabase(
			string databaseFilePath,
			IApplicationDatabaseManagementCommandFactory<SqliteConnection> managementCommandFactory) : base(databaseFilePath)
		{
			_managementCommandFactory = managementCommandFactory;
		}

		public void CreateOrVerifyApplicationDatabase()
		{
			if (!DoesExist())
			{
				Create();
				Initialize();
			}
			else
			{
				if (!IsStructureVailid())
				{
					throw new EveHqDatabaseException("The application database present but has invalid structure.");
				}
			}
		}

		public void Update()
		{
			// TODO: Update database based on its version.
		}

		private void Initialize()
		{
			Execute(
				connection =>
				{
					_managementCommandFactory.CreateBuildStructureCommand(connection).Execute();
					_managementCommandFactory.CreatePopulateWithInitialDataCommand(connection).Execute();

					return Nothing.AtAll;
				});
		}

		private bool IsStructureVailid()
		{
			return Execute(connection => _managementCommandFactory.CreateValidateDatabaseStructureCommand(connection).Execute());
		}

		private readonly IApplicationDatabaseManagementCommandFactory<SqliteConnection> _managementCommandFactory;
	}
}