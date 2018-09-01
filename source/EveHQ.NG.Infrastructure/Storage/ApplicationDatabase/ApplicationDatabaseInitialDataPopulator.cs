// Проект: EveHQ.NG.Infrastructure
// Имя файла: ApplicationDatabaseInitialDataPopulator.cs
// GUID файла: 67B3D4C5-3FBD-411B-A8E4-03FEAB4C08BD
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class ApplicationDatabaseInitialDataPopulator<TConnection> where TConnection : IDbConnection
	{
		public ApplicationDatabaseInitialDataPopulator(IApplicationDatabaseInitialDataPopulatorCommandFactory<TConnection> commandFactory)
		{
			_commandFactory = commandFactory;
		}

		public void PopulateWithInitialData(TConnection connection)
		{
			_commandFactory.GetSetDatabaseVersionCommand(connection).ExecuteNonQuery();
			_commandFactory.GetAddDefaultMetaGameProfileCommand(connection).ExecuteNonQuery();
		}

		private readonly IApplicationDatabaseInitialDataPopulatorCommandFactory<TConnection> _commandFactory;
	}
}