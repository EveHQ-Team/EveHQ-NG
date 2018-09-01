// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabase.cs
// GUID файла: 58EFCAB0-968A-4E72-BC7B-6B04E9F870BA
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

namespace EveHQ.NG.Infrastructure.Storage
{
	public interface IDatabase
	{
		void CreateAndPopulateIfNeeded();
	}
}