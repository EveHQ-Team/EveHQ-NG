// Проект: EveHQ.NG.Infrastructure
// Имя файла: IApplicationDatabaseStructureBuilderCommandFactory.cs
// GUID файла: E8DC0E07-8C2A-4688-94E7-C62FCDDB0BC1
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	public interface IApplicationDatabaseStructureBuilderCommandFactory<in TConnection> where TConnection : IDbConnection
	{
		IDbCommand GetCreateDatabaseMetaDataTableCommand(TConnection connection);

		IDbCommand GetCreateMetaGameProfilesTableCommand(TConnection connection);
	}
}