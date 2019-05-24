#region Usings

using Microsoft.AspNetCore.Mvc;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class IsAliveController : ApiControllerBase
	{
		[HttpGet]
		public IActionResult Get() => Ok();
	}
}
