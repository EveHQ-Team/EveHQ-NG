// Проект: EveHQ.NG.Infrastructure
// Имя файла: ApplicationDatabaseStructureValidator.cs
// GUID файла: 9210EE1B-BC79-4F4B-A966-E10CB58DE094
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 26.08.2018

#region Usings

using System.Collections.Generic;
using System.Data;
using System.Linq;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Storage.ApplicationDatabase
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class ApplicationDatabaseStructureValidator<TConnection> where TConnection : IDbConnection
	{
		public ApplicationDatabaseStructureValidator(IApplicationDatabaseStructureValidatorCommandFactory<TConnection> commandFactory)
		{
			_commandFactory = commandFactory;
		}

		public bool ValidateStructure(TConnection connection)
		{
			var presentTableNames = GetPresentTableNames(connection);
			var requiredTableNames = new[] { "MetaGameProfiles" };
			return DoTableNamesIdentical(requiredTableNames, presentTableNames);
		}

		private bool DoTableNamesIdentical(IEnumerable<string> requiredTableNames, IEnumerable<string> presentTableNames) =>
			!requiredTableNames.Except(presentTableNames).Any();

		private IEnumerable<string> GetPresentTableNames(TConnection connection)
		{
			const int TableNameColumnIndex = 0;
			var tables = new List<string>();
			using (var reader = _commandFactory.GetTableNamesCommand(connection).ExecuteReader())
			{
				while (reader.Read())
				{
					tables.Add(reader.GetString(TableNameColumnIndex));
				}
			}

			return tables;
		}

		private readonly IApplicationDatabaseStructureValidatorCommandFactory<TConnection> _commandFactory;
	}
}