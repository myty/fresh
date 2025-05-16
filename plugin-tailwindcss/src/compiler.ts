import tailwindCss from "@tailwindcss/postcss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import type { TailwindPluginOptions } from "./types.ts";
import type { ResolvedFreshConfig } from "fresh";

export async function initTailwind(
  config: ResolvedFreshConfig,
  options: TailwindPluginOptions,
): Promise<postcss.Processor> {
  // PostCSS types cause deep recursion
  const plugins = [
    // deno-lint-ignore no-explicit-any
    tailwindCss() as any,
    // deno-lint-ignore no-explicit-any
    autoprefixer(options.autoprefixer) as any,
  ];

  if (config.mode === "production") {
    const { default: cssnano } = await import("cssnano");
    plugins.push(cssnano());
  }

  const res = postcss(plugins);
  return res;
}
