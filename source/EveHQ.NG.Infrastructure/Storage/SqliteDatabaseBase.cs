// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteDatabaseBase.cs
// GUID файла: E5524E03-A8F1-4A19-BC73-EBB63CA2A0BC
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.IO;
using EveHQ.NG.Infrastructure.Settings;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;

#endregion


namespace EveHQ.NG.Infrastructure.Storage
{
	public abstract class SqliteDatabaseBase : DatabaseBase<SqliteConnection>
	{
		protected SqliteDatabaseBase(IOptions<ApplicationConfiguration> applicationSettings) : base(applicationSettings)
		{
		}

		protected override SqliteConnection CreateConnection(string databaseFilePath) =>
			new SqliteConnection($"Data Source={databaseFilePath};Version=3;");

		protected override void CreateDatabaseFile(string databaseFilePath) => File.Create(databaseFilePath);
	}
}