// Проект: EveHQ.NG.WebApi
// Имя файла: HttpService.cs
// GUID файла: B4E1470E-9A28-4422-910F-3A96EBA27B83
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 21.01.2018

#region Usings

using System;
using System.Net.Http;
using System.Threading.Tasks;
using JetBrains.Annotations;

#endregion


namespace EveHQ.NG.Infrastructure.Core
{
	[UsedImplicitly(ImplicitUseKindFlags.InstantiatedWithFixedConstructorSignature)]
	public class HttpService : IHttpService, IDisposable
	{
		public HttpService()
		{
			_httpClient = new HttpClient();
		}

		public async Task<TResult> CallAsync<TResult>(
			HttpMethod httpMethod,
			Task<string> getUri,
			Func<HttpResponseMessage, Task<TResult>> prepareResult) =>
			await CallAsync(() => new HttpRequestMessage(httpMethod, getUri.Result), prepareResult);

		public async Task CallAsync(
			HttpMethod httpMethod,
			Task<string> getUri,
			Func<HttpResponseMessage, Task> prepareResult) =>
			await CallAsync(() => new HttpRequestMessage(httpMethod, getUri.Result), prepareResult);

		public async Task<TResult> CallAsync<TResult>(
			Func<HttpRequestMessage> createRequest,
			Func<HttpResponseMessage, Task<TResult>> prepareResult)
		{
			ValidateNotDisposed();
			using (var request = createRequest())
			{
				using (var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead))
				{
					return await prepareResult(response);
				}
			}
		}

		public async Task CallAsync(
			Func<HttpRequestMessage> createRequest,
			Func<HttpResponseMessage, Task> prepareResult)
		{
			ValidateNotDisposed();
			using (var request = createRequest())
			{
				using (var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead))
				{
					await prepareResult(response);
				}
			}
		}

		public void Dispose()
		{
			_httpClient?.Dispose();
			_disposed = true;
		}

		private void ValidateNotDisposed()
		{
			if (_disposed)
			{
				throw new InvalidOperationException("Object disposed.");
			}
		}

		private bool _disposed;
		private readonly HttpClient _httpClient;
	}
}