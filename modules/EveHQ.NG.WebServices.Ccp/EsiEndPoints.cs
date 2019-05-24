// Проект: EveHQ.NG.WebApi
// Имя файла: EsiEndPoints.cs
// GUID файла: 27F5F40F-5526-486C-9DF8-A260C0455071
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 20.01.2018

namespace EveHQ.NG.WebServices.Ccp
{
	public static class EsiEndPoints
	{
		public static readonly string Characters = $"{BaseUri}/characters";

		private const string BaseUri = "https://esi.tech.ccp.is/latest";
	}
}