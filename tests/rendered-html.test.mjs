import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the autonomous harness overview", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>EDA Claude Harness — How Autonomous Work Keeps Moving<\/title>/i);
  assert.match(html, /Stay in the conversation\./);
  assert.match(html, /Let the system keep moving\./);
  assert.match(html, /NEURON/);
  assert.match(html, /PLANNER/);
  assert.match(html, /WORKER/);
  assert.match(html, /REVIEWER/);
  assert.match(html, /BROKER/);
  assert.match(html, /POOL/);
  assert.match(html, /FSM/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps canonical references and reduced-motion support", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /docs\/guides\/architecture-vocabulary\.md/);
  assert.match(page, /docs\/guides\/planner-phase-author\.md/);
  assert.match(page, /docs\/guides\/loop-and-heartbeat\.md/);
  assert.match(page, /src\/edp_claude\/tools\/roles\.py/);
  assert.match(page, /FOREGROUND · DIRECTION LOOP/);
  assert.match(page, /BACKGROUND · EXECUTION LOOP/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Harness-presentation\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
