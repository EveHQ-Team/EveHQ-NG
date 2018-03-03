// Проект: EveHQ.NG.WebApi
// Имя файла: ICharactersApi.cs
// GUID файла: A6C452D7-E741-4BFE-AB6B-F23EC0D5FA3B
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.Collections.Generic;
using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public interface ICharactersApi
	{
		Task<CharacterInfo> GetInfo(uint id);

		Task GetPortraits(Character character);

		Task<IEnumerable<SkillQueueItem>> GetSkillQueue(Character character);
	}
}