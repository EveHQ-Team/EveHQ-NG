#region Usings

using System;
using EveHQ.NG.Infrastructure;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting.Json;

#endregion


namespace EveHQ.NG.WebApi
{
	public sealed class Program
	{
		public static int Main(string[] args)
		{
			Log.Logger = BuildLogger();

			try
			{
				Log.Information("Starting web host...");
				var sdeExtractor = new SdeExtractor();
				sdeExtractor.ExtractIfNeeded();
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

		private static Logger BuildLogger() =>
			new LoggerConfiguration()
				.MinimumLevel.Debug()
				.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
				.Enrich.FromLogContext()
				.WriteTo.Console()
				.WriteTo.File(
					formatter : new JsonFormatter(),
					path : $"{Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData)}/EveHQ NG/logs/evehq-ng.service@.log",
					rollingInterval : RollingInterval.Day,
					retainedFileCountLimit : 4)
				.CreateLogger();

		private static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
					.UseKestrel()
					.UseStartup<Startup>()
					.UseSerilog()
					.Build();
	}
}
