// Проект: EveHQ.NG.WebApi
// Имя файла: ApiErrorResult.cs
// GUID файла: 549FF091-384E-4A7D-933F-18E4FA6341D8
// Автор: Mike Eshva (mike@eshva.ru)
// Дата создания: 06.09.2018

#region Usings

using System.Collections.Generic;
using System.Net;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;

#endregion


namespace EveHQ.NG.WebApi.Infrastructure
{
	public sealed class ApiErrorResult : ObjectResult
	{
		public ApiErrorResult(string message, ApiErrorCode errorCode) : base(new[] { new ErrorRecord(message, errorCode) })
		{
			StatusCode = (int)HttpStatusCode.InternalServerError;
		}

		public ApiErrorResult AddError(string message, ApiErrorCode errorCode)
		{
			Value = new List<ErrorRecord>((ErrorRecord[])Value) { new ErrorRecord(message, errorCode) }.ToArray();
			return this;
		}

		[UsedImplicitly(ImplicitUseTargetFlags.Members)]
		private struct ErrorRecord
		{
			public ErrorRecord(string message, ApiErrorCode errorCode = ApiErrorCode.GeneralError)
			{
				Message = message;
				ErrorCode = (int)errorCode;
			}

			public string Message;

			public int ErrorCode;
		}
	}
}
