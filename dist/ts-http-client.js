/** Supported/Allowed Http Verbs - https://www.rfc-editor.org/rfc/rfc9110.html#name-method-definitions */
export var HttpClientMethod;
(function (HttpClientMethod) {
    HttpClientMethod["POST"] = "POST";
    HttpClientMethod["GET"] = "GET";
    HttpClientMethod["PATCH"] = "PATCH";
    HttpClientMethod["PUT"] = "PUT";
    HttpClientMethod["DELETE"] = "DELETE";
})(HttpClientMethod || (HttpClientMethod = {}));
/** Reasonable defaults for JSON based request/response */
const DefaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
export var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
    HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HttpStatusCode[HttpStatusCode["Processing"] = 102] = "Processing";
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
    HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
    HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
    HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
    HttpStatusCode[HttpStatusCode["MultiStatus"] = 207] = "MultiStatus";
    HttpStatusCode[HttpStatusCode["AlreadyReported"] = 208] = "AlreadyReported";
    HttpStatusCode[HttpStatusCode["ImUsed"] = 226] = "ImUsed";
    HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
    HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
    HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
    HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
    HttpStatusCode[HttpStatusCode["SwitchProxy"] = 306] = "SwitchProxy";
    HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpStatusCode[HttpStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
    HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
    HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
    HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    HttpStatusCode[HttpStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    HttpStatusCode[HttpStatusCode["UriTooLong"] = 414] = "UriTooLong";
    HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HttpStatusCode[HttpStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
    HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    HttpStatusCode[HttpStatusCode["IAmATeapot"] = 418] = "IAmATeapot";
    HttpStatusCode[HttpStatusCode["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    HttpStatusCode[HttpStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HttpStatusCode[HttpStatusCode["Locked"] = 423] = "Locked";
    HttpStatusCode[HttpStatusCode["FailedDependency"] = 424] = "FailedDependency";
    HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    HttpStatusCode[HttpStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
    HttpStatusCode[HttpStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    HttpStatusCode[HttpStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    HttpStatusCode[HttpStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
    HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
    HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    HttpStatusCode[HttpStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    HttpStatusCode[HttpStatusCode["InsufficientStorage"] = 507] = "InsufficientStorage";
    HttpStatusCode[HttpStatusCode["LoopDetected"] = 508] = "LoopDetected";
    HttpStatusCode[HttpStatusCode["NotExtended"] = 510] = "NotExtended";
    HttpStatusCode[HttpStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HttpStatusCode || (HttpStatusCode = {}));
/** Client that enables making http requests using standard verbs (GET, POST, PUT, DELETE, PATCH)  */
const HttpClient = () => {
    const httpRequest = (url, config = {}) => {
        return new Promise((resolve, reject) => {
            fetch(url, config)
                .then((res) => {
                return res.json();
            })
                .then((jsonData) => {
                if (jsonData) {
                    let data = jsonData;
                    resolve({
                        success: true,
                        data: data,
                    });
                }
                else {
                    reject({ success: false });
                }
            })
                .catch((err) => {
                reject({
                    success: false,
                    messages: err.message ? err.message : undefined,
                });
            });
        });
    };
    const get = (url, httpHeaders) => {
        if (!httpHeaders) {
            httpHeaders = DefaultHeaders;
        }
        return httpRequest(url, {
            method: HttpClientMethod.GET,
            headers: httpHeaders,
        });
    };
    const post = (url, body, httpHeaders) => {
        if (!httpHeaders) {
            httpHeaders = DefaultHeaders;
        }
        return httpRequest(url, {
            method: HttpClientMethod.POST,
            body,
            headers: httpHeaders,
        });
    };
    const put = (url, body, httpHeaders) => {
        if (!httpHeaders) {
            httpHeaders = DefaultHeaders;
        }
        return httpRequest(url, {
            method: HttpClientMethod.PUT,
            body,
            headers: httpHeaders,
        });
    };
    const patch = (url, body, httpHeaders) => {
        if (!httpHeaders) {
            httpHeaders = DefaultHeaders;
        }
        return httpRequest(url, {
            method: HttpClientMethod.PATCH,
            body,
            headers: httpHeaders,
        });
    };
    const remove = (url, httpHeaders) => {
        if (!httpHeaders) {
            httpHeaders = DefaultHeaders;
        }
        return httpRequest(url, {
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
