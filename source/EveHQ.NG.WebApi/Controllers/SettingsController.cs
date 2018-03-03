#region Usings

using EveHQ.NG.Infrastructure.Options;
using EveHQ.NG.Infrastructure.Settings;
using Microsoft.AspNetCore.Mvc;

#endregion


namespace EveHQ.NG.WebApi.Controllers
{
	public sealed class SettingsController : ApiControllerBase
	{
		public SettingsController(IWritableOptions<ApplicationSettings> applicationSettings)
		{
			_applicationSettings = applicationSettings;
		}

		[HttpPost("folders")]
		public IActionResult SetApplicationSettings([FromBody] FolderSettings settings)
		{
			_applicationSettings.Update(
				applicationSettings => { applicationSettings.FolderSettings.TemporaryDataFolder = settings.TemporaryDataFolder; });
			return Ok();
		}

		private readonly IWritableOptions<ApplicationSettings> _applicationSettings;
	}
}
