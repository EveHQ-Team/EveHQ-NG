// Проект: EveHQ.NG.WebApi
// Имя файла: ApplicationSettings.cs
// GUID файла: 7EA22B8F-0E98-4DF7-9680-8F9540A09AD2
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System.Diagnostics.CodeAnalysis;

#endregion


namespace EveHQ.NG.Infrastructure.Settings
{
	[SuppressMessage("ReSharper", "ClassNeverInstantiated.Global", Justification = "Created by IoC-container.")]
	public sealed class ApplicationSettings
	{
		public FolderSettings FolderSettings { get; set; } = new FolderSettings();
	}
}