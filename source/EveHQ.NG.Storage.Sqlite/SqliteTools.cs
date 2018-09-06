// Проект: EveHQ.NG.Storage.Sqlite
// Имя файла: SqliteTools.cs
// GUID файла: 7B8E546F-FDCF-4F0E-8778-F19171669B25
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 05.09.2018

#region Usings

using System;
using EveHQ.NG.Infrastructure.Storage;

#endregion


namespace EveHQ.NG.Storage.Sqlite
{
	public static class SqliteTools
	{
		public static string CreateId() => Guid.NewGuid().ToString("D");

		private const string SqliteFileExtension = "sqlite";

		public static readonly string ApplicationDatabaseFileName = $"{DatabaseConstants.ApplicationDatabaseName}.{SqliteFileExtension}";
		public static readonly string SdeDatabaseFileName = $"{DatabaseConstants.SdeDatabaseName}.{SqliteFileExtension}";
	}
}