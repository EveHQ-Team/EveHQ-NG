// Проект: EveHQ.NG.WebApi
// Имя файла: ITypesCatalog.cs
// GUID файла: 8A91DA39-5262-47F6-A00B-F4278EED9077
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 13.02.2018

#region Usings

using System.Collections.Generic;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public interface ITypesCatalog
	{
		void FillSkillNames(IReadOnlyCollection<SkillQueueItem> skillQueueItems);
	}
}