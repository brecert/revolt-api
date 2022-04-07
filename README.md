# Revolt API
> a typed revolt api client

# Usage

```ts
import * as Revolt from "https://deno.land/x/revolt_api/client.ts";

const api = new Revolt.APIClient({
  base: "https://api.revolt.chat",
  headers: {
    "x-bot-token": REVOLT_TOKEN,
    "content-type": "application/json",
  },
});

const config = await api.get("Query Node", "/");
console.log(`The API is running revolt ${config.revolt}`);

const me = await api.get("Fetch Self", "/users/@me");
console.log(`My ID is ${me._id}`);
```

# Building and Updating

```console
$ curl https://raw.githubusercontent.com/revoltchat/api/master/OpenAPI.json > OpenAPI.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  205k  100  205k    0     0   868k      0 --:--:-- --:--:-- --:--:--  873k

$ npx openapi-typescript OpenAPI.json -o schema.ts
✨ openapi-typescript 5.2.0
🚀 OpenAPI.json -> /revolt-api/schema.ts [417ms]

$ deno run -A ./scripts/generate.ts -i OpenAPI.json -o .\routes.ts
```
