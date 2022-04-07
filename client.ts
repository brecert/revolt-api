import type { APIRoutes, Query, TypedResponse } from "./routes.ts";

export type ExtendRequestInit<
  T = { query?: Query; body?: Record<string, unknown> },
> = Omit<RequestInit, keyof T> & T;

type ExistingKeys<T> = {
  [K in keyof T]-?: T[K] extends never ? never : K;
}[keyof T];

type RequireNonNull<T> = Required<Pick<T, ExistingKeys<T>>>;

/** @throws {Error} */
export type RequestFn<
  Method extends APIRoutes["method"],
  Routes extends APIRoutes & { method: Method } = APIRoutes & {
    method: Method;
  },
> = <
  Name extends Routes["name"],
  Route extends Routes & { name: Name },
  RequiredInit extends RequireNonNull<Pick<Route, "query" | "body">>,
  Init extends Omit<ExtendRequestInit<RequiredInit>, "method">,
  Response extends Route["response"] extends { "application/json": unknown }
    ? Route["response"]["application/json"]
    : never,
>(
  ...[_name, path, init]: (
    RequiredInit[keyof RequiredInit] extends never
      ? [name: Name, path: Route["path"], init?: Init]
      : [name: Name, path: Route["path"], init: Init]
  )
) => Promise<Response>;

export type FetchFn = <
  Name extends APIRoutes["name"],
  Route extends APIRoutes & { name: Name },
  InitParams extends {
    method: Uppercase<Route["method"]>;
    base?: string;
    query?: Query;
    body?: BodyInit;
  },
  RequiredInit extends
    & InitParams
    & Required<Pick<InitParams, ExistingKeys<Pick<Route, "query" | "body">>>>,
  Init extends ExtendRequestInit<RequiredInit>,
>(
  ...[_name, path, init]: (
    RequiredInit[keyof RequiredInit] extends never
      ? [name: Name, path: Route["path"], init?: Init]
      : [name: Name, path: Route["path"], init: Init]
  )
) => Promise<TypedResponse<Route["response"]>>;

export const encodeURLQueryString = (
  params: Readonly<Query>,
) =>
  Object.keys(params)
    .map((k) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(params[k] ?? "null")}`
    )
    .join("&");

/**
 * Fetch a resource from the API. It returns a Promise that resolves to the Response to that Request, whether it is successful or not.
 *
 * *Mostly* equivilent to the build in `fetch` function, but typed.
 *
 * changes:
 * - allows a base to be specified
 * - url queries will be typed added to the request
 * - will type error if the route expects a body
 * - the method for the request will be typed
 * - the result is typed for json output
 */
export const fetchAPI: FetchFn = (...[_name, path, init]) =>
  fetch(
    `${init?.base}${path}?${init?.query && encodeURLQueryString(init.query)}`,
    init,
  );

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`[${res.status}] ${res.statusText}\n\n${await res.text()}`);
  }
  return res.status === 200 ? res.json() : {};
};

export interface ClientInit
  extends Omit<RequestInit, "body" | "integrity" | "method" | "signal"> {
  base: string;
}

export class APIClient {
  constructor(public config: ClientInit) {
    this.config.base ??= "";
  }

  _fetch(path: string, init?: ExtendRequestInit) {
    return fetch(
      `${this.config.base}${path}?${
        init?.query && encodeURLQueryString(init.query)
      }`,
      {
        ...this.config,
        ...init,
        headers: { ...this.config.headers, ...init?.headers },
        body: JSON.stringify(init?.body),
      },
    );
  }

  fetch<
    Name extends APIRoutes["name"],
    Routes extends APIRoutes & { name: Name },
    Path extends Routes["path"],
    Route extends Routes & { path: Path },
    RequiredInit extends RequireNonNull<Pick<Route, "query" | "body">>,
    Init extends Omit<ExtendRequestInit<RequiredInit>, "method">,
  >(
    ...[_name, path, init]: Route extends
      { method: "get"; query: never; body: never }
      ? [name: Name, path: Path, init?: Init]
      : [name: Name, path: Path, init: Init]
  ): Promise<TypedResponse<Route["response"]>> {
    return this._fetch(path, init);
  }

  get: RequestFn<"get"> = (...[_name, path, init]) =>
    this._fetch(path, { ...init, method: "GET" }).then(handleResponse);

  post: RequestFn<"post"> = (...[_name, path, init]) =>
    this._fetch(path, { ...init, method: "POST" }).then(handleResponse);

  delete: RequestFn<"delete"> = (...[_name, path, init]) =>
    this._fetch(path, { ...init, method: "DELETE" }).then(handleResponse);

  put: RequestFn<"put"> = (...[_name, path, init]) =>
    this._fetch(path, { ...init, method: "PUT" }).then(handleResponse);

  patch: RequestFn<"patch"> = (...[_name, path, init]) =>
    this._fetch(path, { ...init, method: "PATCH" }).then(handleResponse);
}
