// Проект: EveHQ.NG.WebApi
// Имя файла: SdeExtractor.cs
// GUID файла: 0316563D-9E90-4F61-8AAE-3294BAA9D259
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 11.02.2018

#region Usings

using System;
using System.IO;
using System.IO.Compression;
using System.Reflection;

#endregion


namespace EveHQ.NG.Infrastructure
{
	public sealed class SdeExtractor
	{
		public void ExtractIfNeeded()
		{
			var publishFolderPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
			const string CompressedSdeFileName = "eve.db.zip";
			var compressedSdeFilePath = Path.Combine(publishFolderPath, CompressedSdeFileName);
			if (!File.Exists(compressedSdeFilePath))
			{
				return;
			}

			var destinationFolderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "EveHQ NG/sde");
			if (!Directory.Exists(destinationFolderPath))
			{
				Directory.CreateDirectory(destinationFolderPath);
			}

			ZipFile.ExtractToDirectory(compressedSdeFilePath, destinationFolderPath, overwriteFiles : true);
			File.Delete(compressedSdeFilePath);
		}
	}
}