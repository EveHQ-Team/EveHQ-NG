// Проект: EveHQ.NG.Infrastructure
// Имя файла: Nothing.cs
// GUID файла: B8AA55CB-C473-4755-A79A-0578D81B7BD7
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.09.2018

namespace EveHQ.NG.Infrastructure.Core
{
	public sealed class Nothing
	{
		private Nothing()
		{
		}

		public static Nothing AtAll { get; } = new Nothing();
	}
}