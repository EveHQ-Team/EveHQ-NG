// Проект: EveHQ.NG.Infrastructure
// Имя файла: EveHqDatabaseException.cs
// GUID файла: B7C158CC-E394-4CF5-A0BF-3C933B37181D
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 07.09.2018

#region Usings

using System;

#endregion


namespace EveHQ.NG.Infrastructure.ErrorHandling
{
	public class EveHqDatabaseException : Exception
	{
		public EveHqDatabaseException(string message) : base(message)
		{
		}

		public EveHqDatabaseException(string message, Exception innerException) : base(message, innerException)
		{
		}
	}
}