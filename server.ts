import { createHandler, loadRoutes } from "@mastrojs/mastro/server-filebased";
import routeFiles from "./.routenames.json" with { type: "json" };

const fetch = createHandler({
  // for Wrangler (which uses esbuild) to bundle the file-based routes, we need to import them:
  routes: await loadRoutes(
    routeFiles,
    (name) => import(`./routes/${name.slice(7, -10)}.server.${name.slice(-2)}`),
  ),
  serveStaticFiles: false,
});

export default { fetch } satisfies ExportedHandler<Env>;
