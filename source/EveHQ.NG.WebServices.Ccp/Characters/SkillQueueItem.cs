// Проект: EveHQ.NG.WebApi
// Имя файла: SkillQueueItem.cs
// GUID файла: F4173A3D-90EB-4731-B660-974B0DCBDC32
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System;
using System.Diagnostics.CodeAnalysis;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	[SuppressMessage("ReSharper", "ClassNeverInstantiated.Global", Justification = "DTO")]
	public sealed class SkillQueueItem
	{
		public int SkillId { get; set; }

		public string SkillName { get; set; } = "Temp";

		public DateTime WillFinishOn { get; set; }

		public DateTime StartedOn { get; set; }

		public int FinishedLevel { get; set; }

		public int QueuePosition { get; set; }

		public int TrainingStartSkillPoints { get; set; }

		public int LevelEndSkillPoints { get; set; }

		public int LevelStartSkillPoints { get; set; }
	}
}