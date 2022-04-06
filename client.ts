import type { APIRoutes, ExtendedRequestInit, TypedResponse } from "./routes.d.ts";

export type RequestFn<Method extends APIRoutes["method"]> = <
  MethodRoutes extends APIRoutes & { method: Method },
  Name extends MethodRoutes["name"],
  Routes extends MethodRoutes & { name: Name },
  Path extends Routes["path"],
  Route extends Routes & { path: Path },
  Init extends Omit<ExtendedRequestInit, "method"> & {
    query: Route["query"];
  },
>(
  ...[_name, path, init]: Route extends { method: "get"; query: never }
    ? [name: Name, path: Path, init?: Init]
    : [name: Name, path: Path, init: Init]
) => Promise<Route["response"]>;

export const encodeURLQueryString = (
  params: Record<string, string | number | boolean>,
) =>
  Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

/** Fetch a resource from the API. It returns a Promise that resolves to the Response to that Request, whether it is successful or not. **/
export const fetchAPI = <
  Name extends APIRoutes["name"],
  Routes extends APIRoutes & { name: Name },
  Path extends Routes["path"],
  Route extends Routes & { path: Path },
  Init extends ExtendedRequestInit & {
    method: Uppercase<Route["method"]>;
    query: Route["query"];
  },
>(
  ...[_name, path, init]: Route extends { method: "get"; query: never }
    ? [name: Name, path: Path, init?: Init]
    : [name: Name, path: Path, init: Init]
): Promise<TypedResponse<Route["response"]>> =>
  fetch(path + `?${init?.query && encodeURLQueryString(init.query)}`, init);

export interface ClientInit
  extends Omit<RequestInit, "body" | "integrity" | "method" | "signal"> {
  base: string;
}

export class APIClient {
  constructor(public config: ClientInit) {
    this.config.base ??= "";
  }

  _fetch(path: string, init?: ExtendedRequestInit) {
    return fetch(
      `${this.config.base}${path}?${
        init?.query && encodeURLQueryString(init.query)
      }`,
      {
        ...this.config,
        ...init,
        headers: { ...this.config.headers, ...init?.headers },
      },
    );
  }

  fetch<
    Name extends APIRoutes["name"],
    Routes extends APIRoutes & { name: Name },
    Path extends Routes["path"],
    Route extends Routes & { path: Path },
    Init extends ExtendedRequestInit & {
      method: Uppercase<Route["method"]>;
      query: Route["query"];
    },
  >(
    ...[_name, path, init]: Route extends { method: "get"; query: never }
      ? [name: Name, path: Path, init?: Init]
      : [name: Name, path: Path, init: Init]
  ): Promise<TypedResponse<Route["response"]>> {
    return this._fetch(path, init);
  }

  get: RequestFn<"get"> = (...[_name, path, init]) =>
    this._fetch(path, init).then((res) => res.json());

  post: RequestFn<"post"> = (...[_name, path, init]) =>
    this._fetch(path, init).then((res) => res.json());

  delete: RequestFn<"delete"> = (...[_name, path, init]) =>
    this._fetch(path, init).then((res) => res.json());

  put: RequestFn<"put"> = (...[_name, path, init]) =>
    this._fetch(path, init).then((res) => res.json());

  patch: RequestFn<"patch"> = (...[_name, path, init]) =>
    this._fetch(path, init).then((res) => res.json());
}
