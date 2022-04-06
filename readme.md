```console
$ curl https://raw.githubusercontent.com/revoltchat/api/master/OpenAPI.json > OpenAPI.json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  205k  100  205k    0     0   868k      0 --:--:-- --:--:-- --:--:--  873k

$ npx openapi-typescript OpenAPI.json -o schema.ts
✨ openapi-typescript 5.2.0
🚀 OpenAPI.json -> D:\bree\Code\github.com\brecert\revolt-api-gen\schema.ts [417ms]

$ deno run -A ./scripts/generate.ts
```