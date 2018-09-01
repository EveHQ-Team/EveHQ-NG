// Проект: EveHQ.NG.WebApi
// Имя файла: ApplicationConfiguration.cs
// GUID файла: 7EA22B8F-0E98-4DF7-9680-8F9540A09AD2
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System.IO;
using EveHQ.NG.Infrastructure.Storage;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Settings
{
	[UsedImplicitly(ImplicitUseTargetFlags.WithMembers)]
	public sealed class ApplicationConfiguration
	{
		public string DataFolderPath { get; set; } = string.Empty;

		public uint BackendServicePortNumber { get; set; }

		public bool IsApplicationInstalled { get; set; }
	}

	public static class ApplicationConfigurationExtensions
	{
		public static string ApplicationDatabaseFilePath(this ApplicationConfiguration applicationConfiguration, string extension) =>
			Path.Combine(applicationConfiguration.DatabasesFolderPath(), $"{DatabaseConstants.Application}.{extension}");

		public static string SdeDatabaseFilePath(this ApplicationConfiguration applicationConfiguration, string extension) =>
			Path.Combine(applicationConfiguration.DatabasesFolderPath(), $"{DatabaseConstants.Sde}.{extension}");

		private static string DatabasesFolderPath(this ApplicationConfiguration applicationConfiguration)
		{
			return Path.Combine(applicationConfiguration.DataFolderPath, DatabasesFolderName);
		}

		private const string DatabasesFolderName = "databases";
	}
}