#region Usings

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class ClientLoggingController : ApiControllerBase
	{
		public ClientLoggingController(ILogger<ClientLoggingController> logger)
		{
			_logger = logger;
		}

		[HttpPost("information")]
		public IActionResult LogInformation([FromBody] string message)
		{
			_logger.LogInformation(message);
			return Ok();
		}

		[HttpPost("error")]
		public IActionResult LogError([FromBody] string message)
		{
			_logger.LogError(message);
			return Ok();
		}

		private readonly ILogger<ClientLoggingController> _logger;
	}
}
