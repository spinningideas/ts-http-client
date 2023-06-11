# ts-http-client

Typescript http client that wraps native fetch and adds type support including typing of request body and the response payload.

NOTE: This code is a work in progress and not yet ready for use and should be considered an example implementation only.

# Example Usage

```
import HttpClient from 'ts-http-client';

interface Post = {
  id: string;
  title: string;
}

const getPosts = await HttpClient().get<Post[]>('https://exampleapi.org')

```

# Fetch

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

# Other Libaries

- https://github.com/axios/axios
- https://github.com/developit/redaxios
- https://elbywan.github.io/wretch/
- https://github.com/ajaishankar/openapi-typescript-fetch
- https://github.com/angular/angular/blob/main/packages/common/http/src/client.ts
  - import { HttpClientModule } from '@angular/common/http';

# Why not Axios?

1. Axios has had breaking changes and is not advancing as much as the rest of web

Axios has at times included breaking changes and bugs. It crossed into v1 version and is potentially more stable now.

2. Axios is still using the XMLHttpRequests API

Axios is still using the old XMLHttpRequests API and thus has to manually implement a lot of handling and workarounds we get for free with Fetch API. Fetch API is now supported by nearly all browsers and has become the standard. Fetch API based HTTP client also results in smaller bundle size in general.

NOTE: One can use typescript with Axios - see https://marketsplash.com/tutorials/typescript/axios-typescript/
