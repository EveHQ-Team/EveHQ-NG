// Проект: EveHQ.NG.Infrastructure
// Имя файла: EmbeddedResourceFileReader.cs
// GUID файла: BF3C4E2E-AB0F-461B-A60C-4CCEF5BB54A9
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 05.09.2018

#region Usings

using System;
using System.IO;
using System.Reflection;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	public sealed class EmbeddedResourceFileReader : IFileReader
	{
		public EmbeddedResourceFileReader(Assembly assembly, string resourcesNamespace)
		{
			_assembly = assembly;
			_resourcesNamespace = resourcesNamespace;
		}

		public string ReadTextFile(string fileName)
		{
			var resourceName = $"{_resourcesNamespace}.{fileName}";
			using (var stream = _assembly.GetManifestResourceStream(resourceName))
			{
				if (stream == null)
				{
					throw new Exception(
						$"Resource {resourceName} not found in {_assembly.FullName}. " +
						$"Valid resources are: {string.Join(", ", _assembly.GetManifestResourceNames())}.");
				}

				using (var reader = new StreamReader(stream))
				{
					return reader.ReadToEnd();
				}
			}
		}

		private readonly Assembly _assembly;
		private readonly string _resourcesNamespace;
	}
}