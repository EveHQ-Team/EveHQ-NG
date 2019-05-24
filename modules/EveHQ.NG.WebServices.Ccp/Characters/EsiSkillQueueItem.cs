// Проект: EveHQ.NG.WebApi
// Имя файла: EsiSkillQueueItem.cs
// GUID файла: 5F7B8B8F-1532-4F54-A6B0-D07A0A35AF0A
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System;
using Newtonsoft.Json;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public sealed class EsiSkillQueueItem
	{
		[JsonProperty("skill_id")]
		public int SkillId { get; set; }

		[JsonProperty("finish_date")]
		public DateTime WillFinishOn { get; set; }

		[JsonProperty("start_date")]
		public DateTime StartedOn { get; set; }

		[JsonProperty("finished_level")]
		public int FinishedLevel { get; set; }

		[JsonProperty("queue_position")]
		public int QueuePosition { get; set; }

		[JsonProperty("training_start_sp")]
		public int TrainingStartSkillPoints { get; set; }

		[JsonProperty("level_end_sp")]
		public int LevelEndSkillPoints { get; set; }

		[JsonProperty("level_start_sp")]
		public int LevelStartSkillPoints { get; set; }
	}
}