// Проект: EveHQ.NG.WebApi
// Имя файла: ApplicationPaths.cs
// GUID файла: E562E081-56FC-4700-8D00-BA929D8FEE58
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 02.09.2018

#region Usings

using System;
using System.IO;

#endregion


namespace EveHQ.NG.WebApi.Infrastructure
{
	public static class ApplicationPaths
	{
		public static string ApplicationConfigurationFilePath =>
			Path.Combine(DefaultApplicationDataFolderRoot, "application-configuration.json");

		public static readonly string DefaultApplicationDataFolderRoot = Path.Combine(
			Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
			"EveHQ NG");

		public const string ApiHostUrl = "http://localhost";

		public static string GetLogFileNameTemplateWithPath(string dataFolderPath) =>
			Path.Combine(dataFolderPath, "logs", LogFileNameTemplate);

		public static string GetDatabasesFolderPath(string dataFolderPath) =>
			Path.Combine(dataFolderPath, "databases");

		private const string LogFileNameTemplate = "evehq-ng.service@.log";
	}
}
