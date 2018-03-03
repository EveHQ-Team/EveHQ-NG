// Проект: EveHQ.NG.WebApi
// Имя файла: ServiceCollectionExtensions.cs
// GUID файла: 0B37C575-6E3F-4CEF-89F2-355664F420AF
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 29.01.2018

#region Usings

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

#endregion


namespace EveHQ.NG.Infrastructure.Options
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection ConfigureWritable<TOptions>(
			this IServiceCollection services,
			IConfigurationSection section,
			string filePath) where TOptions : class, new()
		{
			services.Configure<TOptions>(section);
			services.AddTransient<IWritableOptions<TOptions>>(
				provider => new WritableOptions<TOptions>(provider.GetService<IOptionsMonitor<TOptions>>(), filePath));
			return services;
		}
	}
}
