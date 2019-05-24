#region Usings

using System;
using System.IO;
using EveHQ.NG.Infrastructure.Settings;
using EveHQ.NG.WebApi.Infrastructure;
using JetBrains.Annotations;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting.Json;

#endregion


namespace EveHQ.NG.WebApi
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public sealed class Program
	{
		public static int Main(string[] args)
		{
			Log.Logger = BuildLogger();

			try
			{
				Log.Information("Starting web host...");
				BuildWebHost(args).Run();

				return 0;
			}
			catch (Exception exception)
			{
				Log.Fatal(exception, "Host terminated unexpectedly!");
				return 1;
			}
			finally
			{
				Log.CloseAndFlush();
			}
		}

		private static Logger BuildLogger()
		{
			return new LoggerConfiguration()
					.MinimumLevel.Debug()
					.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
					.Enrich.FromLogContext()
					.WriteTo.Console()
					.WriteTo.File(
						formatter : new JsonFormatter(),
						path : ApplicationPaths.GetLogFileNameTemplateWithPath(GetDataFolderPath()),
						rollingInterval : RollingInterval.Day,
						retainedFileCountLimit : 4)
					.CreateLogger();
		}

		private static string GetDataFolderPath()
		{
			if (!File.Exists(ApplicationPaths.ApplicationConfigurationFilePath))
			{
				return ApplicationPaths.DefaultApplicationDataFolderRoot;
			}

			try
			{
				var applicationConfigurationFileContent = File.ReadAllText(ApplicationPaths.ApplicationConfigurationFilePath);
				var applicationConfiguration =
					JsonConvert.DeserializeObject<ApplicationConfiguration>(applicationConfigurationFileContent);
				var dataFolderPath = applicationConfiguration.DataFolderPath;
				return !string.IsNullOrWhiteSpace(dataFolderPath) ? dataFolderPath : ApplicationPaths.DefaultApplicationDataFolderRoot;
			}
			catch
			{
				return ApplicationPaths.DefaultApplicationDataFolderRoot;
			}
		}

		private static IWebHost BuildWebHost(string[] args)
		{
			var config = new ConfigurationBuilder()
						.SetBasePath(Directory.GetCurrentDirectory())
						.AddJsonFile(ApplicationPaths.ApplicationConfigurationFilePath)
						.AddCommandLine(args)
						.Build();

			var signalRPortNumber = config[ConfigurationKeyNames.PortNumber];

			return WebHost.CreateDefaultBuilder(args)
						.UseKestrel()
						.UseUrls($"{ApplicationPaths.ApiHostUrl}:{signalRPortNumber}")
						.UseConfiguration(config)
						.UseStartup<Startup>()
						.UseSerilog()
						.Build();
		}
	}
}
