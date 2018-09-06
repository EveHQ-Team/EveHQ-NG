// Проект: EveHQ.NG.WebApi
// Имя файла: IocContainerBootstrapper.cs
// GUID файла: 11C89282-53E2-4F17-9B3D-A247B4A19082
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 04.01.2018

#region Usings

using System.IO;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using EveHQ.NG.Infrastructure;
using EveHQ.NG.Infrastructure.Core;
using EveHQ.NG.Infrastructure.Settings;
using EveHQ.NG.Infrastructure.Storage.ApplicationDatabase;
using EveHQ.NG.Infrastructure.UiNotification;
using EveHQ.NG.Storage.Sqlite;
using EveHQ.NG.Storage.Sqlite.ApplicationDatabase;
using EveHQ.NG.WebServices.Ccp.Characters;
using EveHQ.NG.WebServices.Ccp.Sso;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

#endregion


namespace EveHQ.NG.WebApi.Infrastructure
{
	public sealed class IocContainerBootstrapper
	{
		public IContainer BuildContainer(IServiceCollection services)
		{
			var builder = new ContainerBuilder();

			RegisterServicesOverridableByAspDotNetCore(builder);
			builder.Populate(services);
			RegisterServicesOverridingOnesOfAspDotNetCore(builder);

			return builder.Build();
		}

		/// <remarks>
		/// If you need to register services that should be overrided by ASP.NET Core if specified by it, do register them in this method.
		/// </remarks>
		private void RegisterServicesOverridableByAspDotNetCore(ContainerBuilder builder)
		{
		}

		/// <remarks>
		/// If you need to register services that should overrid services registered by ASP.NET Core do register them in this method.
		/// </remarks>
		private void RegisterServicesOverridingOnesOfAspDotNetCore(ContainerBuilder builder)
		{
			builder.RegisterType<SsoAuthenticator>().As<IOAuthAuthenticator>().InstancePerDependency();
			builder.RegisterType<PrototypeAuthenticationSecretsStorage>().As<IAuthenticationSecretsStorage>().SingleInstance();
			builder.RegisterType<EsiCharacterApi>().As<ICharactersApi>().InstancePerDependency();
			builder.RegisterType<AuthenticationNotificationHub>()
					.As<IAuthenticationNotificationService, AuthenticationNotificationHub>().SingleInstance();
			builder.RegisterType<LoggedInCharacterRepositoryStub>().As<ILoggedInCharacterRepository>().SingleInstance();
			builder.RegisterType<CharactersApiUriProvider>().As<ICharactersApiUriProvider>().InstancePerDependency();
			builder.RegisterType<HttpService>().As<IHttpService>().SingleInstance();
			builder.RegisterType<SystemClock>().As<IClock>().InstancePerDependency();
			builder.RegisterType<SqliteApplicationDatabase>().As<IApplicationDatabase>()
					.WithParameter(
						(parameter, context) => parameter.Name == "databaseFilePath",
						(parameter, context) =>
						{
							var dataFolderPath = context.Resolve<IConfiguration>()[ConfigurationKeyNames.DataFolderPath];
							return Path.Combine(
								ApplicationPaths.GetDatabasesFolderPath(dataFolderPath),
								SqliteTools.ApplicationDatabaseFileName);
						})
					.SingleInstance();
			builder.RegisterType<SqliteApplicationDatabaseManagementCommandFactory>()
					.As<IApplicationDatabaseManagementCommandFactory<SqliteConnection>>()
					.SingleInstance();
			builder.RegisterType<EmbeddedResourceFileReaderFactory>()
					.As<IEmbeddedResourceFileReaderFactory>()
					.SingleInstance();
		}
	}
}
