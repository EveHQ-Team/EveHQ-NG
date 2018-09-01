// Проект: EveHQ.NG.Infrastructure
// Имя файла: ApplicationDatabaseStructureBuilder.cs
// GUID файла: FA2B5D79-A821-45A5-8CB1-88C004F3E471
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Data;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class ApplicationDatabaseStructureBuilder<TConnection> where TConnection : IDbConnection
	{
		public ApplicationDatabaseStructureBuilder(IApplicationDatabaseStructureBuilderCommandFactory<TConnection> commandFactory)
		{
			_commandFactory = commandFactory;
		}

		public void BuildStructure(TConnection connection)
		{
			_commandFactory.GetCreateDatabaseMetaDataTableCommand(connection).ExecuteNonQuery();
			_commandFactory.GetCreateMetaGameProfilesTableCommand(connection).ExecuteNonQuery();
		}

		private readonly IApplicationDatabaseStructureBuilderCommandFactory<TConnection> _commandFactory;
	}
}