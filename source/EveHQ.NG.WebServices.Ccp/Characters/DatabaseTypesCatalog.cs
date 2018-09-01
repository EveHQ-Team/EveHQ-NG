// Проект: EveHQ.NG.WebApi
// Имя файла: DatabaseTypesCatalog.cs
// GUID файла: F9C93690-077B-491E-A444-DC9429DA884F
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 13.02.2018

#region Usings

using System.Collections.Generic;
using System.IO;
using EveHQ.NG.Infrastructure.Settings;
using JetBrains.Annotations;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class DatabaseTypesCatalog : ITypesCatalog
	{
		public DatabaseTypesCatalog(IOptions<ApplicationConfiguration> applicationSettings)
		{
			var databaseFilePath = Path.Combine(applicationSettings.Value.DataFolderPath, "sde", "eve.db");
			_connectionString = $"Data Source={databaseFilePath}";
		}

		public void FillSkillNames(IReadOnlyCollection<SkillQueueItem> skillQueueItems)
		{
			using (var connection = new SqliteConnection(_connectionString))
			{
				connection.Open();
				using (var command = CreateGetItemNameCommand(connection))
				{
					foreach (var skillQueueItem in skillQueueItems)
					{
						command.Parameters[TypeIdParameterName].Value = skillQueueItem.SkillId;
						skillQueueItem.SkillName = (string)command.ExecuteScalar();
					}
				}
			}
		}

		private SqliteCommand CreateGetItemNameCommand(SqliteConnection connection)
		{
			var command = new SqliteCommand(GetTypeNameCommand, connection);
			command.Parameters.Add(TypeIdParameterName, SqliteType.Integer);
			return command;
		}

		private readonly string _connectionString;

		private readonly string GetTypeNameCommand = $"select typeName from invTypes where typeID = {TypeIdParameterName}";
		private const string TypeIdParameterName = "@typeID";
	}
}