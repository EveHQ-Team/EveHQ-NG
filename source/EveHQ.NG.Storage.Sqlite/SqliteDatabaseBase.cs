// Проект: EveHQ.NG.Infrastructure
// Имя файла: SqliteDatabaseBase.cs
// GUID файла: E5524E03-A8F1-4A19-BC73-EBB63CA2A0BC
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.IO;
using EveHQ.NG.Infrastructure.Storage;
using Microsoft.Data.Sqlite;

#endregion


namespace EveHQ.NG.Storage.Sqlite
{
	public abstract class SqliteDatabaseBase : DatabaseBase<SqliteConnection>
	{
		protected SqliteDatabaseBase(string databaseFilePath)
		{
			_databaseFilePath = databaseFilePath;
		}

		protected void Create()
		{
			if (DoesExist())
			{
				return;
			}

			CreateDatabase();
		}

		protected bool DoesExist() => File.Exists(_databaseFilePath);

		protected override SqliteConnection CreateConnection() => new SqliteConnection($"Data Source={_databaseFilePath};");

		private void CreateDatabase() => File.Open(_databaseFilePath, FileMode.CreateNew).Dispose();

		private readonly string _databaseFilePath;
	}
}