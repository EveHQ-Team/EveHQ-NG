// Проект: EveHQ.NG.Infrastructure
// Имя файла: EmbeddedResourceFileReaderFactory.cs
// GUID файла: 2681D7D7-8521-4316-92C6-03689B19345B
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 05.09.2018

#region Usings

using System.Reflection;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class EmbeddedResourceFileReaderFactory : IEmbeddedResourceFileReaderFactory
	{
		public IFileReader CreateResourceReader(Assembly assembly, string resourcesNamespace) =>
			new EmbeddedResourceFileReader(assembly, resourcesNamespace);
	}
}