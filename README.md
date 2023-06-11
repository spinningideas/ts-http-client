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

1. Axios has had breaking changes

Axios shipped out v0.27.0 which included some breaking changes and bugs. It crossed the v1 version and is potentially more stable now.

1. Axios codebase is not advancing

v0.27.0 broke FormData handling unintentionally (ref: https://github.com/axios/axios/pull/4640). This fix showed how old codebase is. v0.27.0 shipped 1 year after the the PR merged and the library seems to have low momentum.

3. Axios is still using the old XMLHttpRequests API

Axios is still using the old XMLHttpRequests API and thus has to manually implement a lot of handling and workarounds we get for free with Fetch API. Fetch API is now supported by nearly all browsers and has become the standard. Fetch API based HTTP client also result in smaller bundle size in general.
