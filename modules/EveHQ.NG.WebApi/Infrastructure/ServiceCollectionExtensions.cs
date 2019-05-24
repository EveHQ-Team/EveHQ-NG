// Проект: EveHQ.NG.WebApi
// Имя файла: ServiceCollectionExtensions.cs
// GUID файла: 0B37C575-6E3F-4CEF-89F2-355664F420AF
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 29.01.2018

#region Usings

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

#endregion


namespace EveHQ.NG.WebApi.Infrastructure
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection ConfigureMvc(this IServiceCollection services)
		{
			services.AddMvc()
					.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
			services.AddOptions();
			return services;
		}

		public static IServiceCollection ConfigureCors(this IServiceCollection services, IConfiguration configuration)
		{
			var signalRPort = configuration[ConfigurationKeyNames.PortNumber];
			services.AddCors(
				options => options.AddPolicy(
					ApiConstants.CorsPolicyName,
					builder => builder.AllowAnyMethod().AllowAnyHeader().WithOrigins($"{ApplicationPaths.ApiHostUrl}:{signalRPort}")));
			return services;
		}
	}
}
