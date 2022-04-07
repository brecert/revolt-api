import { build, emptyDir } from "https://deno.land/x/dnt@0.22.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./client.ts"],
  outDir: "./npm",
  test: false,
  shims: {},
  package: {
    // package.json properties
    name: "@brecert/revolt-api",
    version: Deno.args[0],
    description: "A simple revolt api wrapper",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/brecert/revolt-api-gen.git",
    },
    bugs: {
      url: "https://github.com/brecert/revolt-api-gen/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("README.md", "npm/README.md");
