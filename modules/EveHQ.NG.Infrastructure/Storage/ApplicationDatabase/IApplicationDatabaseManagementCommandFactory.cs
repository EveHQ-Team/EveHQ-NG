// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabaseManagementCommandFactory.cs
// GUID файла: D4F60569-5F29-41EA-B797-099E5DA98E15
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.09.2018

#region Usings

using System.Data;
using EveHQ.NG.Infrastructure.Core;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	public interface IApplicationDatabaseManagementCommandFactory<in TConnection> where TConnection : IDbConnection
	{
		ICommand<Nothing> CreateBuildStructureCommand(TConnection connection);

		ICommand<Nothing> CreatePopulateWithInitialDataCommand(TConnection connection);

		ICommand<bool> CreateValidateDatabaseStructureCommand(TConnection connection);
	}
}