// Проект: EveHQ.NG.Infrastructure
// Имя файла: IFileReader.cs
// GUID файла: 88BC74F2-537E-49E2-A43F-7C011B8A3590
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 05.09.2018

namespace EveHQ.NG.Infrastructure.Core
{
	public interface IFileReader
	{
		string ReadTextFile(string fileName);
	}
}