// Проект: EveHQ.NG.WebApi
// Имя файла: IHttpService.cs
// GUID файла: CA150200-8B01-42E4-A30C-E2493C8E3F92
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 21.01.2018

#region Usings

using System;
using System.Net.Http;
using System.Threading.Tasks;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	public interface IHttpService
	{
		Task<TResult> CallAsync<TResult>(
			HttpMethod httpMethod,
			Task<string> getUri,
			Func<HttpResponseMessage, Task<TResult>> prepareResult);

		Task CallAsync(
			HttpMethod httpMethod,
			Task<string> getUri,
			Func<HttpResponseMessage, Task> prepareResult);

		Task<TResult> CallAsync<TResult>(
			Func<HttpRequestMessage> createRequest,
			Func<HttpResponseMessage, Task<TResult>> prepareResult);

		Task CallAsync(
			Func<HttpRequestMessage> createRequest,
			Func<HttpResponseMessage, Task> prepareResult);
	}
}