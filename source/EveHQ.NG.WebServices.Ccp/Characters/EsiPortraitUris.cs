// Проект: EveHQ.NG.WebApi
// Имя файла: EsiPortraitUris.cs
// GUID файла: 9514C548-CC17-4756-A06A-24B142110D7E
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public sealed class EsiPortraitUris
	{
		[JsonProperty("px64x64")]
		public string Image64x64Uri { get; set; }

		[JsonProperty("px128x128")]
		public string Image128x128Uri { get; set; }

		[JsonProperty("px256x256")]
		public string Image256x256Uri { get; set; }

		[JsonProperty("px512x512")]
		public string Image512x512Uri { get; set; }
	}
}