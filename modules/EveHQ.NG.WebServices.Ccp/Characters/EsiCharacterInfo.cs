// Проект: EveHQ.NG.WebApi
// Имя файла: EsiCharacterInfo.cs
// GUID файла: E3CE009B-DDB5-4CC5-816A-E3E2AC3B90F9
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public sealed class EsiCharacterInfo
	{
		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("birthday")]
		public DateTime BornOn { get; set; }

		[JsonProperty("gender")]
		public string Gender { get; set; }

		[JsonProperty("race_id")]
		public uint RaceId { get; set; }

		[JsonProperty("ancestry_id")]
		public uint AncestryId { get; set; }

		[JsonProperty("bloodline_id")]
		public uint BloodlineId { get; set; }

		[JsonProperty("description")]
		public string Description { get; set; }

		[JsonProperty("corporation_id")]
		public uint CorporationId { get; set; }
	}
}