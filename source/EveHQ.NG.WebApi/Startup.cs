#region Usings

using System;
using System.Diagnostics.CodeAnalysis;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using EveHQ.NG.Infrastructure.Options;
using EveHQ.NG.Infrastructure.Settings;
using EveHQ.NG.Infrastructure.UiNotification;
using EveHQ.NG.WebApi.Infrastructure;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

#endregion


namespace EveHQ.NG.WebApi
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedNoFixedConstructorSignature)]
	public sealed class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		[UsedImplicitly(ImplicitUseKindFlags.Access)]
		public IConfiguration Configuration { get; }

		[UsedImplicitly(ImplicitUseKindFlags.Access)]
		public IServiceProvider ConfigureServices(IServiceCollection services)
		{
			// Add framework services.
			services.AddMvc().AddJsonOptions(
				options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

			services.AddCors(
				options => options.AddPolicy(
					CorsPolicyName,
					builder => builder.AllowAnyMethod().AllowAnyHeader().WithOrigins($"http://localhost:{SignalRPort}")));

			services.AddSignalR();

			services.ConfigureWritable<ApplicationConfiguration>(
				Configuration.GetSection(nameof(FolderSettings)),
				$"{Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData)}/EveHQ NG/application-configuration.json");

			_applicationContainer = new IocContainerBootstrapper().BuildContainer(services);
			return new AutofacServiceProvider(_applicationContainer);
		}

		[UsedImplicitly(ImplicitUseKindFlags.Access)]
		public void Configure(
			IApplicationBuilder applicationBuilder,
			IHostingEnvironment hostingEnvironment,
			IApplicationLifetime applicationLifetime)
		{
			if (hostingEnvironment.IsDevelopment())
			{
				applicationBuilder.UseDeveloperExceptionPage();
			}

			applicationBuilder.UseCors(CorsPolicyName);
			applicationBuilder.UseSignalR(routeBuilder => routeBuilder.MapHub<AuthenticationNotificationHub>(AuthenticationNotificationHubName));
			applicationBuilder.UseMvc();

			applicationLifetime.ApplicationStopped.Register(() => _applicationContainer.Dispose());
		}

		private IContainer _applicationContainer;

		private const int SignalRPort = 5000;
		private const string AuthenticationNotificationHubName = "/authentication-notification";
		private const string CorsPolicyName = "CorsPolicy";
	}
}
