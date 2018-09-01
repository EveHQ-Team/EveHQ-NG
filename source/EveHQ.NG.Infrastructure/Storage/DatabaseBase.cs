// Проект: EveHQ.NG.Infrastructure
// Имя файла: DatabaseBase.cs
// GUID файла: 6A7CBEAB-0202-491B-8CBB-1C16290F6E33
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System;
using System.Data;
using System.IO;
using EveHQ.NG.Infrastructure.Settings;
using Microsoft.Extensions.Options;

#endregion


namespace EveHQ.NG.Infrastructure.Storage
{
	public abstract class DatabaseBase<TConnection> : IDatabase where TConnection : IDbConnection
	{
		protected DatabaseBase(IOptions<ApplicationConfiguration> applicationSettings)
		{
			_applicationSettings = applicationSettings;
		}

		public void CreateAndPopulateIfNeeded()
		{
			var databaseFilePath = GetDatabaseFilePath();
			var doesDatabaseAlreadyExist = File.Exists(databaseFilePath);
			if (!doesDatabaseAlreadyExist)
			{
				CreateDatabaseFile(databaseFilePath);
			}

			using (var connection = CreateConnection(databaseFilePath))
			{
				connection.Open();
				if (doesDatabaseAlreadyExist)
				{
					if (!ValidateDatabaseStructure(connection))
					{
						throw new ApplicationException("The application database present but has invalid structure.");
					}
				}
				else
				{
					BuildDatabaseStructure(connection);
					PopulateDatabaseWithInitialData(connection);
				}
			}
		}

		protected ApplicationConfiguration ApplicationConfiguration => _applicationSettings.Value;

		protected abstract void CreateDatabaseFile(string databaseFilePath);

		protected abstract bool ValidateDatabaseStructure(TConnection connection);

		protected abstract void BuildDatabaseStructure(TConnection connection);

		protected abstract void PopulateDatabaseWithInitialData(TConnection connection);

		protected abstract TConnection CreateConnection(string databaseFilePath);

		protected abstract string GetDatabaseFilePath();

		private readonly IOptions<ApplicationConfiguration> _applicationSettings;
	}
}