// Проект: EveHQ.NG.WebApi
// Имя файла: JsonSerializer.cs
// GUID файла: E1F137D7-4A84-41E3-94F3-AC141531C7D4
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 15.01.2018

#region Usings

using System;
using System.IO;
using Newtonsoft.Json;
using SimpleRepository;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	public sealed class JsonSerializer : ISerializeEntities
	{
		public void Serialize(Type entityType, object entity, Stream outputStream)
		{
			using (var writer = new StreamWriter(outputStream))
			{
				writer.Write(JsonConvert.SerializeObject(entity));
			}
		}

		public object Deserialize(Type entityType, Stream inputStream)
		{
			using (var reader = new StreamReader(inputStream))
			{
				return JsonConvert.DeserializeObject(reader.ReadToEnd(), entityType);
			}
		}
	}
}