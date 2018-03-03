// Проект: EveHQ.NG.WebApi
// Имя файла: FolderSettings.cs
// GUID файла: E4177558-1D50-47EA-B316-C7216A655973
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 29.01.2018

#region Usings

using System;

#endregion


namespace EveHQ.NG.Infrastructure.Settings
{
	public sealed class FolderSettings
	{
		public FolderSettings()
		{
			ApplicationDataFolder = $"{Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData)}\\EveHQ NG";
		}

		public string ApplicationDataFolder { get; set; }

		public string TemporaryDataFolder { get; set; } = string.Empty;
	}
}