#region Usings

using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using EveHQ.NG.WebApi.Infrastructure;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
			services.ConfigureMvc()
					.ConfigureCors(Configuration)
					.AddSignalR();

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

			applicationBuilder.UseCors(ApiConstants.CorsPolicyName)
							.UseSignalR(routeBuilder => routeBuilder.MapHubs())
							.UseMvc();

			applicationLifetime.ApplicationStopped.Register(() => _applicationContainer.Dispose());
		}

		private IContainer _applicationContainer;
	}
}
