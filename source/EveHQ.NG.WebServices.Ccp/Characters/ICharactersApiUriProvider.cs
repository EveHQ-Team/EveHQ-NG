// Проект: EveHQ.NG.WebApi
// Имя файла: ICharactersApiUriProvider.cs
// GUID файла: DC0B2DBD-892A-4B6D-AF29-BA12471EB8F2
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

#region Usings

using System.Threading.Tasks;
using EveHQ.NG.Domain.Core;

#endregion


namespace EveHQ.NG.WebServices.Ccp.Characters
{
	public interface ICharactersApiUriProvider
	{
		Task<string> GetSkillQueueUri(Character character);

		Task<string> GetPortraitsUri(Character character);

		Task<string> GetInfoUri(uint characterId);
	}
}