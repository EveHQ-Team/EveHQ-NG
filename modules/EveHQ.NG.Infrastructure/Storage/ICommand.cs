// Проект: EveHQ.NG.Infrastructure
// Имя файла: IDatabaseCommand.cs
// GUID файла: 8F06F577-7D57-4A45-B95C-2255D3B4FF5B
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.09.2018

namespace EveHQ.NG.Infrastructure.Storage
{
	public interface ICommand<out TResult>
	{
		TResult Execute();
	}
}