// Проект: EveHQ.NG.WebApi
// Имя файла: ApiErrorCodes.cs
// GUID файла: 0A279F42-F610-4ACC-A98F-1F5D97B89DFC
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 07.09.2018

namespace EveHQ.NG.WebApi.Infrastructure
{
	public enum ApiErrorCode
	{
		GeneralError = 1000,
		CannotCreateDatabase = GeneralError + 1
	}
}
