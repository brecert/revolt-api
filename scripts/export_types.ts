import { parse } from "https://deno.land/std@0.133.0/flags/mod.ts";
import type { OpenAPI3 } from "./types.ts";

const HELP = `
USAGE:
deno run export_types.ts <[-i --input] input> <[-o --out] output>
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

const exports = Object.keys(api.components?.schemas ?? {})
  .map((name) => `export type ${name.replaceAll(/\s/g, '_')} = schema.components['schemas']['${name}'];`)
  .join("\n");

const output = `
// This file was generated with https://github.com/brecert/revolt-api

import type * as schema from './schema.ts'

${exports}
`.trimStart();

Deno.writeTextFileSync(outPath, output);
