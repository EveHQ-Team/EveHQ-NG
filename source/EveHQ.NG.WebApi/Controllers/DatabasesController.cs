// Проект: EveHQ.NG.WebApi
// Имя файла: DatabasesController.cs
// GUID файла: A8EB4B78-5D6A-4C78-83C6-94D540FD2500
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 25.08.2018

#region Usings

using System;
using System.Net;
using EveHQ.NG.Infrastructure.Storage;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using Microsoft.AspNetCore.Mvc;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class DatabasesController : ApiControllerBase
	{
		public DatabasesController(IApplicationDatabase applicationDatabase)
		{
			_applicationDatabase = applicationDatabase;
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
				// TODO: Log exception.
				// TODO: Should I return the error message?
				return StatusCode((int)HttpStatusCode.InternalServerError);
			}
		}

		private readonly IApplicationDatabase _applicationDatabase;
	}
}
