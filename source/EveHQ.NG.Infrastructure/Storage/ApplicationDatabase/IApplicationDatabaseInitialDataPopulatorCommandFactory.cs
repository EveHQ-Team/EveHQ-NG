// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabaseInitialDataPopulatorCommandFactory.cs
// GUID файла: FC38B27F-7C81-401B-8B45-CE96611D5CA3
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	public interface IApplicationDatabaseInitialDataPopulatorCommandFactory<in TConnection> where TConnection : IDbConnection
	{
		IDbCommand GetSetDatabaseVersionCommand(TConnection connection);

		IDbCommand GetAddDefaultMetaGameProfileCommand(TConnection connection);
	}
}