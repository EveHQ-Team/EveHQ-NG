// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabaseStructureValidatorCommandFactory.cs
// GUID файла: 47545CC9-F86B-4D43-9928-C2E902251CB3
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	public interface IApplicationDatabaseStructureValidatorCommandFactory<in TConnection> where TConnection : IDbConnection
	{
		IDbCommand GetTableNamesCommand(TConnection connection);
	}
}