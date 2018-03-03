// Проект: EveHQ.NG.WebApi
// Имя файла: CharactersController.cs
// GUID файла: 63A4046A-1A31-44F1-9654-EFBB8F3E4F5D
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.Linq;
using System.Threading.Tasks;
using EveHQ.NG.Infrastructure;
using EveHQ.NG.WebServices.Ccp.Characters;
using Microsoft.AspNetCore.Mvc;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class CharactersController : ApiControllerBase
	{
		public CharactersController(
			ILoggedInCharacterRepository characterRepository,
			ICharactersApi charactersApi,
			ITypesCatalog typesCatalog)
		{
			_characterRepository = characterRepository;
			_charactersApi = charactersApi;
			_typesCatalog = typesCatalog;
		}

		[HttpGet]
		public IActionResult Get() => Json(_characterRepository.CharacterInfos);

		[HttpGet("{id}/info")]
		public IActionResult GetInfo([FromRoute] uint id) =>
			Json(_characterRepository.GetCharacterById(id).Information);

		[HttpGet("{id}/skillqueue")]
		public async Task<IActionResult> GetSkillQueue([FromRoute] uint id)
		{
			var skillQueueItems = (await _charactersApi.GetSkillQueue(_characterRepository.GetCharacterById(id))).ToList();
			_typesCatalog.FillSkillNames(skillQueueItems);
			return Json(skillQueueItems);
		}

		private readonly ILoggedInCharacterRepository _characterRepository;
		private readonly ICharactersApi _charactersApi;
		private readonly ITypesCatalog _typesCatalog;
	}
}
