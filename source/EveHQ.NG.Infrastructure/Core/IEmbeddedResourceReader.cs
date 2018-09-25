// Проект: EveHQ.NG.Infrastructure
// Имя файла: IEmbeddedResourceReader.cs
// GUID файла: C0FA1F63-A260-4399-8E5C-ED3756D85B83
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 05.09.2018

#region Usings

using System.Reflection;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	public interface IEmbeddedResourceFileReaderFactory
	{
		IFileReader CreateResourceReader(Assembly assembly, string resourcesNamespace);
	}
}