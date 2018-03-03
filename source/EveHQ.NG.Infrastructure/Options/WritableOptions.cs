// Проект: EveHQ.NG.WebApi
// Имя файла: WritableOptions.cs
// GUID файла: 8EA9BAFE-7CA0-4EFF-A3E6-AE6BD3A71382
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 29.01.2018

#region Usings

using System;
using System.IO;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Schema.Generation;

#endregion


namespace EveHQ.NG.Infrastructure.Options
{
	public sealed class WritableOptions<TOptions> : IWritableOptions<TOptions> where TOptions : class, new()
	{
		public WritableOptions(IOptionsMonitor<TOptions> options, string filePath)
		{
			_options = options;
			_filePath = filePath;
			_schema = new JSchemaGenerator().Generate(typeof(TOptions));
		}

		public TOptions Value => _options.CurrentValue;

		public TOptions Get(string name) => _options.Get(name);

		public void Update(Action<TOptions> applyChanges)
		{
			var settings = GetSettingsFromFileOrCreateNew();
			applyChanges(settings);
			File.WriteAllText(_filePath, JsonConvert.SerializeObject(settings, Formatting.Indented));
		}

		private TOptions GetSettingsFromFileOrCreateNew()
		{
			if (!File.Exists(_filePath))
			{
				return new TOptions();
			}

			try
			{
				var readObject = JObject.Parse(File.ReadAllText(_filePath));
				return readObject.IsValid(_schema) ? readObject.ToObject<TOptions>() : new TOptions();
			}
			catch (JsonReaderException)
			{
				return new TOptions();
			}
		}

		private readonly JSchema _schema;

		private readonly IOptionsMonitor<TOptions> _options;
		private readonly string _filePath;
	}
}