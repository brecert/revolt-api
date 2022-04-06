import { parse } from "https://deno.land/std@0.133.0/flags/mod.ts";
import type { OpenAPI3 } from "./types.ts";

const HELP = `
USAGE:
deno run generate.ts <[-i --input] input> <[-o --out] output>
`.trim();

const flags = parse(Deno.args);
const outPath = flags["out"] ?? flags["o"] ?? flags._.pop();
const inputPath = flags["input"] ?? flags["i"] ?? flags._.pop();

if (!inputPath || !outPath) {
  console.error(
    `${HELP}\n\nERROR: Requires both input and output to be specified`,
  );
}

const api: OpenAPI3 = await Deno.readTextFile(inputPath).then(JSON.parse);

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

Deno.writeTextFileSync(outPath, output);
