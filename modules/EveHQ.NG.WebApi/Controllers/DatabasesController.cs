// Проект: EveHQ.NG.WebApi
// Имя файла: DatabasesController.cs
// GUID файла: A8EB4B78-5D6A-4C78-83C6-94D540FD2500
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

#region Usings

using System;
using EveHQ.NG.Infrastructure.Storage;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using EveHQ.NG.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class DatabasesController : ApiControllerBase
	{
		public DatabasesController(
			IApplicationDatabase applicationDatabase,
			ILogger<DatabasesController> logger)
		{
			_applicationDatabase = applicationDatabase;
			_logger = logger;
		}

		[HttpPost("{databaseName}/create")]
		public IActionResult Create([FromRoute] string databaseName)
		{
			try
			{
				switch (databaseName)
				{
					case DatabaseConstants.ApplicationDatabaseName:
						_applicationDatabase.CreateOrVerifyApplicationDatabase();
						break;
					case DatabaseConstants.SdeDatabaseName:
						// TODO: Do same for SDE!
						break;
					default:
						throw new ArgumentOutOfRangeException(nameof(databaseName), $"Unknown database name '{databaseName}'.");
				}

				return Created("/databases", new { databaseName = databaseName });
			}
			catch (Exception exception)
			{
				var message = $"Can't create the database {databaseName} or structure of present database instance is invalid.";
				_logger.LogError(exception, message);
				return new ApiErrorResult(message, ApiErrorCode.CannotCreateDatabase);
			}
		}

		private readonly IApplicationDatabase _applicationDatabase;
		private readonly ILogger<DatabasesController> _logger;
	}
}
