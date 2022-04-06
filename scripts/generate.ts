import api from "../OpenAPI.json" assert { type: "json" };

const routes = [];
for (const [path, methods] of Object.entries(api.paths ?? {})) {
  const tsPath = path.replaceAll(/\{\w+\}/g, "${string}");

  for (const [method, route] of Object.entries(methods)) {
    const hasQuery = route.parameters
      ?.some((p: { in: string }) => p.in === "query");

    const response =
      `MapResponses<schema.paths['${path}']['${method}']['responses']>`;

    const query = hasQuery
      ? `schema.operations['${route.operationId}']['parameters']['query']`
      : "never";

    routes.push(
      `  | { name: "${route.summary}", method: '${method}', path: \`${tsPath}\`, query: ${query}, response: ${response} }`,
    );
  }
}

const output = `
// This file was generated with https://github.com/brecert/revolt-api-gen

import * as schema from './schema.ts'

export type Responses = Record<string, unknown | never | { content: Record<string, unknown> }>
export type MapResponses<T extends Responses, R = T[keyof T]> = R[keyof R]

export interface TypedResponse<T extends Record<string, unknown> = Record<string, unknown>> extends Response {
  json<P = T['application/json']>(): Promise<P>
}

export interface ExtendedRequestInit extends RequestInit {
  query: Record<string, string | number | boolean>
}

export type Route = { name: string, method: string, path: string, query: unknown, response: unknown }

export type APIRoutes =
${routes.join("\n")}

export const encodeURLQueryString = (params: Record<string, string | number | boolean>) =>
  Object.keys(params)
    .map((k) => \`\${encodeURIComponent(k)}=\${encodeURIComponent(params[k])}\`)
    .join("&");
`.trimStart();

Deno.writeTextFileSync("routes.ts", output);
