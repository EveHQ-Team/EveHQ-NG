// Проект: EveHQ.NG.WebApi
// Имя файла: DatabasesController.cs
// GUID файла: A8EB4B78-5D6A-4C78-83C6-94D540FD2500
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

#region Usings

using System;
using EveHQ.NG.Infrastructure.Storage;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
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

		[HttpPost("create")]
		public IActionResult Create([FromBody] string databaseName)
		{
			try
			{
				switch (databaseName)
				{
					case DatabaseConstants.Application:
						_applicationDatabase.CreateAndPopulateIfNeeded();
						break;
					case DatabaseConstants.Sde:
						// TODO: Do same for SDE!
						break;
					default:
						throw new ArgumentOutOfRangeException(nameof(databaseName), $"Unknown database name '{databaseName}'.");
				}

				return Created("/databases", new { databaseName = databaseName });
			}
			catch (Exception exception)
			{
				// TODO: Should I return the error message?
				_logger.LogError(exception, $"Can't create the database {databaseName}.");
				throw;
			}
		}

		private readonly IApplicationDatabase _applicationDatabase;
		private readonly ILogger<DatabasesController> _logger;
	}
}
