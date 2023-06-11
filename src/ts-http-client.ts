/** Standard response containing typed payload returned from request (data)
 * and indicator of success and any messages */
export interface HttpResponse<T> extends Response {
  data?: T;
  success: false;
  messages?: string;
}

/** Supported/Allowed Http Verbs - https://www.rfc-editor.org/rfc/rfc9110.html#name-method-definitions */
export enum HttpClientMethod {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

/** Set of header to include in the request */
type RequestHeaders = Record<string, string> | Headers;

/** Reasonable defaults for JSON based request/response */
const DefaultHeaders: RequestHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export interface HttpClientStatusCode {
  statusCode: number;
  statusText: HttpStatusCode;
}

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  SwitchProxy = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  IAmATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

/** Client that enables making http requests using standard verbs (GET, POST, PUT, DELETE, PATCH)  */
const HttpClient = () => {
  const httpRequest = <TResponse>(
    url: string,
    config: RequestInit = {}
  ): Promise<HttpResponse<TResponse>> => {
    return new Promise((resolve, reject) => {
      fetch(url, config)
        .then((res) => {
          return res.json();
        })
        .then((jsonData: unknown) => {
          if (jsonData) {
            let data = jsonData as TResponse;
            resolve({
              success: true,
              data: data,
            } as unknown as HttpResponse<TResponse>);
          } else {
            reject({ success: false } as HttpResponse<TResponse>);
          }
        })
        .catch((err: any) => {
          reject({
            success: false,
            messages: err.message ? err.message : undefined,
          } as HttpResponse<TResponse>);
        });
    });
  };

  const get = <TResponse>(
    url: string,
    httpHeaders?: RequestHeaders
  ): Promise<HttpResponse<TResponse>> => {
    if (!httpHeaders) {
      httpHeaders = DefaultHeaders;
    }
    return httpRequest<TResponse>(url, {
      method: HttpClientMethod.GET,
      headers: httpHeaders,
    });
  };

  const post = <TRequest extends BodyInit, TResponse>(
    url: string,
    body: TRequest,
    httpHeaders?: RequestHeaders
  ): Promise<HttpResponse<TResponse>> => {
    if (!httpHeaders) {
      httpHeaders = DefaultHeaders;
    }
    return httpRequest<TResponse>(url, {
      method: HttpClientMethod.POST,
      body,
      headers: httpHeaders,
    });
  };

  const put = <TRequest extends BodyInit, TResponse>(
    url: string,
    body: TRequest,
    httpHeaders?: RequestHeaders
  ): Promise<HttpResponse<TResponse>> => {
    if (!httpHeaders) {
      httpHeaders = DefaultHeaders;
    }
    return httpRequest<TResponse>(url, {
      method: HttpClientMethod.PUT,
      body,
      headers: httpHeaders,
    });
  };

  const patch = <TRequest extends BodyInit, TResponse>(
    url: string,
    body: TRequest,
    httpHeaders?: RequestHeaders
  ): Promise<HttpResponse<TResponse>> => {
    if (!httpHeaders) {
      httpHeaders = DefaultHeaders;
    }
    return httpRequest<TResponse>(url, {
      method: HttpClientMethod.PATCH,
      body,
      headers: httpHeaders,
    });
  };

  const remove = <TResponse>(
    url: string,
    httpHeaders?: RequestHeaders
  ): Promise<HttpResponse<TResponse>> => {
    if (!httpHeaders) {
      httpHeaders = DefaultHeaders;
    }
    return httpRequest<TResponse>(url, {
      method: HttpClientMethod.DELETE,
      headers: httpHeaders,
    });
  };

  return {
    httpRequest,
    get,
    post,
    put,
    patch,
    remove,
  };
};

export default HttpClient;
