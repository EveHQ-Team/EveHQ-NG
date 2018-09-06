// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabase.cs
// GUID файла: D6C5614F-C444-4C09-8F68-B5AEB2ABE17B
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	public interface IApplicationDatabase
	{
		void CreateOrVerifyApplicationDatabase();

		void Update();
	}
}